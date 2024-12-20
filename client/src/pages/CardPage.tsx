import { useState } from "react";
import axios from "axios";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonTitle, 
  IonBackButton,
  IonToolbar,
  IonInput,
  IonButton,
  IonButtons,
  useIonToast
} from "@ionic/react";
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { postData } from "../data/loaders";

const CardPage = () => {
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardHolder, setCardHolder] = useState<string>('');
  const [cardExpiry, setCardExpiry] = useState<string>('');
  const [cardCvc, setCardCvc] = useState<string>('');
  const [focus, setFocus] = useState<any>(null);
  
  const [present] = useIonToast();

  const presentToast = (message:string, position: 'top' | 'middle' | 'bottom') => {
    present({
      message: message,
      duration: 1500,
      position: position,
    });
  };

  const saveCard = async () => {
    const response = await axios.post('http://localhost:1337/api/cards', {
      data: {
        cardNumber: cardNumber,
        cardHolder: cardHolder,
        cardExpiry: cardExpiry,
        cardCvc: cardCvc
      }
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      presentToast("Tarjeta Guardada", 'top');
      // setData(response.data);
      // setLoading(false);
    })
    .catch(error => {
      presentToast("Error: " + error, 'top')
      // setError(error);
      // setLoading(false);
    })
  }
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle className="text-sm font-semibold text-center">Agregar Tarjeta</IonTitle>
          <IonButtons slot="end">

          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="ion-padding">
          <div className="p-8">
            <Cards
              number={cardNumber}
              expiry={cardExpiry}
              cvc={cardCvc}
              name={cardHolder}
              focused={focus}
            />
          </div>
          <form className="flex flex-col items-center">
            <div className="space-y-4 w-8/12">
              <div>
                <IonInput
                  label="Núumero de tarjeta"
                  labelPlacement="floating"
                  fill="outline"
                  type="number"
                  name="number"
                  onIonChange={(e: any) => setCardNumber(e.target.value)}
                  onIonFocus={(e: any) => setFocus(e.target.name)}
                />
              </div>
              <div>
                <IonInput
                  label="Nombre"
                  labelPlacement="floating"
                  fill="outline"
                  type="text"
                  name="name"
                  onIonChange={(e: any) => setCardHolder(e.target.value)}
                  onIonFocus={(e: any) => setFocus(e.target.name)}
                />
              </div>
              <div className="flex gap-4">
                <IonInput
                  label="Fecha de vencimiento"
                  labelPlacement="floating"
                  fill="outline"
                  type="number"
                  name="expire"
                  onIonChange={(e: any) => setCardExpiry(e.target.value)}
                  onIonFocus={(e: any) => setFocus(e.target.name)}
                />
                <IonInput
                  label="CVV"
                  labelPlacement="floating"
                  fill="outline"
                  type="password"
                  name="cvc"
                  onIonChange={(e: any) => setCardCvc(e.target.value)}
                  onIonFocus={(e: any) => setFocus(e.target.name)}
                />
              </div>
              {/* <input
                type="number"
                name="number"
                placeholder="Card Number"
                value={state.number}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              /> */}
            </div>
            <div className="flex flex-column py-2 border-b-1 mt-8 justify-center">
              <IonButton
                className="normal-case"
                shape="round"
                onClick={() => saveCard()}
              >
                Guardar tarjeta
              </IonButton>
            </div>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default CardPage;