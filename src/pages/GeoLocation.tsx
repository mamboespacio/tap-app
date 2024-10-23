import React, { useState } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonInput, IonButton } from '@ionic/react';
import './Tab1.css';
import { Geolocation } from '@capacitor/geolocation';

export interface Props { }

const Location: React.FC<Props> = () => {
  const getLocation = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    console.log('Current position:', coordinates);
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Location</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Location</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="space-y-8">
          <form className="px-4" action="#" method="POST">
            <div className="flex justify-center">
              <div>
                <IonButton
                  color={"light"}
                  className="rounded-full normal-case"
                  onClick={() => getLocation()}
                >
                  Get Location
                </IonButton>
              </div>
            </div>
          </form>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Location;
