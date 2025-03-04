import { useState } from "react";
import { IonButton, IonIcon, useIonToast } from "@ionic/react"
import { heart, heartOutline } from "ionicons/icons"
import { mutateData } from "../data/loaders"
import { useUserStore } from "../data/UserStore";
import { Product } from "../hooks/types";

export default function FavouriteButton({ product }: { product: Product }) {
  const [present] = useIonToast();
  const presentToast = (message:string, position: 'top' | 'middle' | 'bottom') => {
    present({
      message: message,
      duration: 1500,
      position: position,
    });
  };
  const { user, addItem, removeItem } = useUserStore();
  const [isFavourite, setIsFavourite] = useState(user.favourites.includes(product.id));
  const addtoFavourites = async (product:Product) => {
    
    isFavourite ? removeItem(product.id) : addItem(product.id)
    const payload = {
      favourites: user.favourites
    };
    const response = await mutateData('PUT', `users/${user.id}`, payload)
    .then(response => {
      setIsFavourite(!isFavourite);
    })
    .catch(error => {
      presentToast("Error: " + error, 'top');
    })
  }

  return (
    <div className="absolute top-0 right-0">
      <IonButton
        color="dark"
        shape="round"
        fill="clear"
        onClick={() => addtoFavourites(product)}
      >
        <IonIcon slot="icon-only" icon={isFavourite ? heart : heartOutline }></IonIcon>
      </IonButton>
    </div>
  )
}
