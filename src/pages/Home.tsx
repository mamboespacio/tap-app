import { useState } from 'react';
import { IonBadge, IonButton, IonButtons, IonCard, IonCardContent, IonCardSubtitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonTitle, IonToolbar, useIonViewDidEnter, useIonViewWillLeave } from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from "./Home.module.scss";
import { cart, heart } from 'ionicons/icons';

import { ProductStore } from '../data/ProductStore';
import { FavouritesStore } from '../data/FavouritesStore';
import { CartStore } from '../data/CartStore';
import { Link } from 'react-router-dom';
import { LocationCard } from '../components/LocationCard';
import { CategorySlide } from '../components/CategorySlide';
import { OfferSlide } from '../components/OfferSlide';
import 'swiper/scss';
import '@ionic/react/css/ionic-swiper.css';

const Home = () => {
  const products = ProductStore.useState(s => s.products);
  const favourites = FavouritesStore.useState(s => s.product_ids);
  const shopCart = CartStore.useState(s => s.product_ids);

  return (
    <IonPage id="home-page" className={styles.homePage}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>TAP</IonTitle>

          <IonButtons slot="end">
            <IonBadge color="danger">
              {favourites.length}
            </IonBadge>
            <IonButton color="danger" routerLink="/favourites">
              <IonIcon icon={heart} />
            </IonButton>

            <IonBadge color="dark">
              {shopCart.length}
            </IonBadge>
            <IonButton color="dark" routerLink="/cart">
              <IonIcon icon={cart} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" fullscreen>

        <LocationCard></LocationCard>
        
        <Swiper
          id="slider"
          className={`${styles.categorySlider}`}
          slidesPerView={3}
          spaceBetween={10}
        >
          <SwiperSlide>
            <CategorySlide name="Burgers" path="/category/burgers" image="/assets/veggie3.png" />
          </SwiperSlide>
          <SwiperSlide>
            <CategorySlide name="Burgers" path="/category/burgers" image="/assets/veggie3.png" />
          </SwiperSlide>
          <SwiperSlide>
            <CategorySlide name="Burgers" path="/category/burgers" image="/assets/veggie3.png" />
          </SwiperSlide>
          <SwiperSlide>
            <CategorySlide name="Burgers" path="/category/burgers" image="/assets/veggie3.png" />
          </SwiperSlide>
        </Swiper>
        <div className='py-4'>
          <h1 className='font-medium'>Promociones de hoy</h1>
        </div>
        <Swiper
          id="slider2"
          className=""
          slidesPerView={2}
          spaceBetween={10}
        >
          <SwiperSlide>
            <OfferSlide name="Burgers" path="/category/burgers" image="/assets/veggie3.png" />
          </SwiperSlide>
          <SwiperSlide>
            <OfferSlide name="Burgers" path="/category/burgers" image="/assets/veggie3.png" />
          </SwiperSlide>
          <SwiperSlide>
            <OfferSlide name="Burgers" path="/category/burgers" image="/assets/veggie3.png" />
          </SwiperSlide>
          <SwiperSlide>
            <OfferSlide name="Burgers" path="/category/burgers" image="/assets/veggie3.png" />
          </SwiperSlide>
        </Swiper>
        <div className='py-4'>
          <h1 className='font-medium'>Tus Favoritos</h1>
        </div>
        <Swiper
          id="slider3"
          className={`${styles.categorySlider}`}
          slidesPerView={3}
          spaceBetween={10}
        >
          <SwiperSlide>
            <CategorySlide name="Burgers" path="/category/burgers" image="/assets/veggie3.png" />
          </SwiperSlide>
          <SwiperSlide>
            <CategorySlide name="Burgers" path="/category/burgers" image="/assets/veggie3.png" />
          </SwiperSlide>
          <SwiperSlide>
            <CategorySlide name="Burgers" path="/category/burgers" image="/assets/veggie3.png" />
          </SwiperSlide>
          <SwiperSlide>
            <CategorySlide name="Burgers" path="/category/burgers" image="/assets/veggie3.png" />
          </SwiperSlide>
        </Swiper>
      </IonContent>
    </IonPage>
  );
};

export default Home;