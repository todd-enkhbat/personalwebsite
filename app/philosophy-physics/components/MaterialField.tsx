"use client";

import { useEffect, useRef, useState } from "react";
import { materialFragment, materialVertex } from "../lib/materialShader";

/** Decorative artwork only. The experiments and their physical models are independent. */
export function MaterialField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const pausedRef = useRef(false);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [contextVersion, setContextVersion] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { alpha: true, antialias: false, premultipliedAlpha: false, powerPreference: "low-power" });
    if (!gl) return; // The color-map fallback remains visible without WebGL.

    function compile(type: number, source: string) {
      const shader = gl!.createShader(type);
      if (!shader) return null;
      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) { gl!.deleteShader(shader); return null; }
      return shader;
    }
    const vertex = compile(gl.VERTEX_SHADER, materialVertex);
    const fragment = compile(gl.FRAGMENT_SHADER, materialFragment);
    const program = gl.createProgram();
    if (!program || !vertex || !fragment) {
      if (vertex) gl.deleteShader(vertex);
      if (fragment) gl.deleteShader(fragment);
      if (program) gl.deleteProgram(program);
      return;
    }
    gl.attachShader(program, vertex); gl.attachShader(program, fragment); gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program); gl.deleteShader(vertex); gl.deleteShader(fragment); return;
    }
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
    gl.useProgram(program);
    const position = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const atlas = document.createElement("canvas");
    atlas.width = 192; atlas.height = 34;
    const ctx = atlas.getContext("2d");
    if (!ctx) { gl.deleteBuffer(buffer); gl.deleteProgram(program); gl.deleteShader(vertex); gl.deleteShader(fragment); return; }
    ctx.font = "500 30px monospace"; ctx.fillStyle = "white"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    [..."·:01//ΩM"].forEach((character, i) => ctx.fillText(character, i*24+12, 17));
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, atlas);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.uniform1i(gl.getUniformLocation(program, "u_glyphs"), 0);
    const materialTexture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, materialTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([220,224,229,255]));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.uniform1i(gl.getUniformLocation(program, "u_material"), 1);
    const resolution = gl.getUniformLocation(program, "u_resolution");
    const time = gl.getUniformLocation(program, "u_time");
    const pointer = gl.getUniformLocation(program, "u_pointer");
    const trailUniform = gl.getUniformLocation(program, "u_trail");
    const interactionUniform = gl.getUniformLocation(program, "u_interaction");
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = preference.matches;
    let visible = true;
    let elapsed = 0;
    let previous = 0;
    let lastDraw = 0;
    let loaded = false;
    let disposed = false;
    const target = { x: 0.5, y: 0.5 };
    const current = { x: 0.5, y: 0.5 };
    const trail = { x: 0.5, y: 0.5 };
    let interaction = 0;
    let targetInteraction = 0;
    setReduced(reducedMotion);

    function draw() {
      gl!.uniform2f(resolution, canvas!.clientWidth, canvas!.clientHeight);
      gl!.uniform2f(pointer, current.x, current.y);
      gl!.uniform2f(trailUniform, trail.x, trail.y);
      gl!.uniform1f(interactionUniform, interaction);
      gl!.uniform1f(time, elapsed);
      gl!.drawArrays(gl!.TRIANGLES, 0, 6);
    }
    function animate(now: number) {
      frameRef.current = 0;
      if (!loaded || !visible || document.hidden || reducedMotion || pausedRef.current) { previous = 0; return; }
      if (now-lastDraw >= 1000/30) {
        if (previous) elapsed += Math.min((now-previous)/1000,0.08);
        previous = now; lastDraw = now;
        current.x += (target.x-current.x)*0.18;
        current.y += (target.y-current.y)*0.18;
        trail.x += (current.x-trail.x)*0.055;
        trail.y += (current.y-trail.y)*0.055;
        interaction += (targetInteraction-interaction)*0.12;
        draw();
      }
      frameRef.current = requestAnimationFrame(animate);
    }
    function resume() {
      cancelAnimationFrame(frameRef.current); frameRef.current = 0; previous = 0;
      if (loaded && visible && !document.hidden && !reducedMotion && !pausedRef.current) frameRef.current = requestAnimationFrame(animate);
    }
    function resize() {
      const dpr = Math.min(devicePixelRatio || 1,1.5);
      canvas!.width = Math.round(canvas!.clientWidth*dpr); canvas!.height = Math.round(canvas!.clientHeight*dpr);
      gl!.viewport(0,0,canvas!.width,canvas!.height); draw();
    }
    function motionChange() {
      reducedMotion = preference.matches; setReduced(reducedMotion);
      target.x = current.x = trail.x = 0.5;
      target.y = current.y = trail.y = 0.5;
      interaction = targetInteraction = 0;
      draw(); resume();
    }
    function move(event: PointerEvent) {
      if (reducedMotion || pausedRef.current || event.pointerType === "touch") return;
      const rect = canvas!.getBoundingClientRect();
      target.x = (event.clientX-rect.left)/rect.width; target.y = 1-(event.clientY-rect.top)/rect.height;
      targetInteraction = 1;
    }
    function leave() { targetInteraction = 0; }
    function contextLost(event: Event) { event.preventDefault(); cancelAnimationFrame(frameRef.current); setReady(false); }
    // Restore through a fresh effect, leaving the CSS artwork in place in the meantime.
    function contextRestored() { setContextVersion((version) => version+1); }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; resume(); });
    const resizer = new ResizeObserver(resize);
    observer.observe(canvas); resizer.observe(canvas);
    preference.addEventListener("change", motionChange);
    document.addEventListener("visibilitychange", resume);
    canvas.addEventListener("pointermove", move); canvas.addEventListener("pointerleave", leave);
    canvas.addEventListener("webglcontextlost", contextLost); canvas.addEventListener("webglcontextrestored", contextRestored);
    canvas.addEventListener("material-motion-change", resume);
    const materialImage = new Image();
    materialImage.onload = () => {
      if (disposed || gl.isContextLost()) return;
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, materialTexture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, materialImage);
      loaded = true; resize(); setReady(true); resume();
    };
    materialImage.src = "/physics/burgundy-material.jpg";
    resize();
    return () => {
      disposed = true; materialImage.onload = null;
      cancelAnimationFrame(frameRef.current); observer.disconnect(); resizer.disconnect();
      preference.removeEventListener("change", motionChange); document.removeEventListener("visibilitychange", resume);
      canvas.removeEventListener("pointermove", move); canvas.removeEventListener("pointerleave", leave);
      canvas.removeEventListener("webglcontextlost", contextLost); canvas.removeEventListener("webglcontextrestored", contextRestored);
      canvas.removeEventListener("material-motion-change", resume);
      gl.deleteTexture(texture); gl.deleteTexture(materialTexture); gl.deleteBuffer(buffer); gl.deleteProgram(program); gl.deleteShader(vertex); gl.deleteShader(fragment);
    };
  }, [contextVersion]);

  function toggleMotion() {
    pausedRef.current = !pausedRef.current;
    setPaused(pausedRef.current);
    canvasRef.current?.dispatchEvent(new Event("material-motion-change"));
  }

  return <div className="ph-material" data-ready={ready || undefined}>
    <div className="ph-material-fallback" aria-hidden="true" />
    <canvas ref={canvasRef} className="ph-material-canvas" aria-hidden="true" />
    {ready && !reduced && <button type="button" className="ph-material-motion" onClick={toggleMotion} aria-pressed={paused} aria-label="Pause decorative animation"><span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span> {paused ? "Resume motion" : "Pause motion"}</button>}
  </div>;
}
