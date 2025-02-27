<template>
    <ion-page>
        <!-- Añadido: Botón de volver atrás -->
        <ion-button class="back-button" fill="clear" @click="goBackStep">
            <ion-icon :icon="chevronBack" slot="icon-only"></ion-icon>
        </ion-button>

        <!-- Botón flotante "Showing Charging Stations" -->
        <div class="top-header">
            <div class="showing-stations-button">
                Showing Charging Stations
            </div>
        </div>

        <!-- IonContent que ocupa toda la pantalla, sin scroll nativo -->
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
                    <div class="card-content">
                        <div class="card-text">
                            <h3>{{ selectedStation.title }}</h3>
                            <p>{{ selectedStation.address }}</p>
                        </div>
                        <div class="card-actions">
                            <ion-button @click="goToStationDetails" class="start-route-btn">
                                Start Route
                            </ion-button>

                            <!-- Botón Favorito -->
                            <ion-button fill="clear" class="favorite-btn" :class="{ active: isFavorite }"
                                @click="toggleFavorite">
                                <!-- Cambia de icono si prefieres starOutline/star -->
                                <ion-icon :icon="isFavorite ? star : starOutline"></ion-icon>
                            </ion-button>

                        </div>
                    </div>
                </div>
            </transition>

            <transition name="slide-up">
                <div v-if="step === 2" class="bottom-card">
                    <h3>{{ selectedStation.title }}</h3>
                    <p>{{ selectedStation.address }}</p>
                    <img v-if="selectedStation.image" :src="selectedStation.image" alt="Station preview"
                        class="station-preview" />
                </div>
            </transition>

            <transition name="slide-up">
                <div v-if="step === 3" class="nav-card">
                    <div class="nav-content">
                        <h2>17:15</h2>
                        <div class="nav-icon">
                            <ion-icon :icon="navigateOutline"></ion-icon>
                        </div>
                        <div class="nav-info">
                            <span>20 min</span>
                            <span class="nav-dot">•</span>
                            <span>2,4 km</span>
                        </div>
                    </div>
                    <!-- Nuevo botón para ir a /tabs/homepage -->
                    <div class="nav-actions">
                        <ion-button fill="solid" class="go-home-btn" @click="goHomePage">
                            Exit
                        </ion-button>
                    </div>
                </div>
            </transition>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue';
import { IonPage, IonContent, IonButton, IonIcon } from '@ionic/vue';
import { navigateOutline, starOutline, chevronBack, star } from 'ionicons/icons';
import { useRouter } from 'vue-router';

const router = useRouter();

const isFavorite = ref(false);
function toggleFavorite() {
    isFavorite.value = !isFavorite.value;
}

// Función para volver atrás
function goBackStep() {
    if (step.value > 1) {
        // Si estamos en step 3 o 2, retrocedemos uno
        step.value = step.value - 1;
    } else {
        // Si estamos en step 1, hacemos router.back() o la lógica que quieras
        router.back();
    }
}

function goHomePage() {
    router.push('/tabs/homepage');
}

/* ESTADOS DE LA PANTALLA */
const step = ref(1);

