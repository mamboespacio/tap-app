import React, { useState } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonInput, IonButton } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

export interface Props {}

const Login: React.FC<Props> = () => {
  const [username, setUserName] = useState<any>("");
  const [password, setPassword] = useState<any>("");

  const doLogin = async () => {
    console.log(username, password);
    const URL = "http://localhost:1337";

    const loginResp = await fetch(URL + "/api/auth/local", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        identifier: username,
        password: password,
      }),
    });
    const loginInfo =  await loginResp.json();

    if (loginInfo?.statusCode) {
        alert("Error: " + loginInfo.data[0].messages[0].message)
    } else {
        alert("User Logged In");
        console.log(loginInfo);
    }
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
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
                label="username"
                labelPlacement="floating"
                fill="outline"
                type="text"
                onIonChange={(e: any) => setUserName(e.target.value)}
              />
            </div>
            <div>
              <IonInput
                label="password"
                labelPlacement="floating"
                fill="outline"
                type="password"
                onIonChange={(e: any) => setPassword(e.target.value)}
              />
              <a className="text-sm" href="#">Olvidé mi contraseña</a>
            </div>
            <div className="flex justify-center">
              <div>
                <IonButton
                  className="rounded-full normal-case"
                  onClick={() => doLogin()}
                  >
                  Iniciar sesión
                </IonButton>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <div>
              <IonButton
                color={"light"}
                className="rounded-full normal-case"
                onClick={() => doLogin()}
                >
                Registrarme
              </IonButton>
            </div>
          </div>
        </form>
        </div>
        
      </IonContent>
    </IonPage>
  );
};

export default Login;
