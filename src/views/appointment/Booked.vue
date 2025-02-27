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

            <!-- Texto principal que ahora muestra la fecha elegida -->
            <img src="/assets/Notebook.svg" alt="Notebook" class="notebook">
            <span class="appointment-text">
                Service Booked For {{ formattedDateTime }}.
            </span>

            <ion-button fill="outline" class="repair-button" @click="goToRepair">
                Go to Repair
            </ion-button>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage, IonButtons, IonBackButton, IonButton } from '@ionic/vue';
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router';

const selectedDate = ref<string>('');
const selectedHour = ref<string>('');
const route = useRoute();

onMounted(() => {
    const dateQuery = route.query.date as string;
    const hourQuery = route.query.hour as string;

    if (dateQuery) {
        selectedDate.value = dateQuery;
    }
    if (hourQuery) {
        selectedHour.value = hourQuery;
    }
});

function goToRepair() {
    router.push({ path: '/details/overview', query: { tab: 'repair' } });
}

/**
 * Combina la fecha y la hora en un único Date,
 * y luego lo formatea a algo como:
 * "February 27, 2025 at 11:18 AM"
 */
const formattedDateTime = computed(() => {
    // Si no hay datos suficientes, salimos.
    if (!selectedDate.value || !selectedHour.value) return '';

    // Combina fecha y hora en un string tipo ISO, por ej. "2025-02-27T11:18"
    // Ajusta si tu 'selectedHour' ya viene con segundos, etc.
    const dateTimeString = `${selectedDate.value.substring(0, 10)}T${selectedHour.value.substring(11, 16)}`;

    const dateObj = new Date(dateTimeString);

    // Extraemos la parte de fecha
    const datePart = dateObj.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    // Extraemos la parte de hora
    const timePart = dateObj.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });

    // Retornamos algo tipo: "February 27, 2025 at 11:18 AM"
    return `${datePart} at ${timePart}`;
});
</script>

<style scoped>
/* Tus estilos pueden seguir igual;
     aquí se incluyen solo para referencia. */
ion-content {
    --background: #ffffff;
    --color: #000000;
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
    left: 1rem;
    margin-top: 150px;
}

ion-back-button {
    --color: black;
    --icon-font-size: 24px;
    --padding-start: 0;
}

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

.appointment-text {
    color: #444;
    text-align: center;
    font-size: 18px;
    font-weight: 800;
    display: flex;
    justify-content: center;
    padding: 2rem;
    flex-shrink: 0;
    margin-bottom: 2rem;
}

.datetime-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    margin-bottom: 20px;
}

ion-datetime {
    --ion-text-color: #000;
    --ion-color-scheme: light;
    max-width: 350px;
    width: 100%;
    margin-bottom: 1rem;
}

ion-datetime::part(time-overlay),
ion-datetime::part(time-overlay-top),
ion-datetime::part(time-overlay-bottom) {
    display: none !important;
    background: none !important;
    box-shadow: none !important;
}

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

ion-datetime::part(wheel-item) {
    color: #000 !important;
}

ion-datetime::part(wheel-item-active) {
    color: #F28100 !important;
    font-weight: bold;
}

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

.notebook {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 2rem;
}

.repair-button {
    display: flex;
    padding: 3rem;
    margin: 0 auto;
    /* Para centrar horizontalmente */
    /* Sin borde */
    --border-color: black;
    --border-radius: 8px;
    font-size: 18px;
    font-weight: 500;
    text-transform: none;
    --padding-start: 0.2rem;
    --padding-top: 0.6rem;    
    --padding-bottom: 0.6rem;    
    --padding-end: 0.2rem;
    --background: #F28100;
    --color: white;
}
</style>