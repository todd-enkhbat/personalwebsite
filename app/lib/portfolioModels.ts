import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

export type ModelKind = 'satellite' | 'habitat' | 'gimbal' | 'cubesat' | 'exoplanet' | 'balloon' | 'growlight' | 'camp' | 'telescope' | 'suit' | 'record' | 'rocket' | 'piano' | 'retail' | 'finance' | 'learning';
export type ModelPart = { name: string; group: THREE.Group; offset: THREE.Vector3 };
export type BuiltModel = { root: THREE.Group; parts: ModelPart[] };

// Fine, deterministic surface structure catches studio reflections without large texture downloads.
function surfaceGrain(style: 'metal' | 'foil' | 'fabric' | 'paper' | 'planet', color = '#ffffff') {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas'); canvas.width = canvas.height = 256;
  const ctx = canvas.getContext('2d')!;
  const image = ctx.createImageData(256,256); const tint = new THREE.Color(color);
  let seed = 731;
  for(let y=0;y<256;y++)for(let x=0;x<256;x++) {
    seed=(seed*1664525+1013904223)>>>0;const noise=seed/4294967295;
    let f=.5;
    if(style==='metal')f=.48+noise*.1+Math.sin(y*1.6)*.04;
    if(style==='foil')f=.5+Math.sin(x*.13+Math.sin(y*.09)*3)*.2+Math.cos(y*.2+x*.04)*.15+noise*.08;
    if(style==='fabric')f=.45+((x%4===0||y%4===0)? .22:0)+noise*.1;
    if(style==='paper')f=.75+noise*.2;
    if(style==='planet')f=.5+Math.sin(y*.21+Math.sin(x*.035)*1.7)*.2+Math.sin(y*.065+x*.015)*.18+noise*.08;
    const i=(y*256+x)*4;image.data[i]=Math.min(255,f*255*tint.r);image.data[i+1]=Math.min(255,f*255*tint.g);image.data[i+2]=Math.min(255,f*255*tint.b);image.data[i+3]=255;
  }
  ctx.putImageData(image,0,0);const texture=new THREE.CanvasTexture(canvas);texture.wrapS=texture.wrapT=THREE.RepeatWrapping;texture.repeat.set(style==='fabric'?8:2,style==='metal'?4:2);texture.anisotropy=4;return texture;
}
const alloy = () => new THREE.MeshPhysicalMaterial({name:'Satin machined aluminum',color:'#bfc8cc',metalness:1,roughness:.27,bumpMap:surfaceGrain('metal'),bumpScale:.006,clearcoat:.15,clearcoatRoughness:.3});
const dark = () => new THREE.MeshPhysicalMaterial({name:'Anodized graphite',color:'#1c252a',metalness:.72,roughness:.3,bumpMap:surfaceGrain('metal'),bumpScale:.004});
const ivory = () => new THREE.MeshPhysicalMaterial({name:'Ceramic white',color:'#e6e5de',metalness:.08,roughness:.28,clearcoat:.35,side:THREE.DoubleSide});
const gold = () => new THREE.MeshPhysicalMaterial({name:'Gold thermal blanket',color:'#d5a64b',metalness:1,roughness:.24,bumpMap:surfaceGrain('foil'),bumpScale:.035});
const blue = () => new THREE.MeshPhysicalMaterial({name:'Photovoltaic glass',color:'#081b30',metalness:.12,roughness:.34,clearcoat:1,clearcoatRoughness:.08});

function mesh(geometry: THREE.BufferGeometry, material: THREE.Material, position: number[] = [0,0,0]) {
  const item = new THREE.Mesh(geometry, material);
  item.position.set(position[0],position[1],position[2]);
  item.castShadow = true; item.receiveShadow = true;
  return item;
}
function box(parent: THREE.Group, size: number[], position: number[], material: THREE.Material) {
  const item=mesh(new RoundedBoxGeometry(size[0],size[1],size[2],2,Math.min(...size)*.12),material,position); parent.add(item); return item;
}
function cylinder(parent: THREE.Group, radius: number, height: number, position: number[], material: THREE.Material, segments=48) {
  const item=mesh(new THREE.CylinderGeometry(radius,radius,height,segments),material,position);parent.add(item);return item;
}
function beam(parent: THREE.Group, a: THREE.Vector3, b: THREE.Vector3, r: number, material: THREE.Material) {
  const direction=new THREE.Vector3().subVectors(b,a);
  const item=mesh(new THREE.CylinderGeometry(r,r,direction.length(),10),material);
  item.position.copy(a).add(b).multiplyScalar(.5);
  item.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),direction.normalize());parent.add(item);return item;
}
function ring(parent: THREE.Group, radius:number, tube:number, y:number, material:THREE.Material) {
  const item=mesh(new THREE.TorusGeometry(radius,tube,10,96),material,[0,y,0]);item.rotation.x=Math.PI/2;parent.add(item);return item;
}
function solarPanel(width:number, depth:number) {
  const group=new THREE.Group(); const frame=alloy(); const cell=blue();
  box(group,[width,.055,depth],[0,0,0],frame);
  const cols=Math.round(width/.15), rows=Math.round(depth/.2);
  const w=(width-.08)/cols, d=(depth-.08)/rows;
  const geometry=new THREE.BoxGeometry(w-.012,.009,d-.012);
  const cells=new THREE.InstancedMesh(geometry,cell,cols*rows);
  const matrix=new THREE.Matrix4(); let n=0;
  for(let x=0;x<cols;x++)for(let z=0;z<rows;z++){
    matrix.makeTranslation(-width/2+.04+w*(x+.5),.032,-depth/2+.04+d*(z+.5));cells.setMatrixAt(n++,matrix);
  }
  cells.castShadow=true;group.add(cells);
  for(let z=-depth/2+.13;z<depth/2;z+=.2) box(group,[width-.06,.008,.003],[0,.041,z],frame);
  const silver=new THREE.MeshStandardMaterial({color:'#b9c6d4',metalness:1,roughness:.2});
  for(let x=-width/2+.12;x<width/2;x+=.15)for(const d of [-.025,.025])box(group,[.002,.002,depth-.09],[x+d,.04,0],silver);
  for(const x of [-width/2+.035,width/2-.035])for(const z of [-depth/2+.035,depth/2-.035])cylinder(group,.015,.01,[x,.033,z],silver,12);
  return group;
}
function part(root:THREE.Group,parts:ModelPart[],name:string,offset:number[]) {
  const group=new THREE.Group();group.name=name;root.add(group);
  parts.push({name,group,offset:new THREE.Vector3(...offset as [number,number,number])});return group;
}
function reflector(radius=1.45) {
  const dish=new THREE.Group();const metal=alloy(), skin=new THREE.MeshPhysicalMaterial({color:'#c6ced0',metalness:1,roughness:.22,side:THREE.DoubleSide});
  const points:THREE.Vector2[]=[];
  for(let i=0;i<=40;i++){const r=radius*i/40;points.push(new THREE.Vector2(r,.42*(r/radius)**2));}
  dish.add(mesh(new THREE.LatheGeometry(points,96),skin));
  ring(dish,radius,.022,.42,metal);
  for(let n=0;n<18;n++){
    const angle=n*Math.PI*2/18;const nodes=[];
    for(let j=1;j<=12;j++){const r=radius*j/12;nodes.push(new THREE.Vector3(Math.cos(angle)*r,.42*(r/radius)**2-.045,Math.sin(angle)*r));}
    dish.add(mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(nodes),24,.012,6,false),metal));
  }
  cylinder(dish,.19,.17,[0,-.1,0],metal);
  const receiver=mesh(new THREE.CylinderGeometry(.1,.15,.2,32),dark(),[0,.08,0]);dish.add(receiver);
  for(let n=0;n<3;n++){
    const a=n*Math.PI*2/3;
    beam(dish,new THREE.Vector3(Math.cos(a)*radius*.95,.4,Math.sin(a)*radius*.95),new THREE.Vector3(0,1.0,0),.016,metal);
  }
  cylinder(dish,.18,.045,[0,1.02,0],skin);
  cylinder(dish,.055,.08,[0,.98,0],dark());
  return dish;
}

