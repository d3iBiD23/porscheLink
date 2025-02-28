<template>
  <ion-page>
    <ion-content>
      <!-- Layout real (MainScreen) debajo del tutorial -->
      <div class="main-layout">
        <ion-text class="last-updated">Last updated: 5 minutes ago</ion-text>
        <div class="car-container">
          <h1 class="car-title">{{ getCarTitle() }}</h1>
          <swiper :modules="[Pagination]" :pagination="{ clickable: true }" :loop="false" @slideChange="onSlideChange"
            class="car-slider">
            <swiper-slide v-for="car in cars" :key="car.id">
              <div class="car-item">
                <img :src="car.lineLeft" alt="line-left" class="line-left" />
                <img :src="car.modelLogo" :alt="`${car.name} Model logo`" class="car-model" />
                <img :src="car.lineRight" alt="line-right" class="line-right" />
                <img :src="car.image" :alt="car.name" class="car-image" />
              </div>
            </swiper-slide>
          </swiper>

          <div class="mid-container">
            <!-- Botón original Vehicle Details -->
            <ion-button expand="block" fill="outline" class="details-button" ref="vehicleButton" @click="goToOverview"
              :class="{ highlight: step === 2 }">
              Vehicle Details
            </ion-button>

            <div class="battery-status" @click="goToOverview">
              <div class="battery-info">
                <div class="battery-percentage">
                  <span class="percentage">72%</span>
                  <span class="range">553km</span>
                </div>
                <div class="charging-status">
                  <img src="/assets/imagesMainScreen/ChargingStation.svg" alt="ChargingStation" class="battery-icon" />
                  <span class="text-battery">Charging plug not connected</span>
                </div>
                <div class="charging-progress">
                  <img src="/assets/imagesMainScreen/battery_gradient.svg" alt="battery_gradient" />
                </div>
                <div class="status-icons">
                  <div class="headlight-wrapper">
                    <img src="/assets/imagesMainScreen/Headlights.svg" alt="Headlights" @click.stop="goToFunctions" />
                  </div>
                  <div class="separator"></div>
                  <div class="key-wrapper" @click.stop="goToFunctions">
                    <img src="/assets/imagesMainScreen/key.svg" alt="key" class="key" />
                  </div>
                </div>
              </div>
            </div>

            <div class="action-buttons">
              <ion-button v-for="action in actions" :key="action.name" fill="clear" class="action-button"
                @click="handleAction(action)">
                <div class="button-content">
                  <img :src="action.icon" :alt="action.name" />
                  <span>{{ action.name }}</span>
                </div>
              </ion-button>
            </div>
          </div>
        </div>
      </div>
      <!-- Fin layout real -->

      <!-- Tutorial Overlay: Bloquea todos los clics del layout de abajo -->
      <!-- Paso 1: Bloquea todo y muestra mensaje de bienvenida -->
      <div v-if="step === 1" class="overlay-container">
        <div class="full-overlay"></div>
        <div class="tutorial-content">
          <p class="tutorial-text">
            Welcome To PorscheLink. Press Next To See What's Coming.
          </p>
          <ion-button @click="goToStep2" class="next-button">
            Next
          </ion-button>
        </div>
      </div>

      <!-- Tutorial Overlay Paso 2: Bloquea todo excepto el botón simulado -->
      <!-- Paso 2: Bloquea todo excepto el área del botón real -->
      <div v-else-if="step === 2" class="overlay-container">
        <div class="full-overlay"></div>
        <!-- Rectángulos que cubren el resto de la pantalla -->
        <div v-for="(block, index) in overlayBlocks" :key="index" class="cover-block" :style="{
          top: block.top + 'px',
          left: block.left + 'px',
          width: block.width + 'px',
          height: block.height + 'px',
        }"></div>
        <div class="tutorial-content step2">
          <p class="tutorial-text">
            Click In The Start Button To Check Your Vehicle Details.
          </p>
          <ion-button @click="finishTutorial" class="next-button">
            Start
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { IonPage, IonContent, IonButton, IonText, IonBackButton, IonButtons } from '@ionic/vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

