import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Truck, CaretRight } from "phosphor-react";
import { api } from "../../api";

import styles from "./styles.module.scss";
import { formatNumber } from "../../utils/number-utils";

export function SearchResult() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q && q != "") {
      api
        .get("/sites/MLA/search", { params: { q, limit: 4 } })
        .then((response) => {
          if (response?.data?.results) {
            const category = response?.data?.available_filters?.find(
              (f) => f.id === "category"
            );
            if (category) {
              setCategories(
                category.values.sort((a, b) =>
                  a.results > b.results ? -1 : a.results < b.results ? 1 : 0
                )
              );
            }
            setProducts(response?.data?.results);
          }
        });
    }
  }, []);

  function handleShowProduct(id) {
    if (id) navigate(`/items/${id}`);
  }

  return (
    <>
      <div className={styles.breadcrumbs}>
        <ul>
          {categories.slice(0, 5).map((c) => (
            <>
              <li key={c.id}><a href="#">{c.name}</a></li>
              <li className={styles.divider}>
                <CaretRight size={12} />
              </li>
            </>
          ))}
        </ul>
      </div>
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
