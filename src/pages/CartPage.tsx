import { useEffect, useState } from "react";
import { IonItem, IonButton, IonButtons, IonLabel, IonContent, IonGrid, IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonNote, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar } from "@ionic/react";
import { getProductById } from "../data/loaders";
import { useCartStore } from "../data/CartStore";
import { useUserStore } from "../data/UserStore";
import { IonBackButton, IonCard, IonCardContent, IonFooter } from "@ionic/react";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import axios from "axios";
import { mutateData } from "../data/loaders";
import { Order } from "../hooks/types";

import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { cart } from "ionicons/icons";

initMercadoPago('TEST-a8cef775-7dae-43d3-b850-f2e50f6a0130', { locale: 'es-AR' });

const CartPage = () => {
  const [preferenceId, setPreferenceId] = useState(null);

  const createOrder = async () => {
    const price = totalPrice.toString();
    console.log('creating order', user);
  
    const response = await mutateData('POST', 'orders', {  
      data: {
        users_permissions_user: user.user.id,
        vendor: cartProducts[0].product.vendors[0].id,
        condition: 'pending',
        products: cartProducts,
        price: price,
      }
    })
    .then(response => {
      console.log(response.data);
      // presentToast("Dirección Guardada", 'top');
      // router.push('/home', 'back');
    })
    .catch(error => {
      console.log(error);
      // presentToast("Error: " + error, 'top')
    })
  }

  const createPreference = async () => {
    try {
      const response = await axios.post('https://tap-api.vercel.app/create_preference', {
        title: 'mi compra',
        quantity: 1,
        price: totalPrice
      })
      const {id} = response.data
      return setPreferenceId(id);
    }
    catch (error) {
      console.log(error);
    }
  };

  const user = useUserStore();
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
              <IonButton color="dark" onClick={removeAll}>
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
            <p>{totalPrice}</p>
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
          <div className="mt-3">
            <div className="">
              <IonButton
                className="mt-4"
                onClick={() => createOrder()}
                expand="block">Confirmar pedido
              </IonButton>
            { preferenceId &&
              <Wallet initialization={{ preferenceId: preferenceId }} />
              
            }
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default CartPage;