import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import '@ionic/react/css/ionic-swiper.css';
import { Product } from "../hooks/types";
import { useQuery } from "@tanstack/react-query";
import { getFavouriteProducts } from "../data/loaders";

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
  // console.log(data);
  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={10}
    >
      {data?.map((item: Product, index: number) => (
        <SwiperSlide key={index}>
          <Link to={`/vendors/${item.id}`} className="non-link"> 
            <p className="text-sm text-left">{item.name}</p>  
            <div className="rounded-lg overflow-hidden ">
              <img className="aspect-square" src='assets/veggie3.png' alt={item.name} />
            </div>
          </Link>
        </SwiperSlide>
      ))
      }
    </Swiper>
  )
}

