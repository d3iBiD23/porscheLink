<template>
    <div class="details-content">
        <!-- Car Image Section -->
        <div class="car-image-section mb-8">
            <img src="/assets/imagesMainScreen/taycan/taycanImage.png" alt="Porsche Taycan" class="taycanImage" />
        </div>

        <!-- Next Service Section -->
        <div class="next-service-section">
            <h2 class="section-title-service">Next Service</h2>

            <!-- Ícono de coche + texto "in X days" -->
            <div class="service-icon-and-text">
                <img src="/public/assets/car_service.svg" alt="car_service" class="car-icon">
                <p class="service-days">in {{ nextServiceDays }} days</p>
            </div>

            <!-- Botón Book Appointment -->
            <ion-button fill="outline" class="book-button" @click="bookAppointment">
                Book Appointment
            </ion-button>
        </div>

        <!-- Diagnosis Section -->
        <div class="diagnosis-section">
            <h2 class="section-title">Diagnosis</h2>
            <p class="diagnosis-subtitle">Last diagnose: {{ lastDiagnose }}</p>

            <div class="diagnosis-icon-and-text">
                <!-- Ícono para Diagnosis (puede ser un motor/engine, por ejemplo) -->
                <img src="/assets/diagnosis_icon.svg" alt="diagnosis" class="diagnosis-icon" />
            </div>

            <ion-button fill="outline" class="diagnosis-button" @click="diagnoseVehicle">
                Diagnose Vehicle
            </ion-button>
        </div>
    </div>
</template>
<script>
import { IonPage, IonContent, IonText, IonButton } from '@ionic/vue';
import { carOutline } from 'ionicons/icons';

export default {
    components: {
        IonPage,
        IonContent,
        IonText,
        IonButton,
    },
    data() {
        return {
            nextServiceDays: 23, // Ejemplo de días para el próximo servicio
            lastDiagnose: '3 weeks ago'
        };
    },
    methods: {
        bookAppointment() {
            // Lógica para reservar una cita
            console.log('Appointment booked!');
        },
        diagnoseVehicle() {
            console.log('Diagnosis started!');
        }
    },
};
</script>
<style scoped>
h2 {
    font-size: 20px;
    font-weight: bolder;
    color: #1E1E1E;

}

.details-button {
    --border-radius: 8px;
    --border-color: #444;
    --color: #1E1E1E;
    font-size: 20px;
    margin: 16px 0;
    text-transform: none;
    font-family: 'Inter', sans-serif;
    box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.3);
}

.taycanImage {
    position: relative;
    margin-top: -100px;
    margin-left: 100px;
}

h2,
p {
    color: black;
}

.details-content {
    padding: 20px;
}

.info-section {
    margin-bottom: 24px;
}

.info-section h2 {
    font-size: 18px;
    margin-bottom: 8px;
}

.battery-bar {
    background: #eee;
    height: 20px;
    border-radius: 10px;
    position: relative;
}

.battery-level {
    background: #4CAF50;
    height: 100%;
    border-radius: 10px;
}

.battery-bar span {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #333;
}

/* Sección "Next Service" */
h2 {
    text-align: left;
}

.next-service-section {
    text-align: center;
    margin-top: 16px;
}

/* Título */
.section-title {
    font-size: 18px;
    font-weight: 600;
    color: #333;
}

.section-title-service {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin-bottom: 2rem;
}

/* Ícono de coche + texto "in X days" */
.service-icon-and-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1rem;
}

.car-icon {
    font-size: 32px;
    /* Tamaño del ícono */
    color: #333;
}

.service-days {
    font-size: 16px;
    font-weight: bold;
    color: #333;
}

/* Botón "Book Appointment" con borde negro */
.book-button {
    /* Grosor y color del borde */
    --border-width: 2px;
    --border-color: #000;

    /* Esquinas redondeadas */
    --border-radius: 8px;

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

/* Diagnosis Section */
.diagnosis-section {
    text-align: center;
    margin-top: 3rem;
}

/* Subtítulo "Last diagnose: 3 weeks ago" */
.diagnosis-subtitle {
    text-align: left;
    margin-bottom: 3rem;
    color: #444444;
    font-size: 14px;
    font-weight: bold;
}

/* Ícono Diagnosis */
.diagnosis-icon-and-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
}

.diagnosis-icon {
    font-size: 32px;
    color: #333;
    margin-bottom: 4px;
}

/* Botón "Diagnose Vehicle" */
.diagnosis-button {
    /* Grosor y color del borde */
    --border-width: 2px;
    --border-color: #000;

    /* Esquinas redondeadas */
    --border-radius: 8px;

    /* Color del texto y fondo */
    --color: #444444;
    --background: #fff;
    /* Si prefieres que sea blanco */

    /* Tamaño y peso del texto */
    font-size: 18px;
    font-weight: 500;


    /* Padding interno para darle amplitud */
    --padding-start: 5.8rem;
    --padding-end: 5.8rem;
    --padding-top: 0.7rem;
    --padding-bottom: 0.7rem;

    /* Otras propiedades */
    text-transform: none;
    /* Mantener mayúsculas/minúsculas originales */
}
</style>