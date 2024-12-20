import React, { useState, useEffect } from 'react'
import { heart, heartOutline } from "ionicons/icons";
import { IonIcon, IonButton } from '@ionic/react';
import { useUserStore } from '../data/UserStore';
import { FC } from 'react';
import axios from 'axios';
import { mutateData } from '../lib/utils';

interface Vendor {
  vendor: string
}

export const FavButton: FC<Vendor> = ({ vendor }): JSX.Element => {
  // console.log('vendor', vendor);
  const user = useUserStore((state) => state.user);
  const userFavs = useUserStore((state) => state.user.vendors);
  const [isFav, setIsFav] = useState<boolean>(userFavs.includes(vendor));

  const handleFav = async () => {
    if (isFav) {
      const updatedUserFavs = userFavs.filter(v => v !== v);
      const payload = {
        vendors: updatedUserFavs,
      };
      const data = await mutateData("PUT", `/api/users/${user.id}`, payload);
      setIsFav(false);
      return { data, message: "updated User Favs" };
    } else {
      userFavs.push(vendor);
      const payload = {
        vendors: userFavs,
      };
      const data = await mutateData("PUT", `/api/users/${user.id}`, payload);
      setIsFav(true);
      return { data, message: "updated User Favs" };
    }
  };

  return(
    <div className="absolute top-0 right-0">
      <IonButton
        color="dark"
        shape="round"
        fill="clear"
        onClick={handleFav}
      >  
        { isFav ?
          <IonIcon
            color="blue"
            icon={heart}
            onClick={handleFav}
          /> :
          <IonIcon
            color="red"
            icon={heartOutline}
            onClick={handleFav}
          />
        }
      </IonButton>
    </div>
  );
}