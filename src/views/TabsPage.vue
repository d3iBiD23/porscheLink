<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="accountpage" href="/tabs/accountpage">
          <ion-icon aria-hidden="true" :icon="personOutline" />
          <ion-label>Account</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="homepage" href="/tabs/homepage">
          <ion-icon aria-hidden="true" :icon="homeOutline" />
          <ion-label>Home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="help" href="/tabs/help">
          <ion-icon aria-hidden="true" :icon="helpCircleOutline" />
          <ion-label>Help</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { helpCircleOutline, homeOutline, personOutline } from 'ionicons/icons';
</script>
<style scoped>
ion-tab-bar {
  --background: white;
}

ion-tab-button {
  color: black;
}
</style>
