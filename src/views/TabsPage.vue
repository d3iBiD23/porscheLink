<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">

        <template v-if="onMainScreen">
          <ion-tab-button tab="accountpage" href="/account">
            <ion-icon :icon="personOutline" />
            <ion-label>Account</ion-label>
          </ion-tab-button>
          <ion-tab-button tab="maps" href="/maps">
            <ion-icon :icon="mapOutline" />
            <ion-label>Map</ion-label>
          </ion-tab-button>
          <ion-tab-button tab="help" href="/tabs/help">
            <ion-icon :icon="helpCircleOutline" />
            <ion-label>Help</ion-label>
          </ion-tab-button>
        </template>

        <template v-else>
          <ion-tab-button tab="accountpage" href="/tabs/accountpage">
            <ion-icon :icon="personOutline" />
            <ion-label>Account</ion-label>
          </ion-tab-button>
          <ion-tab-button tab="homepage" href="/tabs/homepage">
            <ion-icon :icon="homeOutline" />
            <ion-label>Home</ion-label>
          </ion-tab-button>
          <ion-tab-button tab="help" href="/tabs/help">
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
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const onMainScreen = computed(() => route.path === '/tabs/homepage')
</script>
<style scoped>
ion-tab-bar {
  --background: white;
}

ion-tab-button {
  color: black;
}

</style>
