import { IonCard, IonCardHeader, IonCardTitle } from "@ionic/react";
import { Link } from "react-router-dom";

export interface Props { }

export const LocationCard = () => (
  <Link to="/location" className="non-link">
    <IonCard color={"light"} className="m-0">
      <IonCardHeader>
        <IonCardTitle className="text-sm">Lorena, al rescate!</IonCardTitle>
      </IonCardHeader>
    </IonCard>
  </Link>
);


