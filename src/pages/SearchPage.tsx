import { IonBadge, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonNote, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar } from "@ionic/react";
import { cart, chevronBackOutline, searchOutline, bagOutline, trashBin } from "ionicons/icons";
import { useParams } from "react-router"
import { Vendor, Product } from "../hooks/types";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../data/loaders";
import { IonBackButton, IonCard, IonCardContent, IonFooter } from "@ionic/react";
import { Link } from "react-router-dom";

interface Params {
  id: string;
}

const SearchPage = () => {
  return (
    <IonPage id="category-page">
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle className="text-sm font-semibold text-center">Buscar</IonTitle>
          <IonButtons slot="end">
            <IonButton>
              <IonButton color="dark" routerLink="/cart">
                <IonIcon icon={bagOutline} />
              </IonButton>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonSearchbar className="rounded-pill" showClearButton="always"></IonSearchbar>
      </IonContent>
    
    </IonPage>
  );
}

export default SearchPage;