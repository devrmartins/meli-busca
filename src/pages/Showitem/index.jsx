import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { api } from '../../api';
import { formatNumber } from '../../utils/number-utils';

import styles from './styles.module.scss';

export default function ShowItem() {

  const { id } = useParams();

  const [product, setProduct] = useState();
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  useEffect(() => {
    if (id) {
      const itemPromise = api.get(`items/${id}`);
      const itemDescriptionPromise = api.get(`items/${id}/description`);

      Promise.all([itemPromise, itemDescriptionPromise]).then((response) => {
        const [item, itemDescription] = response;

        if (item?.data?.category_id) {
          api.get(`categories/${item?.data?.category_id}`).then(response => {
            setBreadcrumbs(response?.data?.path_from_root);
          });
        }

        setProduct({
          title: item?.data?.title,
          description: itemDescription?.data?.plain_text,
          price: item?.data?.price,
          image: item?.data?.pictures[0]?.url,
          sold_quantity: item?.data?.sold_quantity
        });
      });
    
    }
  }, []);

  if (!product) return;

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <div className={styles.container}>
        <div className={styles.image}>
          <img src={product.image} alt="" />
          <div className={styles.description}>
            <h1>Descripcion del producto</h1>
            <p>{product.description}</p>
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.info_subtitle}>
            <span>Nuevo - {product.sold_quantity} vendidos</span>
          </div>
          <div className={styles.info_title}>
            <h1>{product.title}</h1>
          </div>
          <div className={styles.info_price}>
            <span>{product?.price ? formatNumber(product.price) : ''}</span>
          </div>
          <button>Comprar</button>
        </div>
      </div>
    </>
  )
}
