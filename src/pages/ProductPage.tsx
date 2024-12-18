import { useRef } from "react";
import { IonBadge, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonNote, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar } from "@ionic/react";
import { heart, heartOutline, chevronBackOutline } from "ionicons/icons";
import { useParams } from "react-router"
import { Vendor, Product } from "../hooks/types";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../data/loaders";
import { useCartStore } from "../data/CartStore";
import { IonBackButton, IonCard, IonCardContent, IonFooter } from "@ionic/react";
import { Link } from "react-router-dom";
import CartButton from "../components/CartButton";

interface Params {
  id: string;
}

const ProductPage = () => {
  const {products: cartProducts, addItem} = useCartStore();
  const params = useParams<Params>();
  const productId = params?.id;
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductById(productId)
  })
  if (isPending) {
    return <span>Loading...</span>
  }
  if (isError) {
    return <span>Error: {error.message}</span>
  }
  const product = data[0];
  return (
    <IonPage id="category-page">
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle className="text-sm font-semibold text-center">{product.name}</IonTitle>
          <IonButtons slot="end">
            <CartButton/>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="relative flex">
          <img className="aspect-square" src='assets/veggie3.png' />
          <div className="flex items-center absolute w-full h-full justify-center">
            <div className="relative bg-gray-50 bg-opacity-80 w-80 p-4 text-center rounded-md">
              <p className="font-semibold">Burger Food</p>
              <p>Laprida 879, CABA</p>
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
          <div className="">
            <h1 className="text-sm text-left font-semibold">
              {product.name}
              <span className="pl-4">
                ${product.price}
              </span>
              <span className="pl-1">
                {product.onSale && (product.salePrice)}
              </span>
            </h1>
            <p className="text-sm text-left space-x-1">
              <span>Aca va una description de lo que tiene el pack</span>
            </p>
          </div>
          <div className="flex justify-between items-center pt-2">
            <div className="max-w-[6rem]">
              <div className="flex border border-black rounded-md">
                <button type="button" id="decrement-button" data-input-counter-decrement="quantity-input" className="border border-gray-300 rounded-s-lg p-3 h-8 focus:outline-none">
                  <svg className="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                  </svg>
                </button>
                <input type="text" id="quantity-input" data-input-counter aria-describedby="helper-text-explanation" className="border-gray-300 h-8 text-center bg-white text-gray-900 text-sm block w-full py-2.5 " placeholder="99" required />
                <button type="button" id="increment-button" data-input-counter-increment="quantity-input" className="border border-gray-300 rounded-s-lg p-3 h-8 focus:outline-none">
                  <svg className="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                  </svg>
                </button>
              </div>
            </div>
            <IonButton shape="round" onClick={e => addItem({product, quantity: 1})}>Salvar</IonButton>
          </div>
          <div>
            <p className="text-xs">3 disponibles</p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default ProductPage;