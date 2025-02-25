<template>
    <ion-page>
        <div class="status-bar">
            <span class="time">16:38</span>
            <ion-icon :icon="wifiOutline" class="wifi-icon"></ion-icon>
        </div>

        <ion-content :fullscreen="true">
            <div class="header">
                <ion-buttons class="back-button">
                    <ion-back-button default-href="/tabs/homepage" text=""></ion-back-button>
                </ion-buttons>
                <img src="/assets/logos/porscheLogo.svg" alt="Porsche" class="logo">
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
                        <svg viewBox="0 0 36 36" class="circular-chart">
                            <path d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#DDDDDD" stroke-width="4" />
                            <path d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#00FF2F" stroke-width="4"
                                :stroke-dasharray="`${58}, 100`" />
                            <text x="18" y="20.35" class="percentage">58%</text>
                        </svg>
                    </div>
                </div>

                <div class="divider-line"></div>

                <div class="section">
                    <div class="section-text">
                        <h2>Braking</h2>
                        <p>Last trip braking efficiency</p>
                    </div>
                    <div class="graph-container">
                        <canvas ref="brakingChart"></canvas>
                    </div>
                </div>

                <div class="divider-line"></div>

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
import { chevronForward, person, home, helpCircle, wifiOutline } from 'ionicons/icons';
import Chart from 'chart.js/auto';

const brakingChart = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
    if (brakingChart.value) {
        new Chart(brakingChart.value, {
            type: 'line',
            data: {
                labels: Array.from({ length: 20 }, (_, i) => i + 1),
                datasets: [{
                    data: [80, 85, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20],
                    borderColor: (context) => {
                        const value = context.raw;
                        if (value > 70) return '#00FF2F';
                        if (value > 40) return '#F28100';
                        return '#FF0000';
                    },
                    tension: 0.4,
                    borderWidth: 2.5,
                    pointRadius: 0,
                }]
            },
            options: {
                plugins: { legend: { display: false } },
                scales: {
                    x: { display: false },
                    y: { display: false, min: 0, max: 100 }
                },
                responsive: true,
                maintainAspectRatio: false,
            }
        });
    }
});
</script>

<style scoped>
ion-content {
    --background: #ffffff;
    --color: #000000;
}

.status-bar {
    height: 44px;
    padding: 12px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    font-weight: 500;
}

.time {
    font-size: 16px;
}

.wifi-icon {
    font-size: 18px;
}

ion-content {
    --background: white;
    --padding-top: 0;
}

.header {
    padding: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.logo {
    height: 12px;
    margin-top: 16px;
}

.back-button {
    position: absolute;
    left: 4px;
    top: 50%;
    transform: translateY(-50%);
}

ion-back-button {
    --color: black;
    --icon-font-size: 24px;
    --padding-start: 0;
}

.car-container {
    position: relative;
    padding: 0 16px;
    margin: 32px 0;
}

.car-image {
    width: 100%;
    height: auto;
}

.divider {
    position: absolute;
    bottom: 25%;
    left: 0;
    right: 0;
    height: 1px;
    background-color: #999999;
}

.content {
    padding: 0 16px;
}

.title-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
}

.title-row h1 {
    font-size: 32px;
    font-weight: 600;
    margin: 0;
}

.date-selector {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #444444;
    font-size: 16px;
}

.chevron {
    color: #F28100;
    font-size: 20px;
}

.section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 0;
}

.section-text h2 {
    font-size: 24px;
    font-weight: 600;
    margin: 0 0 8px;
    color: #1E1E1E;
}

.section-text p {
    color: #999999;
    margin: 0;
    font-size: 16px;
}

.divider-line {
    height: 1px;
    background-color: #AEAEAE;
}

.circular-chart {
    width: 80px;
    height: 80px;
    transform: rotate(-90deg);
}

.circular-chart .percentage {
    fill: #1E1E1E;
    font-size: 0.6em;
    font-weight: 600;
    text-anchor: middle;
    transform: rotate(90deg) translate(0, -0.35em);
}

.graph-container {
    width: 200px;
    height: 80px;
}

ion-tab-bar {
    --background: white;
    height: 83px;
    padding-bottom: 20px;
}

ion-tab-button {
    --color: #444444;
    --color-selected: #1E1E1E;
}

ion-tab-button ion-icon {
    font-size: 24px;
    margin-bottom: 4px;
}

ion-tab-button ion-label {
    font-size: 12px;
    font-weight: 500;
}
</style>