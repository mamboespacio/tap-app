import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import '@ionic/react/css/ionic-swiper.css';
import { Product } from "../hooks/types";
import { useQuery } from "@tanstack/react-query";
import { getOnSaleProducts } from "../data/loaders";

export const OnSaleSlide = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['onSaleProducts'],
    queryFn: getOnSaleProducts,
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
      slidesPerView={2}
      spaceBetween={10}
    >
      {data?.map((item: Product, index: number) => (
        <SwiperSlide key={index}>
          <Link to={`/products/${item.id}`} className="non-link">
            
            <div className="rounded-lg overflow-hidden ">
              <img className="aspect-square" src='assets/veggie3.png' alt={item.name} />
            </div>
            <p className="text-sm text-left">{item.name}</p>
            <p className="text-sm text-left space-x-1">
              <span className="line-through">${item.price}</span>
              {item.onSale && (<span>${item.salePrice}</span>)}
            </p>
          </Link>
        </SwiperSlide>
      ))
      }
    </Swiper>
  )
}

