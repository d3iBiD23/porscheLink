<template>
    <ion-page>
        <ion-content>
            <!-- Header con back button y logo -->
            <div class="header">
                <ion-buttons class="back-button">
                    <ion-back-button default-href="/homepage" text=""></ion-back-button>
                </ion-buttons>
                <img src="/assets/logos/porscheLogo.svg" alt="Porsche" class="logo" />
            </div>

            <!-- Imagen del auto con línea divisoria -->
            <div class="car-container">
                <img src="/assets/imagesMainScreen/taycan/taycanImage.png" alt="Porsche Taycan" class="car-image" />
                <div class="divider"></div>
            </div>

            <div class="loading-container">
                <img src="/assets/Hourglass.svg" alt="Hourglass" class="hourglass" />
            </div>

            <span class="diagnosing-text">Diagnosing Vehicle...</span>

        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonBackButton, IonButtons } from '@ionic/vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter(); // despues de 3 segundes se dirige a DiagnoseStatus.vue
onMounted(() => {
    setTimeout(() => {
        router.push('/porschelink/diagnose');
    }, 3000)
});
</script>


<style scoped>
/* ========== Estilos Globales del ion-content ========== */
ion-content {
    --background: #ffffff;
    --color: #000000;
    --padding-top: 1rem;
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

/* ========== diagnosing text ========== */
.diagnosing-text {
    color: #444;
    text-align: center;
    font-size: 30px;
    font-weight: 800;
    padding: 1rem;
    display: flex;
    justify-content: center;
    flex-shrink: 0;
    margin-bottom: 2rem;
}

.loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
}

.hourglass {
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>