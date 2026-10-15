// Original flowing material, using an authored color map and live luminance dithering.
// The character lattice stays in screen space while the material moves beneath it.
export const materialVertex = `
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

export const materialFragment = `
precision highp float;
varying vec2 v_uv;
uniform vec2 u_resolution;
uniform vec2 u_pointer;
uniform vec2 u_trail;
uniform float u_interaction;
uniform float u_time;
uniform sampler2D u_glyphs;
uniform sampler2D u_material;

float hash(vec2 p) { return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }

vec2 flow(vec2 p) {
  float t = u_time*0.075;
  vec2 q = p;
  // Large, continuous undulations, without any silhouette or outlined seam.
  q.x += sin(p.y*2.5+t)*0.008 + sin(p.x*3.0-p.y*2.0-t*0.63)*0.004;
  q.y += cos(p.x*3.0-t*0.8)*0.007 + sin(p.y*2.0+p.x*2.0+t*0.7)*0.004;
  vec2 delta = p-u_pointer;
  delta.x *= u_resolution.x/u_resolution.y;
  float distance = length(delta);
  float influence = exp(-distance*distance*20.0)*u_interaction;
  q += (u_pointer-u_trail)*0.35*influence;
  q += normalize(delta+0.001)*sin(distance*12.0-t)*0.006*influence;
  return q;
}

vec3 surface(vec2 p) {
  float aspect = u_resolution.x/u_resolution.y;
  // Oblique bands refract the same underlying fluid, like fluted glass.
  float diagonal = p.x*aspect*0.86-p.y*0.51;
  float slat = fract(diagonal*11.0);
  float lens = (slat-0.5)*0.009;
  vec2 q = flow(p+vec2(lens,lens*0.5));
  q = clamp((q-0.5)*0.91+0.5,0.002,0.998);
  vec3 color = texture2D(u_material,q).rgb;
  color *= 0.975 + slat*0.035;
  color += pow(slat,22.0)*0.013;
  return color;
}

void main() {
  vec2 p = v_uv;
  vec3 color = surface(p);
  // A denser lattice with a localized, inertial cursor disturbance.
  vec2 aspect = vec2(u_resolution.x/u_resolution.y,1.0);
  vec2 delta = (p-u_pointer)*aspect;
  vec2 tailDelta = (p-u_trail)*aspect;
  float hover = exp(-dot(delta,delta)*28.0)*u_interaction;
  float wake = exp(-dot(tailDelta,tailDelta)*40.0)*u_interaction;
  vec2 glyphUV = p + (p-u_pointer)*hover*0.13
    + (u_pointer-u_trail)*wake*0.4
    + vec2(-delta.y,delta.x)/aspect*hover*0.025;
  vec2 grid = u_resolution/vec2(7.5,10.0);
  vec2 cell = floor(glyphUV*grid);
  vec2 local = fract(glyphUV*grid);
  vec2 center = (cell+0.5)/grid;
  vec3 sampleColor = surface(center);
  float luminance = dot(sampleColor,vec3(0.2126,0.7152,0.0722));
  // Local character changes follow the pointer; the rest of the field stays quiet.
  float glyph = floor(clamp((1.0-luminance)*7.0,0.0,7.0));
  float disturbed = mod(glyph+1.0+floor(u_time*6.0+hash(cell)*3.0),8.0);
  glyph = mix(glyph,disturbed,step(0.30,hover+wake*0.5));
  float ink = texture2D(u_glyphs,vec2((local.x+glyph)/8.0,local.y)).a;
  vec3 inkColor = mix(vec3(0.09,0.018,0.035),vec3(0.96,0.93,0.91),smoothstep(0.84,1.0,luminance));
  inkColor = mix(inkColor,vec3(0.82,0.63,0.65),hover*0.28);
  float inkStrength = mix(0.62,0.86,smoothstep(0.2,0.7,luminance));
  color = mix(color,inkColor,ink*inkStrength);
  color += (hash(gl_FragCoord.xy)-0.5)*0.009;

  // Soft integration with the letter: the field emerges from the paper itself.
  float left = smoothstep(0.0,0.33,p.x);
  float top = 1.0-smoothstep(0.68,1.0,p.y);
  float bottom = smoothstep(0.0,0.27,p.y);
  float pale = 1.0-smoothstep(0.85,1.0,luminance);
  float readingSpace = mix(1.0,smoothstep(0.31,0.52,p.y),smoothstep(0.52,0.76,p.x));
  float alpha = left*top*bottom*mix(0.2,1.0,pale)*readingSpace;
  gl_FragColor = vec4(clamp(color,0.0,1.0),alpha);
}`;
