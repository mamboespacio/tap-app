import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonNote, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar } from "@ionic/react";
import { bagOutline } from "ionicons/icons";
import { useParams } from "react-router"
import { Vendor } from "../hooks/types";
import { useQuery } from "@tanstack/react-query";
import { getProductsByCategory } from "../data/loaders";
import { Link } from "react-router-dom";
import { useAddressStore } from "../data/AddressStore";
import { GetDistance } from "../components/GetDistance";
import { formatTime } from "../lib/utils";

interface Params {
  slug: string;
}

const CategoryProducts = () => {
  const params = useParams<Params>();
  const category = params?.slug;
  const addressStore = useAddressStore();
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
  const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const distance = GetDistance(lat1, lon1, lat2, lon2);
    return Math.round(distance * 100) / 100;
  }
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
        {products.map((item: Vendor, index: number) => (
          <Link key={index} to={`/vendors/${item.id}`} className="non-link">
            <div className="rounded-lg overflow-hidden ">
              <img className="aspect-video" src='assets/veggie3.png' alt={item.name} />
            </div>
            <p className="text-sm text-left font-semibold">{item.name}</p>
            <p className="text-sm text-left space-x-1">
              <span>{formatTime(item.openingHours)} a</span>
              <span>{formatTime(item.closingHours)}</span>
              <span>
                {getDistance(
                  item.latitude,
                  item.longitude,
                  addressStore.address.latitude,
                  addressStore.address.longitude
                )}km
              </span>
            </p>
          </Link>
        ))}
      </IonContent>
    </IonPage>
  );
}

export default CategoryProducts;