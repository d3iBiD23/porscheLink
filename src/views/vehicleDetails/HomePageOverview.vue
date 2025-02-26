<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>
          <img src="\assets\logos\porscheLogo.svg" alt="porscheLogo" class="porscheLogo">
        </IonTitle>
      </IonToolbar>
      <IonToolbar>
        <h1 class="car-title">My Taycan Turbo S</h1>
      </IonToolbar>
      <IonToolbar>
        <div class="custom-segment">
          <div v-for="tab in tabs" :key="tab.value" class="segment-button"
            :class="{ active: selectedTab === tab.value }" @click="updateTab(tab.value)">
            <ion-icon :icon="tab.icon" />
            <span>{{ tab.label }}</span>
          </div>

        </div>
      </IonToolbar>
    </IonHeader>

    <IonContent>
      <!-- Contenido dinámico basado en la pestaña seleccionada -->
      <div v-if="selectedTab === 'details'">
        <DetailsContent />
      </div>
      <div v-if="selectedTab === 'repair'">
        <RepairContent />
      </div>
      <div v-if="selectedTab === 'functions'">
        <FunctionsContent />
      </div>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage } from '@ionic/vue';
import { eye, construct, settings, eyeOutline, constructOutline, settingsOutline, keyOutline } from 'ionicons/icons';
import DetailsContent from '@/components/DetailsContent.vue';
import RepairContent from '@/components/RepairContent.vue';
import FunctionsContent from '@/components/FunctionsContent.vue';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const selectedTab = computed(() => route.query.tab || 'details');

const tabs = [
  { label: 'Details', value: 'details', icon: eyeOutline },
  { label: 'Repair', value: 'repair', icon: constructOutline },
  { label: 'Functions', value: 'functions', icon: keyOutline }
];

const updateTab = (newTab: string) => {
  router.replace({
    path: '/tabs/details',
    query: { ...route.query, tab: newTab, _force: Date.now() }
  });
};

</script>

<style scoped>
ion-content {
  --background: white;
}

ion-toolbar {
  --background: white;
  --color: black;
}

.porscheLogo {
  display: block;
  margin-top: 20px;
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
  justify-content: space-around;
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