/* Tutorial state: step 0 = no tutorial; 1 = primer overlay; 2 = segundo overlay */
const step = ref<number>(1);

/** Llamamos a measureButtonHole() cuando pasamos a step 2 */
function goToStep2() {
  step.value = 2;
}

function finishTutorial() {
  router.push('/porschelink/overview');
}

/* Layout variables y funciones */
const router = useRouter();
const route = useRoute();

const vehicleButton = ref<HTMLElement | null>(null);
const overlayBlocks = ref<{ top: number; left: number; width: number; height: number }[]>([]);
const activeIndex = ref(0);
const onSlideChange = (swiper: any) => {
  activeIndex.value = swiper.realIndex;
};

function goToOverview() {
  router.push('/porschelink/overview');
}

const getCarTitle = () => {
  return activeIndex.value === 0 ? 'My Taycan Turbo S' : 'My 911 GT3 RS';
};

const cars = [
  {
    id: 1,
    name: 'Taycan Turbo S',
    lineLeft: '/assets/imagesMainScreen/taycan/lineLeftTaycan.svg',
    modelLogo: '/assets/imagesMainScreen/taycan/Taycan.svg',
    lineRight: '/assets/imagesMainScreen/taycan/lineRightTaycan.svg',
    image: '/assets/imagesMainScreen/taycan/taycanImage.png',
  },
  {
    id: 2,
    name: '911 GT3 RS',
    lineLeft: '/assets/imagesMainScreen/gt3/lineLeftGt3.svg',
    modelLogo: '/assets/imagesMainScreen/gt3/911gt3rs.svg',
    lineRight: '/assets/imagesMainScreen/gt3/lineRightGt3.svg',
    image: '/assets/imagesMainScreen/gt3/porschegt3.png',
  },
];

const actions = [
  { name: 'STATIONS', icon: '/assets/imagesMainScreen/ChargingStation.svg' },
  { name: 'STATS', icon: '/assets/imagesMainScreen/ChartLine.svg' },
  { name: 'OBD', icon: '/assets/imagesMainScreen/Engine.svg' },
];

const handleAction = (action: { name: string; icon: string }) => {
  switch (action.name) {
    case 'STATIONS':
      router.push('/maps');
      break;
    case 'STATS':
      router.push('stats');
      break;
    case 'OBD':
      router.push({ path: '/porschelink/overview', query: { tab: 'repair' } });
      break;
    default:
      console.warn('Accion no reconocida.');
  }
};

const goToFunctions = () => {
  router.replace({
    path: '/porschelink/overview',
    query: { ...route.query, tab: 'functions', _force: Date.now() }
  });
};
</script>

<style scoped>
/* ================== Layout Principal ================== */
.main-layout {
  position: relative;
  z-index: 1;
}

/* Estilos del layout real (copiados de tu código) */
.last-updated {
  display: block;
  padding: 8px 16px;
  margin-left: 20px;
  margin-top: 30px;
  color: #444444;
  font-size: 14px;
}

.car-container {
  padding: 16px;
}

.car-title {
  font-size: 30px;
  font-weight: bold;
  margin-top: 1px;
  margin-left: 20px;
}

.car-slider {
  width: 100%;
  height: 260px;
  overflow: hidden;
  position: relative;
  margin-bottom: 20px;
}

.car-item {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 100%;
}

.car-model {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  max-width: 80%;
}

.car-image {
  max-width: 90%;
  position: absolute;
  bottom: 0;
}

.line-left,
.line-right {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 70px;
  opacity: 0.75;
}

.line-left {
  left: 10px;
}

.line-right {
  right: 10px;
}

:deep(.swiper-pagination-bullet) {
  background-color: #565656;
  opacity: 0.7;
}

:deep(.swiper-pagination-bullet-active) {
  background-color: #FC0;
  opacity: 1;
}

.mid-container {
  margin-top: 40px;
}