function satellite():BuiltModel {
  const root=new THREE.Group(),parts:ModelPart[]=[];const metal=alloy(),black=dark(),blanket=gold();
  const body=part(root,parts,'Spacecraft bus',[0,-.6,0]);
  box(body,[1.2,1.35,1.12],[0,-.48,0],blanket);
  box(body,[1.28,.08,1.2],[0,.22,0],metal); box(body,[1.28,.08,1.2],[0,-1.17,0],metal);
  for(const x of [-.6,.6])for(const z of [-.56,.56])box(body,[.055,1.38,.055],[x,-.48,z],metal);
  for(let z=-.44;z<=.44;z+=.11)box(body,[.025,1.05,.035],[.622,-.45,z],black);
  for(let y=-.92;y<.1;y+=.12)box(body,[1.05,.013,.02],[0,y,.576],metal);
  const optical=mesh(new THREE.CylinderGeometry(.14,.18,.25,32),black,[0,-.8,.67]);optical.rotation.x=Math.PI/2;body.add(optical);
  const lens=mesh(new THREE.CircleGeometry(.115,32),new THREE.MeshStandardMaterial({color:'#264154',metalness:.9,roughness:.05}),[0,-.8,.805]);body.add(lens);
  const dish=part(root,parts,'Radio reflector',[0,1.3,0]);
  const reflecting=reflector(1.25);reflecting.position.y=.52;dish.add(reflecting);
  for(let i=0;i<4;i++){const a=i*Math.PI/2+Math.PI/4;beam(dish,new THREE.Vector3(Math.cos(a)*.52,.2,Math.sin(a)*.52),new THREE.Vector3(0,.5,0),.025,metal);}
  for(const side of [-1,1]){
    const wing=part(root,parts,side<0?'Port solar array':'Starboard solar array',[side*1.35,0,0]);
    beam(wing,new THREE.Vector3(side*.6,-.3,0),new THREE.Vector3(side*1.05,-.3,0),.06,metal);
    for(let j=0;j<3;j++){
      const panel=solarPanel(.82,1.3);panel.position.set(side*(1.14+j*.88),-.3,0);wing.add(panel);
      box(wing,[.08,.06,1.2],[side*(.71+j*.88),-.32,0],black);
    }
  }
  return {root,parts};
}
function habitat():BuiltModel {
  const root=new THREE.Group(),parts:ModelPart[]=[];const metal=alloy();
  const floor=part(root,parts,'Foundation & airlock',[0,-.45,0]);
  const ground=new THREE.MeshStandardMaterial({color:'#895035',roughness:1});
  cylinder(floor,3.1,.12,[0,-.11,0],ground,96);
  cylinder(floor,2.42,.12,[0,.015,0],ivory(),96);
  ring(floor,2.4,.045,.085,metal);
  const airlock=mesh(new THREE.CylinderGeometry(.38,.38,1.16,32),ivory(),[0,.36,2.55]);airlock.rotation.x=Math.PI/2;floor.add(airlock);
  const door=mesh(new THREE.CircleGeometry(.29,32),dark(),[0,.36,3.135]);floor.add(door);
  box(floor,[.66,.045,.8],[0,.04,3.38],metal);
  const shell=part(root,parts,'AERODOME shell',[0,1.3,0]);
  const geometry=new THREE.IcosahedronGeometry(2.4,2);const positions=geometry.getAttribute('position');
  const skin=new THREE.MeshPhysicalMaterial({color:'#d0d6d1',metalness:.12,roughness:.35,transparent:true,opacity:.27,side:THREE.DoubleSide,depthWrite:false});
  const edges=new Map<string,[THREE.Vector3,THREE.Vector3]>();
  const shellVertices: number[] = [];
  for(let i=0;i<positions.count;i+=3){
    const vs=[0,1,2].map(j=>new THREE.Vector3().fromBufferAttribute(positions,i+j));
    if(vs.some(v=>v.y<-.02))continue;
    vs.forEach(v=>v.y=v.y*.69+.08);
    const center=vs[0].clone().add(vs[1]).add(vs[2]).multiplyScalar(1/3);
    if(center.z>1.95&&Math.abs(center.x)<.43&&center.y<.7)continue;
    vs.forEach(v => shellVertices.push(v.x, v.y, v.z));
    for(let j=0;j<3;j++){
      const a=vs[j],b=vs[(j+1)%3];const key=[a.toArray().map(v=>v.toFixed(3)).join(','),b.toArray().map(v=>v.toFixed(3)).join(',')].sort().join('|');edges.set(key,[a,b]);
    }
  }
  const membrane=new THREE.BufferGeometry();membrane.setAttribute('position',new THREE.Float32BufferAttribute(shellVertices,3));membrane.computeVertexNormals();shell.add(mesh(membrane,skin));
  edges.forEach(([a,b])=>beam(shell,a,b,.018,metal));
  const rooms=part(root,parts,'Printed habitat modules',[0,.25,0]);
  const wall=new THREE.MeshStandardMaterial({color:'#c5b7a0',roughness:.83});
  for(const [x,z,r] of [[-.95,-.55,.66],[.9,-.65,.64],[.92,.7,.53],[-.9,.75,.5]]){
    cylinder(rooms,r,.42,[x,.31,z],wall);
    for(let y=.13;y<.55;y+=.035){const seam=ring(rooms,r,.008,y,ivory());seam.position.x=x;seam.position.z=z;}
  }
  box(rooms,[.65,.18,.7],[0,.18,-.1],ivory());
  const power=part(root,parts,'Surface power',[1.25,0,0]);
  const panel=solarPanel(1.4,.75);panel.rotation.z=-.14;panel.position.set(2.9,.16,-.8);power.add(panel);
  box(power,[.35,.4,.4],[2.6,.12,.65],ivory());
  return {root,parts};
}
function gimbal():BuiltModel {
  const root=new THREE.Group(),parts:ModelPart[]=[];const metal=alloy(),black=dark();
  const base=part(root,parts,'Motor base',[0,-.7,0]);
  cylinder(base,1.05,.13,[0,-.65,0],black);ring(base,1,.025,-.57,metal);
  cylinder(base,.36,.2,[0,-.5,0],metal);
  const links=part(root,parts,'Three parallel arms',[0,.25,0]);
  for(let i=0;i<3;i++){
    const a=i*Math.PI*2/3;const x=Math.cos(a),z=Math.sin(a);
    const motor=box(base,[.38,.38,.38],[x*.7,-.38,z*.7],black);motor.rotation.y=-a;
    const p1=new THREE.Vector3(x*.85,-.3,z*.85),p2=new THREE.Vector3(x*1.02,.32,z*1.02),p3=new THREE.Vector3(x*.75,.95,z*.75);
    for(const offset of [-.045,.045]){
      const shift=new THREE.Vector3(-z*offset,0,x*offset);beam(links,p1.clone().add(shift),p2.clone().add(shift),.035,metal);beam(links,p2.clone().add(shift),p3.clone().add(shift),.029,metal);
    }
    [p1,p2,p3].forEach(p=>links.add(mesh(new THREE.SphereGeometry(.065,16,12),black,p.toArray())));
  }
  const platform=part(root,parts,'Pointing platform',[0,1,0]);
  cylinder(platform,.88,.08,[0,.99,0],black,6);
  const panel=solarPanel(2.05,1.5);panel.position.y=1.07;platform.add(panel);
  for(const x of [-.8,.8])for(const z of [-.55,.55])cylinder(platform,.045,.055,[x,1.13,z],metal,12);
  return {root,parts};
}
function cubesat():BuiltModel {
  const root=new THREE.Group(),parts:ModelPart[]=[];const metal=alloy(),black=dark();
  const bus=part(root,parts,'CubeSat structure',[0,-.45,0]);
  box(bus,[1.05,1.05,1.05],[0,0,0],black);
  for(const x of [-.54,.54])for(const z of [-.54,.54])box(bus,[.055,1.18,.055],[x,0,z],metal);
  for(const y of [-.54,.54])for(const z of [-.54,.54])box(bus,[1.12,.055,.055],[0,y,z],metal);
  for(const y of [-.54,.54])for(const x of [-.54,.54])box(bus,[.055,.055,1.12],[x,y,0],metal);
  const antenna=part(root,parts,'Antenna system',[0,.65,0]);
  for(const x of [-.4,.4])beam(antenna,new THREE.Vector3(x,.5,-.4),new THREE.Vector3(x,2.05,-.4),.012,gold());
  const panel=part(root,parts,'Solar panels',[1.1,0,0]);
  for(const z of [-.55,.55]){
    const p=solarPanel(.91,.91);p.rotation.x=z>0?Math.PI/2:-Math.PI/2;p.position.z=z;panel.add(p);
  }
  const side=solarPanel(.91,.91);side.rotation.z=Math.PI/2;side.position.x=.55;panel.add(side);
  for(const z of [-.35,.35])for(const y of [-.35,.35]){
    const fastener=mesh(new THREE.CylinderGeometry(.025,.025,.025,12),metal,[-.535,y,z]);fastener.rotation.z=Math.PI/2;bus.add(fastener);
  }
  return {root,parts};
}
export function buildPortfolioModel(kind:ModelKind):BuiltModel {
  const model=kind==='habitat'?habitat():kind==='gimbal'?gimbal():kind==='cubesat'?cubesat():kind==='satellite'?satellite():artifact(kind);
  model.parts=model.parts.filter(part => part.group.children.length > 0);
  refineHardware(model,kind);
  model.root.name=kind;model.root.userData={description:'Interactive reconstruction for the portfolio, based on project images and published design parameters.'};
  return model;
}

