<script setup lang="ts">
import { IonIcon } from '@ionic/vue';
import { batteryHalfOutline } from 'ionicons/icons';

</script>

<template>
    <div class="details-content">
        <!-- Car Image Section -->
        <div class="car-image-section mb-8">
            <img src="/assets/taycanImage.png" alt="Porsche Taycan" class="taycanImage" />
        </div>

        <!-- Total Mileage Section -->
        <div class="info-section">
            <h2>Total Mileage</h2>
            <div class="flex items-center">
                <p class="text-2xl font-medium">3,122 km</p>
            </div>
        </div>

        <!-- Battery Section -->
        <div class="info-section">
            <h2>Battery</h2>
            <div class="flex items-center gap-2">
                <ion-icon :icon="batteryHalfOutline"></ion-icon>
                <div class="battery-bar flex-grow">
                    <div class="battery-level" style="width: 75%"></div>
                    <span>553km</span>
                </div>
            </div>
        </div>

        <!-- Tire Pressure Section -->
        <div class="info-section">
            <h2>Tire Pressure</h2>
            <div class="tire-pressure-container">
                <!-- Top Row (Front Tires) -->
                <div class="tire-row top">
                    <div class="pressure-box">35 psi</div>
                    <div class="pressure-box">
                        32 psi
                        <span class="warning warning-high">+3 psi</span>
                    </div>
                </div>

                <!-- Car Illustration -->
                <div class="car-illustration">
                    <img src="/assets/carIllustration.png" alt="Car Layout" class="opacity-20" />
                </div>

                <!-- Bottom Row (Rear Tires) -->
                <div class="tire-row bottom">
                    <div class="pressure-box">35 psi</div>
                    <div class="pressure-box">
                        29 psi
                        <span class="warning warning-low">+6 psi</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

.taycanImage {
    position: relative;
    margin-top: -100px;
    margin-left: 100px;
}

.details-content {
    padding: 20px;
}

.info-section {
    margin-bottom: 32px;
}

.info-section h2 {
    font-size: 18px;
    font-weight: 500;
    color: #333;
    margin-bottom: 12px;
}

/* Battery Styles */
.battery-bar {
    background: #eee;
    height: 20px;
    border-radius: 10px;
    position: relative;
    overflow: hidden;
}

.battery-level {
    background: #4CAF50;
    height: 100%;
    border-radius: 10px;
    transition: width 0.3s ease;
}

.battery-bar span {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #333;
    font-size: 14px;
    font-weight: 500;
}

/* Tire Pressure Styles */
.tire-pressure-container {
    position: relative;
    padding: 40px 20px;
    min-height: 280px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.tire-row {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0;
    z-index: 0;
}

.tire-row.top {
    margin-bottom: 0;
}

.tire-row.bottom {
    margin-top: 0;
}

.pressure-box {
    position: relative;
    border: 2px solid #444444;
    border-radius: 8px;
    font-weight: 500;
    padding: 25px 45px;
    background: white;
    min-width: 80px;
    color: #444444;
}

.car-illustration {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 180px;
    z-index: 1;
}

.warning {
    position: absolute;
    right: -12px;
    font-size: 12px;
    padding: 2px 6px;
    border-radius: 4px;
    white-space: nowrap;
    font-weight: bold;
}

.warning-high {
    color: #f59e0b;
    top: -20px;
}

.warning-low {
    color: #ef4444;
    bottom: -20px;
}
</style>