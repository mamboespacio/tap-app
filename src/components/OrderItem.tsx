import { Order as Item } from "../hooks/types";
import { IonIcon } from "@ionic/react";
import { trashOutline } from "ionicons/icons";
import { cn } from "../lib/utils";
import { useIonRouter } from "@ionic/react";

export default function OrderItem({ item }: { item: Item }) {
  const router = useIonRouter();
  return (
    <div className="gap-x-5 border-b-[1px] py-2 w-full">
      <div className="flex items-center justify-between">
        <button
          className="text-left">
          <p className='font-semibold'>
            {item.vendor.name}
          </p>
          <p>{item.vendor.address}</p>
        </button>
        <button
          className="w-6 h-6 font-medium rounded-full">
          <IonIcon icon={trashOutline}/> 
        </button>
      </div>
    </div>
  )
}