.details-button {
  position: relative;
  --border-radius: 8px;
  --border-color: #444;
  --color: #1E1E1E;
  background-color: white;
  font-size: 20px;
  margin: 16px 0;
  text-transform: none;
  font-family: 'Inter', sans-serif;
  box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.3);
}

.highlight {
  box-shadow: 0 0 0 4px #ffffff, 0 0 8px 6px rgba(255, 255, 255, 0.5);
  z-index: 2;
  /* Para que se vea por encima de otros elementos del layout */
  position: relative;
  
}

.battery-status {
  border: 2px solid #444;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.3);
}

.battery-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.battery-percentage {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.step2 {
  top: 120px;
  
}

.percentage {
  font-size: 24px;
  font-weight: bold;
}

.range {
  color: #1E1E1E;
}

.charging-status {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #1E1E1E;
}

.charging-progress img {
  max-width: 100%;
  height: auto;
}

.status-icons {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  padding: 0 50px;
}

.headlight-wrapper {
  cursor: pointer;
}

.key-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  cursor: pointer;
}

.key {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.separator {
  width: 1.5px;
  height: 24px;
  background: rgba(0, 0, 0, 0.6);
  margin: 0 12px;
}

.text-battery {
  font-size: 15px;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-top: 16px;
  width: 100%;
  max-width: 400px;
  margin: 0 auto 30px auto;
}

.action-button {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
  border: 2px solid #444444;
  border-radius: 12px;
  padding: 2px;
  box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease-in-out;
  text-align: center;
  max-width: 120px;
  min-width: 100px;
}

.button-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #444444;
  font-size: 13px;
  font-weight: bolder;
  gap: 12px;
  
}

/* ================== Tutorial Overlay ================== */
.overlay-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  pointer-events: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Capa oscura */
.full-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  pointer-events: auto;
}

/* Contenido del tutorial */
.tutorial-content {
  position: absolute;
  display: flex;
  flex-direction: column;
  z-index: 2;
  /* Encima de la capa oscura */
  pointer-events: auto;
  /* Permite clicks en este contenido */
  text-align: center;
  color: white;
  padding: 1rem;
}

.cover-block {
  position: fixed;
  /* Para que no se mueva con scroll */
  background-color: rgba(0, 0, 0, 0.9);
  pointer-events: auto;
  /* Bloquea clics */
  z-index: 10000;
}

.tutorial-text {
  color: #FFF;
  font-size: 30px;
  font-weight: 600;
  line-height: normal;
  padding: 1rem;
  text-align: left;
  flex-direction: column;
  margin-bottom: 100%;
}

.next-button {
  align-self: flex-end;
  /* Para que el botón quede debajo del texto */
  --background: #000;
  --color: #fff;
  --border-radius: 8px;
  --padding-start: 2rem;
  --padding-end: 2rem;
  --padding-top: 1rem;
  --padding-bottom: 1rem;
  text-transform: none;
  font-weight: bold;
  font-size: 1.3rem;
}

/* En step 2, para bloquear todo excepto el botón duplicado */
.click-blocker {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: auto;
  
}

/* Botón simulado */
.simulated-button-container {
  position: absolute;
  top: 50%;
  /* Ajusta esta posición para que coincida con el botón real */
  left: 50%;
  /* Ajusta esta posición para que coincida con el botón real */
  transform: translate(-50%, -50%);
  z-index: 9999;
}

.simulated-button {
  --border-radius: 8px;
  --border-color: #444;
  --color: #1E1E1E;
  background-color: white;
  font-size: 20px;
  text-transform: none;
  font-family: 'Inter', sans-serif;
  box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.3);
  pointer-events: auto;
}

/* Opcional: posicionar el texto del tutorial en step 2 */
.second-step {
  bottom: 20%;
  
}

/* ================== Fin Tutorial Overlay ================== */

/* ================== Layout Extras ================== */
.stats-divider {
  position: relative;
  height: 2px;
  background-color: #999999;
  z-index: 1;
  width: 10000px;
  right: 20%;
  margin-bottom: 1rem;
}
</style>