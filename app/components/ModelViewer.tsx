"use client";

import { useEffect, useId, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { HDRLoader } from "three/addons/loaders/HDRLoader.js";
import { RectAreaLightUniformsLib } from "three/addons/lights/RectAreaLightUniformsLib.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { buildPortfolioModel, texturePortfolioModel, type ModelKind } from "../lib/portfolioModels";

type ViewerAPI = { explode: (amount: number) => void; show: (name: string, visible: boolean) => void; reset: () => void; zoom: (factor: number) => void; rotate: (angle: number) => void };

export default function ModelViewer({ kind, title, preview = false }: { kind: ModelKind; title: string; preview?: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  const api = useRef<ViewerAPI | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [parts, setParts] = useState<string[]>([]);
  const [hidden, setHidden] = useState<string[]>([]);
  const [exploded, setExploded] = useState(0);
  const inputId = useId();

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let dispose: (() => void) | undefined;
    let disposed = false;
    let started = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started) return;
      started = true;
      observer.disconnect();
      let renderer: THREE.WebGLRenderer;
      try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" }); }
      catch { setFailed(true); return; }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = kind === "record" ? .75 : 1;
      renderer.shadowMap.enabled = !preview;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.setClearColor(0x000000, 0);
      element.appendChild(renderer.domElement);
      const scene = new THREE.Scene();
      const environment = new RoomEnvironment();
      const pmrem = new THREE.PMREMGenerator(renderer);
      let environmentMap = pmrem.fromScene(environment, .04);
      scene.environmentIntensity = .85;
      scene.environment = environmentMap.texture;
      environment.dispose(); pmrem.dispose();
      const built = buildPortfolioModel(kind);
      scene.add(built.root);
      const bounds = new THREE.Box3().setFromObject(built.root);
      const center = bounds.getCenter(new THREE.Vector3());
      const radius = bounds.getSize(new THREE.Vector3()).length() / 2;
      const camera = new THREE.PerspectiveCamera(32, 1, .1, 100);
      const direction = kind === 'growlight' ? new THREE.Vector3(4, -2.6, 5.5) : kind === 'piano' ? new THREE.Vector3(5, 4, -6) : ['record', 'finance', 'learning'].includes(kind) ? new THREE.Vector3(3, 5, 4) : kind === 'suit' ? new THREE.Vector3(2.5, 1.7, 6) : new THREE.Vector3(4.7, 3.2, 6);
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.target.copy(center);
      controls.enableDamping = false;
      controls.enabled = !preview;
      controls.enablePan = false;
      controls.enableZoom = false; // The page keeps its normal scroll; zoom has explicit controls.
      controls.minDistance = radius * 1.25;
      controls.maxDistance = radius * 7;
      controls.maxPolarAngle = Math.PI * .85;
      const sun = new THREE.DirectionalLight(0xfff4e4, 1.5);
      sun.position.set(5, 8, 5); sun.castShadow = !preview;
      sun.shadow.mapSize.set(2048, 2048);
      sun.shadow.normalBias = .015; sun.shadow.radius = 4;
      Object.assign(sun.shadow.camera, { left: -7, right: 7, top: 7, bottom: -7 });
      sun.shadow.bias = -.001;
      scene.add(sun, new THREE.HemisphereLight(0xffffff, 0x6d7680, .35));
      RectAreaLightUniformsLib.init();
      const key = new THREE.RectAreaLight(0xfff4e4, 6, radius * 2, radius * 3);
      key.position.copy(center).add(new THREE.Vector3(-3, 5, 4).multiplyScalar(radius)); key.lookAt(center);
      const rim = new THREE.RectAreaLight(0xd8eaff, 8, radius, radius * 2.5);
      rim.position.copy(center).add(new THREE.Vector3(3, 2, -3).multiplyScalar(radius)); rim.lookAt(center);
      scene.add(key, rim);
      const floor = new THREE.Mesh(new THREE.PlaneGeometry(80, 80), new THREE.ShadowMaterial({ opacity: .12 }));
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = bounds.min.y - .16;
      floor.receiveShadow = true;
      if (!preview) scene.add(floor);
      const render = () => renderer.render(scene, camera);
      void texturePortfolioModel(built, kind, { isCancelled: () => disposed }).then(() => {
        if (!disposed) render();
      }).catch(() => { /* Procedural surfaces remain available if an image cannot load. */ });
      new HDRLoader().load('/models/environment/studio_small_03_1k.hdr', hdr => {
        if (disposed) { hdr.dispose(); return; }
        const generator = new THREE.PMREMGenerator(renderer);
        const studioMap = generator.fromEquirectangular(hdr);
        environmentMap.dispose(); environmentMap = studioMap;
        scene.environment = studioMap.texture; scene.environmentRotation.y = kind === "record" ? 2.4 : .5;
        hdr.dispose(); generator.dispose(); render();
      }, undefined, () => { /* The bundled room remains a usable offline fallback. */ });
      const resetCamera = () => {
        const portraitFactor = Math.max(1, 1 / camera.aspect);
        const fitDistance = radius / Math.sin(THREE.MathUtils.degToRad(camera.fov / 2)) * 1.03;
        camera.position.copy(center).add(direction.clone().normalize().multiplyScalar(fitDistance * portraitFactor));
        controls.target.copy(center); controls.update(); render();
      };
      const resize = () => {
        const { width, height } = element.getBoundingClientRect();
        if (!width || !height) return;
        renderer.setSize(width, height); camera.aspect = width / height; camera.updateProjectionMatrix(); resetCamera();
      };
      const resizer = new ResizeObserver(resize); resizer.observe(element);
      const lost = (event: Event) => { event.preventDefault(); setFailed(true); };
      renderer.domElement.addEventListener('webglcontextlost', lost);
      controls.addEventListener('change', render);
      api.current = {
        explode: amount => { built.parts.forEach(p => p.group.position.copy(p.offset).multiplyScalar(amount)); render(); },
        show: (name, visible) => { const part = built.parts.find(p => p.name === name); if (part) part.group.visible = visible; render(); },
        reset: resetCamera,
        zoom: factor => { const offset = camera.position.clone().sub(controls.target); offset.setLength(THREE.MathUtils.clamp(offset.length() * factor, controls.minDistance, controls.maxDistance)); camera.position.copy(controls.target).add(offset); controls.update(); render(); },
        rotate: angle => { const offset = camera.position.clone().sub(controls.target).applyAxisAngle(new THREE.Vector3(0, 1, 0), angle); camera.position.copy(controls.target).add(offset); controls.update(); render(); }
      };
      setParts(built.parts.map(p => p.name)); setReady(true); resize();
      dispose = () => {
        disposed = true; api.current = null; resizer.disconnect(); controls.dispose();
        renderer.domElement.removeEventListener('webglcontextlost', lost);
        const geometries = new Set<THREE.BufferGeometry>(); const materials = new Set<THREE.Material>();
        scene.traverse(object => { if (object instanceof THREE.Mesh) { geometries.add(object.geometry); (Array.isArray(object.material) ? object.material : [object.material]).forEach(m => materials.add(m)); } });
        const textures = new Set<THREE.Texture>();
        materials.forEach(material => Object.values(material).forEach(value => { if (value instanceof THREE.Texture) textures.add(value); }));
        textures.forEach(texture => texture.dispose());
        geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose());
        floor.geometry.dispose(); floor.material.dispose(); environmentMap.dispose(); sun.shadow.dispose();
        renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove();
      };
    }, { rootMargin: "150px" });
    observer.observe(element);
    return () => { disposed = true; observer.disconnect(); dispose?.(); };
  }, [kind, preview]);

  function reset() {
    setExploded(0); setHidden([]); api.current?.explode(0);
    parts.forEach(name => api.current?.show(name, true)); api.current?.reset();
  }
  return (
    <div className={`model-viewer${preview ? ' model-viewer--preview' : ''}`}>
      <div className="model-canvas" ref={host} role={preview ? undefined : 'img'} aria-label={preview ? undefined : `${title}, interactive 3D reconstruction. Drag to orbit; use controls below to zoom and separate components.`}>
        {!ready && !failed ? <span className="model-loading">Loading model…</span> : null}
        {failed ? <div className="model-fallback">The 3D preview is unavailable on this device.{!preview ? <a href={`/models/${kind}.glb`} download>Download the 3D model ↗</a> : null}</div> : null}
      </div>
      {!preview && !failed ? <>
        <div className="model-toolbar"><span>Drag to orbit</span><div>
          <button onClick={() => api.current?.rotate(-Math.PI / 8)} aria-label="Rotate model left">↶</button>
          <button onClick={() => api.current?.rotate(Math.PI / 8)} aria-label="Rotate model right">↷</button>
          <button onClick={() => api.current?.zoom(.8)} aria-label="Zoom in">+</button>
          <button onClick={() => api.current?.zoom(1.25)} aria-label="Zoom out">−</button>
          <button onClick={reset}>Reset</button>
        </div></div>
        <div className="model-options">
          <label htmlFor={inputId}>Separate components <span>{Math.round(exploded * 100)}%</span></label>
          <input id={inputId} type="range" min="0" max="1" step=".01" value={exploded} onChange={e => { const value = Number(e.target.value); setExploded(value); api.current?.explode(value); }} />
          <div className="model-parts" aria-label="Visible model components">{parts.map(name => <button key={name} aria-pressed={!hidden.includes(name)} onClick={() => { const wasHidden = hidden.includes(name); setHidden(wasHidden ? hidden.filter(n => n !== name) : [...hidden, name]); api.current?.show(name, wasHidden); }}>{name}</button>)}</div>
        </div>
      </> : null}
    </div>
  );
}
