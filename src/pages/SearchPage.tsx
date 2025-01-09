import { useState } from "react";
import { IonButton, IonButtons, IonList, IonItem, IonContent, IonHeader, IonIcon, IonPage, IonSearchbar, IonTitle, IonToolbar } from "@ionic/react";
import { Vendor, Product } from "../hooks/types";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../data/loaders";
import { IonBackButton, IonCard, IonCardContent, IonFooter } from "@ionic/react";
import { Link } from "react-router-dom";
import { getProducts } from "../data/loaders";

interface Params {
  id: string;
}

const SearchPage = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['Products'],
    queryFn: getProducts,
  });
  const [results, setResults] = useState<string[]>([]);
  
  const handleInput = (ev: Event) => {
    let query = '';
    const target = ev.target as HTMLIonSearchbarElement;
    if (target) query = target.value!.toLowerCase();
    if (query) {
      const tempResults = data.filter((d: Product) => d.name.toLowerCase().includes(query.toLowerCase()));
      setResults(tempResults.map((r: Product) => r.name));
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
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle className="font-semibold text-center">Buscar</IonTitle>
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
          {results.length === 0 ? <IonItem>No results found</IonItem> : results.map((result, index) => (<IonItem key={index}>{result}</IonItem>))}
        </IonList>
      </IonContent>
    </IonPage>
  );
}

export default SearchPage;