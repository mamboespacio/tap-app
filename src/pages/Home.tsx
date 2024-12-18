import { useState } from 'react';
import { IonBadge, IonButton, IonButtons, IonCard, IonCardContent, IonCardSubtitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonTitle, IonToolbar, useIonViewDidEnter, useIonViewWillLeave } from '@ionic/react';

import styles from "./Home.module.scss";
import { bag, bagOutline, cart, heart } from 'ionicons/icons';

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
  return (
    <IonPage id="home-page">
      <IonContent className="ion-padding" fullscreen>
        <LocationCard></LocationCard>
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