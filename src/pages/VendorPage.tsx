import { IonBadge, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonNote, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar } from "@ionic/react";
import { heart, heartOutline, cart, chevronBackOutline, searchOutline, bagOutline } from "ionicons/icons";
import { useParams } from "react-router"
import { Vendor, Product } from "../hooks/types";
import { useQuery } from "@tanstack/react-query";
import { getVendorById } from "../data/loaders";
import { IonBackButton, IonCard, IonCardContent } from "@ionic/react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

interface Params {
  id: string;
}

const VendorPage = () => {
  const params = useParams <Params>();
  const vendorId = params?.id;
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['vendor', vendorId],
    queryFn: () => getVendorById(vendorId)
  })
  if (isPending) {
    return <span>Loading...</span>
  }
  if (isError) {
    return <span>Error: {error.message}</span>
  }
  const vendor = data[0];
  return (
    <IonPage id="category-page">
      <IonHeader className="shadow-none">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle className="text-sm font-semibold text-center">{vendor.name}</IonTitle>
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
        <div className="flex relative">
          <img className="aspect-video" src='assets/veggie3.png' />
          <div className="flex items-center absolute w-full h-full justify-center">
            <div className="relative bg-gray-50 bg-opacity-80 w-80 p-4 text-center rounded-md">
              <p className="font-semibold">{vendor.name}</p>
              <p>{vendor.address}</p>
              <p>Horario de retiro: 17:00 a 18:00 hs</p>
              <div className="absolute top-0 right-0">
                <IonButton color="dark" shape="round" fill="clear">
                  <IonIcon slot="icon-only" icon={heartOutline}></IonIcon>
                </IonButton>
              </div>
            </div>
          </div>
        </div>
        <div className="ion-padding">
          <div className=''>
            <h1 className='font-medium'>Promociones de hoy</h1>
          </div>
          {vendor?.products.map((item: Product, index: number) => (
            <div className="grid grid-cols-2 py-4">
              <Link to={`/products/${item.id}`} className="non-link">
                <IonCard className="m-0">
                  <img className="aspect-square" src='assets/veggie3.png' alt={item.name} />
                  <IonCardContent className="p-2">
                    <p className="text-sm text-left">{item.name}</p>
                    <p className="text-sm text-left space-x-1">
                      <span className="line-through">${item.price}</span>
                      <span>${item.salePrice}</span>
                    </p>
                    <p className="text-xs">3 Disponibles</p>
                  </IonCardContent>
                </IonCard>
              </Link>
            </div>
          ))
          }
          <div className=''>
            <h1 className='font-medium'>Packs Disponibles</h1>
          </div>
          {vendor?.products.map((item: Product, index: number) => (
            <div className="py-4">
              <Link to={`/products/${item.id}`} className="non-link">
                <IonCard className="m-0">
                  <IonCardContent className="p-0">
                    <div className="flex">
                      <div className="flex w-1/3">
                        <img className="aspect-square" src='assets/veggie3.png' alt={item.name} />
                      </div>
                      <div className="flex flex-col p-2">
                        <p className="text-sm text-left">{item.name}</p>
                        <p className="text-sm text-left space-x-1">
                          <span className="line-through">${item.price}</span>
                          <span>${item.salePrice}</span>
                        </p>
                        <p className="text-xs">3 Disponibles</p>
                      </div>
                    </div>
                    
                    
                  </IonCardContent>
                </IonCard>
              </Link>
            </div>
          ))
          }
        </div>
        
      </IonContent>
    </IonPage>
  );
}

export default VendorPage;