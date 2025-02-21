<template>
    <IonPage>
        <IonContent>
            <IonText class="last-updated">Last updated: 5 minutes ago</IonText>
            <div class="car-container">
                <h1 class="car-title">
                    My Taycan Turbo S
                </h1>
                <!-- CAR IMAGE SLIDER -->
                <div class="car-slider">
                    <img src="/public/assets/imagesLogoMainScreen/Line 1.png" alt="line-left" class="line-left">
                    <img src="/public/assets/imagesLogoMainScreen/Taycan.png" alt="Taycan Turbo S" class="car-model">
                    <img src="/public/assets/imagesLogoMainScreen/Line 2.png" alt="line-left" class="line-right">
                    <img src="/public/assets/taycanImage.png" alt="Taycan Turbo S" class="car-image">
                    <div class="dots">
                        <span class="dot active"></span>
                        <span class="dot"></span>
                    </div>
                </div>

                <!-- VEHICLE DETAILS BUTTON -->
                <IonButton expand="block" fill="outline" class="details-button" @click="goToOverview">
                    Vehicle Details
                </IonButton>

                <!-- BATTERY STATUS SECTION -->
                <div class="battery-status" @click="goToOverview">
                    <div class="battery-info">
                        <div class="battery-percentage">
                            <span class="percentage">72%</span>
                            <span class="range">553km</span>
                        </div>
                        <div class="charging-status">
                            <ion-icon :icon="batteryHalfSharp" class="battery-icon"></ion-icon>
                            <span>Charging plug not connected</span>
                        </div>
                        <div class="status-icons">
                            <ion-icon :icon="flashlightOutline"></ion-icon>
                            
                            <ion-icon :icon="searchOutline"></ion-icon>
                        </div>
                    </div>
                </div>

                <!-- ACTION BUTTONS -->

                <div class="action-buttons">
                    <ion-button fill="clear" class="action-button">
                        <div class="button-content">
                            <ion-icon :icon="locationOutline"></ion-icon>
                            <span>STATIONS</span>
                        </div>
                    </ion-button>
                    <ion-button fill="clear" class="action-button">
                        <div class="button-content">
                            <ion-icon :icon="statsChartOutline"></ion-icon>
                            <span>STATS</span>
                        </div>
                    </ion-button>
                    <ion-button fill="clear" class="action-button">
                        <div class="button-content">
                            <ion-icon :icon="carOutline"></ion-icon>
                            <span>OBD</span>
                        </div>
                    </ion-button>
                </div>
            </div>
        </IonContent>
    </IonPage>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import {
    IonButton,
    IonContent,
    IonHeader,
    IonIcon,
    IonPage,
    IonText,
} from '@ionic/vue';
import {
    batteryHalfSharp,
    carOutline,
    flashlightOutline,
    locationOutline,
    searchOutline,
    statsChartOutline
} from 'ionicons/icons';

const router = useRouter();

const goToOverview = () => {
    router.push('/tabs/details');
};
</script>


<style scoped>
.line-left {
    position: absolute;
    margin-top: 130px;
    left: 10px;
}

.line-right {
    position: absolute;
    margin-top: 130px;
    right: 10px
}

.car-model{
    position: absolute;
    margin-left: 62px;
    margin-top: 50px;
    z-index: -1;
}

.last-updated {
    display: block;
    padding: 8px 16px;
    margin-left: 20px;
    margin-top: 30px;
    color: #666;
    font-size: 14px;
}

.car-container {
    padding: 16px;
}

.car-title {
    font-size: 24px;
    font-weight:    bold;
    margin-top: 1px;
    margin-left: 20px;
}

.car-slider {
    position: relative;
    margin-bottom: 20px;
}

.car-image {
    width: 100%;
    height: auto;
    object-fit: contain;
}

.dots {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 12px;
}

.dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #ccc;
}

.dot.active {
    background-color: #F28100;
}

.details-button {
    --border-radius: 8px;
    --border-color: #444;
    --color: black;
    font-size: 18px;
    margin: 16px 0;
    text-transform: none;
    font-family: 'Inter', sans-serif;
    font-weight: 400;
}

.battery-status {
    border: 2px solid #444;
    border-radius: 8px;
    padding: 16px;
    margin: 16px 0;
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

.status-icons {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
    padding: 0 50px;
}

.action-buttons {
    display: flex;
    justify-content: space-between; /* Distribuye los botones uniformemente */
    gap: 8px; /* Espacio entre botones */
    margin-top: 16px;
    width: 100%; /* Asegura que ocupe todo el ancho del contenedor */
    max-width: 400px; /* Ajusta este valor según el tamaño del contenedor de batería */
    margin-left: auto;
    margin-right: auto; /* Centra los botones */
}

.action-button {
    flex: 1; /* Hace que los botones ocupen el mismo ancho */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: white;
    border: 2px solid #444444;
    border-radius: 12px;
    padding: 9px;
    box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease-in-out;
    text-align: center;
    max-width: 120px; /* Limita el ancho máximo */
    min-width: 100px; /* Evita que sean demasiado pequeños */
}

.button-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: bold;
    color: #444444;
}

ion-icon {
    font-size: 24px;
    color: #1E1E1E;
}

ion-tab-bar {
    --background: white;
    border-top: 1px solid #eee;
}

ion-tab-button {
    --color: #666;
    --color-selected: #F28100;
}

ion-content {
    --background: white;
    --color: #1E1E1E;
    font-family: 'Inter', sans-serif;
    font-weight: bold;
}
</style>