// All geometry remains illustrative: materials and manufacturing detail improve legibility,
// rather than imply flight readiness or measured project dimensions.
function cable(parent:THREE.Group, points:number[][], radius:number, material:THREE.Material) {
  return parent.add(mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p as [number,number,number]))),40,radius,8,false),material));
}
function faceLabel(parent:THREE.Group, text:string, width:number, height:number, position:number[], rotation:number[]=[0,0,0], background='#e5e5dd', ink='#293237') {
  if(typeof document==='undefined')return;
  const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=Math.round(1024*height/width);const c=canvas.getContext('2d')!;
  c.fillStyle=background;c.fillRect(0,0,canvas.width,canvas.height);c.fillStyle=ink;c.font=`500 ${Math.round(canvas.height*.24)}px monospace`;c.textAlign='center';c.textBaseline='middle';c.fillText(text,512,canvas.height*.5);
  const map=new THREE.CanvasTexture(canvas);map.colorSpace=THREE.SRGBColorSpace;
  const label=mesh(new THREE.PlaneGeometry(width,height),new THREE.MeshPhysicalMaterial({map,roughness:.5,metalness:.1}),position);label.rotation.set(rotation[0] ?? 0, rotation[1] ?? 0, rotation[2] ?? 0);parent.add(label);
}
function bolt(parent:THREE.Group,p:number[],r=.025,material:THREE.Material=alloy()) {const b=cylinder(parent,r,.025,p,material,6);box(parent,[r*.9,.002,.003],[p[0],p[1]+.013,p[2]],dark());return b;}

