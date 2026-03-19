<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue';
import createGlobe from 'cobe';
import { cn } from '@archui/core';

interface Marker {
    location: [number, number];
    size: number;
}

interface Connection {
    start: [number, number];
    end: [number, number];
}

const props = withDefaults(defineProps<{
    markers?: Marker[];
    connections?: Connection[];
    variant?: 'glass' | 'plain';
    globeConfig?: {
        width?: number;
        height?: number;
        delta?: number;
        onRender?: (state: Record<string, any>) => void;
        devicePixelRatio?: number;
        phi?: number;
        theta?: number;
        dark?: number;
        diffuse?: number;
        mapSamples?: number;
        mapBrightness?: number;
        baseColor?: [number, number, number];
        markerColor?: [number, number, number];
        glowColor?: [number, number, number];
        opacity?: number;
        offset?: [number, number];
    };
    class?: string;
}>(), {
    markers: () => [],
    connections: () => [],
    variant: 'glass',
    globeConfig: () => ({}),
});

const canvasRef = ref<HTMLCanvasElement | null>(null);
const pointerInteracting = ref<number | null>(null);
const pointerInteractionMovement = ref(0);
const r = ref(0);
const isDark = ref(true);

const variants = {
    glass: 'bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-xl',
    plain: 'bg-transparent border-none shadow-none',
};

const getIntercalatedPoints = (start: [number, number], end: [number, number], steps: number) => {
    const [lat1, lon1] = start;
    const [lat2, lon2] = end;
    const points: [number, number][] = [];

    const rLat1 = (lat1 * Math.PI) / 180;
    const rLon1 = (lon1 * Math.PI) / 180;
    const rLat2 = (lat2 * Math.PI) / 180;
    const rLon2 = (lon2 * Math.PI) / 180;

    const d = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin((rLat1 - rLat2) / 2), 2) +
        Math.cos(rLat1) * Math.cos(rLat2) * Math.pow(Math.sin((rLon1 - rLon2) / 2), 2)));

    for (let i = 0; i <= steps; i++) {
        const f = i / steps;
        const A = Math.sin((1 - f) * d) / Math.sin(d);
        const B = Math.sin(f * d) / Math.sin(d);

        const x = A * Math.cos(rLat1) * Math.cos(rLon1) + B * Math.cos(rLat2) * Math.cos(rLon2);
        const y = A * Math.cos(rLat1) * Math.sin(rLon1) + B * Math.cos(rLat2) * Math.sin(rLon2);
        const z = A * Math.sin(rLat1) + B * Math.sin(rLat2);

        const newLat = Math.atan2(z, Math.sqrt(x * x + y * y));
        const newLon = Math.atan2(y, x);

        points.push([(newLat * 180) / Math.PI, (newLon * 180) / Math.PI]);
    }
    return points;
};

const lineMarkers = computed(() => {
    return props.connections.flatMap(connection => {
        const steps = 30;
        const points = getIntercalatedPoints(connection.start, connection.end, steps);
        return points.map((point, i) => {
            const progress = i / steps;
            const size = Math.sin(progress * Math.PI) * 0.05 + 0.01;
            return {
                location: point,
                size: size,
            };
        });
    });
});

const allMarkers = computed(() => [...props.markers, ...lineMarkers.value]);

let globe: any;
let resizeObserver: ResizeObserver;

const initGlobe = () => {
    if (!canvasRef.value) return;

    const defaultColors = isDark.value ? {
        baseColor: [0.3, 0.3, 0.3] as [number, number, number],
        markerColor: [0.1, 0.8, 1] as [number, number, number],
        glowColor: [1, 1, 1] as [number, number, number],
        mapBrightness: 6,
        diffuse: 1.2,
        dark: 1,
    } : {
        baseColor: [1, 1, 1] as [number, number, number],
        markerColor: [0.1, 0.1, 0.1] as [number, number, number],
        glowColor: [0.5, 0.5, 0.5] as [number, number, number],
        mapBrightness: 10,
        diffuse: 3,
        dark: 0,
    };

    const defaultConfig = {
        width: 600,
        height: 600,
        onRender: () => { },
        devicePixelRatio: 2,
        phi: 0,
        theta: 0.3,
        mapSamples: 16000,
        opacity: 1,
        offset: [0, 0] as [number, number],
        ...defaultColors,
    };

    const config = { ...defaultConfig, ...props.globeConfig };

    let phi = 0;
    let width = 0;

    const onResize = () => {
        if (canvasRef.value && (width = canvasRef.value.offsetWidth)) {
            // width captured
        }
    };

    resizeObserver = new ResizeObserver(() => onResize());
    resizeObserver.observe(canvasRef.value);
    onResize();

    globe = createGlobe(canvasRef.value, {
        ...config,
        width: config.width * 2,
        height: config.height * 2,
        markers: allMarkers.value,
        onRender: (state) => {
            if (!pointerInteracting.value) {
                phi += 0.005;
            }
            state.phi = phi + r.value;
            
            if (width > 0) {
                state.width = width * 2;
                state.height = width * 2;
            } else if (canvasRef.value && canvasRef.value.offsetWidth > 0) {
                 width = canvasRef.value.offsetWidth;
                 state.width = width * 2;
                 state.height = width * 2;
            }
        },
    });

    setTimeout(() => {
        if (canvasRef.value) canvasRef.value.style.opacity = '1';
    });
};

onMounted(() => {
    const checkTheme = () => {
         isDark.value = document.documentElement.classList.contains('dark');
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    initGlobe();

    // Re-init on theme or props change is handled by watch below?
    // Actually cobe needs destroy/recreate for config changes usually.
    // Let's watch specific things.
});

watch([isDark, allMarkers, () => props.globeConfig], () => {
    if (globe) globe.destroy();
    initGlobe();
});

onBeforeUnmount(() => {
    if (globe) globe.destroy();
    if (resizeObserver) resizeObserver.disconnect();
});

const onPointerDown = (e: PointerEvent) => {
    pointerInteracting.value = e.clientX - pointerInteractionMovement.value;
    if (canvasRef.value) canvasRef.value.style.cursor = 'grabbing';
};

const onPointerUp = () => {
    pointerInteracting.value = null;
    if (canvasRef.value) canvasRef.value.style.cursor = 'grab';
};

const onPointerOut = () => {
    pointerInteracting.value = null;
    if (canvasRef.value) canvasRef.value.style.cursor = 'grab';
};

const onMouseMove = (e: MouseEvent) => {
    if (pointerInteracting.value !== null) {
        const delta = e.clientX - pointerInteracting.value;
        pointerInteractionMovement.value = delta;
        r.value = delta / 200;
    }
};

const onTouchMove = (e: TouchEvent) => {
    if (pointerInteracting.value !== null && e.touches[0]) {
        const delta = e.touches[0].clientX - pointerInteracting.value;
        pointerInteractionMovement.value = delta;
        r.value = delta / 200;
    }
};
</script>

<template>
  <div
    :class="cn(
      'relative flex items-center justify-center overflow-hidden rounded-3xl',
      variants[variant],
      props.class
    )"
  >
    <div className="w-full relative aspect-square max-w-[600px]">
      <canvas
        ref="canvasRef"
        @pointerdown="onPointerDown"
        @pointerup="onPointerUp"
        @pointerout="onPointerOut"
        @mousemove="onMouseMove"
        @touchmove="onTouchMove"
        style="width: 100%; height: 100%; cursor: grab; contain: layout paint size; opacity: 0; transition: opacity 1s ease;"
      />
    </div>
  </div>
</template>
