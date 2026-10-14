/** Small, explicit teaching models. Units and limitations are documented in the UI. */
export type Particle = { x: number; y: number; vx: number; vy: number };

export function seededRandom(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (Math.imul(1664525, state) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

export function createGas(count: number, seed = 42, spread = false): Particle[] {
  const random = seededRandom(seed);
  return Array.from({ length: count }, () => {
    const angle = random() * Math.PI * 2;
    const speed = 0.22 + random() * 0.4;
    return {
      x: 0.01 + random() * (spread ? 1.98 : 0.98),
      y: 0.01 + random() * 0.98,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed
    };
  });
}

function reflect(position: number, velocity: number, dt: number, length: number) {
  const period = 2 * length;
  const unfolded = ((position + velocity * dt) % period + period) % period;
  return unfolded < length
    ? { position: unfolded, velocity }
    : { position: period - unfolded, velocity: -velocity };
}

/** Analytic wall reflections; no Euler collision error and no invented damping. */
export function stepGas(particles: Particle[], dt: number, partition = false) {
  for (const particle of particles) {
    const offset = partition && particle.x >= 1 ? 1 : 0;
    const x = reflect(particle.x - offset, particle.vx, dt, partition ? 1 : 2);
    const y = reflect(particle.y, particle.vy, dt, 1);
    particle.x = x.position + offset;
    particle.y = y.position;
    particle.vx = x.velocity;
    particle.vy = y.velocity;
  }
}

export function reverseGas(particles: Particle[]) {
  for (const particle of particles) {
    particle.vx *= -1;
    particle.vy *= -1;
  }
}

export function kineticEnergy(particles: Particle[]) {
  return particles.reduce((sum, p) => sum + (p.vx ** 2 + p.vy ** 2) / 2, 0);
}

export function logChoose(n: number, k: number) {
  let sum = 0;
  for (let i = 1; i <= Math.min(k, n - k); i++) sum += Math.log(n - i + 1) - Math.log(i);
  return sum;
}

/** Positional Boltzmann entropy S/kB for the two-half macrostate, up to a constant. */
export function gasMacrostate(particles: Particle[]) {
  const left = particles.filter((p) => p.x < 1).length;
  const entropy = logChoose(particles.length, left);
  const maxEntropy = logChoose(particles.length, Math.floor(particles.length / 2));
  return { left, right: particles.length - left, entropy, maxEntropy, fraction: entropy / maxEntropy };
}

export type Reservoirs = { hot: number; cold: number; work: number };

/** Equal constant heat capacities C = 1 J/K. Exact finite-time conduction solution. */
export function conduct(state: Reservoirs, dt: number, coupling: number): Reservoirs {
  const mean = (state.hot + state.cold) / 2;
  const halfDifference = (state.hot - state.cold) / 2 * Math.exp(-2 * coupling * dt);
  return { hot: mean + halfDifference, cold: mean - halfDifference, work: state.work };
}

/** Reversible engine: Th*Tc is constant; energy removed is stored as work. */
export function runEngine(state: Reservoirs, dt: number, coupling: number): Reservoirs {
  const product = state.hot * state.cold;
  const finalTemperature = Math.sqrt(product);
  const hot = finalTemperature + (state.hot - finalTemperature) * Math.exp(-coupling * dt);
  const cold = product / hot;
  return { hot, cold, work: state.work + state.hot + state.cold - hot - cold };
}

export function availableWork(temperatures: number[]) {
  const total = temperatures.reduce((sum, t) => sum + t, 0);
  const geometricMean = Math.exp(temperatures.reduce((sum, t) => sum + Math.log(t), 0) / temperatures.length);
  return Math.max(0, total - temperatures.length * geometricMean);
}

export type WorldPattern = "island" | "scattered" | "equal";
export const WORLD_COLUMNS = 16;
export const WORLD_ROWS = 8;

/** Every preparation has mean T = 300 K and C = 1 J/K per cell. */
export function createWorld(contrast: number, pattern: WorldPattern, seed = 21) {
  const random = seededRandom(seed);
  const weights = Array.from({ length: WORLD_COLUMNS * WORLD_ROWS }, (_, i) => {
    if (pattern === "equal") return 1;
    if (pattern === "scattered") return random() < 0.16 ? 1 : 0.025;
    const x = i % WORLD_COLUMNS;
    const y = Math.floor(i / WORLD_COLUMNS);
    return Math.exp(-((x - 4) ** 2 + (y - 3.5) ** 2) / 5) + 0.015;
  });
  const mean = weights.reduce((sum, value) => sum + value, 0) / weights.length;
  return weights.map((weight) => 300 * (1 - contrast + contrast * weight / mean));
}

/** Insulated edges. Pairwise fluxes conserve energy; substeps keep temperatures positive. */
export function diffuseWorld(temperatures: number[], dt: number, coupling: number) {
  if (coupling === 0 || dt === 0) return temperatures.slice();
  const steps = Math.max(1, Math.ceil(dt * coupling / 0.2));
  const alpha = dt * coupling / steps;
  let current = temperatures.slice();
  for (let step = 0; step < steps; step++) {
    const next = current.slice();
    for (let i = 0; i < current.length; i++) {
      const neighbors = [];
      if (i % WORLD_COLUMNS < WORLD_COLUMNS - 1) neighbors.push(i + 1);
      if (i + WORLD_COLUMNS < current.length) neighbors.push(i + WORLD_COLUMNS);
      for (const neighbor of neighbors) {
        const heat = alpha * (current[i] - current[neighbor]);
        next[i] -= heat;
        next[neighbor] += heat;
      }
    }
    current = next;
  }
  return current;
}

export function entropyChange(temperatures: number[], initial: number[]) {
  return temperatures.reduce((sum, t, i) => sum + Math.log(t / initial[i]), 0);
}
