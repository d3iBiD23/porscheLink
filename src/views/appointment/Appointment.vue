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

            <span class="appointment-text">Select A Date For Your Appointment.</span>

            <!-- Contenedor para centrar el calendario y el botón -->
            <div class="datetime-container">
                <!-- IonDatetime con estilo personalizado -->
                <ion-datetime display-timezone="utc" presentation="date" locale="en-US" :value="selectedDate"
                    @ionChange="onDateChange"></ion-datetime>

                <!-- Botón con estilo similar al prototipo -->
                <ion-button class="select-date-button" @click="confirmDate" fill="outline">
                    Select Date
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
    IonTabBar,
    IonTabButton,
    IonLabel,
    IonIcon,
    IonButton,
    IonDatetime
} from '@ionic/vue';

// Importamos los iconos que necesitamos
import { person, home, helpCircle, wifiOutline } from 'ionicons/icons';

const selectedDate = ref<string>('');

function onDateChange(event: any) {
    selectedDate.value = event.detail.value;
}

function confirmDate() {
    console.log('Selected date:', selectedDate.value);
}
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
    margin-top: 150px;
    /* Ajusta si necesitas */
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
    height: 1px;
    background-color: #999999;
    z-index: -1;
}

/* ========== Contenedor para centrar el IonDatetime y el botón ========== */
.datetime-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    /* Centra horizontalmente */
    justify-content: center;
    /* Ajusta si quieres centrar verticalmente también */
    margin: 0 auto;
    margin-bottom: 20px;
    /* Puedes agregar un margin-top o padding adicional si lo deseas */
}

/* ========== IonDatetime - Personalización con CSS Parts ========== */
ion-datetime {
    /* Ajusta dimensiones y color de fondo principal */
    --background: #ffffff;
    --color: #000000;
    --border-radius: 0;

    /* Para centrarlo dentro de su contenedor */
    max-width: 350px;
    width: 100%;

    margin-bottom: 1rem;
}

/* Oculta el header nativo (si no quieres mostrar la barra con la fecha y botones) */
ion-datetime::part(header) {
    display: none;
}

/* El contenedor del calendario */
ion-datetime::part(calendar) {
    background-color: #ffffff;
}

/* Texto de mes y año (por defecto IonDatetime muestra mes y año en la parte superior) */
ion-datetime::part(month-year) {
    font-size: 16px;
    font-weight: 600;
    color: #000;
}

/* Flechas para cambiar de mes (puedes ocultar la anterior si solo quieres la siguiente) */
ion-datetime::part(prev-month),
ion-datetime::part(next-month) {
    color: #F28100;
    /* Naranja Porsche */
    font-size: 20px;
}

/* Días de la semana (encabezado) */
ion-datetime::part(calendar-days-of-week) {
    font-weight: 600;
    font-size: 14px;
    color: #666666;
}

/* Cada celda del día (texto) */
ion-datetime::part(calendar-cell-text) {
    color: #000000;
    font-size: 14px;
}

/* El contenedor interno de cada día, para dar forma circular al “hover”/seleccionado */
ion-datetime::part(calendar-cell-inner) {
    border-radius: 50%;
}

/* Día seleccionado */
ion-datetime::part(calendar-cell-active) {
    background-color: #F28100 !important;
    /* Naranja */
    color: #ffffff !important;
}

/* Día sobre el que se hace hover (opcional) */
ion-datetime::part(calendar-cell-hover) {
    background-color: #f8e1cc;
    /* un naranja muy claro */
    color: #000000;
}

/* ========== Ion Tab Bar inferior ========== */
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

/* Ocultar la flecha previa si no la quieres */
ion-datetime::part(prev-month) {
    display: none;
}

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

.select-date-button {
    /* Grosor y color del borde */
    --border-width: 2px;
    --border-color: #000;

    /* Esquinas redondeadas */
    --border-radius: 8px;
    --border: 2px;

    /* Color del texto y fondo */
    --color: #444444;
    --background: #fff;
    /* Si prefieres que sea blanco */

    /* Tamaño y peso del texto */
    font-size: 18px;
    font-weight: 500;


    /* Padding interno para darle amplitud */
    --padding-start: 5.5rem;
    --padding-end: 5.5rem;
    --padding-top: 0.7rem;
    --padding-bottom: 0.7rem;

    /* Otras propiedades */
    text-transform: none;
    /* Mantener mayúsculas/minúsculas originales */
}
</style>