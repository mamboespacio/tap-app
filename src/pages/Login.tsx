import React, { useState } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonInput, IonButton, IonToast, useIonRouter } from '@ionic/react';
import { Link } from "react-router-dom";
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
  zodErrors: any,
  strapiErrors: any,
  data: any,
  message: string,
}

const initialState = {
  username: "",
  password: "",
  zodErrors: "",
  strapiErrors: "",
  data: "",
  message: "",
}

const Login: React.FC<Props> = () => {

  const [isOpen, setIsOpen] = useState(false);
  const userStore = useUserStore();
  const sessionStore = useSessionStore();

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

  const doLogin = async () => {
    const validatedFields = schemaRegister.safeParse({
      username: formState.username,
      password: formState.password,
    });
    
    if (!validatedFields.success) {
      // console.log(validatedFields.error);
      return setFormState({
        ...formState,
        zodErrors: validatedFields.error.flatten().fieldErrors,
        strapiErrors: null,
        message: "Missing Fields. Failed to Register.",
      })
    }

    axios
      .post(`${baseUrl}/api/auth/local`, {
        identifier: formState.username,
        password: formState.password,
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
      <IonHeader className="font-semibold text-center shadow-none">
        <IonToolbar>
          <IonTitle className="text-sm font-semibold text-center">Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="space-y-8 ion-padding">
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
                label="username"
                labelPlacement="floating"
                fill="outline"
                type="text"
                onIonChange={(e: any) => setFormState({ ...formState, username: e.target.value })}
              />
              <ZodErrors error={formState?.zodErrors?.username} />
            </div>
            <div>
              <IonInput
                label="password"
                labelPlacement="floating"
                fill="outline"
                type="password"
                onIonChange={(e: any) => setFormState({ ...formState, password: e.target.value })}
              />
              <ZodErrors error={formState?.zodErrors?.password} />
              <a className="text-sm" href="#">Olvidé mi contraseña</a>
            </div>
            <div className="flex justify-center">
              <div>
                <IonButton
                  shape="round"
                  className="normal-case"
                  onClick={() => doLogin()}
                  >
                  Iniciar sesión
                </IonButton>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div>
              <Link to="/register" className="non-link">
                <IonButton
                  shape="round"
                  color={"light"}
                  className="normal-case"
                  >
                  Registrarme
                </IonButton>
              </Link>
            </div>
          </div>
          {formState.strapiErrors && (
            <IonToast
              isOpen={isOpen}
              message={formState.strapiErrors}
              duration={5000}
              >
            </IonToast>
          )}
        </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
