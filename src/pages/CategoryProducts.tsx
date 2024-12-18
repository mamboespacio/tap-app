import { IonBadge, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonNote, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar } from "@ionic/react";
import { cart, chevronBackOutline, searchOutline, bagOutline } from "ionicons/icons";
import { useParams } from "react-router"
import { Vendor } from "../hooks/types";
import { useQuery } from "@tanstack/react-query";
import { getProductsByCategory } from "../data/loaders";
import { IonBackButton } from "@ionic/react";
import { Link } from "react-router-dom";

interface Params {
	slug: string;
}

const CategoryProducts = () => {
  const params = useParams<Params>();
  const category = params?.slug;
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['products', category],
    queryFn: () => getProductsByCategory(category)
  })
  if (isPending) {
    return <span>Loading...</span>
  }
  if (isError) {
    return <span>Error: {error.message}</span>
  }
  const products = data[0].vendors;
  return (
    <IonPage id="category-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle className="text-sm font-semibold text-center">{category}</IonTitle>
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
        { products.map((item:Vendor, index:number) => (
          <Link key={index} to={`/vendors/${item.id}`} className="non-link">
            
            <div className="rounded-lg overflow-hidden ">
              <img className="aspect-video" src='assets/veggie3.png' alt={item.name} />
            </div>
            <p className="text-sm text-left font-semibold">{item.name}</p>
            <p className="text-sm text-left space-x-1">
              <span>{item.openingHours}</span>
              <span>{item.closingHours}</span>
              <span>1.2 kms</span>
            </p>
          </Link>
          ))
        }
      </IonContent>
    </IonPage>
  );
}

export default CategoryProducts;