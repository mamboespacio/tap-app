import React, { useState, useEffect } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonButtons, IonBackButton, IonButton, IonInput, useIonToast, IonModal, useIonRouter } from '@ionic/react';
import { Geolocation } from '@capacitor/geolocation';
import Map, {Marker} from 'react-map-gl/maplibre';
import { mutateData } from "../data/loaders";
import { useAddressStore } from "../data/AddressStore";

export interface Props { }
export interface ViewState {
  longitude: number;
  latitude: number;
  zoom: number;
}
export interface Marker {
  longitude?: number;
  latitude?: number;
}

const Location = () => {
  const router = useIonRouter();
  const addressStore = useAddressStore();
  const [viewState, setViewState] = React.useState<ViewState>();
  const [marker, setMarker] = React.useState<Marker>({});
  const [isOpen, setIsOpen] = useState(false);
  const [addressName, setAddressName] = useState('');
  const [present] = useIonToast();
  const presentToast = (message:string, position: 'top' | 'middle' | 'bottom') => {
    present({
      message: message,
      duration: 1500,
      position: position,
    });
  };

  const saveAddress = async (name: string) => {
    const response = await mutateData('POST', 'addresses', {  
      data: {
        name: name,
        longitude: viewState.longitude,
        latitude: viewState.latitude
      }
    })
    .then(response => {
      setIsOpen(false);
      console.log(response.data);
      addressStore.setAddress(response.data);
      // presentToast("Dirección Guardada", 'top');
      router.push('/home', 'back');
    })
    .catch(error => {
      presentToast("Error: " + error, 'top')
    })
  }

  useEffect(() => {
    const createMap = async () => {
      const location = await Geolocation.getCurrentPosition();
      setViewState({
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
        zoom: 16
      })
      setMarker({
        longitude: location.coords.longitude,
        latitude: location.coords.latitude
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
        <div className="h-full">
          { viewState ? 
              <Map
                {...viewState}
                mapStyle="https://api.maptiler.com/maps/streets/style.json?key=eOkRnUiFQShLNosQA82y"
              >
                {/* <Marker longitude={marker.longitude} latitude={marker.latitude} color="red"  /> */}
              </Map>
            : <div>Geolocation not available</div> 
          }
        </div>
        <IonModal
          isOpen={isOpen}
          onWillDismiss={() => setIsOpen(false)}
        >
          <IonHeader>
            <IonToolbar>
              <IonTitle>Guardar Dirección</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <form className="flex flex-col items-center">
              <IonInput
                label="Nombre"
                labelPlacement="stacked"
                type="text"
                placeholder="Por ejemplo: Casa"
                onIonChange={(e: any) => setAddressName(e.target.value)}
              />
              <IonButton
                className="mt-4"
                onClick={() => saveAddress(addressName)}
                expand="block">Guardar Dirección
              </IonButton>
            </form>
          </IonContent>
        </IonModal>
      </IonContent>
      <IonFooter>
        <IonToolbar className="bg-transparent">
          <IonButton onClick={() => setIsOpen(true)} expand="block">Confirmar Dirección</IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Location;
