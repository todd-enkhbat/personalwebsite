/** Offline studio renderer. Path tracing is a dev dependency, never shipped to the portfolio. */
import fs from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import ts from 'typescript';
import { createRequire } from 'node:module';
import { publishPortfolioPreviews } from './publish-portfolio-previews.mjs';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root = process.cwd();
const kinds = (process.env.MODELS || 'satellite,habitat,gimbal,cubesat,exoplanet,balloon,growlight,camp,telescope,suit,record,rocket,piano,retail,finance,learning').split(',');
const samples = Number(process.env.SAMPLES || 256);
const size = Number(process.env.RENDER_SIZE || 900);
const sharp = require('sharp');
const pathTrace = process.env.PATH_TRACE !== '0';
const modelCode = ts.transpileModule(await fs.readFile('app/lib/portfolioModels.ts','utf8'), { compilerOptions:{ target:ts.ScriptTarget.ES2022, module:ts.ModuleKind.ES2022 } }).outputText;
const html = `<!doctype html><html><head><style>body{margin:0}canvas{display:block}</style><script type="importmap">{"imports":{"three":"/node_modules/three/build/three.module.js","three/addons/":"/node_modules/three/examples/jsm/","three/":"/node_modules/three/","three-mesh-bvh":"/node_modules/three-mesh-bvh/src/index.js","three-gpu-pathtracer":"/node_modules/three-gpu-pathtracer/src/index.js","xatlas-web":"/node_modules/xatlas-web/dist/xatlas.js"}}</script></head><body><script type="module">
import * as THREE from 'three';
import { HDRLoader } from 'three/addons/loaders/HDRLoader.js';
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';
import { WebGLPathTracer } from 'three-gpu-pathtracer';
import { buildPortfolioModel, texturePortfolioModel } from '/model.js';
RectAreaLightUniformsLib.init();
const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,preserveDrawingBuffer:true,powerPreference:'high-performance'});
renderer.setSize(${size},${size});renderer.setPixelRatio(1);renderer.setClearColor(0,0);renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=.92;document.body.appendChild(renderer.domElement);
const hdr=await new HDRLoader().loadAsync('/public/models/environment/studio_small_03_1k.hdr');hdr.mapping=THREE.EquirectangularReflectionMapping;
const tracer=${pathTrace ? 'new WebGLPathTracer(renderer)' : 'null'};
if(tracer){tracer.bounces=5;tracer.filterGlossyFactor=.5;tracer.renderDelay=0;tracer.fadeDuration=0;tracer.minSamples=1;tracer.tiles.set(2,2);tracer.textureSize.set(512,512);tracer.rasterizeScene=false;}
function disposeModel(root){const materials=new Set(),geometries=new Set(),textures=new Set();root.traverse(o=>{if(o.isMesh){geometries.add(o.geometry);(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>{materials.add(m);Object.values(m).forEach(t=>{if(t?.isTexture)textures.add(t);});});}});textures.forEach(t=>t.dispose());materials.forEach(m=>m.dispose());geometries.forEach(g=>g.dispose());}
window.renderModel=async(kind)=>{
 const start=performance.now(),scene=new THREE.Scene();scene.environment=hdr;scene.environmentIntensity=.7;scene.environmentRotation.y=kind==='record'?2.4:.5;renderer.toneMappingExposure=kind==='record'?.6:.92;
 const built=buildPortfolioModel(kind);await texturePortfolioModel(built,kind,{assetPrefix:'/public/'});scene.add(built.root);// This WebGL tracer's coat layer is incompatible with the installed Three release.
 // The base physical material retains its metal, roughness, bump, and transmission response.
 if(tracer)built.root.traverse(o=>{if(o.isMesh)(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>{if(m.clearcoat>0)m.clearcoat=0;});});
 // Bake instanced solar cells for the offline tracer; the live viewer keeps GPU instancing.
 if(tracer){const instances=[];built.root.traverse(o=>{if(o.isInstancedMesh)instances.push(o);});for(const instance of instances){instance.updateMatrix();const group=new THREE.Group();group.matrix.copy(instance.matrix);group.matrixAutoUpdate=false;for(let i=0;i<instance.count;i++){const cell=new THREE.Mesh(instance.geometry,instance.material);instance.getMatrixAt(i,cell.matrix);cell.matrixAutoUpdate=false;group.add(cell);}instance.parent.add(group);instance.parent.remove(instance);}}
 const bounds=new THREE.Box3().setFromObject(built.root),center=bounds.getCenter(new THREE.Vector3()),radius=bounds.getSize(new THREE.Vector3()).length()/2;
 if(!Number.isFinite(radius)||radius<=0)throw new Error('Invalid model bounds: '+kind);
 const key=new THREE.RectAreaLight(0xfff4e4,2.5,4,6);key.position.set(-3,5,4).multiplyScalar(radius);key.lookAt(center);scene.add(key);
 const rim=new THREE.RectAreaLight(0xd8eaff,3,2,5);rim.position.set(3,2,-3).multiplyScalar(radius);rim.lookAt(center);scene.add(rim);
 const fill=new THREE.RectAreaLight(0xffffff,1,3,3);fill.position.set(1,1,4).multiplyScalar(radius);fill.lookAt(center);scene.add(fill);
 const camera=new THREE.PerspectiveCamera(32,1,.01,150);let direction=new THREE.Vector3(4.7,3.2,6);
 if(kind==='growlight')direction.set(4,-2.6,5.5);
 if(kind==='piano')direction.set(5,4,-6);
 if(kind==='record'||kind==='finance'||kind==='learning')direction.set(3,5,4);
 if(kind==='suit')direction.set(2.5,1.7,6);
 if(kind==='exoplanet')direction.set(1,1.2,6);
 if(kind==='rocket')direction.set(-3,2.2,5);
 camera.position.copy(center).add(direction.normalize().multiplyScalar(radius/Math.sin(16*Math.PI/180)*.94));camera.lookAt(center);camera.updateMatrixWorld();scene.updateMatrixWorld(true);
 if(tracer){tracer.setScene(scene,camera);tracer.renderSample();let iterations=0;while(tracer.samples<${samples}){tracer.renderSample();if(iterations++%4===0)await new Promise(r=>setTimeout(r,0));}tracer.renderSample();}else renderer.render(scene,camera);
 if(renderer.getContext().isContextLost())throw new Error('WebGL context lost while rendering '+kind);
 const result={data:renderer.domElement.toDataURL('image/png'),seconds:(performance.now()-start)/1000,samples:tracer?.samples??0};disposeModel(built.root);return result;
};window.ready=true;
</script></body></html>`;
const server=http.createServer(async(req,res)=>{try{const p=decodeURIComponent((req.url||'/').split('?')[0]);if(p==='/favicon.ico'){res.writeHead(204).end();return;}if(p==='/'){res.setHeader('content-type','text/html');res.end(html);return;}if(p==='/model.js'){res.setHeader('content-type','text/javascript');res.end(modelCode);return;}const file=path.resolve(root,'.'+p);if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}res.setHeader('content-type',({'.js':'text/javascript','.jpg':'image/jpeg','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml'})[path.extname(file)] || 'application/octet-stream');res.end(await fs.readFile(file));}catch{res.writeHead(404).end();}});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
let browser;
try{
 browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_EXECUTABLE || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',args:['--enable-webgl','--ignore-gpu-blocklist','--use-angle=metal']});
 for(const kind of kinds){
  const page=await browser.newPage();page.setDefaultTimeout(120000);page.on('pageerror',e=>console.error(e));page.on('console',m=>{if(m.type()==='error')console.error(m.text().slice(0,1000));});
  await page.goto(`http://127.0.0.1:${server.address().port}`);await page.waitForFunction(()=>window.ready);
  console.log('Rendering',kind);
  const result=await page.evaluate(k=>window.renderModel(k),kind);
  const bytes=Buffer.from(result.data.split(',')[1],'base64');const stats=await sharp(bytes).stats();if(stats.channels[3]?.max===0)throw new Error('Empty render: '+kind);
  const output=process.env.OUTPUT_DIR || 'public/models/previews/studio';await fs.mkdir(output,{recursive:true});
  await fs.writeFile(`${output}/${kind}.png`,bytes);await sharp(bytes).resize(768,768).webp({quality:90,alphaQuality:100,effort:6}).toFile(`${output}/${kind}.webp`);
  console.log(kind,JSON.stringify({seconds:result.seconds,samples:result.samples}));await page.close();
 }
 if(!process.env.MODELS && !process.env.OUTPUT_DIR)await publishPortfolioPreviews();
}finally{await browser?.close();server.close();}
