<template>
    <ion-page>
        <ion-content>
            <div class="header">
                <ion-buttons class="back-button">
                    <ion-back-button default-href="/appointment/hour" text=""></ion-back-button>
                </ion-buttons>
                <img src="/assets/logos/porscheLogo.svg" alt="Porsche" class="logo" />
            </div>
            <div class="car-container">
                <img src="/assets/imagesMainScreen/taycan/taycanImage.png" alt="Porsche Taycan" class="car-image" />
                <div class="divider"></div>
            </div>
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
import { ref, onMounted, computed } from 'vue';
import { IonPage, IonContent, IonButtons, IonBackButton, IonButton } from '@ionic/vue';
import { useRoute } from 'vue-router';
import router from '@/router';

const selectedDate = ref<string>('');
const selectedHour = ref<string>('');
const route = useRoute();

onMounted(() => {
    const dateQuery = route.query.date as string;
    const hourQuery = route.query.hour as string;
    if (dateQuery) selectedDate.value = dateQuery;
    if (hourQuery) selectedHour.value = hourQuery;
});

function goToRepair() {
    router.push({ path: '/porschelink/overview', query: { tab: 'repair' } });
}

const formattedDateTime = computed(() => {
    if (!selectedDate.value || !selectedHour.value) return '';
    const dateTimeString = `${selectedDate.value.substring(0, 10)}T${selectedHour.value.substring(11, 16)}`;
    const dateObj = new Date(dateTimeString);
    const datePart = dateObj.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
    const timePart = dateObj.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });
    return `${datePart} at ${timePart}`;
});
</script>

<style scoped>
ion-content {
    --background: #ffffff;
    --color: #000000;
    --padding-top: 1rem;
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
    height: 2px;
    background-color: #999999;
    z-index: -1;
}

.notebook {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 2rem;
}

.appointment-text {
    color: #444;
    text-align: center;
    font-size: 18px;
    font-weight: 800;
    padding: 2rem;
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;
}

.repair-button {
    display: flex;
    padding: 3rem;
    margin: 0 auto;
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