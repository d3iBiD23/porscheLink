<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          <img src="/assets/logos/porscheLogo.svg" alt="porscheLogo" class="porscheLogo" />
        </ion-title>
      </ion-toolbar>
      <ion-toolbar>
        <h1 class="car-title">My Taycan Turbo S</h1>
      </ion-toolbar>
      <ion-toolbar>
        <div class="custom-segment">
          <div v-for="tab in tabs" :key="tab.value" class="segment-button"
            :class="{ active: selectedTab === tab.value }" @click="updateTab(tab.value)">
            <ion-icon :icon="tab.icon" />
            <span>{{ tab.label }}</span>
          </div>
        </div>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <!-- Swiper para permitir swipe horizontal -->
      <swiper :modules="[Pagination]" @swiper="onSwiper" @slideChange="onSlideChange">
        <!-- Slide para Details -->
        <swiper-slide>
          <DetailsContent />
        </swiper-slide>
        <!-- Slide para Repair -->
        <swiper-slide>
          <RepairContent />
        </swiper-slide>
        <!-- Slide para Functions -->
        <swiper-slide>
          <FunctionsContent />
        </swiper-slide>
      </swiper>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonIcon } from '@ionic/vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// Importa tus componentes
import DetailsContent from '@/components/DetailsContent.vue';
import RepairContent from '@/components/RepairContent.vue';
import FunctionsContent from '@/components/FunctionsContent.vue';

// Importa los iconos de Ionicons
import { eyeOutline, constructOutline, keyOutline } from 'ionicons/icons';

const router = useRouter();
const route = useRoute();

// Definición de las pestañas
const tabs = [
  { label: 'Details', value: 'details', icon: eyeOutline, index: 0 },
  { label: 'Repair', value: 'repair', icon: constructOutline, index: 1 },
  { label: 'Functions', value: 'functions', icon: keyOutline, index: 2 },
];

// La pestaña seleccionada se inicializa con el query param (o "details" por defecto)
const selectedTab = ref((route.query.tab as string) || 'details');

// Declaramos una variable para almacenar la instancia real de Swiper
const swiperInstance = ref<any>(null);

// Capturamos la instancia de Swiper
function onSwiper(swiper: any) {
  swiperInstance.value = swiper;
}

// Si el query param cambia, actualizamos la pestaña y movemos el Swiper
watch(
  () => route.query.tab,
  (newVal) => {
    if (newVal) {
      selectedTab.value = newVal as string;
      const tab = tabs.find(t => t.value === newVal);
      if (tab && swiperInstance.value) {
        swiperInstance.value.slideTo(tab.index);
      }
    }
  }
);

// Al hacer swipe se actualiza el estado y el query param
function onSlideChange(swiper: any) {
  const newIndex = swiper.realIndex;
  const newTab = tabs.find(t => t.index === newIndex)?.value || 'details';
  selectedTab.value = newTab;
  router.replace({ path: '/porschelink/overview', query: { ...route.query, tab: newTab, _force: Date.now() } });
}

// Al hacer clic en una pestaña, actualizamos la variable y movemos el Swiper
function updateTab(newTab: string) {
  selectedTab.value = newTab;
  const tab = tabs.find(t => t.value === newTab);
  if (tab && swiperInstance.value) {
    swiperInstance.value.slideTo(tab.index);
  }
  router.replace({ path: '/porschelink/overview', query: { ...route.query, tab: newTab, _force: Date.now() } });
}
</script>

<style scoped>
ion-content {
  --background: white;
}

ion-toolbar {
  --background: white;
  --color: black;
}

ion-title {
  padding-top: 2rem;
}

.porscheLogo {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.car-title {
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0;
  padding: 0 30px;
  color: #1E1E1E;
}

.custom-segment {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.segment-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 16px;
  cursor: pointer;
  color: #666;
}

.segment-button.active {
  color: #F28100;
  position: relative;
}

.segment-button.active::after {
  content: '';
  position: absolute;
  bottom: -11px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #F28100;
}

ion-icon {
  font-size: 24px;
  margin-bottom: 4px;
}
</style>