/* EJEMPLO DE ESTACIONES */
const stations = [
    {
        title: "Porsche Charging Station Santa Coloma de Gramenet",
        address: "Av. de l'Anselm de Riu, 10, 08924 Barcelona",
        image: "/assets/map_station_image.svg",
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
    // Iniciar temporizador para ir al step 3
    setTimeout(() => {
        startRoute();
    }, 1500);
}

function startRoute() {
    step.value = 3;
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

function updateMapBounds() {
    const wrapper = mapWrapper.value;
    if (!wrapper) return;

    const wrapperRect = wrapper.getBoundingClientRect();
    const mapWidth = 383 * scale.value;  // Ancho de la imagen con zoom aplicado
    const mapHeight = 854 * scale.value; // Alto de la imagen con zoom aplicado

    const maxX = Math.max(0, (mapWidth - wrapperRect.width) / 2);
    const maxY = Math.max(0, (mapHeight - wrapperRect.height) / 2);

    // Asegurar que no se muestren bordes negros
    translateX.value = Math.max(-maxX, Math.min(maxX, translateX.value));
    translateY.value = Math.max(-maxY, Math.min(0, translateY.value)); // Impide mover más allá del borde inferior
}


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
        scale.value = Math.max(0.5, Math.min(5, scale.value + distDelta * 0.005));
        updateMapBounds(); // Actualizar límites después del pinch-zoom
    }
    // Pan con un solo dedo
    else if (isPointerDown.value && Object.keys(activePointers).length === 1) {
        const dx = e.clientX - lastX.value;
        const dy = e.clientY - lastY.value;

        const wrapper = mapWrapper.value;
        if (wrapper) {
            const wrapperRect = wrapper.getBoundingClientRect();
            // Permitir más movimiento basado en el zoom
            const maxX = wrapperRect.width * scale.value;
            const maxY = wrapperRect.height * scale.value;

            const newX = translateX.value + dx;
            const newY = translateY.value + dy;

            // Límites más permisivos para el panneo
            translateX.value = Math.max(-maxX, Math.min(maxX, newX));
            translateY.value = Math.max(-maxY, Math.min(maxY, newY));
        }

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
    const newScale = e.deltaY < 0
        ? scale.value + Math.abs(e.deltaY) * zoomSpeed
        : scale.value - Math.abs(e.deltaY) * zoomSpeed;

    scale.value = Math.max(0.5, Math.min(5, newScale));
    updateMapBounds(); // Actualizar límites después del zoom
}
</script>

<style scoped>
/* Haz que IonPage e IonContent ocupen todo el alto */
ion-page,
ion-content.maps-content {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    --background: #000;
    position: relative;
}

/* Estilo para el botón de volver */
.back-button {
    position: absolute;
    top: 8rem;
    left: 1rem;
    z-index: 999;
    --padding-start: 10px;
    --padding-end: 10px;
    --padding-top: 10px;
    --padding-bottom: 10px;
    --background: #1D1D1D;
    --color: white;
    --border-radius: 50%;
    margin: 0;
    height: 50px;
    width: 50px;
    backdrop-filter: blur(8px);
}

.back-button:hover {
    --background: #2D2D2D;
}

/* Botón flotante "Showing Charging Stations" */
.top-header {
    position: absolute;
    top: 3rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999;
}

.showing-stations-button {
    background-color: #1D1D1D;
    color: white;
    padding: 12px 30px;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 700;
    white-space: nowrap;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

/* Contenedor del mapa que ocupa todo IonContent */
.map-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

/* Transform container donde se aplica pan & zoom */
.map-transform {
    position: absolute;
    width: 400%;
    height: 200%;
    will-change: transform;
    transform-origin: center center;
}

/* Imagen del mapa */
.map-image {
    width: 100%;
    /* Hacer la imagen más grande que el viewport */
    height: 100%;
    /* Hacer la imagen más grande que el viewport */
    object-fit: cover;
    user-select: none;
    touch-action: none;
    display: block;
    position: absolute;
    /* Centrar la imagen */
    left: -50%;
    /* Centrar la imagen */
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
    z-index: 999;
    color: white;
}

/* Transiciones para las tarjetas (slide-up) */
.slide-up-enter-active,
.slide-up-leave-active {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-up-enter-from,
.slide-up-leave-to {
    transform: translateY(100%);
    opacity: 0;
}

/* Estilo base de las tarjetas */
.bottom-card {
    position: absolute;
    left: 16px;
    right: 16px;
    bottom: 16px;
    background: #1D1D1D;
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.bottom-card h3 {
    margin: 0 0 4px 0;
    font-size: 18px;
    font-weight: 600;
    color: white;
    line-height: 1.2;
}

.bottom-card p {
    margin: 0 0 20px 0;
    color: #9CA3AF;
    font-size: 14px;
    line-height: 1.4;
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
    --background: #444444;
    --color: white;
    --border-radius: 8px;
    --padding-top: 16px;
    --padding-bottom: 16px;
    --padding-start: 20px;
    --padding-end: 20px;
    margin: 0;
    flex: 1;
    height: 52px;
    /* Altura fija para ambos botones */
    font-size: 20px;
    font-weight: 500;
    text-transform: none;
    letter-spacing: 0;
}

/* Pantalla 3 (tarjeta de navegación) */
.nav-card {
    position: absolute;
    left: 16px;
    right: 16px;
    bottom: 16px;
    background: #1D1D1D;
    padding: 20px;
    text-align: center;
    color: #fff;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.nav-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
}

.nav-card h2 {
    margin: 0;
    font-size: 30px;
    font-weight: bold;
}

.nav-info {
    margin-top: 4px;
    font-size: 16px;
    display: flex;
    justify-content: center;
    gap: 8px;
}

.nav-icon {
    color: white;
    font-size: 30px;
    line-height: 1;
}

.nav-info {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 20px;
    color: white;
}

.nav-dot {
    font-size: 30px;
    line-height: 1;
    position: relative;
    top: -1px;
}

.card-content {
    display: flex;
    flex-direction: column;
}

.card-actions {
    display: flex;
    align-items: stretch;
    /* Hacer que ambos botones tengan la misma altura */
    gap: 8px;
}

.favorite-btn {
    /* Tus estilos base */
    --background: #444444;
    --color: white;
    --border-radius: 8px;
    margin: 0;
    height: 52px;
    width: 52px;
    --padding-start: 0;
    --padding-end: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    /* Si quieres un color base más claro, ajusta */
}

.favorite-btn.active {
    /* FONDO más oscuro */
    --border-radius: 8px;
}

.favorite-btn.active ion-icon {
    color: #F28100;
    /* Estrella naranja */
    --border-radius: 8px;
}

.favorite-btn ion-icon {
    font-size: 24px;
    /* Icono más grande */
}

.card-text {
    margin-bottom: 20px;
    /* Espacio antes de los botones */
}

.start-route-btn:hover {
    --background: #505050;
}

.favorite-btn:hover {
    --background: #505050;
}

.nav-actions {
    margin-top: 16px;
    text-align: center;
    /* o left/right según tu diseño */
}

.go-home-btn {
    --border-radius: 8px;
    font-size: 18px;
    font-weight: 500;
    text-transform: none;
    --padding-start: 5rem;
    --padding-end: 5rem;
    --background: #F28100;
    --color: white;
}
</style>