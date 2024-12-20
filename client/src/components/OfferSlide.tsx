import { Link } from "react-router-dom";

export const OfferSlide = ({ name, path, image }) => (
  <Link to={path} className="non-link">
    <p className="text-sm text-left">{name}</p> 
    <div className="rounded-lg overflow-hidden ">
      <img className="aspect-square	" src={image} alt="category" />
    </div>
    <p className="text-sm text-left">Pack regular - 2u</p>
    <p className="text-sm text-left space-x-1">
      <span className="line-through">
        $5140
      </span>
      <span>
      $3540
      </span> 
    </p>
  </Link>
);

