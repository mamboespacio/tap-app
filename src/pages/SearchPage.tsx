import { useState } from "react";
import { IonButtons, IonList, IonItem, IonContent, IonHeader, IonPage, IonSearchbar, IonTitle, IonToolbar } from "@ionic/react";
import { Vendor, Product } from "../hooks/types";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../data/loaders";
import { IonBackButton, IonCard, IonCardContent, IonFooter } from "@ionic/react";
import { Link } from "react-router-dom";
import { getProducts } from "../data/loaders";
import { useIonRouter } from "@ionic/react";

interface Params {
  id: string;
}

const SearchPage = () => {
  const router = useIonRouter();
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['Products'],
    queryFn: getProducts,
  });
  const [results, setResults] = useState<Product[]>([]);
  
  const handleInput = (ev: Event) => {
    let query = '';
    const target = ev.target as HTMLIonSearchbarElement;
    if (target) query = target.value!.toLowerCase();
    if (query) {
      const tempResults = data.filter((d: Product) => d.name.toLowerCase().includes(query.toLowerCase()));
      setResults(tempResults);
    } else {
      setResults([]);
    }
    
    // console.log('results', results);
  };
  
  if (isPending) {
    return <span>Loading...</span>
  }
  if (isError) {
    return <span>Error: {error.message}</span>
  }
  return (
    <IonPage id="category-page">
      <IonHeader className="shadow-none">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle className="text-sm font-semibold text-center">Buscar</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar
            className="rounded-full border-none shadow-none"
            showClearButton="always"
            debounce={1000}
            onIonInput={(ev) => handleInput(ev)}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          { results.length === 0 ? 
            <IonItem>No results found</IonItem> :
            results.map((result, index) => (
              <Link to={`/products/${result.id}`} className="non-link">
                <IonItem key={index}>
                  {result.name}
                </IonItem>
              </Link>            
              ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
}

export default SearchPage;