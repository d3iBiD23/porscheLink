<template>
  <!-- Contenido principal -->
  <IonPage>
    <IonHeader>
      <!-- toolbar con logo porsche y luego modelo -->
      <IonToolbar>
        <IonTitle>My App</IonTitle>
      </IonToolbar>
      <!-- Slider superior -->
      <IonToolbar>
        <IonSegment scrollable value="homepage" @ionChange="segmentChanged">
          <IonSegmentButton value="details" router-link="/tabs/details">
            <IonLabel>Details</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="repair" router-link="/tabs/repair">
            <IonLabel>Repair</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="functions" router-link="/tabs/functions">
            <IonLabel>Functions</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </IonToolbar>
    </IonHeader>
    <IonContent>

    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { IonHeader, IonToolbar, IonTitle, IonContent, IonApp, IonMenu, IonList, IonItem, IonPage, IonButtons, IonMenuButton, IonSegment, IonSegmentButton, IonLabel } from '@ionic/vue';
const segmentChanged = (event: any) => {
  const selectedSegment = event.detail.value;
  console.log('Segment changed to:', selectedSegment);
};
</script>
<style scoped>
ion-content {
  --background: white;
}

ion-toolbar {
  --background: white;
  --color: black;
}

ion-segment {
  --background: #f9f9f9;
  --indicator-color: black;
}

ion-segment-button {
  color: black;
  --color-checked: #F28100;
  --background: transparent;
}

p {
  color: black;
}
</style>