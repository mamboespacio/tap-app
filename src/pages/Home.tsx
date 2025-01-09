import { useState } from 'react';
import { IonBadge, IonButton, IonButtons, IonCard, IonCardContent, IonCardSubtitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonTitle, IonToolbar, useIonViewDidEnter, useIonViewWillLeave } from '@ionic/react';

import styles from "./Home.module.scss";
import { bag, bagOutline, cart, heart, person, pin } from 'ionicons/icons';

import { ProductStore } from '../data/ProductStore';
import { FavouritesStore } from '../data/FavouritesStore';
import { useCartStore } from "../data/CartStore";
import { useUserStore } from '../data/UserStore';
import { LocationCard } from '../components/LocationCard';
import { CategorySlide } from '../components/CategorySlide';
import { OnSaleSlide } from '../components/OnSaleSlide';
import { FavouriteSlide } from '../components/FavouritesSlide';

const Home = () => {
  const products = ProductStore.useState(s => s.products);
  const favourites = FavouritesStore.useState(s => s.product_ids);
  const user = useUserStore((state) => state.user);
  return (
    <IonPage id="home-page">
      <IonHeader className="shadow-none">
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton>
              <IonButton className="font-semibold normal-case space-x-1" color="dark" routerLink="/location">
                <IonIcon icon={pin} />
                <div>{user.fullName}, al rescate!</div>
              </IonButton>
            </IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton>
              <IonButton color="dark" routerLink="/cart">
                <IonIcon icon={bagOutline} />
              </IonButton>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        {/* <LocationCard></LocationCard> */}
        <CategorySlide/>
        <div className='py-4'>
          <h1 className='font-medium'>Promociones de hoy</h1>
        </div>
        <OnSaleSlide/>
        <div className='py-4'>
          <h1 className='font-medium'>Tus Favoritos</h1>
        </div>
        <FavouriteSlide/>
      </IonContent>
    </IonPage>
  );
};

export default Home;