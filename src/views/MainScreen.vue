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
                    <img src="\public\assets\taycanImage.png" alt="Taycan Turbo S" class="car-image">
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
    IonToolbar
} from '@ionic/vue';
import {
    batteryHalfSharp,
    carOutline,
    flashlightOutline,
    helpCircleOutline,
    locationOutline,
    mapOutline,
    person,
    searchOutline,
    statsChartOutline
} from 'ionicons/icons';

const router = useRouter();

const goToOverview = () => {
    router.push('/tabs/details');
};
</script>


<style scoped>
.last-updated {
    display: block;
    padding: 8px 16px;
    color: #666;
    font-size: 14px;
}

.car-container {
    padding: 16px;
}

.car-title {
    font-size: 24px;
    font-weight: bold;
    margin: 16px 0;
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
    --border-color: #ccc;
    --color: white;
    margin: 16px 0;
}

.battery-status {
    border: 1px solid #ccc;
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
    color: #666;
}

.charging-status {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #666;
}

.status-icons {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
}

.action-buttons {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin-top: 16px;
}

.action-button {
    --padding-start: 0;
    --padding-end: 0;
}

.button-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
}

ion-icon {
    font-size: 24px;
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
    --color: black;
}
</style>