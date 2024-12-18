import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCol, IonIcon } from "@ionic/react";
import { arrowRedoOutline, cart, cartOutline, heart, heartOutline } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { addToCart } from "../data/CartStore";
import { addToFavourites, FavouritesStore } from "../data/FavouritesStore";
import styles from "./ProductCard.module.css";

const ProductCard = props => {

  const { product, category, index, cartRef } = props;
  const favourites = FavouritesStore.useState(s => s.product_ids);

  const productCartRef = useRef();
  const productFavouriteRef = useRef();
  const [isFavourite, setIsFavourite] = useState(false);


  return (

    <IonCol size="6" key={`category_product_list_${index}`} className={styles.food}>
      <Link to={`/category/${category.slug}/${product.id}`} className="non-link">
        {/* <IonCard  className={ styles.categoryCard }> */}
        <IonCardHeader className={styles.productCardHeader}>
          <div className={styles.productCardActions}>
            <IonIcon className={styles.productCardAction} color={isFavourite ? "danger" : "medium"} icon={isFavourite ? heart : heartOutline} onClick={e => addProductToFavourites(e, category.slug, product.id)} />
            <IonIcon ref={productFavouriteRef} style={{ position: "absolute", display: "none" }} className={`${styles.productCardAction} animate__animated`} color="danger" icon={heart} />
            <IonIcon className={styles.productCardAction} size="medium" icon={arrowRedoOutline} />
          </div>
          <img src={product.image} alt="product pic" />
          <p className="ion-text-wrap">{product.name}</p>
        </IonCardHeader>

        <IonCardContent className={styles.categoryCardContent}>

          <div className={styles.productPrice}>
            <IonButton style={{ width: "100%" }} color="light">
              {product.price}
            </IonButton>
            <IonButton color="dark" onClick={e => addProductToCart(e, category.slug, product.id)}>
              <IonIcon icon={cartOutline} />
            </IonButton>

            <IonIcon ref={productCartRef} icon={cart} color="dark" style={{ position: "absolute", display: "none", fontSize: "3rem" }} className="animate__animated" />
          </div>
        </IonCardContent>
      </Link>
      {/* </IonCard> */}
    </IonCol>
  );
}

export default ProductCard;