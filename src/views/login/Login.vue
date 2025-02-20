<template>
    <ion-page>
        <video autoplay muted loop playsinline class="background-video">
            <source src="/assets/videos/login_video.mp4" type="video/mp4">
        </video>

        <div class="login-container">
            <div class="logo">
                <img src="/public/assets/logos/login_porsche_white.png" alt="porscheWhite">
            </div>

            <form @submit.prevent="handleLogin" class="login-form">
                <div class="form-group">
                    <ion-label>Email</ion-label>
                    <ion-input type="email" v-model="email" placeholder="Email" required></ion-input>
                </div>

                <div class="form-group">
                    <ion-label>Password</ion-label>
                    <ion-input type="password" v-model="password" placeholder="Password" required></ion-input>
                </div>

                <ion-text class="forgot-password" @click="handleForgotPassword">
                    Forgot your password?
                </ion-text>

                <ion-button expand="block" type="submit" class="login-button">
                    Login
                </ion-button>

                <div class="signup-prompt">
                    Don't have an account?
                    <ion-text color="warning" @click="handleSignup">Signup</ion-text>
                </div>
            </form>
        </div>
    </ion-page>
</template>

<script setup>
import { ref } from 'vue'
import { IonPage, IonLabel, IonInput, IonButton, IonText, IonIcon } from '@ionic/vue'
import { wifiOutline } from 'ionicons/icons'

const email = ref('')
const password = ref('')

const handleLogin = () => {
    // Implement login logic
    console.log('Login attempt:', { email: email.value, password: password.value })
}

const handleForgotPassword = () => {
    console.log('Forgot password clicked')
}

const handleSignup = () => {
    console.log('Signup clicked')
}
</script>

<style scoped>
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
    font-size: 32px;
    color: white;
    text-align: center;
    margin: 80px 0;
    letter-spacing: 4px;
}

.login-form {
    margin-top: auto;
    margin-bottom: 150px;
    margin-left: 1.5rem;
    margin-right: 1.5rem;
}

.form-group {
    margin-bottom: 24px;
}

ion-label {
    color: white;
    font-size: 16px;
    margin-bottom: 8px;
    display: block;
}

ion-input {
    --background: white;
    --padding-start: 16px;
    --padding-end: 16px;
    --padding-top: 16px;
    --padding-bottom: 16px;
    --border-radius: 8px;
    --color: black;
    margin-top: 8px;
}

.forgot-password {
    display: block;
    color: white;
    text-align: left;
    margin: 16px 0 24px;
    font-size: 14px;
}

.login-button {
    --background: #FFD700;
    --color: black;
    --border-radius: 8px;
    --padding-top: 20px;
    --padding-bottom: 20px;
    margin: 24px 0;
    font-weight: 500;
}

.signup-prompt {
    text-align: center;
    color: white;
    font-size: 14px;
}

ion-text[color="warning"] {
    color: #FFD700;
    margin-left: 4px;
}
</style>