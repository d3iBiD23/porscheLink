<template>
    <ion-page>
        <!-- Encabezado IonHeader, con barra "Showing Charging Stations" -->
        <ion-header>
            <ion-toolbar color="dark">
                <ion-buttons slot="start">
                    <ion-back-button default-href="/tabs/homepage" text="" />
                </ion-buttons>
                <ion-title>Showing Charging Stations</ion-title>
            </ion-toolbar>
        </ion-header>

        <!-- Contenido a pantalla completa, sin scroll nativo -->
        <ion-content fullscreen :scroll="false" class="maps-content">
            <!-- Contenedor para pan & zoom -->
            <div class="map-wrapper" ref="mapWrapper" @pointerdown="onPointerDown" @pointermove="onPointerMove"
                @pointerup="onPointerUp" @pointercancel="onPointerUp" @wheel.prevent="onWheel" @gesturestart.prevent
                @gesturechange.prevent @gestureend.prevent style="touch-action: none;">
                <!-- Transform para hacer zoom y pan -->
                <div class="map-transform" :style="transformStyles">
                    <img src="/assets/map_image.svg" alt="Map" class="map-image" />
                    <!-- Marcadores de estaciones -->
                    <div v-for="(station, index) in stations" :key="index" class="marker"
                        :style="{ top: station.top + '%', left: station.left + '%' }" @click="selectStation(station)">
                        <img src="/assets/chargingStation_pin.svg" alt="marker" />
                    </div>
                </div>
            </div>

            <!-- Tarjetas inferiores (pasos 1, 2, 3) -->
            <transition name="slide-up">
                <div v-if="step === 1" class="bottom-card">
                    <h3>{{ selectedStation.title }}</h3>
                    <p>{{ selectedStation.address }}</p>
                    <ion-button @click="goToStationDetails" class="start-route-btn">
                        Start Route
                    </ion-button>
                </div>
            </transition>

            <transition name="slide-up">
                <div v-if="step === 2" class="bottom-card expanded">
                    <h3>{{ selectedStation.title }}</h3>
                    <p>{{ selectedStation.address }}</p>
                    <img v-if="selectedStation.image" :src="selectedStation.image" alt="Station preview"
                        class="station-preview" />
                    <ion-button @click="startRoute" class="start-route-btn">
                        Start Route
                    </ion-button>
                </div>
            </transition>

            <transition name="slide-up">
                <div v-if="step === 3" class="nav-card">
                    <h2>17:15</h2>
                    <div class="nav-info">
                        <span>20 min</span>
                        <span>|</span>
                        <span>2,4 km</span>
                    </div>
                </div>
            </transition>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonContent,
} from '@ionic/vue';

/* ESTADOS DE LA PANTALLA */
const step = ref(1);

/* EJEMPLO DE ESTACIONES */
const stations = [
    {
        title: "Porsche Charging Station Santa Coloma de Gramenet",
        address: "Av. de l'Anselm de Riu, 10, 08924 Barcelona",
        image: "/assets/station_example.jpg",
        top: 35,
        left: 50,
    },
    {
        title: "Another Station",
        address: "C/ Example, 123, 08000 Barcelona",
        image: "/assets/station_example2.jpg",
        top: 60,
        left: 70,
    },
];

/* ESTACIÓN SELECCIONADA */
const selectedStation = reactive({
    title: stations[0].title,
    address: stations[0].address,
    image: stations[0].image,
});

function selectStation(station: any) {
    selectedStation.title = station.title;
    selectedStation.address = station.address;
    selectedStation.image = station.image;
}

function goToStationDetails() {
    step.value = 2;
}

function startRoute() {
    setTimeout(() => {
        step.value = 3;
    }, 2000);
}

/* ZOOM & PAN */
const mapWrapper = ref<HTMLElement | null>(null);
const scale = ref(1);
const translateX = ref(0);
const translateY = ref(0);
const isPointerDown = ref(false);
const lastX = ref(0);
const lastY = ref(0);
const activePointers = reactive<{ [id: number]: { x: number; y: number } }>({});

const transformStyles = computed(() => {
    return {
        transform: `translate(${translateX.value}px, ${translateY.value}px) scale(${scale.value})`,
        transformOrigin: 'center center',
    };
});

