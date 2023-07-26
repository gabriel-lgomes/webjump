// CSS
import style from "./Product.module.css";


function Product({name, price, image, link}) {

  const replaceSrcImage = image.replace("media", "../src/assets");
  const formatPrice = price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <div className={style.product}>
      <div className={style.image}>
        <img src={replaceSrcImage} alt={name} />
      </div>
      <div>
        <p className={style.title}>{name}</p>
        <p className={style.price}>{formatPrice}</p>
        <a href={link} className={style.btn}>Comprar</a>
      </div>
    </div>
  )
}

export default Product