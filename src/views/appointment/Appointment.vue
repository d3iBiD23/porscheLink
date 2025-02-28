<template>
    <ion-page>
        <ion-content>
            <!-- Header con back button y logo -->
            <div class="header">
                <ion-buttons class="back-button">
                    <ion-back-button default-href="/details/homepage" text=""></ion-back-button>
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
import { IonPage, IonContent, IonBackButton, IonButtons, IonButton, IonDatetime, IonIcon } from '@ionic/vue';
import { wifiOutline } from 'ionicons/icons';
import router from '@/router';

const selectedDate = ref<string>('');

function onDateChange(event: any) {
    selectedDate.value = event.detail.value;
}

function confirmDate() {
    console.log('Selected date:', selectedDate.value);

    // Enviamos la fecha seleccionada como query param a Hour.vue
    router.push({
        path: '/details/appointment/hour',
        query: { date: selectedDate.value }
    });
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

/* ========== Título ========== */
.appointment-text {
    color: #444;
    text-align: center;
    font-size: 18px;
    font-weight: 800;
    padding: 1rem;
    display: flex;
    justify-content: center;
    flex-shrink: 0;
    margin-bottom: 2rem;
}

/* ========== Contenedor para el IonDatetime y el botón ========== */
.datetime-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    margin-bottom: 20px;
}

/* ========== IonDatetime - Personalización con CSS Parts ========== */
ion-datetime {
    --background: #ffffff;
    --color: #000000;
    --border-radius: 0;
    max-width: 350px;
    width: 100%;
    margin-bottom: 1rem;
}

/* Oculta el header nativo (fecha y botones) */
ion-datetime::part(header) {
    display: none;
}

/* Fondo del calendario */
ion-datetime::part(calendar) {
    background-color: #ffffff;
}

/* Texto del mes y año ("November 2024") */
ion-datetime::part(month-year) {
    font-size: 16px;
    font-weight: 600;
    color: #444;
    /* Texto gris oscuro */
}

/* Flechas para cambiar de mes */
ion-datetime::part(prev-month),
ion-datetime::part(next-month) {
    color: #F28100;
    /* Naranja */
    font-size: 20px;
}

/* Días de la semana (SUN, MON, etc.) */
ion-datetime::part(calendar-days-of-week) {
    font-weight: 600;
    font-size: 14px;
    color: #666666;
    /* Un gris intermedio */
}

/* Cada celda de día (números) */
ion-datetime::part(calendar-cell-text) {
    color: #444444;
    /* Más oscuro que #666, para el día normal */
    font-size: 14px;
}

/* Contenedor interno del día (para forma circular al hover/seleccionado) */
ion-datetime::part(calendar-cell-inner) {
    border-radius: 50%;
}

ion-datetime::part(calendar-cell-today) {
    border: 2px solid #F28100 !important;
    /* Anillo naranja */
    background-color: transparent !important;
    /* Sin relleno */
    color: #F28100 !important;
    /* Texto naranja */
}

/* Día seleccionado (fondo naranja, texto blanco) */
ion-datetime::part(calendar-cell-active) {
    background-color: #F28100 !important;
    color: #ffffff !important;
}

/* Hover sobre un día (opcional) */
ion-datetime::part(calendar-cell-hover) {
    background-color: #f8e1cc;
    /* Naranja claro */
    color: #000000;
}

:deep(ion-datetime::part(calendar-day-today)) {
    border: 2px solid #F28100 !important;
    background-color: transparent !important;
    color: #F28100 !important;
}

ion-datetime::part(calendar-day-today),
ion-datetime::part(day-today) {
    border: 2px solid #F28100 !important;
    background-color: transparent !important;
    color: #F28100 !important;
}

/* ========== Botón "Select Date" ========== */
.select-date-button {
    --border-width: 2px;
    --border-color: #000;
    --border-radius: 8px;
    --background: #fff;
    --color: #444;
    font-size: 18px;
    font-weight: 500;
    text-transform: none;
    --padding-start: 5.5rem;
    --padding-end: 5.5rem;
    --padding-top: 0.7rem;
    --padding-bottom: 0.7rem;
    /* Sin ripple */
    --ripple-color: transparent;
}
</style>