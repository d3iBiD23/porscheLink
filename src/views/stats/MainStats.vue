<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <div class="header">
                <img src="/assets/logos/porscheLogo.svg" alt="Porsche" class="logo">
                <ion-buttons slot="start" class="back-button">
                    <ion-back-button default-href="/tabs/homepage" text=""></ion-back-button>
                </ion-buttons>
            </div>

            <div class="car-container">
                <img src="/assets/imagesMainScreen/taycan/taycanImage.png" alt="Porsche Taycan" class="car-image">
                <div class="divider"></div>
            </div>

            <div class="content">
                <div class="title-row">
                    <h1>Statistics</h1>
                    <div class="date-selector">
                        <span>September</span>
                        <span>2024</span>
                        <ion-icon :icon="chevronForward" class="chevron"></ion-icon>
                    </div>
                </div>

                <div class="section">
                    <div class="section-text">
                        <h2>Driving Style</h2>
                        <p>Your driving style needs to improve!</p>
                    </div>
                    <div class="circle-progress">
                        <svg width="80" height="80" viewBox="0 0 80 80">
                            <circle cx="40" cy="40" r="35" class="circle-bg" />
                            <circle cx="40" cy="40" r="35" class="circle-value" />
                            <text x="40" y="40" class="circle-text">58%</text>
                        </svg>
                    </div>
                </div>

                <div class="divider_driving"></div>

                <div class="section">
                    <div class="section-text">
                        <h2>Braking</h2>
                        <p>Last trip braking efficiency</p>
                    </div>
                    <div class="graph-container">
                        <canvas ref="brakingChart"></canvas>
                    </div>
                </div>

                <div class="section">
                    <div class="section-text">
                        <h2>Battery</h2>
                    </div>
                </div>
            </div>

            <ion-tab-bar slot="bottom">
                <ion-tab-button tab="account">
                    <ion-icon :icon="person"></ion-icon>
                    <ion-label>Account</ion-label>
                </ion-tab-button>

                <ion-tab-button tab="home">
                    <ion-icon :icon="home"></ion-icon>
                    <ion-label>Home</ion-label>
                </ion-tab-button>

                <ion-tab-button tab="help">
                    <ion-icon :icon="helpCircle"></ion-icon>
                    <ion-label>Help</ion-label>
                </ion-tab-button>
            </ion-tab-bar>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import {
    IonPage,
    IonContent,
    IonBackButton,
    IonButtons,
    IonTabBar,
    IonTabButton,
    IonLabel,
    IonIcon
} from '@ionic/vue';
import { chevronForward, person, home, helpCircle } from 'ionicons/icons';
import Chart from 'chart.js/auto';

const brakingChart = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
    if (brakingChart.value) {
        new Chart(brakingChart.value, {
            type: 'line',
            data: {
                labels: Array.from({ length: 20 }, (_, i) => i + 1),
                datasets: [{
                    data: [70, 75, 72, 78, 74, 70, 68, 65, 62, 60, 58, 55, 52, 48, 45, 42, 38, 35, 32, 30],
                    borderColor: '#ff9f1c',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: false,
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        display: false
                    },
                    y: {
                        display: false,
                        min: 0,
                        max: 100
                    }
                }
            }
        });
    }
});
</script>

<style scoped>
ion-content {
    --background: white;
    --color: black;
}

ion-toolbar {
    --background: white;
    --color: black;
}

.header {
    position: relative;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.logo {
    position: absolute;
    margin-top: 90px;
    height: 0.9rem;
}

.back-button {
    position: absolute;
    left: 1rem;
    margin-top: 270px;
}

.car-container {
    position: relative;
    padding: 1rem;
    margin-bottom: 1rem;
}

.car-image {
    position: relative;
    width: 100%;
    height: auto;
    object-fit: contain;
}

.divider {
    position: absolute;
    top: 54%;
    left: 0;
    right: 0;
    height: 2px;
    background-color: #999999;
    z-index: -1;
}

.content {
    padding: 0 1rem;
}

.title-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

.title-row h1 {
    font-size: 24px;
    font-weight: 600;
    margin: 0;
}

.date-selector {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #666;
}

.chevron {
    color: #666;
    font-size: 1.2rem;
}

.section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1rem;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
}

.section:last-child {
    border-bottom: none;
}

.section-text h2 {
    font-size: 18px;
    font-weight: 500;
    margin: 0 0 0.5rem;
}

.section-text p {
    color: #666;
    margin: 0;
    font-size: 14px;
}

.circle-progress {
    width: 80px;
    height: 80px;
}

.circle-bg {
    fill: none;
    stroke: #e0e0e0;
    stroke-width: 8;
}

.circle-value {
    fill: none;
    stroke: #2ecc71;
    stroke-width: 8;
    stroke-dasharray: 219.91;
    stroke-dashoffset: 92.36;
    /* (1 - 0.58) * 219.91 */
    transform: rotate(-90deg);
    transform-origin: center;
}

.circle-text {
    fill: #000;
    font-size: 16px;
    font-weight: 500;
    text-anchor: middle;
    dominant-baseline: middle;
}

.graph-container {
    width: 120px;
    height: 60px;
}

:deep(ion-tab-bar) {
    border-top: 1px solid #e0e0e0;
}

:deep(ion-tab-button) {
    --color: #666;
    --color-selected: #000;
}

:deep(ion-back-button) {
    --color: #000;
    margin: 0;
}

.divider_driving {
    position: relative;
    left: 0;
    right: 0;
    height: 2px;
    background-color: #999999;
    z-index: -1;
}
</style>