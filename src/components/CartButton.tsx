import { useEffect, useState } from "react";
import { IonButton, IonButtons, IonIcon } from "@ionic/react";
import { bagOutline } from "ionicons/icons";
import { useCartStore } from "../data/CartStore";


const CartButton = () => {
  const {products: cartProducts} = useCartStore();
  
  let totalProducts = cartProducts.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.quantity;
  }, 0);

  return (
    <IonButton>
      <IonButton color="dark" routerLink="/cart">
        <IonIcon icon={bagOutline} />
        {totalProducts}
      </IonButton>
    </IonButton>
  );
}

export default CartButton;