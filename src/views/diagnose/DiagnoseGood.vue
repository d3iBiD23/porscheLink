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

            <!-- Título y contenido de estado del vehículo -->
            <div class="vehicle-status-container">
                <h1 class="vehicle-status-title">Vehicle Status</h1>

                <!-- Estado general -->
                <div class="status-overview">
                    <div class="status-indicator">
                        <div class="status-dot moderate"></div>
                        <span class="status-text">Really Good</span>
                    </div>

                    <!-- Indicador semicircular -->
                    <div class="gauge-container">
                        <div class="gauge moderate"></div>
                    </div>
                </div>
                <div class="status-details">
                    <p class="errors-found">0 errors were found</p>
                    <p class="status-date">November 26, 2024</p>
                </div>

                <!-- Sistemas con códigos de error -->
                <div class="trouble-codes-section">
                    <h2 class="section-title">Systems With Trouble Codes</h2>
                    <div class="divider-systems"></div>
                    <span class="text-codes">All Error Codes Have Been Erased.</span>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import {
    IonPage,
    IonContent,
    IonBackButton,
    IonButtons,
    IonButton,
} from '@ionic/vue';
import router from '@/router';

function clearCodes() {
    router.push('/porschelink/diagnosed');
}

</script>

<style scoped>
/* ========== Estilos Globales del ion-content ========== */
ion-content {
    --background: #ffffff;
    --color: #000000;
    --padding-top: 1rem;
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
    margin-top: 150px;
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
    bottom: 6%;
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

/* ========== Contenedor de estado del vehículo ========== */
.vehicle-status-container {
    position: relative;
    padding: 0 1.5rem;
    bottom: 1.5rem;
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
    background-color: #00FF2F;
}

.status-text {
    font-size: 20px;
    font-weight: 600;
    color: #444;
    padding: 1rem;
}

.status-details {
    position: relative;
    bottom: 3rem;
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
    top: 4rem;
}

.gauge {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 12px solid #00FF2F;
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
    position: relative;
    /* Para que el divider-systems se posicione respecto a este contenedor */
    bottom: 2rem;
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
    padding: 10px 10px;
    align-self: stretch;
    border-bottom: 1px solid rgba(0, 0, 0, 0.40);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    gap: 10px;
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

.clear-code-button {
    /* Grosor y color del borde */
    --border-width: 2px;
    --border-color: #000;

    /* Esquinas redondeadas */
    --border-radius: 8px;

    /* Color del texto y fondo */
    --color: #444444;
    --background: #fff;

    /* Tamaño y peso del texto */
    font-size: 18px;
    font-weight: 500;

    /* Padding interno para darle amplitud */
    --padding-start: 1rem;
    --padding-end: 1rem;
    --padding-top: 1rem;
    --padding-bottom: 1rem;
    padding: 0.5rem;

    /* Otras propiedades */
    text-transform: none;

    /* Centrado del botón */
    display: block;
    margin: 0.5rem auto;
}

.divider-systems {
    position: relative;
    height: 2px;
    background-color: #999999;
    z-index: 1;
    width: 10000px;
    /* Asegúrate de que ocupe el 100% del ancho */
    right: 20%;
    margin-bottom: 1rem;
}

.text-codes {
    color: #444;
    text-align: center;
    font-size: 18px;
    font-weight: 700;
    display: flex;
    justify-content: center;
    flex-shrink: 0;
    margin-bottom: 2rem;
    padding: 5rem;
}
</style>