function refineHardware(model:BuiltModel,kind:ModelKind) {
  const group=model.parts[0].group,metal=alloy(),black=dark();
  if(kind==='satellite'){
    faceLabel(group,'T–REX',.55,.18,[0,-.55,.582],[], '#c8ad6b');
    for(const x of [-.48,.48])for(const y of [-1.05,.08]){const b=bolt(group,[x,y,.59],.028,metal);b.rotation.x=Math.PI/2;}
    cable(group,[[.58,-1,.4],[.75,-.75,.5],[.72,-.1,.4],[.4,.2,.1]],.018,black);
    for(const x of [-.58,.58])box(group,[.018,.92,.015],[x,-.5,.586],black);
  }
  if(kind==='cubesat'){
    for(const y of [-.54,.54])for(const x of [-.54,.54])for(const z of [-.54,.54])bolt(group,[x,y,z],.028,metal);
    box(group,[.76,.7,.025],[0,0,-.55],new THREE.MeshStandardMaterial({color:'#86662d',metalness:.9,roughness:.35}));
    faceLabel(group,'ONDO',.48,.15,[0,.13,-.568],[0,Math.PI,0],'#cfb478');
    for(let i=0;i<4;i++)box(group,[.6,.01,.04],[0,-.18+i*.08,-.574],black);
  }
  if(kind==='gimbal'){
    for(let i=0;i<3;i++){const a=i*Math.PI*2/3,x=Math.cos(a),z=Math.sin(a);
      for(let j=0;j<6;j++)box(group,[.32,.018,.32],[x*.7,-.54+j*.042,z*.7],metal);
      for(const t of [-.12,.12])bolt(group,[x*.7+t,-.18,z*.7],.026);
      cable(group,[[x*.7,-.55,z*.7],[x*1.15,-.7,z*1.15],[.2,-.73,.2]],.012,new THREE.MeshStandardMaterial({color:i===0?'#a2402d':'#22292d'}));
    }
  }
  if(kind==='habitat'){
    faceLabel(group,'ARES',.32,.14,[0,.37,3.14],[], '#d2d5d0');
    for(let i=0;i<7;i++)box(group,[.66,.012,.015],[0,.07,3.04+i*.09],metal);
    const terrain=group.children[0] as THREE.Mesh;const geo=new THREE.CylinderGeometry(3.1,3.16,.12,96,1);terrain.geometry.dispose();terrain.geometry=geo;
    const rockMat=new THREE.MeshStandardMaterial({color:'#87472c',roughness:1});
    for(let i=0;i<28;i++){const a=i*2.399,r=2.65+(i%4)*.1;const rock=mesh(new THREE.DodecahedronGeometry(.035+(i%5)*.017),rockMat,[Math.cos(a)*r,.015,Math.sin(a)*r]);rock.scale.y=.45;rock.rotation.set(i,i*.7,0);group.add(rock);}
  }
}

