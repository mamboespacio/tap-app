
import { IonBackButton, IonButtons, IonList, IonItem, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../data/loaders";
import { Order } from "../hooks/types";
import OrderItem from "../components/OrderItem";

const OrdersPage = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
  });

  if (isPending) {
    return <span>Loading...</span>
  }
  if (isError) {
    return <span>Error: {error.message} </span>
  }
  return (
    <IonPage id="category-page" >
      <IonHeader className="shadow-none">
        <IonToolbar>
          <IonButtons slot="start" >
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle className="text-sm font-semibold text-center">Órdenes de compra</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {data.length === 0 ? <IonItem>No results found</IonItem>
            : data.map((item: Order, index: number) => (
              <IonItem key={index}>
                <OrderItem item={item}/>
              </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
}

export default OrdersPage;