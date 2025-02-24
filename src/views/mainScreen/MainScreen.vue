<template>
    <ion-page>
        <ion-content>
            <ion-text class="last-updated">Last updated: 5 minutes ago</ion-text>
            <div class="car-container">
                <h1 class="car-title">{{ getCarTitle() }}</h1>
                <swiper :modules="[Pagination]" :pagination="{ clickable: true }" :loop="false"
                    @slideChange="onSlideChange" class="car-slider">
                    <swiper-slide v-for="car in cars" :key="car.id">
                        <div class="car-item">
                            <img :src="car.lineLeft" alt="line-left" class="line-left">
                            <img :src="car.modelLogo" :alt="`${car.name} Model logo`" class="car-model">
                            <img :src="car.lineRight" alt="line-right" class="line-right">
                            <img :src="car.image" :alt="car.name" class="car-image">
                        </div>
                    </swiper-slide>
                </swiper>

                <div class="mid-container">
                    <ion-button expand="block" fill="outline" class="details-button" @click="goToOverview">
                        Vehicle Details
                    </ion-button>

                    <div class="battery-status" @click="goToOverview">
                        <div class="battery-info">
                            <div class="battery-percentage">
                                <span class="percentage">72%</span>
                                <span class="range">553km</span>
                            </div>
                            <div class="charging-status">
                                <img src="/assets/imagesMainScreen/ChargingStation.svg" alt="ChargingStation"
                                    class="battery-icon">
                                <span class="text-battery">Charging plug not connected</span>
                            </div>
                            <div class="charging-progress">
                                <img src="/assets/imagesMainScreen/battery_gradient.svg" alt="battery_gradient">
                            </div>
                            <div class="status-icons">
                                <img src="/assets/imagesMainScreen/Headlights.svg" alt="Headlights">
                                <div class="separator"></div>
                                <div class="key-wrapper" @click.stop="goToFunctions">
                                    <img src="/assets/imagesMainScreen/key.svg" alt="key" class="key" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="action-buttons">
                        <ion-button v-for="action in actions" :key="action.name" fill="clear" class="action-button"
                            @click="handleAction(action)">
                            <div class="button-content">
                                <img :src="action.icon" :alt="action.name">
                                <span>{{ action.name }}</span>
                            </div>
                        </ion-button>
                    </div>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { IonButton, IonContent, IonPage, IonText } from '@ionic/vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from "swiper/modules";
import { ref } from "vue";
import 'swiper/css';
import 'swiper/css/pagination';

const router = useRouter();
const route = useRoute();

const activeIndex = ref(0);

const onSlideChange = (swiper: any) => {
    activeIndex.value = swiper.realIndex;
};

const goToOverview = () => {
    router.push('/tabs/details');
};

const getCarTitle = () => {
    return activeIndex.value === 0 ? "My Taycan Turbo S" : "My 911 GT3 RS";
};

const cars = [
    {
        id: 1,
        name: "Taycan Turbo S",
        lineLeft: "/assets/imagesMainScreen/taycan/lineLeftTaycan.svg",
        modelLogo: "/assets/imagesMainScreen/taycan/Taycan.svg",
        lineRight: "/assets/imagesMainScreen/taycan/lineRightTaycan.svg",
        image: "/assets/imagesMainScreen/taycan/taycanImage.png",
    },
    {
        id: 2,
        name: "911 GT3 RS",
        lineLeft: "/assets/imagesMainScreen/gt3/lineLeftGt3.svg",
        modelLogo: "/assets/imagesMainScreen/gt3/911gt3rs.svg",
        lineRight: "/assets/imagesMainScreen/gt3/lineRightGt3.svg",
        image: "/assets/imagesMainScreen/gt3/porschegt3.png",
    },
];

const actions = [
    { name: "STATIONS", icon: "/assets/imagesMainScreen/ChargingStation.svg" },
    { name: "STATS", icon: "/assets/imagesMainScreen/ChartLine.svg" },
    { name: "OBD", icon: "/assets/imagesMainScreen/Engine.svg" },
];

const handleAction = (action: { name: string, icon: string }) => {
    switch (action.name) {
        case "STATIONS":
            router.push('/tabs/maps');
            break;
        case "STATS":
            router.push('/stats');
            break;
        case "OBD":
            router.push({ path: '/tabs/details', query: { tab: 'repair' } });
            break;
        default:
            console.warn("Accion no reconocida.");
    }
};

const goToFunctions = () => {
    // Obtenemos la ruta y query actuales
    router.replace({
        path: '/tabs/details',
        query: { ...route.query, tab: 'functions', _force: Date.now() }
    });
};

</script>

<style scoped>
.car-slider {
    width: 100%;
    height: 260px;
    overflow: hidden;
    position: relative;
    margin-bottom: 20px;
}

.car-item {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    height: 100%;
}

.car-model {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    max-width: 80%;
}

.car-image {
    max-width: 90%;
    position: absolute;
    bottom: 0;
}

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

:deep(.swiper-pagination-bullet) {
    background-color: #565656;
    opacity: 0.7;
}

:deep(.swiper-pagination-bullet-active) {
    background-color: #FC0;
    opacity: 1;
}

.key-wrapper {
    /* Para que sea un bloque/inline-block con padding */
    display: inline-flex;
    /* o inline-block */
    align-items: center;
    justify-content: center;
    padding: 2px;
    /* Aumenta según necesites la zona clicable */
    cursor: pointer;
    /* Indica que se puede hacer clic */
}

.key {
    width: 24px;
    height: 24px;
    object-fit: contain;
}

.separator {
    width: 1.5px;
    height: 24px;
    background: rgba(0, 0, 0, 0.60);
    margin: 0 12px;
}

.text-battery {
    font-size: 15px;
}

.mid-container {
    margin-top: 40px;
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

.details-button {
    --border-radius: 8px;
    --border-color: #444;
    --color: #1E1E1E;
    font-size: 20px;
    margin: 16px 0;
    text-transform: none;
    font-family: 'Inter', sans-serif;
    box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.3);
}

.battery-status {
    border: 2px solid #444;
    border-radius: 8px;
    padding: 16px;
    margin: 16px 0;
    box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.3);
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
    gap: 8px;
    margin-top: 16px;
    width: 100%;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 30px;
}

.action-button {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: white;
    border: 2px solid #444444;
    border-radius: 12px;
    padding: 2px;
    box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.3);
    transition: all 0.2s ease-in-out;
    text-align: center;
    max-width: 120px;
    min-width: 100px;
}

.button-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #444444;
    font-size: 13px;
    font-weight: bolder;
    gap: 12px;
}

:deep(ion-content) {
    --background: white;
    --color: #1E1E1E;
    font-family: 'Inter', sans-serif;
    font-weight: bold;
}
</style>