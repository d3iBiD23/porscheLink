<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Account Page</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
</script>
<style scoped>
ion-content {
  --background: white;
}

ion-toolbar {
  --background: white;
  --color: black;
}
</style>