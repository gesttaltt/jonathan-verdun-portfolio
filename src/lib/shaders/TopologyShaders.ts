export const vertexShader = `
    uniform float time;
    uniform vec2 mouse;
    varying float vDisplacement;
    varying float vPulse;
    varying float vHover;

    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
    float snoise(vec3 v) {
        const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
        const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i  = floor(v + dot(v, C.yyy) );
        vec3 x0 = v - i + dot(i, C.xxx) ;
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min( g.xyz, l.zxy );
        vec3 i2 = max( g.xyz, l.zxy );
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        i = mod289(i);
        vec4 p = permute( permute( permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
                + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
        float n_ = 0.142857142857;
        vec3  ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_ );
        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4( x.xy, y.xy );
        vec4 b1 = vec4( x.zw, y.zw );
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
        vec3 p0 = vec3(a0.xy,h.x);
        vec3 p1 = vec3(a0.zw,h.y);
        vec3 p2 = vec3(a1.xy,h.z);
        vec3 p3 = vec3(a1.zw,h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                        dot(p2,x2), dot(p3,x3) ) );
    }

    void main() {
        // Ambient noise displacement
        float noise = snoise(vec3(position.x * 0.5, position.y * 0.5, time * 0.2));
        vDisplacement = noise;

        // Sparse sparkle
        float pulseNoise = snoise(vec3(position.x * 2.0, position.y * 2.0, time * 2.0));
        vPulse = step(0.8, pulseNoise);

        // Project to screen space for hover detection
        vec3 ambientPos = position + normal * noise * 0.5;
        vec4 mvPosition = modelViewMatrix * vec4(ambientPos, 1.0);
        vec4 clipPos = projectionMatrix * mvPosition;
        vec2 screenPos = clipPos.xy / clipPos.w;

        // Smooth radial hover in screen space
        float screenDist = length(screenPos - mouse);
        vHover = smoothstep(0.5, 0.0, screenDist);

        // Hover pushes vertices outward along normal
        vec3 finalPos = ambientPos + normal * vHover * 0.6;
        mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
        gl_Position = projectionMatrix * mvPosition;

        gl_PointSize = (6.0 + noise * 3.0 + vPulse * 12.0 + vHover * 10.0) * (1.0 / -mvPosition.z);
    }
`

export const fragmentShader = `
    uniform vec3 color;
    uniform vec3 hoverColor;
    varying float vDisplacement;
    varying float vPulse;
    varying float vHover;

    void main() {
        float r = distance(gl_PointCoord, vec2(0.5));
        if (r > 0.5) discard;
        float glow = pow(1.0 - r * 2.0, 1.5);

        // Base: blend between node color and hover color via noise
        vec3 baseColor = mix(color, hoverColor, vDisplacement * 0.5 + 0.5);
        // Hover: shift toward bright cyan-white
        vec3 litColor = mix(baseColor, vec3(0.85, 1.0, 1.0), vHover);
        // Pulse: push toward white
        vec3 finalColor = mix(litColor, vec3(1.0), vPulse * 0.8);

        float finalAlpha = glow * (0.15 + vPulse * 0.8 + vHover * 0.85);
        gl_FragColor = vec4(finalColor, finalAlpha);
    }
`
