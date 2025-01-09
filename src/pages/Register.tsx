import React, { useState } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonInput, IonButton } from '@ionic/react';
import './Tab1.css';
import { getStrapiURL } from "../lib/utils";

export interface Props {}

const Register: React.FC<Props> = () => {
  const [username, setUserName] = useState<any>("");
  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<any>("");

  const doRegister = async () => {
    console.log(username, email + " " + password);
    const baseUrl = getStrapiURL();
    const url = new URL("/api/auth/local/register", baseUrl);

    const signUpResp = await fetch(URL + "/auth/local/register", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    const signUpInfo = await signUpResp.json();

    if (signUpInfo?.statusCode) {
      alert("Error: " + signUpInfo.data[0].messages[0].message);
    } else {
      alert("User Account Created");
      console.log(signUpInfo);
    }
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
                onIonChange={(e: any) => setUserName(e.target.value)}
              />
            </div>
            <div>
              <IonInput
                name="id"
                label="DNI"
                labelPlacement="floating"
                fill="outline"
                type="number"
                onIonChange={(e: any) => setUserName(e.target.value)}
              />
            </div>
            <div>
              <IonInput
                name="email"
                label="Email"
                labelPlacement="floating"
                fill="outline"
                type="email"
                onIonChange={(e: any) => setUserName(e.target.value)}
              />
            </div>
            <div>
              <IonInput
                name="password"
                label="Contraseña"
                labelPlacement="floating"
                fill="outline"
                type="password"
                onIonChange={(e: any) => setPassword(e.target.value)}
              />
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