function onPointerDown(e: PointerEvent) {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    activePointers[e.pointerId] = { x: e.clientX, y: e.clientY };

    if (Object.keys(activePointers).length === 1) {
        isPointerDown.value = true;
        lastX.value = e.clientX;
        lastY.value = e.clientY;
    }
}

function onPointerMove(e: PointerEvent) {
    if (!activePointers[e.pointerId]) return;
    activePointers[e.pointerId] = { x: e.clientX, y: e.clientY };

    // Pinch-to-zoom
    if (Object.keys(activePointers).length === 2) {
        const pointerIds = Object.keys(activePointers).map(Number);
        const p1 = activePointers[pointerIds[0]];
        const p2 = activePointers[pointerIds[1]];

        const currentDist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
        const oldDist = Math.hypot(
            (p2.x - e.movementX) - (p1.x - e.movementX),
            (p2.y - e.movementY) - (p1.y - e.movementY)
        );
        const distDelta = currentDist - oldDist;
        scale.value += distDelta * 0.005;
        if (scale.value < 0.5) scale.value = 0.5;
        if (scale.value > 3) scale.value = 3;
    }
    // Pan con un solo dedo
    else if (isPointerDown.value && Object.keys(activePointers).length === 1) {
        const dx = e.clientX - lastX.value;
        const dy = e.clientY - lastY.value;
        translateX.value += dx;
        translateY.value += dy;
        lastX.value = e.clientX;
        lastY.value = e.clientY;
    }
}

function onPointerUp(e: PointerEvent) {
    delete activePointers[e.pointerId];
    if (Object.keys(activePointers).length === 0) {
        isPointerDown.value = false;
    }
}

function onWheel(e: WheelEvent) {
    const zoomSpeed = 0.001;
    if (e.deltaY < 0) {
        scale.value += Math.abs(e.deltaY) * zoomSpeed;
    } else {
        scale.value -= Math.abs(e.deltaY) * zoomSpeed;
    }
    if (scale.value < 0.5) scale.value = 0.5;
    if (scale.value > 3) scale.value = 3;
}
</script>

<style scoped>
/* Quitar padding del ion-content, forzar fullscreen real */
ion-content.maps-content {
    --ion-safe-area-top: 0;
    --ion-safe-area-bottom: 0;
    --background: #000;
    position: relative;
}

/* Contenedor de mapa que ocupa todo el espacio */
.map-wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
}

/* Transform container donde se aplica el pan & zoom */
.map-transform {
    position: absolute;
    top: 0;
    left: 0;
    will-change: transform;
}

/* Imagen del mapa, más ancha que la pantalla para permitir pan */
.map-image {
    width: 2000px;
    /* Ajusta según necesites */
    height: auto;
    display: block;
    user-select: none;
    touch-action: none;
    object-fit: cover;
}

/* Marcadores */
.marker {
    position: absolute;
    width: 30px;
    height: 30px;
    transform: translate(-50%, -50%);
    cursor: pointer;
}

/* Tarjetas inferiores (z-index alto para superponerse al mapa) */
.bottom-card,
.nav-card {
    z-index: 99;
}

/* Transiciones para las tarjetas (slide-up) */
.slide-up-enter-active,
.slide-up-leave-active {
    transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
    transform: translateY(100%);
    opacity: 0;
}

/* Estilo base de las tarjetas */
.bottom-card {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background: white;
    border-radius: 12px 12px 0 0;
    padding: 16px;
    min-height: 120px;
    box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.3);
}

.bottom-card h3 {
    margin: 0 0 8px 0;
    font-size: 16px;
    font-weight: bold;
}

.bottom-card p {
    margin: 0 0 12px 0;
    color: #666;
}

.bottom-card.expanded {
    min-height: 240px;
}

.station-preview {
    width: 100%;
    height: auto;
    margin-bottom: 12px;
}

.start-route-btn {
    --border-radius: 8px;
    --background: #F28100;
    --color: #fff;
    text-transform: none;
    font-weight: bold;
}

/* Pantalla 3 (tarjeta de navegación) */
.nav-card {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background: #111;
    padding: 16px;
    text-align: center;
    color: #fff;
    border-radius: 12px 12px 0 0;
    box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.3);
}

.nav-card h2 {
    margin: 0;
    font-size: 24px;
    font-weight: bold;
}

.nav-info {
    margin-top: 4px;
    font-size: 16px;
    display: flex;
    justify-content: center;
    gap: 8px;
}
</style>