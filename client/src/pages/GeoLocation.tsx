import React, { useState, useRef, useEffect } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonButtons, IonBackButton, IonButton } from '@ionic/react';
import './Tab1.css';
import { Geolocation } from '@capacitor/geolocation';
import { GoogleMap } from '@capacitor/google-maps';

export interface Props { }

const Location: React.FC<Props> = () => {
  const mapRef = useRef<HTMLElement>();
  const [map, setMap] = useState(null);

  useEffect(() => {
    const createMap = async () => {
      const location = await Geolocation.getCurrentPosition();
      if (!mapRef.current) return;

      const newMap:GoogleMap = await GoogleMap.create({
        id: 'my-map',
        element: mapRef.current,
        apiKey: 'AIzaSyDFiuw-mEL0_gSTEtW5D5gG_aago5hdz3s',
        config: {
          center: {
            lat: location.coords.latitude,
            lng: location.coords.longitude,
          },
          zoom: 15,
        },
      });
      setMap(newMap);

      const markerId = await map.addMarker({
        coordinate: {
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        }
      });
    };
    createMap();
  }, []);


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle className="text-sm font-semibold text-center">Confirma tu ubicación</IonTitle>
          <IonButtons slot="end">
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="space-y-8">
        
          <div className="component-wrapper">
            <capacitor-google-map
              ref={mapRef}
              className=""
              style={{
                display: 'inline-block',
                width: '100%',
                height:' 90vh'
              }}
            >
            </capacitor-google-map>
          </div>
        </div>
      </IonContent>
      <IonFooter>
        <IonToolbar className="bg-transparent">
          <IonButton routerLink="/home" expand="block">Guardar Dirección</IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Location;
