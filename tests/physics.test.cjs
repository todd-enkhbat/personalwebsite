const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '../app/lib/entropy.ts'), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
const context = { exports: {} };
vm.runInNewContext(compiled, context);
const physics = context.exports;
const { createGas, stepGas, reverseGas, kineticEnergy, gasMacrostate, logChoose, conduct, runEngine, availableWork, createWorld, diffuseWorld, entropyChange } = physics;
const close = (actual, expected, tolerance = 1e-8) => assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} != ${expected}`);
const sum = (values) => values.reduce((a, b) => a + b, 0);

test('gas stays within its walls and conserves kinetic energy through many reflections', () => {
  const particles = createGas(512);
  const energy = kineticEnergy(particles);
  for (let i = 0; i < 1000; i++) stepGas(particles, 0.1);
  close(kineticEnergy(particles), energy);
  assert.ok(particles.every(p => p.x >= 0 && p.x <= 2 && p.y >= 0 && p.y <= 1));
});
test('closed partition retains the prepared gas', () => {
  const particles = createGas(160);
  for (let i = 0; i < 200; i++) stepGas(particles, 0.1, true);
  assert.equal(gasMacrostate(particles).left, 160);
});
test('reversing actual velocities retraces positions and negates initial velocities', () => {
  const particles = createGas(512, 19);
  const initial = particles.map(p => ({ ...p }));
  for (let i = 0; i < 721; i++) stepGas(particles, 1 / 30);
  reverseGas(particles);
  // The backwards steps deliberately have a different size.
  stepGas(particles, 721 / 30);
  particles.forEach((p, i) => {
    close(p.x, initial[i].x); close(p.y, initial[i].y);
    close(p.vx, -initial[i].vx); close(p.vy, -initial[i].vy);
  });
});
test('two-half multiplicity is correct and symmetric', () => {
  close(logChoose(8, 4), Math.log(70));
  close(logChoose(8, 1), Math.log(8));
  close(logChoose(8, 0), 0);
  for (let i = 0; i <= 32; i++) close(logChoose(32, i), logChoose(32, 32 - i));
  assert.equal(gasMacrostate(createGas(160)).entropy, 0);
});
test('a typical released gas reaches the dominant macrostate without damping', () => {
  const particles = createGas(512);
  stepGas(particles, 20);
  assert.ok(gasMacrostate(particles).fraction > 0.98);
});
test('passive heat flow conserves energy, raises entropy and approaches the arithmetic mean', () => {
  let state = { hot: 600, cold: 200, work: 0 };
  let previousEntropy = 0;
  for (let i = 0; i < 100; i++) {
    state = conduct(state, 0.5, 0.2);
    close(state.hot + state.cold + state.work, 800);
    const entropy = entropyChange([state.hot, state.cold], [600, 200]);
    assert.ok(entropy >= previousEntropy - 1e-12); previousEntropy = entropy;
  }
  close(state.hot, 400, 1e-5); close(state.cold, 400, 1e-5);
});
test('a reversible engine stores the correct work, conserves energy and creates no entropy', () => {
  let state = { hot: 600, cold: 200, work: 0 };
  for (let i = 0; i < 100; i++) {
    state = runEngine(state, 1, 0.4);
    close(state.hot + state.cold + state.work, 800);
    close(state.hot * state.cold, 120000, 1e-6);
    close(entropyChange([state.hot, state.cold], [600, 200]), 0);
  }
  close(state.hot, Math.sqrt(120000));
  close(state.work, 800 - 2 * Math.sqrt(120000));
  close(availableWork([state.hot, state.cold]), 0);
});
test('zero coupling and equal temperatures do not create work or transfer heat', () => {
  const state = { hot: 600, cold: 200, work: 0 };
  close(conduct(state, 100, 0).hot, 600); close(runEngine(state, 100, 0).work, 0);
  for (const fn of [conduct, runEngine]) {
    const equal = fn({ hot: 300, cold: 300, work: 0 }, 100, 1);
    close(equal.hot, 300); close(equal.cold, 300); close(equal.work, 0);
  }
});
test('all world preparations keep positive temperatures and exactly the same total energy', () => {
  for (const pattern of ['island', 'scattered', 'equal']) for (const contrast of [0, 0.5, 0.95]) {
    const world = createWorld(contrast, pattern);
    close(sum(world), 38400, 1e-7);
    assert.ok(world.every(t => t > 0));
  }
});
test('diffusion conserves energy, increases entropy and consumes available work', () => {
  const initial = createWorld(0.95, 'island');
  let world = initial;
  let previousEntropy = 0;
  let previousWork = availableWork(world);
  for (let i = 0; i < 200; i++) {
    world = diffuseWorld(world, 1, 2);
    close(sum(world), 38400, 1e-7);
    const entropy = entropyChange(world, initial);
    const work = availableWork(world);
    assert.ok(entropy >= previousEntropy - 1e-8);
    assert.ok(work <= previousWork + 1e-8);
    assert.ok(world.every(t => t > 0));
    previousEntropy = entropy; previousWork = work;
  }
  assert.ok(availableWork(world) < 0.01);
});
test('a large world jump remains stable and matches many small timesteps', () => {
  const initial = createWorld(0.8, 'scattered');
  const jump = diffuseWorld(initial, 200, 2);
  let small = initial;
  for (let i = 0; i < 2000; i++) small = diffuseWorld(small, 0.1, 2);
  jump.forEach((t, i) => close(t, small[i]));
  close(sum(jump), 38400, 1e-7);
});
test('uniform and disconnected worlds retain their preparation', () => {
  const uniform = createWorld(0.8, 'equal');
  const evolved = diffuseWorld(uniform, 200, 2);
  evolved.forEach(t => close(t, 300));
  close(availableWork(evolved), 0);
  const uneven = createWorld(0.95, 'island');
  diffuseWorld(uneven, 200, 0).forEach((t, i) => close(t, uneven[i]));
});
