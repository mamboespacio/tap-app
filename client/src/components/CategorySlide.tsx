import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import '@ionic/react/css/ionic-swiper.css';
import { Category } from "../hooks/types";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../data/loaders";

export const CategorySlide = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })
  if (isPending) {
    return <span>Loading...</span>
  }
  if (isError) {
    return <span>Error: {error.message}</span>
  }
  return (
    <Swiper
      id="slider"
      slidesPerView={3}
      spaceBetween={10}
    >
      { data?.map((item:Category, index:number) => (
        <SwiperSlide key={index}>
          <Link to={`/category/${item.slug}`} className="non-link">
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

