export const heroVertex = /* glsl */ `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const heroFragment = /* glsl */ `
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uIntensity;

varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.02;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = vUv;
  vec2 aspect = vec2(uResolution.x / max(uResolution.y, 1.0), 1.0);
  vec2 p = (uv - 0.5) * aspect;
  vec2 m = uMouse * aspect * 0.42;

  float t = uTime * 0.1;
  float n = fbm(p * 2.2 + m * 0.7 + vec2(t * 0.35, -t * 0.2));
  float n2 = fbm(p * 3.4 - m * 0.9 + vec2(-t * 0.25, t * 0.4));

  float field = smoothstep(0.22, 0.78, n * 0.58 + n2 * 0.48);
  float ridges = smoothstep(0.45, 0.95, abs(n - n2));
  float glow = exp(-length(p - m) * 1.85) * 0.62 * uIntensity;

  // Brand: dark #050a14, primary #3b82f6, secondary #f5b942
  vec3 ink = vec3(0.02, 0.039, 0.078);
  vec3 mid = vec3(0.055, 0.1, 0.2);
  vec3 primary = vec3(0.231, 0.51, 0.965);
  vec3 amber = vec3(0.961, 0.725, 0.259);

  vec3 col = mix(ink, mid, field);
  col = mix(col, primary * 0.42, n2 * 0.55);
  col += primary * glow * 0.7;
  col += amber * pow(field, 3.2) * 0.1 * uIntensity;
  col += amber * ridges * 0.08 * uIntensity;
  col += amber * glow * 0.16;

  float vignette = smoothstep(1.55, 0.15, length(p * vec2(0.85, 1.05)));
  col *= vignette;

  gl_FragColor = vec4(col, 1.0);
}
`;

export const heroFragmentLite = /* glsl */ `
precision mediump float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uIntensity;

varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
  vec2 uv = vUv;
  vec2 aspect = vec2(uResolution.x / max(uResolution.y, 1.0), 1.0);
  vec2 p = (uv - 0.5) * aspect;
  vec2 m = uMouse * aspect * 0.35;
  float n = noise(p * 2.0 + m + uTime * 0.07);
  vec3 ink = vec3(0.02, 0.039, 0.078);
  vec3 primary = vec3(0.231, 0.51, 0.965);
  float glow = exp(-length(p - m) * 2.0) * 0.45 * uIntensity;
  vec3 col = ink + primary * (n * 0.1 + glow);
  gl_FragColor = vec4(col, 1.0);
}
`;
