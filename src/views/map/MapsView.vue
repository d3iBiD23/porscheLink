<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Maps Page</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <img src="/assets/map_image.svg" alt="map_image">
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

P {
    color: black;
}
</style>