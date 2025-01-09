import React, { useState } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonInput, IonButton, IonToast, useIonRouter } from '@ionic/react';
import './Tab1.css';
import { getStrapiURL } from "../lib/utils";
import axios from "axios";
import { z } from "zod";
import { ZodErrors } from "../components/ZodError";
import { useUserStore } from "../data/UserStore";
import { useSessionStore } from "../data/SessionStore";

export interface Props {}

interface formData {
  username:string,
  password: string,
  dni: string,
  fullName: string,
  zodErrors: any,
  strapiErrors: any,
  data: any,
  message: string,
}

const initialState = {
  username: "",
  password: "",
  dni: "",
  fullName: "",
  zodErrors: "",
  strapiErrors: "",
  data: "",
  message: "",
}

const Register: React.FC<Props> = () => {

  const [isOpen, setIsOpen] = useState(false);
  const userStore = useUserStore();
  const sessionStore = useSessionStore();

  const doRegister = async () => {

    const schemaRegister = z.object({
      username: z.string().min(3).max(20, {
        message: "El usuario debe contener enrte 8 y 20 caracteres",
      }),
      password: z.string().min(6).max(100, {
        message: "La contraseña debe contener al menos 8 caracteres y un numero",
      }),
    });

    const [formState, setFormState] = useState<formData>(initialState);
    const baseUrl = getStrapiURL();
    const router = useIonRouter();

    axios
      .post(`${baseUrl}/api/auth/local/register`, {
        username: formState.username,
        password: formState.password,
        fullName: formState.fullName,
        dni: formState.dni,
      })
      .then((response) => {
        console.log("User profile", response.data.user);
        console.log("User token", response.data.jwt);
        userStore.setUser(response.data.user);
        sessionStore.setSession(response.data.jwt);
        router.push('/home', 'root', 'replace');
      })
      .catch((error) => {
        setFormState({ ...formState, strapiErrors: error.response.data.error.message })
        setIsOpen(true)
        // console.log("An error occurred:", error.response);
      });

  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Login</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="space-y-8">
        <div className="flex justify-center">
          <IonImg
            className="w-1/2"
            src="/logo-tap.png"
            alt="The Wisconsin State Capitol building in Madison, WI at night"
          ></IonImg>
        </div>
        <form className="px-4" action="#" method="POST">
          <div className="space-y-8">
            <div>
              <IonInput
                name="fullname"
                label="Nombre y apellido"
                labelPlacement="floating"
                fill="outline"
                type="text"
                onIonChange={(e: any) => setFormState({ ...formState, fullName: e.target.value })}
              />
            </div>
            <div>
              <IonInput
                name="id"
                label="DNI"
                labelPlacement="floating"
                fill="outline"
                type="number"
                onIonChange={(e: any) => setFormState({ ...formState, dni: e.target.value })}
              />
            </div>
            <div>
              <IonInput
                name="username"
                label="Email"
                labelPlacement="floating"
                fill="outline"
                type="email"
                onIonChange={(e: any) => setFormState({ ...formState, username: e.target.value })}              />
            </div>
            <div>
              <IonInput
                name="password"
                label="Contraseña"
                labelPlacement="floating"
                fill="outline"
                type="password"
                onIonChange={(e: any) => setFormState({ ...formState, password: e.target.value })}              />
            </div>
            <div className="flex justify-center">
              <div>
                <IonButton
                  className="rounded-full normal-case"
                  onClick={() => doRegister()}
                  >
                  Registrarme
                </IonButton>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <div>
              <IonButton
                color={"light"}
                className="rounded-full normal-case"
                onClick={() => doRegister()}
                >
                Ya tengo cuenta
              </IonButton>
            </div>
          </div>
        </form>
        </div>
        
      </IonContent>
    </IonPage>
  );
};

export default Register;
