<template>
    <IonPage>
        <IonContent>
            <IonText class="last-updated">Last updated: 5 minutes ago</IonText>
            <div class="car-container">
                <h1 class="car-title">
                    {{ getCarTitle() }}
                </h1>
                <!-- SWIPER SLIDER  -->
                <swiper :modules="[Pagination]" :pagination="{ clickable: true }" :loop="false"
                    @slideChange="onSlideChange" class="car-slider">
                    <swiper-slide v-for="(car, index) in cars" :key="car.id">
                        <div class="car-item">
                            <img v-bind:src="car.lineLeft" alt="line-left" class="line-left">
                            <img v-bind:src="car.modelLogo" :alt="car.name + ' Model logo'" class="car-model">
                            <img v-bind:src="car.lineRight" alt="line-right" class="line-right">
                            <img v-bind:src="car.image" :alt="car.name" class="car-image">
                        </div>
                    </swiper-slide>
                </swiper>

                <div class="mid-container">
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
                                <img src="/public/assets/imagesMainScreen/ChargingStation.svg" alt="ChargingStation"
                                    class="battery-icon">
                                <span class="text-battery">Charging plug not connected</span>
                            </div>
                            <div class="charging-progress">
                                <img src="/public/assets/imagesMainScreen/battery_gradient.svg" alt="battery_gradient">
                            </div>

                            <div class="status-icons">
                                <img src="/public/assets/imagesMainScreen/Headlights.svg" alt="Headlights">
                                <div class="separator"></div>
                                <img src="/public/assets/imagesMainScreen/key.svg" alt="key" class="key">
                            </div>
                        </div>
                    </div>

                    <!-- ACTION BUTTONS -->

                    <div class="action-buttons">
                        <ion-button fill="clear" class="action-button">
                            <div class="button-content">
                                <img src="/public/assets/imagesMainScreen/ChargingStation.svg" alt="ChargingStation">
                                <span>STATIONS</span>
                            </div>
                        </ion-button>
                        <ion-button fill="clear" class="action-button">
                            <div class="button-content">
                                <img src="/public/assets/imagesMainScreen/ChartLine.svg" alt="ChartLine">
                                <span>STATS</span>
                            </div>
                        </ion-button>
                        <ion-button fill="clear" class="action-button">
                            <div class="button-content">
                                <img src="/public/assets/imagesMainScreen/Engine.svg" alt="Engine">
                                <span>OBD</span>
                            </div>
                        </ion-button>
                    </div>
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
    IonPage,
    IonText,
} from '@ionic/vue';

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from "swiper/modules";
import { ref } from "vue";
import 'swiper/css';
import 'swiper/css/pagination';
import "swiper/css/effect-fade";

const router = useRouter();

const activeIndex = ref(0); // Slide activo

const onSlideChange = (swiper: any) => {
    activeIndex.value = swiper.realIndex; // Guarda el índice del slide visible
};

const goToOverview = () => {
    router.push('/tabs/details');
};

const getCarTitle = () => {
    return activeIndex.value === 0 ? "My Taycan Turbo S" : "My 911 GT3 RS";
};


// Lista de coches en el slider
const cars = [
    {
        id: 1,
        name: "Taycan Turbo S",
        lineLeft: "/public/assets/imagesMainScreen/taycan/lineLeftTaycan.svg",
        modelLogo: "/public/assets/imagesMainScreen/taycan/Taycan.svg",
        lineRight: "/public/assets/imagesMainScreen/taycan/lineRightTaycan.svg",
        image: "/public/assets/imagesMainScreen/taycan/taycanImage.png",
    },
    {
        id: 2,
        name: "911 GT3 RS",
        lineLeft: "/public/assets/imagesMainScreen/gt3/lineLeftGt3.svg",
        modelLogo: "/public/assets/imagesMainScreen/gt3/911gt3rs.svg",
        lineRight: "/public/assets/imagesMainScreen/gt3/lineRightGt3.svg",
        image: "/public/assets/imagesMainScreen/gt3/porschegt3.png",
    },
];
</script>


<style scoped>
.car-slider {
    width: 100%;
    height: 260px;
    /* Ajusta este valor según lo necesites */
    overflow: hidden;
    position: relative;
    margin-bottom: 20px;
}

.car-item {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    /* Asegura que los coches estén alineados por la base */
    height: 100%;
}

.taycan-style .car-model {
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    max-width: 80%;
}

.taycan-style .car-image {
    max-width: 90%;
    bottom: 0;
}

.gt3-style .car-model {
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    max-width: 90%;
}

.gt3-style .car-image {
    max-width: 90%;
    bottom: 0;
    /* Igual que el Taycan */
}

/* Ajuste de líneas laterales */
.line-left,
.line-right {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 70px;
    opacity: 75%;
}

.line-left {
    left: 10px;
}

.line-right {
    right: 10px;
}

.car-image {
    width: 100%;
    height: auto;
    object-fit: contain;
    display: block;
    margin: 0 auto;
    position: absolute;
    bottom: 0;
    /* Asegura que ambos coches toquen la base */
}

.swiper-slide {
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
}

.swiper-slide-active {
    opacity: 1;
}

/* Personalización de los puntos de paginación */
/* Personalización de los puntos de paginación */
:deep(.swiper-pagination-bullet) {
    background-color: #565656;
    opacity: 0.7;
}

:deep(.swiper-pagination-bullet-active) {
    background-color: #FC0;
    opacity: 1;
}


.key {
    width: 24px;
    height: 24px;
    object-fit: contain;
}

.separator {
    width: 1.5px;
    /* Grosor de la línea */
    height: 24px;
    /* Alto de la línea */
    background: rgba(0, 0, 0, 0.60);
    margin: 0 12px;
    /* Espacio a los lados para que no esté pegada */
}


.text-battery {
    font-size: 15px;
}

.mid-container {
    margin-top: 40px;
}


.car-model {
    position: absolute;
    top: 31%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
}

.last-updated {
    display: block;
    padding: 8px 16px;
    margin-left: 20px;
    margin-top: 30px;
    color: #444444;
    font-size: 14px;
}

.car-container {
    padding: 16px;
}

.car-title {
    font-size: 30px;
    font-weight: bold;
    margin-top: 1px;
    margin-left: 20px;
}

.car-slider {
    position: relative;
    bottom: 2%;
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
    justify-content: space-between;
    /* Distribuye los botones uniformemente */
    gap: 8px;
    /* Espacio entre botones */
    margin-top: 16px;
    width: 100%;
    /* Asegura que ocupe todo el ancho del contenedor */
    max-width: 400px;
    /* Ajusta este valor según el tamaño del contenedor de batería */
    margin-left: auto;
    margin-right: auto;
    /* Centra los botones */
}

.action-button {
    flex: 1;
    /* Hace que los botones ocupen el mismo ancho */
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
    max-width: 120px;
    /* Limita el ancho máximo */
    min-width: 100px;
    /* Evita que sean demasiado pequeños */
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