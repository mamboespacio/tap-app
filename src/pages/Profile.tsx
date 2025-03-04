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
      <IonHeader className="shadow-none">
        <IonToolbar>
          <IonTitle className="text-sm font-semibold text-center">Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="">
          <IonCard color={"light"}>
            <IonCardHeader>
              <IonCardTitle>{user.fullName}</IonCardTitle>
              <IonCardSubtitle>{user.email}</IonCardSubtitle>
            </IonCardHeader>
          </IonCard>
          <IonItemDivider className="bg-transparent">
            <IonLabel>Tu actividad</IonLabel>
          </IonItemDivider>
          <IonItem lines="none" href="/addresses" button>
            <IonLabel>Direcciones</IonLabel>
          </IonItem>
          <IonItem lines="none" button>
            <IonLabel>Favoritos</IonLabel>
          </IonItem>
          <IonItem lines="none" button>
            <IonLabel>Tarjetas guardadas</IonLabel>
          </IonItem>
          <IonItem lines="none" href="/orders" button>
            <IonLabel>Historial de compras</IonLabel>
          </IonItem>
          <IonItemDivider className="bg-transparent">
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
