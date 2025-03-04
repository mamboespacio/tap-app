
import { IonBackButton, IonButtons, IonList, IonItem, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useQuery } from "@tanstack/react-query";
import { getAddresses } from "../data/loaders";
import { Address } from "../hooks/types";
import AddressItem from "../components/AddressItem";

const AddressesPage = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['addresses'],
    queryFn: getAddresses,
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
          <IonTitle className="text-sm font-semibold text-center">Direcciones</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {data.length === 0 ? <IonItem>No results found</IonItem>
            : data.map((item: Address, index: number) => (
              <IonItem key={index}>
                <AddressItem item={item}/>
              </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
}

export default AddressesPage;