function artifact(kind:ModelKind):BuiltModel {
  const root=new THREE.Group(),parts:ModelPart[]=[];
  const body=part(root,parts,'Main assembly',[0,.45,0]);
  const metal=alloy(),black=dark(),white=ivory(),brass=gold();
  const V=(x:number,y:number,z:number)=>new THREE.Vector3(x,y,z);
  const sphere=(r:number,p:number[],m:THREE.Material)=>{const s=mesh(new THREE.SphereGeometry(r,80,48),m,p);body.add(s);return s;};
  if(kind==='exoplanet'){
    const map=surfaceGrain('planet');if(map){map.repeat.set(1,1);map.colorSpace=THREE.SRGBColorSpace;}
    const planet=sphere(.86,[0,0,0],new THREE.MeshPhysicalMaterial({color:'#477284',roughness:.78,map,bumpMap:map,bumpScale:.025}));planet.rotation.z=-.18;
    const atmosphere=sphere(.877,[0,0,0],new THREE.MeshPhysicalMaterial({color:'#74bfd5',transparent:true,opacity:.13,roughness:.1,side:THREE.BackSide}));atmosphere.scale.setScalar(1.01);
    sphere(.23,[1.6,.22,.1],new THREE.MeshStandardMaterial({color:'#a09b8d',roughness:1,bumpMap:surfaceGrain('foil'),bumpScale:.025}));
    const orbit=ring(body,1.62,.007,.05,new THREE.MeshStandardMaterial({color:'#b6c2c4',metalness:.8,roughness:.35}));orbit.rotation.z=.15;
    const star=sphere(.35,[-1.9,.25,-.6],new THREE.MeshStandardMaterial({color:'#ffd09a',emissive:'#ec7e20',emissiveIntensity:1.4,roughness:1}));star.name='Host star';
  }else if(kind==='balloon'){
    const silk=new THREE.MeshPhysicalMaterial({color:'#e9e4d3',roughness:.42,metalness:0,side:THREE.DoubleSide,transparent:true,opacity:.91,bumpMap:surfaceGrain('fabric'),bumpScale:.002});
    const envelope=sphere(.88,[0,1.4,0],silk);envelope.scale.y=1.19;
    for(let i=0;i<20;i++){const a=i*Math.PI/10;const pts=[];for(let j=0;j<=40;j++){const t=.04+(Math.PI-.08)*j/40;pts.push([Math.sin(t)*Math.cos(a)*.884,1.4+Math.cos(t)*1.052,Math.sin(t)*Math.sin(a)*.884]);}cable(body,pts,.003,white);}
    cylinder(body,.05,.22,[0,.28,0],white);
    const chute=part(root,parts,'Recovery parachute',[0,.1,0]);const fabric=new THREE.MeshStandardMaterial({color:'#be4d2c',roughness:.94,side:THREE.DoubleSide});
    chute.add(mesh(new THREE.SphereGeometry(.36,40,20,0,Math.PI*2,0,Math.PI/2),fabric,[0,-.25,0]));
    const payload=part(root,parts,'Instrument payload',[0,-.7,0]);box(payload,[.5,.36,.44],[0,-1.17,0],white);box(payload,[.53,.035,.47],[0,-.97,0],brass);
    for(const x of [-.21,.21])for(const z of [-.18,.18]){cable(body,[[0,.15,0],[x*.7,-.55,z*.7],[x,-.97,z]],.005,white);bolt(payload,[x,-.94,z],.013);}
    faceLabel(payload,'ISBS',.23,.1,[0,-1.16,.225]);
    const lens=mesh(new THREE.CylinderGeometry(.055,.07,.07,32),black,[0,-1.24,.25]);lens.rotation.x=Math.PI/2;payload.add(lens);
    cylinder(payload,.008,.55,[.18,-.75,0],metal);box(payload,[.07,.06,.15],[.12,-1.15,.26],black);
  }else if(kind==='growlight'){
    const light=part(root,parts,'LED fixture',[0,.6,0]);
    box(light,[2.65,.12,1.02],[0,.35,0],metal);
    for(let i=0;i<27;i++)box(light,[.025,.16,1.01],[-1.27+i*.098,.47,0],metal);
    for(const z of [-.35,0,.35]){box(light,[2.48,.035,.2],[0,.265,z],white);for(let i=0;i<28;i++){const x=-1.17+i*.086;box(light,[.044,.012,.073],[x,.237,z],new THREE.MeshPhysicalMaterial({color:'#e0b84b',emissive:'#ffd99a',emissiveIntensity:.25,metalness:.4,roughness:.26}));}}
    box(light,[.63,.23,.72],[.87,.6,0],black);faceLabel(light,'THRIVE',.4,.11,[.88,.722,0],[-Math.PI/2,0,0],'#263137','#dddccf');
    for(const x of [-1.18,1.18])for(const z of [-.42,.42])bolt(light,[x,.43,z],.021);
    for(const x of [-1,1]){ring(light,.045,.009,.62,metal).position.x=x;cable(light,[[x,.62,0],[x,.95,0],[x*.7,1.25,0]],.007,metal);}
    cable(light,[[1.22,.6,.1],[1.5,.5,.1],[1.5,.22,.2],[1.33,.2,.4]],.022,black);
    const tray=part(root,parts,'Seedling tray',[0,-.4,0]);box(tray,[1.6,.12,.8],[0,-.6,0],black);
    const soil=new THREE.MeshStandardMaterial({color:'#332b20',roughness:1,bumpMap:surfaceGrain('foil'),bumpScale:.02});
    for(const x of [-.5,0,.5]){cylinder(tray,.18,.12,[x,-.5,0],soil);beam(tray,V(x,-.45,0),V(x,-.12,0),.012,new THREE.MeshStandardMaterial({color:'#456838'}));
      for(let i=0;i<4;i++){const shape=new THREE.Shape();shape.moveTo(0,0);shape.bezierCurveTo(.18,.04,.24,.2,0,.32);shape.bezierCurveTo(-.15,.2,-.12,.04,0,0);const geo=new THREE.ShapeGeometry(shape,12);const leaf=mesh(geo,new THREE.MeshPhysicalMaterial({color:i%2?'#36572c':'#5c7634',roughness:.6,side:THREE.DoubleSide}),[x,-.3+i*.035,0]);leaf.rotation.set(-.6,i*Math.PI/2,.5);tray.add(leaf);}}
  }else if(kind==='camp'){
    const fabric=new THREE.MeshPhysicalMaterial({color:'#b8a27a',roughness:.88,side:THREE.DoubleSide,bumpMap:surfaceGrain('fabric'),bumpScale:.008});
    box(body,[1.65,.035,2.15],[0,-.04,0],black);
    // A real A-frame profile, with a recessed open doorway and curved, tensioned cloth.
    const positions:number[]=[];const uv:number[]=[];
    for(const side of [-1,1])for(let j=0;j<24;j++){const z1=-1+j/12,z2=z1+1/12;const coords=[[0,1.2,z1],[side*.8,0,z1],[side*.8,0,z2],[0,1.2,z1],[side*.8,0,z2],[0,1.2,z2]];coords.forEach((p,k)=>{positions.push(...p);uv.push(k%2,j/24);});}
    const roof=new THREE.BufferGeometry();roof.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));roof.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));roof.computeVertexNormals();body.add(mesh(roof,fabric));
    for(const z of [-1,1]){beam(body,V(-.8,0,z),V(0,1.2,z),.012,metal);beam(body,V(.8,0,z),V(0,1.2,z),.012,metal);}
    const entrance=new THREE.Shape();entrance.moveTo(-.79,0);entrance.lineTo(0,1.18);entrance.lineTo(.79,0);entrance.lineTo(.54,0);entrance.lineTo(0,.94);entrance.lineTo(-.54,0);entrance.closePath();body.add(mesh(new THREE.ShapeGeometry(entrance),fabric,[0,0,1]));
    box(body,[1.1,.045,1.5],[0,.025,-.12],new THREE.MeshStandardMaterial({color:'#576069',roughness:.9}));
    for(const x of [-.8,.8])for(const z of [-.9,.9]){cable(body,[[x,.05,z],[x*1.6,-.04,z*1.25]],.004,white);beam(body,V(x*1.6,-.06,z*1.25),V(x*1.6+.03,.02,z*1.25),.014,metal);}
    const lantern=cylinder(body,.09,.18,[1.12,.05,.65],brass);lantern.name='Camp lantern';cylinder(body,.065,.13,[1.12,.17,.65],new THREE.MeshPhysicalMaterial({color:'#e9c88a',emissive:'#c27e25',emissiveIntensity:.6,roughness:.2}));ring(body,.07,.009,.32,black).position.set(1.12,.32,.65);
  }else if(kind==='telescope'){
    const mount=part(root,parts,'Equatorial mount',[0,-.5,0]);
    for(let i=0;i<3;i++){const a=i*Math.PI*2/3;beam(mount,V(Math.cos(a)*.8,-.85,Math.sin(a)*.8),V(0,-.05,0),.055,metal);cylinder(mount,.08,.08,[Math.cos(a)*.8,-.87,Math.sin(a)*.8],black);}
    cylinder(mount,.12,.55,[0,-.2,0],metal);box(mount,[.4,.3,.32],[0,.12,0],black);
    const tube=part(root,parts,'Optical tube',[0,.6,0]);const optical=new THREE.Group();optical.rotation.z=.7;optical.position.y=.62;tube.add(optical);
    cylinder(optical,.31,1.55,[0,0,0],white);cylinder(optical,.34,.24,[0,.78,0],black);cylinder(optical,.285,.02,[0,.91,0],new THREE.MeshPhysicalMaterial({color:'#153e52',metalness:.75,roughness:.06,clearcoat:1,iridescence:.3}));
    for(const y of [-.4,.3]){ring(optical,.318,.025,y,metal);for(const a of [0,Math.PI])bolt(optical,[Math.cos(a)*.32,y,0],.021);}
    box(optical,[.16,1.1,.06],[0,-.05,-.31],black);cylinder(optical,.16,.19,[0,-.87,0],black);cylinder(optical,.08,.13,[0,-1.01,0],metal);
    const finder=mesh(new THREE.CylinderGeometry(.065,.065,.62,32),black,[.36,.15,0]);optical.add(finder);beam(optical,V(.28,.1,0),V(.36,.1,0),.035,metal);
    faceLabel(optical,'OBSERVATORY',.38,.085,[0,.02,.314]);
    cable(tube,[[.05,-.1,-.3],[.6,.1,-.5],[.5,-.5,-.4],[.1,-.6,0]],.012,black);
  }else if(kind==='suit'){
    const textile=new THREE.MeshPhysicalMaterial({color:'#dedfd8',roughness:.9,bumpMap:surfaceGrain('fabric'),bumpScale:.006});
    box(body,[.88,.72,.58],[0,-.4,-.21],textile);box(body,[.66,.68,.28],[0,-.42,-.57],white);
    const helmet=sphere(.66,[0,.57,0],white);helmet.scale.y=1.08;
    // A curved visor segment sits flush with the helmet, rather than an intersecting sphere.
    const visor=mesh(new THREE.SphereGeometry(.677,80,48,-Math.PI*.34,Math.PI*.68,Math.PI*.24,Math.PI*.48),new THREE.MeshPhysicalMaterial({color:'#b47e28',metalness:1,roughness:.09,clearcoat:1}));visor.rotation.y=Math.PI/2;visor.position.y=.57;body.add(visor);
    ring(body,.52,.065,.01,metal);ring(body,.5,.035,-.08,black);
    for(const x of [-.51,.51]){const hinge=mesh(new THREE.CylinderGeometry(.13,.13,.09,32),metal,[x,.57,0]);hinge.rotation.z=Math.PI/2;body.add(hinge);}
    box(body,[.47,.2,.055],[0,-.32,.11],black);faceLabel(body,'MARS–V',.38,.12,[0,-.3,.142],[],'#243137','#e3e4dc');
    for(const x of [-.27,.27]){const port=mesh(new THREE.CylinderGeometry(.065,.065,.11,32),metal,[x,-.55,.13]);port.rotation.x=Math.PI/2;body.add(port);cable(body,[[x,-.55,.2],[x*1.6,-.65,.3],[x*1.8,-.3,-.2],[x*.7,-.1,-.61]],.024,brass);}
    for(let y=-.62;y<-.1;y+=.095)box(body,[.52,.014,.012],[0,y,-.72],metal);
    for(const x of [-.28,.28])box(body,[.07,.7,.025],[x,-.37,.09],new THREE.MeshStandardMaterial({color:'#9d4a2e',roughness:.9}));
  }else if(kind==='record'){
    const cleanGold=new THREE.MeshPhysicalMaterial({color:'#d3a445',metalness:1,roughness:.22,bumpMap:surfaceGrain('metal'),bumpScale:.002});
    cylinder(body,1.15,.045,[0,0,0],cleanGold,192);ring(body,1.14,.009,.025,cleanGold);
    for(let r=.38;r<1.1;r+=.012)ring(body,r,.0015,.024,new THREE.MeshStandardMaterial({color:'#b78c38',metalness:1,roughness:.32}));
    cylinder(body,.32,.009,[0,.028,0],new THREE.MeshPhysicalMaterial({color:'#c8a149',metalness:1,roughness:.4}));cylinder(body,.025,.012,[0,.035,0],black);
    faceLabel(body,'NOMOS',.45,.13,[0,.036,-.1],[-Math.PI/2,0,0],'#c8a149','#3a3627');
    for(let i=0;i<12;i++){const a=i*Math.PI/6;beam(body,V(Math.cos(a)*.075,.037,Math.sin(a)*.075+.1),V(Math.cos(a)*(.14+(i%3)*.02),.037,Math.sin(a)*(.14+(i%3)*.02)+.1),.002,black);}
  }else if(kind==='rocket'){
    const angle=Math.PI*1.65;const liner=new THREE.MeshStandardMaterial({color:'#7c4e30',roughness:.92,bumpMap:surfaceGrain('foil'),bumpScale:.008,side:THREE.DoubleSide});
    body.add(mesh(new THREE.CylinderGeometry(.46,.46,1.9,96,1,true,0,angle),metal));body.add(mesh(new THREE.CylinderGeometry(.38,.38,1.9,96,1,true,0,angle),liner));
    for(const y of [-.98,.98]){ring(body,.44,.06,y,metal);for(let i=0;i<12;i++){const a=i*Math.PI/6;bolt(body,[Math.cos(a)*.45,y+.04,Math.sin(a)*.45],.025);}}
    for(let y=-.85;y<.9;y+=.065){const seam=ring(body,.386,.003,y,liner);seam.geometry.dispose();seam.geometry=new THREE.TorusGeometry(.386,.003,6,90,angle);}
    const nozzlePoints=[new THREE.Vector2(.3,-1.55),new THREE.Vector2(.24,-1.4),new THREE.Vector2(.14,-1.18),new THREE.Vector2(.2,-.98)];body.add(mesh(new THREE.LatheGeometry(nozzlePoints,80),black));
    for(let y=-.65;y<.8;y+=.4){const fitting=mesh(new THREE.CylinderGeometry(.04,.04,.12,16),brass,[.46,y,0]);fitting.rotation.z=Math.PI/2;body.add(fitting);cable(body,[[.52,y,0],[.7,y+.04,0],[.78,y+.1,.2]],.006,black);}
  }else if(kind==='piano'){
    const lacquer=new THREE.MeshPhysicalMaterial({color:'#11191e',metalness:.1,roughness:.16,clearcoat:1,clearcoatRoughness:.06});
    const soundboard=new THREE.MeshStandardMaterial({color:'#a57c44',roughness:.52,bumpMap:surfaceGrain('metal'),bumpScale:.002});
    const shape=new THREE.Shape();shape.moveTo(-.8,-.75);shape.lineTo(.8,-.75);shape.lineTo(.8,.7);shape.bezierCurveTo(.8,1.5,-.35,1.55,-.62,.55);shape.lineTo(-.8,-.75);
    const geometry=new THREE.ExtrudeGeometry(shape,{depth:.19,bevelEnabled:true,bevelThickness:.018,bevelSize:.018,bevelSegments:4,curveSegments:32});geometry.rotateX(Math.PI/2);
    body.add(mesh(geometry,lacquer,[0,.45,0]));const board=mesh(new THREE.ShapeGeometry(shape,32),soundboard,[0,.455,0]);board.rotation.x=Math.PI/2;(board.material as THREE.MeshStandardMaterial).side=THREE.DoubleSide;board.scale.set(.95,.95,.95);body.add(board);
    // Lid pivots at its long hinge. Its raised edge exposes the soundboard and strings.
    const lid=part(root,parts,'Raised lid',[0,.6,0]);const hinge=new THREE.Group();hinge.position.set(-.78,.48,0);hinge.rotation.z=.36;lid.add(hinge);hinge.add(mesh(geometry.clone(),lacquer,[.78,.03,0]));
    for(let i=0;i<52;i++){const x=-.774+i*.03;box(body,[.028,.035,.29],[x,.46,-.88],white);if(![2,6].includes(i%7)&&i<51)box(body,[.017,.024,.17],[x+.015,.49,-.82],black);}
    for(let i=0;i<38;i++){const x=-.56+i*.032;beam(body,V(x,.473,-.52),V(x*.7,.473,.3+(1-i/38)*.6),.0018,brass);}
    for(const z of [-.3,.05,.4])box(body,[1.1,.012,.04],[0,.47,z],brass);
    for(const [x,z] of [[-.65,-.55],[.65,-.55],[.15,1]]){const leg=mesh(new THREE.CylinderGeometry(.045,.068,.83,24),lacquer,[x,-.15,z]);body.add(leg);cylinder(body,.065,.07,[x,-.59,z],brass);}
    beam(body,V(.6,.48,.3),V(.6,1.03,.3),.016,brass);box(body,[.4,.6,.02],[0,-.05,-.45],lacquer);
    for(const x of [-.13,0,.13])box(body,[.07,.03,.2],[x,-.35,-.53],brass);
    const bench=part(root,parts,'Piano bench',[0,0,-.4]);box(bench,[.78,.11,.4],[0,-.17,-1.5],lacquer);for(const x of [-.3,.3])for(const z of [-1.64,-1.36])box(bench,[.045,.4,.045],[x,-.4,z],lacquer);
  }else if(kind==='retail'){
    const colors=['#3e6277','#bd8b40','#a54b37'];
    for(let i=0;i<3;i++){const block=new THREE.Group();block.position.set((i-1)*.58,i===1?.58:0,0);block.rotation.y=(i-1)*.22;body.add(block);const plastic=new THREE.MeshPhysicalMaterial({color:colors[i],roughness:.27,metalness:0,clearcoat:.6,clearcoatRoughness:.2});box(block,[.78,.52,.78],[0,0,0],plastic);for(const x of [-.2,.2])for(const z of [-.2,.2]){cylinder(block,.105,.075,[x,.29,z],plastic,48);ring(block,.077,.002,.329,plastic).position.set(x,.329,z);}}
  }else if(kind==='finance'||kind==='learning'){
    const book=part(root,parts,kind==='finance'?'Research folio':'Research notebook',[0,.25,0]);
    const leather=new THREE.MeshPhysicalMaterial({color:kind==='finance'?'#24363e':'#2e4f67',roughness:.56,bumpMap:surfaceGrain('fabric'),bumpScale:.003});
    box(book,[1.72,.055,2.08],[0,-.06,0],leather);
    const paper=new THREE.MeshStandardMaterial({color:'#eee9d9',roughness:.91,bumpMap:surfaceGrain('paper'),bumpScale:.001});
    for(let i=0;i<24;i++)box(book,[1.65,.005,2],[0,-.025+i*.006,0],paper);
    // Page surfaces have actual printed report / notebook layouts, rather than raised toy bars.
    if(typeof document!=='undefined'){
      const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=1280;const c=canvas.getContext('2d')!;c.fillStyle='#eee9d9';c.fillRect(0,0,1024,1280);c.fillStyle='#263c48';c.font='600 44px serif';c.fillText(kind==='finance'?'EQUITY RESEARCH':'RESEARCH NOTES',90,150);c.fillStyle='#7e887f';c.font='18px monospace';c.fillText(kind==='finance'?'COMPANY ANALYSIS / MICC':'OBSERVATIONS / IDEAS / QUESTIONS',90,195);
      if(kind==='finance'){c.strokeStyle='#a3aba7';c.lineWidth=2;for(let i=0;i<5;i++){c.beginPath();c.moveTo(100,380+i*80);c.lineTo(920,380+i*80);c.stroke();}c.strokeStyle='#486a79';c.lineWidth=7;c.beginPath();[650,600,635,490,520,410,450,335,370,270].forEach((y,i)=>i?c.lineTo(100+i*89,y):c.moveTo(100,y));c.stroke();}
      else{c.strokeStyle='#a5b8b7';c.lineWidth=1;for(let y=280;y<1050;y+=40){c.beginPath();c.moveTo(100,y);c.lineTo(920,y);c.stroke();}c.strokeStyle='#50686f';c.lineWidth=3;c.beginPath();c.ellipse(510,470,210,100,-.35,0,Math.PI*2);c.stroke();c.beginPath();c.arc(510,470,72,0,Math.PI*2);c.stroke();}
      c.fillStyle='#a2a69b';for(let i=0;i<12;i++){const y=830+i*22;c.fillRect(100,y,i%4===3?500:820,5);}const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;const page=mesh(new THREE.PlaneGeometry(1.64,1.99),new THREE.MeshStandardMaterial({map:texture,roughness:.9}),[0,.123,0]);page.rotation.x=-Math.PI/2;book.add(page);
    }
    box(book,[.035,.015,2.05],[-.78,.13,0],leather);
    const pen=part(root,parts,'Writing instrument',[.3,0,0]);const p=new THREE.Group();p.position.set(.92,.19,.1);p.rotation.x=Math.PI/2;p.rotation.z=.18;pen.add(p);cylinder(p,.025,1.25,[0,0,0],black);cylinder(p,.027,.22,[0,.5,0],brass);p.add(mesh(new THREE.ConeGeometry(.025,.13,32),brass,[0,-.69,0]));box(p,[.008,.23,.012],[.027,.42,0],brass);
    if(kind==='learning')for(let i=0;i<11;i++){const loop=ring(book,.052,.008,.12,metal);loop.rotation.x=0;loop.rotation.y=Math.PI/2;loop.position.set(-.82,.11,-.85+i*.17);}
  }
  return {root,parts};
}

