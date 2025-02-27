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

            <span class="appointment-text">Now Select An Hour For Your Appointment.</span>

            <!-- Contenedor para centrar el selector de hora y el botón -->
            <div class="datetime-container">
                <ion-datetime mode="ios" presentation="time" prefer="inline" locale="en-US" display-timezone="utc"
                    @ionChange="onHourChange"></ion-datetime>

                <ion-button class="select-date-button" @click="confirmHour" fill="outline">
                    Confirm hour
                </ion-button>
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
    IonButton,
    IonDatetime,
    IonIcon
} from '@ionic/vue';
import { wifiOutline } from 'ionicons/icons';

const selectedDate = ref<string>('');

function onHourChange(event: any) {
    selectedDate.value = event.detail.value;
}

function confirmHour() {
    console.log('Selected date:', selectedDate.value);
}
</script>

<style scoped>
/* ---------- Estilos Globales ---------- */
ion-content {
    --background: #ffffff;
    --color: #000000;
    --padding-top: 0;
}

/* ---------- Status Bar ---------- */
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

/* ---------- Header ---------- */
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

/* ---------- Car Container ---------- */
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
    height: 1px;
    background-color: #999999;
    z-index: -1;
}

/* ---------- Texto de la cita ---------- */
.appointment-text {
    color: #444;
    text-align: center;
    font-size: 18px;
    font-weight: 800;
    display: flex;
    justify-content: center;
    flex-shrink: 0;
    margin-bottom: 2rem;
}

/* ---------- Contenedor para el IonDatetime y botón ---------- */
.datetime-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    margin-bottom: 20px;
}

/* ---------- IonDatetime Personalizado ---------- */
ion-datetime {
    /* Variables para forzar fondo blanco y texto negro */
    --ion-text-color: #000;
    /* Texto negro */
    --ion-color-scheme: light;
    /* Fuerza modo claro */

    max-width: 350px;
    width: 100%;
    margin-bottom: 1rem;
}

/* Quitar overlays/gradientes (partes superiores e inferiores) */
ion-datetime::part(time-overlay),
ion-datetime::part(time-overlay-top),
ion-datetime::part(time-overlay-bottom) {
    display: none !important;
    background: none !important;
    box-shadow: none !important;
}

/* Forzar fondo blanco en todas las columnas y scroll wheels */
ion-datetime::part(base),
ion-datetime::part(container),
ion-datetime::part(time-container),
ion-datetime::part(wheel),
ion-datetime::part(wheel-scroll),
ion-datetime::part(time-column),
ion-datetime::part(wheel-native-wrapper),
ion-datetime::part(wheel-native) {
    background: #fff !important;
    color: #000 !important;
    box-shadow: none !important;
}

/* Estilo para los items de la rueda */
ion-datetime::part(wheel-item) {
    color: #000 !important;
}

/* Ítem activo (seleccionado) */
ion-datetime::part(wheel-item-active) {
    color: #F28100 !important;
    font-weight: bold;
}

/* ---------- Botón "Confirm hour" ---------- */
.select-date-button {
    --border-width: 2px;
    --border-color: #000;
    --border-radius: 8px;
    --color: #444444;
    --background: #ffffff;

    font-size: 18px;
    font-weight: 500;
    text-transform: none;

    --padding-start: 5.5rem;
    --padding-end: 5.5rem;
    --padding-top: 0.7rem;
    --padding-bottom: 0.7rem;

    --ripple-color: transparent;
}
</style>
