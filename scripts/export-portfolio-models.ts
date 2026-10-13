import { writeFile, mkdir } from 'node:fs/promises';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';
// @ts-expect-error Node executes this TypeScript source directly.
import { buildPortfolioModel } from '../app/lib/portfolioModels.ts';

class NodeFileReader {
  result: ArrayBuffer | string | null = null;
  onloadend: (() => void) | null = null;
  readAsArrayBuffer(blob: Blob) { blob.arrayBuffer().then(value => { this.result=value; this.onloadend?.(); }); }
  readAsDataURL(blob: Blob) { blob.arrayBuffer().then(value => { this.result=`data:${blob.type};base64,${Buffer.from(value).toString('base64')}`; this.onloadend?.(); }); }
}
Object.assign(globalThis, { FileReader: NodeFileReader });
await mkdir('public/models', { recursive: true });
for (const kind of ['satellite','habitat','gimbal','cubesat'] as const) {
  const {root}=buildPortfolioModel(kind);
  const data=await new GLTFExporter().parseAsync(root,{binary:true,onlyVisible:true});
  await writeFile(`public/models/${kind}.glb`,Buffer.from(data as ArrayBuffer));
  console.log(`${kind}.glb: ${(data as ArrayBuffer).byteLength} bytes`);
}
