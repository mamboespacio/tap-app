import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import '@ionic/react/css/ionic-swiper.css';
import { Vendor } from "../hooks/types";
import { useQuery } from "@tanstack/react-query";
import { getFavouriteProducts } from "../data/loaders";
import { FavButton } from "./FavButton";


/*
  TODO: mostrar solo los favoriteados por el usuario
*/


export const FavouriteSlide = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['favouriteProducts'],
    queryFn: getFavouriteProducts,
  })
  if (isPending) {
    return <span>Loading...</span>
  }
  if (isError) {
    return <span>Error: {error.message}</span>
  }
  console.log(data);
  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={10}
    >
      {data?.map((item: Vendor, index: number) => (
        <SwiperSlide key={index}>
          <Link to={`/vendors/${item.id}`} className="non-link">   
            <div className="rounded-lg overflow-hidden ">
              <img className="aspect-square" src='assets/veggie3.png' alt={item.name} />
              {/* <FavButton vendor={item.id} /> */}
            </div>
            <p className="text-sm text-left">{item.name}</p>
          </Link>
        </SwiperSlide>
      ))
      }
    </Swiper>
  )
}

