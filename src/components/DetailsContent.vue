<script setup lang="ts">
import { IonIcon } from '@ionic/vue';
import { batteryHalfOutline } from 'ionicons/icons';

</script>

<template>
    <div class="details-content">
        <!-- Car Image Section -->
        <div class="car-image-section mb-8">
            <img src="/assets/imagesMainScreen/taycan/taycanImage.png" alt="Porsche Taycan" class="taycanImage" />
        </div>

        <!-- Total Mileage Section -->
        <div class="total-mileage">
            <div class="mileage-row">
                <h2>Total Mileage</h2>
                <p>3,122 km</p>
            </div>
        </div>

        <!-- Battery Section -->
        <div class="battery-section">
            <div class="battery-row">
                <h2>Battery</h2>
            </div>
            <div class="battery-indicator">
                <img src="/assets/imagesMainScreen/ChargingStation.svg" alt="ChargingStation" class="battery-icon">
                <div class="battery-bar">
                    <div class="battery-level" style="width: 40%"></div>
                </div>
            </div>
        </div>

        <!-- Tire Pressure Section -->
        <div class="tire-section">
            <div class="tire-row">
                <h2>Tire Pressure</h2>
            </div>
            <div class="tire-pressure-container">
                <!-- Top Row -->
                <div class="tire-row top">
                    <div class="pressure-box">35 psi</div>
                    <div class="pressure-box">
                        32 psi
                        <span class="warning warning-high">+3 psi</span>
                    </div>
                </div>

                <!-- Car Illustration -->
                <div class="car-illustration">
                    <img src="/assets/carIllustration.png" alt="Car Layout" />
                </div>

                <!-- Bottom Row -->
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
    color: black;
    margin-bottom: 32px;
}

.total-mileage {
    color: black;
    margin: 32px 0;
    padding: 0 16px;
}

.mileage-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.mileage-row h2 {
    font-size: 20px;
    font-weight: bolder;
    color: #1E1E1E;
    margin: 0;
}

.mileage-row p {
    font-size: 20px;
    font-weight: 400;
    color: #1E1E1E;
    margin: 0;
}

.info-section h2 {
    font-size: 20px;
    font-weight: bolder;
    color: #333;
    margin-bottom: 12px;
}

.battery-section {
    padding: 0 16px;
}

.battery-row {
    margin-bottom: 16px;
}

.battery-row h2 {
    font-size: 20px;
    font-weight: bolder;
    color: #1E1E1E;
    margin: 0;
}

.battery-indicator {
    display: flex;
    align-items: center;
    gap: 12px;
}

.battery-icon {
    font-size: 24px;
    color: #1E1E1E;
}

.battery-bar {
    flex: 1;
    height: 8px;
    background: #E5E5E5;
    border-radius: 4px;
    position: relative;
    overflow: hidden;
}

.battery-level {
    height: 100%;
    background: #4CAF50;
    border-radius: 4px;
    transition: width 0.3s ease;
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
    font-weight: bolder;
    padding: 2rem 3rem;
    background: white;
    min-width: 80px;
    color: #444444;
}

.car-illustration {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 160px;
    z-index: 1;
}

.car-illustration img {
    width: 100%;
    height: auto;
    opacity: 0.4;
}

.warning {
    position: absolute;
    font-size: 12px;
    font-weight: 500;
    white-space: nowrap;
}

.warning-high {
    top: -20px;
    right: 0;
    color: #F28100;
}

.warning-low {
    bottom: -20px;
    right: 0;
    color: #EF4444;
}
</style>