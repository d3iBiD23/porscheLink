<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <!-- Encabezado con botón de regreso y nombre de usuario -->
      <div class="header">
        <ion-buttons slot="start" class="back-button">
          <ion-back-button default-href="/homepage"></ion-back-button>
        </ion-buttons>
        <div class="profile-section">
          <ion-avatar class="avatar">
            <img src="/assets/user_avatar.svg" alt="Avatar" />
          </ion-avatar>
          <h2>John Doe</h2>
        </div>
      </div>

      <div class="divider"></div>

      <!-- Sección principal de opciones de cuenta -->
      <ion-list class="menu-options">
        <ion-item>
          <img src="/assets/UserCircle.svg" alt="UserCircle" class="userCircle" />
          <ion-label>My Account</ion-label>
        </ion-item>
        <ion-item>
          <img src="/assets/EnvelopeSimple.svg" alt="EnvelopeSimple" class="envelopeSimple" />
          <ion-label>Notifications</ion-label>
        </ion-item>
        <ion-item>
          <img src="/assets/Question.svg" alt="Question" class="question" />
          <ion-label>Contact And Help</ion-label>
        </ion-item>
      </ion-list>

      <!-- Sección de políticas / textos legales -->
      <ion-list class="legal-options">
        <ion-item><ion-label>Privacy Policy</ion-label></ion-item>
        <ion-item><ion-label>Legal Notice</ion-label></ion-item>
        <ion-item><ion-label>Legal</ion-label></ion-item>
      </ion-list>

      <!-- Botón de Logout -->
      <ion-button fill="outline" class="logout-button" @click="logout">
        Logout
      </ion-button>

      <!-- Imagen del Taycan con la línea divisoria y logo de Porsche -->
      <div class="car-container">
        <img src="/assets/imagesMainScreen/taycan/taycanImage.png" alt="Porsche Taycan" class="car-image" />
      </div>

      <div class="porsche-logo">
        <img src="/assets/logos/porscheLogo_account.svg" alt="Porsche" class="logo" />
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonButtons,
  IonBackButton,
  IonAvatar,
  IonList,
  IonItem,
  IonLabel,
  IonButton
} from '@ionic/vue';
import { useRouter } from 'vue-router';

const router = useRouter();

/** Maneja la acción de logout y navega a /login */
function logout() {
  router.push('/login');
}
</script>

<style scoped>
ion-content {
  --background: #ffffff;
  --color: #000000;
}

/* Íconos de menú */
.question,
.envelopeSimple,
.userCircle {
  padding: 0.5rem;
}

/* Encabezado y botón de regreso */
.header {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
}

.back-button {
  position: absolute;
  left: 1rem;
  margin-top: 110px;
}

:deep(ion-back-button) {
  --color: #000;
}

/* Sección de perfil */
.profile-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2.5rem;
}

.profile-section .avatar {
  width: 72px;
  height: 72px;
}

.profile-section h2 {
  margin-top: 0.5rem;
  font-size: 1.2rem;
  font-weight: 500;
}

/* Listas de opciones */
.menu-options,
.legal-options {
  background-color: white;
  margin: 1rem;
  /* Margen lateral e inferior */
}

.legal-options {
  margin: 0 1.5rem;
  /* Este ajusta la lista legal un poco distinto */
}

ion-item {
  --background: transparent;
  --border-width: 0;
  --border-color: transparent;
  border: none;
  color: #444444;
}

ion-item:last-child {
  border-bottom: none;
}

/* Botón Logout */
.logout-button {
  display: block;
  margin: 2.5rem;
  /* Ajustar ancho para compensar el margin horizontal */
  --border-width: 2px;
  --border-color: #000;
  --border-radius: 8px;
  --background: #fff;
  --color: #fd2a2a;
  font-size: 18px;
  font-weight: 600;
  text-transform: none;
  --padding-start: 0.3rem;
  --padding-end: 0.3rem;
  --padding-top: 0.6rem;
  --padding-bottom: 0.6rem;
}

/* Imagen del Taycan */
.car-container {
  position: relative;
  bottom: 2.5rem;
  left: 30%;
  text-align: center;
}

.car-image {
  width: 100%;
  height: auto;
  object-fit: contain;
}

/* Divider */
.divider {
  position: relative;
  height: 2px;
  background: rgba(0, 0, 0, 0.6);
  z-index: -1;
}

/* Logo Porsche */
.porsche-logo {
  text-align: center;
  margin-top: 1.5rem;
}

.logo {
  position: relative;
  bottom: 3rem;
}
</style>
