<template>
    <ion-page>
        <!-- Status bar superior (hora, wifi, etc.) -->
        <div class="status-bar">
            <span class="time">16:38</span>
            <ion-icon :icon="wifiOutline" class="wifi-icon"></ion-icon>
        </div>

        <ion-content :fullscreen="true">
            <!-- Header con back button y logo -->
            <div class="header">
                <ion-buttons class="back-button">
                    <ion-back-button default-href="/tabs/homepage" text=""></ion-back-button>
                </ion-buttons>
                <img src="/assets/logos/porscheLogo.svg" alt="Porsche" class="logo" />
            </div>

            <!-- Imagen del auto con línea divisoria -->
            <div class="car-container">
                <img src="/assets/imagesMainScreen/taycan/taycanImage.png" alt="Porsche Taycan" class="car-image" />
                <div class="divider"></div>
            </div>

            <!-- Título y contenido de estado del vehículo -->
            <div class="vehicle-status-container">
                <h1 class="vehicle-status-title">Vehicle Status</h1>

                <!-- Estado general -->
                <div class="status-overview">
                    <div class="status-indicator">
                        <div class="status-dot moderate"></div>
                        <span class="status-text">Moderate</span>
                    </div>

                    <!-- Indicador semicircular -->
                    <div class="gauge-container">
                        <div class="gauge moderate"></div>
                    </div>
                </div>
                <div class="status-details">
                    <p class="errors-found">5 errors were found</p>
                    <p class="status-date">November 26, 2024</p>
                </div>

                <!-- Sistemas con códigos de error -->
                <div class="trouble-codes-section">
                    <h2 class="section-title">Systems With Trouble Codes</h2>

                    <div class="trouble-code-list">
                        <!-- Código de error crítico (rojo) -->
                        <div class="trouble-code-item">
                            <div class="code-indicator critical"></div>
                            <div class="code-details">
                                <span class="code">P04A6</span>
                                <span class="system">Central ECU</span>
                            </div>
                        </div>

                        <!-- Código de error moderado (naranja) -->
                        <div class="trouble-code-item">
                            <div class="code-indicator moderate"></div>
                            <div class="code-details">
                                <span class="code">P02A9</span>
                                <span class="system">Brakes</span>
                            </div>
                        </div>

                        <!-- Código de error moderado (naranja) -->
                        <div class="trouble-code-item">
                            <div class="code-indicator moderate"></div>
                            <div class="code-details">
                                <span class="code">P02B3</span>
                                <span class="system">Battery Components</span>
                            </div>
                        </div>

                        <!-- Código de error leve (verde) -->
                        <div class="trouble-code-item">
                            <div class="code-indicator normal"></div>
                            <div class="code-details">
                                <span class="code">P041A</span>
                                <span class="system">AirBag & Security System</span>
                            </div>
                        </div>

                        <!-- Código de error leve (verde) -->
                        <div class="trouble-code-item">
                            <div class="code-indicator normal"></div>
                            <div class="code-details">
                                <span class="code">P045C</span>
                                <span class="system">Engine Controls</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
    IonPage,
    IonContent,
    IonBackButton,
    IonButtons,
    IonIcon,
    IonFooter,
    IonToolbar
} from '@ionic/vue';
import {
    wifiOutline,
    personOutline,
    homeOutline,
    helpCircleOutline
} from 'ionicons/icons';
import router from '@/router';
</script>

<style scoped>
/* ========== Estilos Globales del ion-content ========== */
ion-content {
    --background: #ffffff;
    --color: #000000;
    --padding-top: 0;
}

/* ========== Barra superior (status bar) ========== */
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

/* ========== Header (logo, back button) ========== */
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
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
}

ion-back-button {
    --color: black;
    --icon-font-size: 24px;
    --padding-start: 0;
}

/* ========== Imagen del auto + línea divisoria ========== */
.car-container {
    position: relative;
    padding: 0 16px;
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
    height: 1px;
    background-color: #999999;
    z-index: 1;
}

/* ========== Contenedor de estado del vehículo ========== */
.vehicle-status-container {
    padding: 0 16px;
}

.vehicle-status-title {
    color: #444;
    font-size: 25px;
    font-weight: 700;
    margin-bottom: 0.1rem;
}

/* ========== Estado general ========== */
.status-overview {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    position: relative;
}

.status-indicator {
    display: flex;
    align-items: center;
    gap: 12px;
}

.status-dot {
    width: 20px;
    height: 20px;
    border-radius: 50%;
}

.status-dot.moderate {
    background-color: #FF8C00;
}

.status-text {
    font-size: 20px;
    font-weight: 600;
    color: #444;
    padding: 1rem;
}

.status-details {
    position: relative;
    bottom: 6%;
}

.errors-found {
    font-size: 16px;
    color: #444;
    margin: 0;
}

.status-date {
    font-size: 16px;
    color: #444;
    margin: 4px 0 0 0;
}

.gauge-container {
    width: 120px;
    height: 120px;
    position: relative;
}

.gauge {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 12px solid #FF8C00;
    /* color + grosor */

    /* Quita solo una parte de la circunferencia */
    border-top-color: transparent;
    /* quita la parte de arriba */
    border-right-color: transparent;
    /* quita la parte derecha */

    /* Ajusta la rotación para colocar el hueco donde desees */
    transform: rotate(135deg);
}



/* ========== Sección de códigos de error ========== */
.trouble-codes-section {
    margin-top: 20px;
}

.section-title {
    font-size: 22px;
    font-weight: 600;
    color: #444;
    margin-bottom: 20px;
}

.trouble-code-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.trouble-code-item {
    display: flex;
    align-items: center;
    padding: 16px 0;
    border-bottom: 1px solid #EEEEEE;
}

.code-indicator {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 16px;
}

.code-indicator.critical {
    background-color: #D50000;
}

.code-indicator.moderate {
    background-color: #FF8C00;
}

.code-indicator.normal {
    background-color: #00C853;
}

.code-details {
    display: flex;
    gap: 16px;
}

.code {
    font-size: 18px;
    font-weight: 600;
    color: #444;
    width: 80px;
}

.system {
    font-size: 18px;
    color: #444;
}

/* ========== Barra de navegación inferior ========== */
ion-footer {
    --background: #ffffff;
    --border-color: #EEEEEE;
}

ion-toolbar {
    --background: #ffffff;
    --border-color: #EEEEEE;
    --padding-top: 8px;
    --padding-bottom: 8px;
}

.nav-bar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
}

.nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 8px 0;
}

.nav-item ion-icon {
    font-size: 24px;
    color: #666;
}

.nav-item span {
    font-size: 12px;
    color: #666;
}

.nav-item.active ion-icon,
.nav-item.active span {
    color: #000;
}
</style>