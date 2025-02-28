<template>
    <ion-page>
        <ion-content>
            <!-- Header con back button y logo -->
            <div class="header">
                <ion-buttons class="back-button">
                    <ion-back-button default-href="/porschelink/homepage" text=""></ion-back-button>
                </ion-buttons>
                <img src="/assets/logos/porscheLogo.svg" alt="Porsche" class="logo" />
            </div>

            <!-- Imagen del auto con línea divisoria -->
            <div class="car-container">
                <img src="/assets/imagesMainScreen/taycan/taycanImage.png" alt="Porsche Taycan" class="car-image" />
                <div class="divider"></div>
            </div>

            <!-- Contenedor principal de estadísticas -->
            <div class="stats-container">
                <h1 class="stats-title">Statistics</h1>
                <!-- Navegación de meses (flechas y nombre del mes) -->
                <div class="month-nav">
                    <!-- Flecha izquierda (si currentMonthIndex es 0, la ocultamos con visibility: hidden) -->
                    <ion-button fill="clear" @click="prevMonth"
                        :style="{ color: '#F28100', visibility: currentMonthIndex === 0 ? 'hidden' : 'visible' }">
                        <ion-icon :icon="chevronBackOutline" />
                    </ion-button>

                    <!-- Texto del mes SIEMPRE en el medio -->
                    <p class="stats-month">
                        {{ monthsData[currentMonthIndex].monthName }}
                    </p>

                    <!-- Flecha derecha (si currentMonthIndex es el último, la ocultamos) -->
                    <ion-button fill="clear" @click="nextMonth"
                        :style="{ color: '#F28100', visibility: currentMonthIndex === monthsData.length - 1 ? 'hidden' : 'visible' }">
                        <ion-icon :icon="chevronForwardOutline" />
                    </ion-button>
                </div>

                <div class="stats-divider"></div>

                <!-- Driving Style (Gauge con Chart.js Doughnut) -->
                <div class="section-block">
                    <h2 class="section-title">Driving Style</h2>
                    <div class="driving-style-row">
                        <div class="driving-text">
                            <p class="driving-comment">
                                {{ monthsData[currentMonthIndex].drivingComment }}
                            </p>
                        </div>
                        <div class="driving-gauge">
                            <canvas ref="drivingGaugeCanvas"></canvas>
                            <!-- Texto con el porcentaje encima -->
                            <span class="percentage">
                                {{ monthsData[currentMonthIndex].gaugeData[0] }}%
                            </span>
                        </div>
                    </div>
                </div>
                <div class="stats-divider"></div>

                <!-- Braking Chart (Line chart) -->
                <div class="section-block">
                    <h2 class="section-title">Braking</h2>
                    <p class="section-subtitle">Last trips braking efficiency</p>
                    <canvas ref="brakingChartCanvas" class="chart-canvas"></canvas>
                </div>
                <div class="stats-divider"></div>

                <!-- Battery Chart (Bar chart) -->
                <div class="section-block">
                    <h2 class="section-title">Battery</h2>
                    <p class="section-subtitle">Last trips battery efficiency</p>
                    <canvas ref="batteryChartCanvas" class="chart-canvas"></canvas>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
    IonPage,
    IonContent,
    IonBackButton,
    IonButtons,
    IonButton,
    IonIcon
} from '@ionic/vue';
import {
    chevronBackOutline,
    chevronForwardOutline
} from 'ionicons/icons';
import Chart from 'chart.js/auto';

const monthsData = [
    {
        monthName: 'September 2024',
        gaugeData: [58, 42],
        gaugeColor: ['#FF8C00', '#444'],
        drivingComment: 'Your driving style needs to improve!',
        brakingData: [20, 35, 55],
        batteryData: [75, 80, 70],
    },
    {
        monthName: 'October 2024',
        gaugeData: [70, 30],
        gaugeColor: ['#4CAF50', '#444'],
        drivingComment: 'Your driving style is improving!',
        brakingData: [35, 65, 75],
        batteryData: [80, 85, 72],
    },
    {
        monthName: 'November 2024',
        gaugeData: [87, 13],
        gaugeColor: ['#00FF2F', '#444'],
        drivingComment: 'Your driving style is amazing!',
        brakingData: [55, 75, 95],
        batteryData: [90, 88, 84],
    },
];

const currentMonthIndex = ref(0);

const drivingGaugeCanvas = ref<HTMLCanvasElement | null>(null);
const brakingChartCanvas = ref<HTMLCanvasElement | null>(null);
const batteryChartCanvas = ref<HTMLCanvasElement | null>(null);

let drivingGaugeChart: Chart | null = null;
let brakingChart: Chart | null = null;
let batteryChart: Chart | null = null;

/**
 * Inicializa las gráficas.
 * Se añade un degradado para 'brakingChart' (línea) y 'batteryChart' (barras).
 */
