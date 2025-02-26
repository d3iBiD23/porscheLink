<template>
    <div class="details-content">
        <!-- Car Image Section -->
        <div class="car-image-section mb-8">
            <img src="/assets/imagesMainScreen/taycan/taycanImage.png" alt="Porsche Taycan" class="taycanImage" />
        </div>
        <div class="functions-section">
            <h2 class="section-title-service">Functions</h2>

            <ion-button fill="outline" class="function-button">
                <img src="/assets/functionsIcons/Power.svg" alt="Power" class="icon-functions">
                <span>Start Vehicle</span>
            </ion-button>
            <ion-button fill="outline" class="function-button">
                <img src="/assets/functionsIcons/Door.svg" alt="Door" class="icon-functions">
                <span>Open Doors</span>
            </ion-button>
            <ion-button fill="outline" class="function-button">
                <img src="/assets/functionsIcons/Siren.svg" alt="Siren" class="icon-functions">
                <span>Turn On Signals</span>
            </ion-button>
            <ion-button fill="outline" class="function-button">
                <img src="/assets/functionsIcons/Music.svg" alt="Music" class="icon-functions">
                <span>Turn On Radio</span>
            </ion-button>
            <ion-button fill="outline" class="function-button">
                <img src="/assets/functionsIcons/Lights.svg" alt="Lights" class="icon-functions">
                <span>Turn On Lights</span>
            </ion-button>
            <ion-button fill="outline" class="function-button">
                <img src="/assets/functionsIcons/Fan.svg" alt="Fan" class="icon-functions">
                <span>Turn On AC</span>
            </ion-button>
            <ion-button fill="outline" class="function-button">
                <img src="/assets/functionsIcons/MapPinArea.svg" alt="MapPinArea" class="icon-functions">
                <span>Locate Vehicle</span>
            </ion-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { IonButton } from '@ionic/vue';
</script>

<style scoped>
.taycanImage {
    position: relative;
    margin-top: -100px;
    margin-left: 100px;
}

.details-content {
    padding: 20px;
}

.section-title-service {
    text-align: left;
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin-bottom: 2rem;
}

.functions-section {
    text-align: center;
    margin-top: 16px;
}

.function-button {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    /* Cambiado a flex-start */
    gap: 16px;
    /* Aseguramos que el gap funcione */

    width: 90%;
    max-width: 500px;
    margin: 0 auto 16px;

    --border-width: 2px;
    --border-color: #000;
    --border-radius: 8px;

    --color: #444;
    --background: #fff;

    font-size: 18px;
    font-weight: 500;
    text-transform: none;

    --padding-start: 20px;
    --padding-end: 16px;
    --padding-top: 12px;
    --padding-bottom: 12px;
}

.function-button span {
    flex-grow: 1;
    text-align: left;
}

.icon-functions {
    width: 24px;
    height: 24px;
    margin-left: 2rem;
    margin-right: 15%;
}
</style>