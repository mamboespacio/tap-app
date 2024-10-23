import { Link } from "react-router-dom";

export const CategorySlide = ({ name, path, image }) => (
  <Link to={path} className="non-link">
    <p className="text-sm text-left">{name}</p> 
    <div className="rounded-lg overflow-hidden ">
      <img className="aspect-square	" src={image} alt="category" />
    </div>
  </Link>
);

