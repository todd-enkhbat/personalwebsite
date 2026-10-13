import * as THREE from 'three';

export type ModelKind = 'satellite' | 'habitat' | 'gimbal' | 'cubesat';
export type ModelPart = { name: string; group: THREE.Group; offset: THREE.Vector3 };
export type BuiltModel = { root: THREE.Group; parts: ModelPart[] };

const alloy = () => new THREE.MeshStandardMaterial({ color: '#98988c', metalness: .78, roughness: .34 });
const dark = () => new THREE.MeshStandardMaterial({ color: '#333b3e', metalness: .7, roughness: .38 });
const ivory = () => new THREE.MeshStandardMaterial({ color: '#ded8c8', metalness: .27, roughness: .4, side: THREE.DoubleSide });
const gold = () => new THREE.MeshStandardMaterial({ color: '#bd9450', metalness: .82, roughness: .38 });
const blue = () => new THREE.MeshStandardMaterial({ color: '#13273d', metalness: .65, roughness: .21 });

function mesh(geometry: THREE.BufferGeometry, material: THREE.Material, position: number[] = [0,0,0]) {
  const item = new THREE.Mesh(geometry, material);
  item.position.set(position[0],position[1],position[2]);
  item.castShadow = true; item.receiveShadow = true;
  return item;
}
function box(parent: THREE.Group, size: number[], position: number[], material: THREE.Material) {
  const item=mesh(new THREE.BoxGeometry(size[0],size[1],size[2]),material,position); parent.add(item); return item;
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
  return group;
}
function part(root:THREE.Group,parts:ModelPart[],name:string,offset:number[]) {
  const group=new THREE.Group();group.name=name;root.add(group);
  parts.push({name,group,offset:new THREE.Vector3(...offset as [number,number,number])});return group;
}
function reflector(radius=1.45) {
  const dish=new THREE.Group();const metal=alloy(), skin=ivory();
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
  const geometry=new THREE.IcosahedronGeometry(2.4,3);const positions=geometry.getAttribute('position');
  const skin=new THREE.MeshPhysicalMaterial({color:'#d0d6d1',metalness:.12,roughness:.35,transparent:true,opacity:.27,side:THREE.DoubleSide,depthWrite:false});
  const edges=new Map<string,[THREE.Vector3,THREE.Vector3]>();
  for(let i=0;i<positions.count;i+=3){
    const vs=[0,1,2].map(j=>new THREE.Vector3().fromBufferAttribute(positions,i+j));
    if(vs.some(v=>v.y<-.02))continue;
    vs.forEach(v=>v.y=v.y*.69+.08);
    const center=vs[0].clone().add(vs[1]).add(vs[2]).multiplyScalar(1/3);
    if(center.z>1.95&&Math.abs(center.x)<.43&&center.y<.7)continue;
    const face=new THREE.BufferGeometry().setFromPoints(vs);face.computeVertexNormals();shell.add(mesh(face,skin));
    for(let j=0;j<3;j++){
      const a=vs[j],b=vs[(j+1)%3];const key=[a.toArray().map(v=>v.toFixed(3)).join(','),b.toArray().map(v=>v.toFixed(3)).join(',')].sort().join('|');edges.set(key,[a,b]);
    }
  }
  edges.forEach(([a,b])=>beam(shell,a,b,.012,metal));
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
  const model=kind==='habitat'?habitat():kind==='gimbal'?gimbal():kind==='cubesat'?cubesat():satellite();
  model.root.name=kind;model.root.userData={description:'Interactive reconstruction for the portfolio, based on project images and published design parameters.'};
  return model;
}
