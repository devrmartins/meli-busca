import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Truck } from "phosphor-react";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { api } from "../../api";
import { formatNumber } from "../../utils/number-utils";

import styles from "./styles.module.scss";

export function SearchResult() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q && q != "") {
      api
        .get("/sites/MLA/search", { params: { q, limit: 4 } })
        .then((response) => {
          if (response?.data?.filters) {
            const categories = response?.data?.filters.find(f => f.id === 'category');
            if (categories && categories?.values.length > 0) {
              setBreadcrumbs(categories?.values[0].path_from_root);
            }
          }

          if (response?.data?.results) setProducts(response?.data?.results);
        });
    }
  }, []);

  function handleShowProduct(id) {
    if (id) navigate(`/items/${id}`);
  }

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <div className={styles.container}>
        <ul className={styles.products}>
          {products.map((p) => (
            <li key={p.id} className={styles.product}>
              <div
                className={styles.product_container}
                onClick={() => handleShowProduct(p.id)}
              >
                <img className={styles.product_thumbnail} src={p?.thumbnail} />
                <div className={styles.product_content}>
                  <h2 className={styles.product_price}>
                    {formatNumber(p?.price)}{" "}
                    {p?.shipping?.free_shipping ? (
                      <span className={styles.product_shipping}>
                        <Truck size={14} />
                      </span>
                    ) : (
                      ""
                    )}
                  </h2>
                  <p className={styles.product_description}>{p.title}</p>
                </div>
                <span className={styles.product_city}>
                  {p?.address?.city_name}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
