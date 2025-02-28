<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar v-if="showTabBar" slot="bottom">
        <template v-if="onMainScreen">
          <ion-tab-button tab="accountpage" href="/account">
            <ion-icon :icon="personOutline" />
            <ion-label>Account</ion-label>
          </ion-tab-button>
          <ion-tab-button tab="maps" href="/maps">
            <ion-icon :icon="mapOutline" />
            <ion-label>Map</ion-label>
          </ion-tab-button>
          <ion-tab-button tab="help" href="/help">
            <ion-icon :icon="helpCircleOutline" />
            <ion-label>Help</ion-label>
          </ion-tab-button>
        </template>

        <template v-else>
          <ion-tab-button tab="accountpage" href="/porschelink/accountpage">
            <ion-icon :icon="personOutline" />
            <ion-label>Account</ion-label>
          </ion-tab-button>
          <ion-tab-button tab="homepage" href="/porschelink/homepage">
            <ion-icon :icon="homeOutline" />
            <ion-label>Home</ion-label>
          </ion-tab-button>
          <ion-tab-button tab="help" href="/help">
            <ion-icon :icon="helpCircleOutline" />
            <ion-label>Help</ion-label>
          </ion-tab-button>
        </template>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { helpCircleOutline, homeOutline, mapOutline, personOutline } from 'ionicons/icons';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// Computada para determinar si estamos en la "pantalla principal"
const onMainScreen = computed(() => route.path === '/porschelink/homepage');

const noTabPaths = ['/porschelink/accountpage', '/account']

const showTabBar = computed(() => {
  return !noTabPaths.includes(route.path)
})

</script>
<style scoped>
ion-tab-bar {
  --background: white;
  padding: 4px;
  border-top: 2px solid rgba(174, 174, 174, 1);
}

ion-icon {
  margin-bottom: 4px;
}

ion-tab-button {
  color: black;
  font-weight: bolder;
}
</style>