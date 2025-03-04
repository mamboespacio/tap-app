import { useState } from "react";
import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonNote, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar } from "@ionic/react";
import { removeOutline, addOutline } from "ionicons/icons";
import { useParams } from "react-router"
import { Vendor, Product } from "../hooks/types";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../data/loaders";
import { useCartStore } from "../data/CartStore";
import CartButton from "../components/CartButton";
import FavouriteButton from "../components/FavouriteButton";
import { GetDistance } from "../components/GetDistance";
import { formatTime } from "../lib/utils";

interface Params {
  id: string;
}

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const {products: cartProducts, addItem} = useCartStore();
  const params = useParams<Params>();
  const productId = params?.id;
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductById(productId)
  })
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  }
  const decreaseQuantity = () => {
    quantity > 1 ? setQuantity(quantity - 1) : setQuantity(1);
  }
  if (isPending) {
    return <span>Loading...</span>
  }
  if (isError) {
    return <span>Error: {error.message}</span>
  }
  const product = data[0];
  const vendor = product?.vendors[0];
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
              <p className="font-semibold">{vendor.name}</p>
              <p>{vendor.address}</p>
              <p>
                Horario de retiro: {formatTime(vendor.openingHours)} a {formatTime(vendor.closingHours)}
              </p>
              <FavouriteButton product={product}/>
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
            <div className="max-w-[6rem] flex item-center border-[1px] rounded-md p-2 mb-2">
              <button
                onClick={() => decreaseQuantity()}
                className="w-6 h-6 font-medium rounded-full">
                  <IonIcon icon={removeOutline}/> 
              </button>
              <div>
                <span className="font-medium">{quantity}</span>
              </div>
              <button
                onClick={() => increaseQuantity()}
                className="w-6 h-6 font-medium rounded-full">
                <IonIcon icon={addOutline} />
              </button>
            </div>
            <IonButton shape="round" onClick={e => addItem({product, quantity: quantity})}>Salvar</IonButton>
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