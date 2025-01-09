import { CartItem as Item } from "../hooks/types";
import { useCartStore } from "../data/CartStore";
import { IonIcon } from "@ionic/react";
import { removeOutline, addOutline, trashBin, trashOutline } from "ionicons/icons";

export default function CartItem({ item }: { item: Item }) {
  const { increaseQuantity, decreaseQuantity, removeItem } = useCartStore();
  return (
    <>
      <div className="flex justify-between items-center gap-x-5 border-b-[1px] py-2">
        <div>
          <span>{item.product.name}</span>
        </div>
        <div className="flex items-center gap-x-2">
          <button
            onClick={() => decreaseQuantity(item.product.id)}
            className="w-6 h-6 font-medium rounded-full">
            { item.quantity <= 1 ? <IonIcon icon={trashOutline}/> : <IonIcon icon={removeOutline}/> } 
          </button>
          <div>
            <span className="font-medium">{item.quantity}</span>
          </div>
          <button
            onClick={() => increaseQuantity(item.product.id)}
            className="w-6 h-6 font-medium rounded-full">
            <IonIcon icon={addOutline} />
          </button>
          <p><span>${(item.quantity * item.product.price).toFixed(2)}</span></p>
        </div>
      </div>
    </>
  )

}