import { IonCard, IonCardHeader, IonCardTitle } from "@ionic/react";
import { Link } from "react-router-dom";
import { useUserStore } from "../data/UserStore";

export interface Props { }

export const LocationCard = () => {
  const user = useUserStore((state) => state.user);
  // console.log('localStorage User', user);
  return (
    <Link to="/location" className="non-link">
      <IonCard color={"light"} className="m-0 mb-4">
        <IonCardHeader>
          <IonCardTitle className="text-sm">{user.fullName}, al rescate!</IonCardTitle>
        </IonCardHeader>
      </IonCard>
    </Link>
  )
};


