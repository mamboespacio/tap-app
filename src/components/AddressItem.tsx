import { Address as Item } from "../hooks/types";
import { IonIcon } from "@ionic/react";
import { trashOutline } from "ionicons/icons";
import { useAddressStore } from "../data/AddressStore";
import { cn } from "../lib/utils";
import { useIonRouter } from "@ionic/react";

export default function AddressItem({ item }: { item: Item }) {
  const router = useIonRouter();
  const addressStore = useAddressStore();
  const deleteAddress = (id:string) => {
    // do something
  }
  const changeAddress = (item:Item) => {
    if (inUse(item.id)) {
      return;
    } else {
      // console.log('changing address');
      addressStore.setAddress(item);
    }
    router.push('/home', 'root', 'replace');
  }
  const inUse = (id:string) => { return addressStore.address.id === id }
  return (
    <div className="gap-x-5 border-b-[1px] py-2 w-full">
      <div className="flex items-center justify-between">
        <button
          className={cn("text-left", inUse(item.id) ? "text-green-500" : "text-primary")}
          onClick={() => changeAddress(item)}>
          <p className='font-semibold'>
            {item.name}
          </p>
          <p>{item.longitude}, {item.latitude}</p>
        </button>
        <button
          onClick={() => deleteAddress(item.id)}
          className="w-6 h-6 font-medium rounded-full">
          <IonIcon icon={trashOutline}/> 
        </button>
      </div>
    </div>
  )
}