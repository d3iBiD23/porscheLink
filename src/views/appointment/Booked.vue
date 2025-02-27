<template>
    <ion-page>
        <ion-content>
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

            <!-- Texto principal que ahora muestra la fecha elegida -->
            <span class="appointment-text">
                Service Booked For {{ formattedDate }}.
            </span>

        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { IonPage, IonContent, IonBackButton, IonButtons } from '@ionic/vue';
import router from '@/router';
import { useRoute } from 'vue-router';

// Aquí guardamos la fecha que nos llega de Appointment.vue
const selectedDate = ref<string>('');
// También guardamos la hora seleccionada en este componente
const selectedHour = ref<string>('');

// Para leer los parámetros de la URL
const route = useRoute();

// Computed para formatear la fecha en texto (ej: “November 26”)
const formattedDate = computed(() => {
    if (!selectedDate.value) return '';
    const date = new Date(selectedDate.value);

    // Formato: mes largo + día numérico (p.ej. “November 26”)
    const opciones: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', opciones);
});

// Al montar el componente, tomamos el query param `date`
onMounted(() => {
    const dateQuery = route.query.date as string;
    if (dateQuery) {
        selectedDate.value = dateQuery;
    }
});

// Manejamos el cambio de hora
function onHourChange(event: any) {
    selectedHour.value = event.detail.value;
    console.log('Selected hour:', selectedHour.value);
}

// Al confirmar, podemos ir a otra vista o mostrar algo en consola
function confirmHour() {
    console.log('Date:', selectedDate.value);
    console.log('Hour:', selectedHour.value);

    // Ejemplo: ir a otra pantalla (Booked.vue) o lo que necesites
    router.push('/appointment/booked');
}
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
</style>