/** Load photographic surface detail on demand. Geometry and procedural materials remain a fallback. */
export async function texturePortfolioModel(model: BuiltModel, kind: ModelKind, options: { assetPrefix?: string; isCancelled?: () => boolean } = {}) {
  if (typeof document === 'undefined') return;
  const prefix = options.assetPrefix ?? '/';
  const loader = new THREE.TextureLoader();
  const owned: THREE.Texture[] = [];
  const load = async (file: string, color = false, repeat = 1) => {
    const texture = await loader.loadAsync(prefix + file);
    owned.push(texture);
    texture.colorSpace = color ? THREE.SRGBColorSpace : THREE.NoColorSpace;
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(repeat, repeat); texture.anisotropy = 4;
    return texture;
  };
  const physical = new Set<THREE.MeshStandardMaterial>();
  model.root.traverse(object => {
    if (object instanceof THREE.Mesh) (Array.isArray(object.material) ? object.material : [object.material]).forEach(material => {
      if (material instanceof THREE.MeshStandardMaterial) physical.add(material);
    });
  });
  try {
    const hasMetal = [...physical].some(material => material.metalness > .6);
    const hasFabric = ['balloon', 'camp', 'suit', 'finance', 'learning'].includes(kind);
    const [metalNormal, metalRough, clothNormal, clothRough] = await Promise.all([
      hasMetal ? load('models/textures/metal-normal-512.jpg', false, 3) : null,
      hasMetal ? load('models/textures/metal-roughness-512.jpg', false, 3) : null,
      hasFabric ? load('models/textures/fabric-normal-512.jpg', false, 6) : null,
      hasFabric ? load('models/textures/fabric-roughness-512.jpg', false, 6) : null
    ]);
    if (options.isCancelled?.()) { owned.forEach(texture => texture.dispose()); return; }
    physical.forEach(material => {
      if (material.metalness > .6 && material.roughness > .15 && material.name !== 'Photovoltaic glass') {
        material.normalMap = metalNormal; material.normalScale.set(.09, .09);
        material.roughnessMap = metalRough; material.roughness = Math.max(.32, material.roughness);
      } else if (hasFabric && material.roughness > .35 && material.metalness < .3 && !(material.map?.image instanceof HTMLCanvasElement)) {
        material.normalMap = clothNormal; material.normalScale.set(.18, .18);
        material.roughnessMap = clothRough;
      }
      material.needsUpdate = true;
    });
    if (kind === 'exoplanet') {
      const cloudMap = await load('models/textures/jupiter-clouds.jpg', true);
      if (options.isCancelled?.()) { owned.forEach(texture => texture.dispose()); return; }
      const planet = model.parts[0].group.children.find(object => object instanceof THREE.Mesh && object.geometry instanceof THREE.SphereGeometry) as THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>;
      planet.material.map?.dispose(); planet.material.map = cloudMap; planet.material.color.set('#ffffff');
      planet.material.bumpMap = null; planet.material.needsUpdate = true;
    }
    if (kind === 'record') {
      const photo = await load('paper-assets/orgs/nomos.png', true);
      if (options.isCancelled?.()) { owned.forEach(texture => texture.dispose()); return; }
      photo.repeat.set(532/1024, 532/576); photo.offset.set(250/1024, 27/576);
      const face = mesh(new THREE.CircleGeometry(1.125,128), new THREE.MeshPhysicalMaterial({ map:photo, color:'#ffffff', metalness:.45, roughness:.32 }), [0,.045,0]);
      face.name = 'Original Golden Record image'; face.rotation.x = -Math.PI/2; model.parts[0].group.add(face);
    }
    if (kind === 'learning' || kind === 'finance') {
      const image = await new THREE.ImageLoader().loadAsync(prefix + (kind === 'learning' ? 'paper-assets/hur-hero.jpg' : 'paper-assets/micc-logo.png'));
      if (options.isCancelled?.()) { owned.forEach(texture => texture.dispose()); return; }
      const page = [...physical].find(material => material.map?.image instanceof HTMLCanvasElement && (material.map.image as HTMLCanvasElement).height === 1280);
      if (page?.map) {
        const original = page.map.image as HTMLCanvasElement;
        const canvas = document.createElement('canvas'); canvas.width = original.width; canvas.height = original.height;
        const context = canvas.getContext('2d')!; context.drawImage(original,0,0);
        if (kind === 'learning') { context.fillStyle='#eee9d9'; context.fillRect(80,260,864,390); context.drawImage(image,100,285,824,330); }
        else context.drawImage(image,95,45,230,60);
        const printed = new THREE.CanvasTexture(canvas); printed.colorSpace = THREE.SRGBColorSpace;
        owned.push(printed); page.map.dispose(); page.map = printed; page.needsUpdate = true;
      }
    }
  } catch (error) {
    // If a texture is unavailable, keep the original material and project geometry usable.
    if (options.isCancelled?.()) owned.forEach(texture => texture.dispose());
    else throw error;
  } finally {
    const attached = new Set<THREE.Texture>();
    model.root.traverse(object => {
      if (object instanceof THREE.Mesh) (Array.isArray(object.material) ? object.material : [object.material]).forEach(material => {
        Object.values(material).forEach(value => { if (value instanceof THREE.Texture) attached.add(value); });
      });
    });
    owned.forEach(texture => { if (options.isCancelled?.() || !attached.has(texture)) texture.dispose(); });
  }
}
