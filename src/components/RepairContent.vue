<template>
    <div class="details-content">
        <div class="info-section">
            <h2>REPAIR CONTENT</h2>
        </div>
    </div>
</template>

<style scoped>

h2, p {
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
</style>