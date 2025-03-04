import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonToolbar } from '@ionic/react';
import { bagOutline, pin } from 'ionicons/icons';
import { useUserStore } from '../data/UserStore';
import { CategorySlide } from '../components/CategorySlide';
import { OnSaleSlide } from '../components/OnSaleSlide';
import { FavouriteSlide } from '../components/FavouritesSlide';

const Home = () => {
  const user = useUserStore((state) => state.user);
  return (
    <IonPage id="home-page">
      <IonHeader className="shadow-none">
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton>
              <IonButton className="font-semibold normal-case space-x-1" color="dark" routerLink="/addresses">
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