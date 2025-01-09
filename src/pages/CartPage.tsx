import { useRef, useState } from "react";
import { IonItem, IonButton, IonButtons, IonLabel, IonContent, IonGrid, IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonNote, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar } from "@ionic/react";
import { trashOutline } from "ionicons/icons";
import { useParams } from "react-router"
import { Vendor, Product } from "../hooks/types";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../data/loaders";
import { useCartStore } from "../data/CartStore";
import { IonBackButton, IonCard, IonCardContent, IonFooter } from "@ionic/react";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import axios from "axios";

import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

initMercadoPago('TEST-a8cef775-7dae-43d3-b850-f2e50f6a0130');
import { CardPayment } from '@mercadopago/sdk-react';

interface Params {
  id: string;
}

const CartPage = () => {
  const [preferenceId, setPreferenceId] = useState(null);
  const createPreference = async () => {
    try {
      const response = await axios.post('http://localhost:3000/create_preference', {
        title: 'mi producto',
        quantity: 1,
        price: 300
      })
      const {id} = response.data
      return id;
    }
    catch (error) {
      console.log(error);
    }
  }
  
  const handleBuy = async () => {
    const id = await createPreference()
    if (id) {
      setPreferenceId(id)
    }
  }

  const { products: cartProducts, removeAll } = useCartStore();
  let totalPrice = cartProducts.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.quantity * currentValue.product.price;
  }, 0);

  return (
    <IonPage id="category-page">
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle className="font-semibold text-center">Confirma tu pedido</IonTitle>
          <IonButtons slot="end">
            <IonButton>
              <IonButton color="dark">
                Vaciar
              </IonButton>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="ion-padding">
          <div>
            <h1 className="font-semibold">Detalles del pedido</h1>
          </div>
          <div className="">
            { cartProducts.length > 0 ? cartProducts.map(p => <CartItem key={p.product.id} item={p}></CartItem>) : 'No items yet'}
          </div>
          <div className="flex justify-between items-center gap-x-5 border-b-[1px] py-2">
            <p>Retiro:</p>
            <p className="font-semibold">Gratis</p>
          </div>
          <div className="flex justify-between items-center gap-x-5 border-b-[1px] py-2">
            <p>Total:</p>
            <p></p>
          </div>
          <div className="mt-3">
            <h1 className="font-semibold">Método de pago</h1>
            <IonItem lines="none" href="/card" button>
              <IonLabel>Selecionar...</IonLabel>
            </IonItem>
          </div>
          <div className="mt-3">
            <h1 className="font-semibold">Información importante</h1>
          </div>
          <div className="grid grid-flow-col justify-stretch mt-3 rounded-md bg-gray-50 px-4 py-2 ring-1 ring-inset ring-gray-500/10">
            <div className="">
              <p>Horario de retiro</p>
              <p className="text-semibold">4 a 6</p>
            </div>
            <div className="">
              <p>Dirección de retiro</p>
              <p className="text-semibold">4 a 6</p>
            </div>
          </div>
          <div className="flex flex-column py-2 border-b-1 mt-8 justify-center">
            { preferenceId && (<Wallet initialization={preferenceId}></Wallet>)}
            <IonButton className="normal-case" shape="round" onClick={handleBuy}>Confirmar pago</IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default CartPage;