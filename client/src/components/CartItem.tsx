import { CartItem as Item } from "../hooks/types";
import { useCartStore } from "../data/CartStore";
import { IonIcon } from "@ionic/react";
import { addOutline, removeOutline, trashOutline } from "ionicons/icons";

export default function CartItem({ item }: { item: Item }) {
  const { increaseQuantity, decreaseQuantity, removeItem } = useCartStore();
  return (
    <div className="flex items-center justify-between gap-x-5 border-b-[1px] py-2">
      <div>
        <span className="text-sm">
          {item.product.name.split(' ').slice(0, 3).join(' ')}
        </span>
        <p className="text-sm">
          <span className="font-bold">
            ${(item.quantity * item.product.price).toFixed(2)}
          </span>
        </p>
      </div>

      <div className="flex items-center gap-x-2">
        <button
          onClick={() => decreaseQuantity(item.product.id)}
          className="font-medium text-lg flex items-center"
        >
          {item.quantity <= 1 ? <IonIcon icon={trashOutline} /> : <IonIcon icon={removeOutline} />}
        </button>
        <div className="flex flex-col gap-y-1 items-center">
          <p className="font-medium">{item.quantity}</p>
        </div>
        <button
          onClick={() => increaseQuantity(item.product.id)}
          className="font-medium text-lg  flex items-center"
        >
          <IonIcon icon={addOutline} />
        </button>
      </div>
    </div>
  )

}