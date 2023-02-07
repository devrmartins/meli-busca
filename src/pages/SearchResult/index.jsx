import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Truck } from 'phosphor-react';
import { api } from '../../api';

import styles from './styles.module.scss';

export function SearchResult() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q && q != '') {
      api.get("", { params: { q, limit: 4 } }).then(response => {
        if (response?.data?.results) setProducts(response?.data?.results);
      });
    }
  }, []);

  function formatNumber(price) {
    const priceFixed = parseFloat((price/100)).toFixed(2);
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(priceFixed);
  }

  return (
    <div className={styles.container}>
      <ul className={styles.products}>
      {products.map(p => (
        <li key={p.id} className={styles.product}>
          <div className={styles.product_container}>
            <img className={styles.product_thumbnail} src={p?.thumbnail} />
            <div className={styles.product_content}>
              <h2 className={styles.product_price}>{formatNumber(p?.price)} {(p?.shipping?.free_shipping) ? <span className={styles.product_shipping}><Truck size={14} /></span> : 'asdsas'}</h2>
              <p className={styles.product_description}>{p.title}</p>
            </div>
            <span className={styles.product_city}>{p?.address?.city_name}</span>
          </div>
        </li>
      ))}
      </ul>
    </div>
  )
}
