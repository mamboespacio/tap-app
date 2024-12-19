import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem, 
  IonLabel,
  IonItemDivider,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle 
} from '@ionic/react';
import { useUserStore } from "../data/UserStore";

export interface Props {}

const Profile: React.FC<Props> = () => {
  const user = useUserStore((state) => state.user);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Profile</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="">
          <IonCard color={"light"}>
            <IonCardHeader>
              <IonCardTitle>{user.fullName}</IonCardTitle>
              <IonCardSubtitle>{user.email}</IonCardSubtitle>
            </IonCardHeader>
          </IonCard>
          <IonItemDivider>
            <IonLabel>Tu actividad</IonLabel>
          </IonItemDivider>
          <IonItem lines="none" button>
            <IonLabel>Direcciones</IonLabel>
          </IonItem>
          <IonItem lines="none" button>
            <IonLabel>Favoritos</IonLabel>
          </IonItem>
          <IonItem lines="none" button>
            <IonLabel>Tarjetas guardadas</IonLabel>
          </IonItem>
          <IonItem lines="none" button>
            <IonLabel>Historial de compras</IonLabel>
          </IonItem>
          <IonItemDivider>
            <IonLabel>Configuración</IonLabel>
          </IonItemDivider>
          <IonItem lines="none" button>
            <IonLabel>Preguntas frecuentes</IonLabel>
          </IonItem>
          <IonItem lines="none" button>
            <IonLabel>Información Legal</IonLabel>
          </IonItem>
          <IonItem lines="none" button>
            <IonLabel>Notificaciones</IonLabel>
          </IonItem>
        </div>
        
      </IonContent>
    </IonPage>
  );
};

export default Profile;