function initCharts() {
    // Driving Style (Gauge)
    if (drivingGaugeCanvas.value) {
        drivingGaugeChart = new Chart(drivingGaugeCanvas.value, {
            type: 'doughnut',
            data: {
                labels: ['Good', 'Remaining'],
                datasets: [
                    {
                        data: monthsData[currentMonthIndex.value].gaugeData,
                        backgroundColor: monthsData[currentMonthIndex.value].gaugeColor,
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                cutout: '70%',
                plugins: {
                    tooltip: { enabled: false },
                    legend: { display: false },
                },
            },
        });
    }

    // Braking (Line)
    if (brakingChartCanvas.value) {
        const ctx = brakingChartCanvas.value.getContext('2d');
        if (ctx) {
            // Creamos un degradado lineal de izquierda a derecha
            const brakingGradient = ctx.createLinearGradient(0, 0, ctx.canvas.width, 0);
            // Ajusta los colores/paradas según tu prototipo
            brakingGradient.addColorStop(0, '#FF0000'); // rojo
            brakingGradient.addColorStop(0.5, '#FFA500'); // naranja
            brakingGradient.addColorStop(1, '#008000'); // verde

            brakingChart = new Chart(brakingChartCanvas.value, {
                type: 'line',
                data: {
                    labels: ['Trip 1', 'Trip 2', 'Trip 3'],
                    datasets: [
                        {
                            label: 'Braking Efficiency',
                            data: monthsData[currentMonthIndex.value].brakingData,
                            fill: false,
                            borderColor: brakingGradient, // Usamos el gradient
                            tension: 0.1,
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                        },
                    },
                    plugins: {
                        legend: { display: false },
                    },
                },
            });
        }
    }

    // Battery (Bar)
    if (batteryChartCanvas.value) {
        const ctx = batteryChartCanvas.value.getContext('2d');
        if (ctx) {
            // Degradado vertical (de arriba a abajo)
            const batteryGradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
            // Ajusta los colores/paradas según tu prototipo
            batteryGradient.addColorStop(0, '#006212');  // verde claro 678A3B
            batteryGradient.addColorStop(1, '#A8E063');  // verde más oscuro

            batteryChart = new Chart(batteryChartCanvas.value, {
                type: 'bar',
                data: {
                    labels: ['Trip 1', 'Trip 2', 'Trip 3'],
                    datasets: [
                        {
                            label: 'Battery Efficiency',
                            data: monthsData[currentMonthIndex.value].batteryData,
                            backgroundColor: batteryGradient, // Usamos el gradient
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                        },
                    },
                    plugins: {
                        legend: { display: false },
                    },
                },
            });
        }
    }
}

/**
 * Actualiza los datos de las gráficas cuando se cambia de mes.
 * (Mantenemos el degradado creado en initCharts, solo se cambian los valores).
 */
function updateCharts() {
    if (drivingGaugeChart) {
        drivingGaugeChart.data.datasets[0].data =
            monthsData[currentMonthIndex.value].gaugeData;
        drivingGaugeChart.data.datasets[0].backgroundColor =
            monthsData[currentMonthIndex.value].gaugeColor;
        drivingGaugeChart.update();
    }

    if (brakingChart) {
        brakingChart.data.datasets[0].data =
            monthsData[currentMonthIndex.value].brakingData;
        brakingChart.update();
    }

    if (batteryChart) {
        batteryChart.data.datasets[0].data =
            monthsData[currentMonthIndex.value].batteryData;
        batteryChart.update();
    }
}

/**
 * Funciones para cambiar de mes.
 */
function prevMonth() {
    if (currentMonthIndex.value > 0) {
        currentMonthIndex.value--;
        updateCharts();
    }
}

function nextMonth() {
    if (currentMonthIndex.value < monthsData.length - 1) {
        currentMonthIndex.value++;
        updateCharts();
    }
}

onMounted(() => {
    initCharts();
});
</script>

<style scoped>
/* ====== Ion Content Global ====== */
ion-content {
    --background: #ffffff;
    --color: #000000;
    --padding-top: 0;
}

/* ====== Header ====== */
.header {
    position: relative;
    padding: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.back-button {
    position: absolute;
    left: 1rem;
    margin-top: 150px;
}

ion-back-button {
    --color: black;
    --icon-font-size: 24px;
    --padding-start: 0;
}

.logo {
    height: 12px;
    margin-top: 16px;
}

/* ====== Car container & divider ====== */
.car-container {
    position: relative;
    padding: 0 16px;
    bottom: 6%;
    margin-bottom: 20px;
}

.car-image {
    width: 100%;
    height: auto;
}

.divider {
    position: absolute;
    bottom: 44%;
    left: 0;
    right: 0;
    height: 2px;
    background-color: #999999;
    z-index: -1;
}

/* ====== Stats container ====== */
.stats-container {
    padding: 0 1.5rem;
    position: relative;
    bottom: 1.5rem;
}

.stats-title {
    color: #444;
    font-size: 25px;
    font-weight: 700;
    margin-bottom: 0.5rem;
}

/* ====== Month Navigation (flechas y nombre del mes) ====== */
.month-nav {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
}

.stats-month {
    font-size: 18px;
    font-weight: 500;
    color: #444;
    margin: 0;
}

/* Línea divisoria */
.stats-divider {
    position: relative;
    height: 2px;
    background-color: #999999;
    z-index: 1;
    width: 10000px;
    right: 20%;
    margin-bottom: 1rem;
}

/* ====== Secciones ====== */
.section-block {
    margin-bottom: 1rem;
}

.section-title {
    font-size: 20px;
    font-weight: 700;
    color: #444;
    margin-bottom: 0.5rem;
}

.section-subtitle {
    font-size: 16px;
    font-weight: 500;
    color: #666;
    margin-bottom: 0.8rem;
}

/* ====== Driving Style Row ====== */
.driving-style-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
}

.driving-text {
    flex: 1;
}

.driving-comment {
    font-size: 16px;
    font-weight: 500;
    color: #666;
}

.driving-gauge {
    width: 80px;
    height: 80px;
    position: relative;
}

/* Canvas para gráficos */
.chart-canvas {
    width: 100% !important;
    max-width: 300px;
    display: block;
    margin: 0 auto;
}

/* Texto con el porcentaje en el gauge */
.percentage {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: bold;
    color: #444;
    font-size: 16px;
}
</style>