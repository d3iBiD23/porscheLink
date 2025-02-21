<template>
    <ion-page>
        <video autoplay muted loop playsinline class="background-video">
            <source src="/assets/videos/login_video.mp4" type="video/mp4">
        </video>

        <div class="login-container">
            <div class="logo">
                <img src="/assets/logos/login_porsche_white.png" alt="porscheWhite">
            </div>

            <form class="login-form">
                <div class="form-group">
                    <ion-label>Email</ion-label>
                    <ion-input type="email" v-model="email" placeholder="Email" required></ion-input>
                </div>

                <div class="form-group">
                    <ion-label>Password</ion-label>
                    <ion-input type="password" v-model="password" placeholder="Password" required></ion-input>
                </div>

                <ion-text class="forgot-password" @click="goToForgotP">
                    Forgot your password?
                </ion-text>

                <ion-button expand="block" type="submit" class="login-button" @click="goToMainScreen">
                    Login
                </ion-button>
            </form>
            <div class="signup-prompt">
                Don't have an account?
                <ion-text color="warning" @click="goToRegisterScreen">Signup</ion-text>
            </div>
        </div>
    </ion-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue'
import { IonPage, IonLabel, IonInput, IonButton, IonText, IonIcon } from '@ionic/vue'

const email = ref('')
const password = ref('')

const router = useRouter();

const goToMainScreen = () => {
    router.push('/tabs/homepage');
};

const goToRegisterScreen = () => {
    router.push('/login/register');
};

const goToForgotP = () => {
    router.push('/login/forgotPwd');
};
</script>

<style scoped>
.login-container {
    font-family: 'Inter', sans-serif;
    font-weight: bold;
}

.background-video {
    position: fixed;
    right: 0;
    bottom: 0;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    z-index: -1;
    object-fit: cover;
}

.login-container {
    min-height: 100vh;
    padding: 20px;
    background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4));
    display: flex;
    flex-direction: column;
}

.status-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    z-index: 1000;
}

.time {
    font-size: 16px;
    font-weight: 500;
}

.wifi-icon {
    font-size: 20px;
}

.logo {
    font-family: 'Arial', sans-serif;
    color: white;
    text-align: center;
    margin: 80px 25px;
}

.login-form {
    margin-top: auto;
    margin-bottom: 150px;
    margin-left: 1.5rem;
    margin-right: 1.5rem;
}

.form-group {
    margin-bottom: 30px;
}

ion-label {
    color: white;
    font-size: 14px;
    margin-bottom: 8px;
    display: block;
}

ion-input {
    --background: white;
    --padding-start: 12px;
    --padding-end: 12px;
    --padding-top: 12px;
    --padding-bottom: 12px;
    --border-radius: 8px;
    --color: gray;
    margin-top: 8px;
}

.forgot-password {
    display: block;
    color: white;
    text-align: left;
    font-size: 14px;
}

.login-button {
    --background: #FC0;
    --color: black;
    --border-radius: 8px;
    --padding-top: 20px;
    --padding-bottom: 20px;
    margin-top: 70px;
    font-weight: bold;
    text-transform: none;
}

.signup-prompt {
    text-align: center;
    color: white;
    font-size: 14px;
    margin-bottom: 55px;
}

ion-text[color="warning"] {
    color: #FC0;
    margin-left: 4px;
}
</style>