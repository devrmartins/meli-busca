import { CaretRight } from "phosphor-react";
import { Fragment } from "react";

import styles from './styles.module.scss';

export function Breadcrumbs(props) {
  return (
    <div className={styles.breadcrumbs}>
      <ul>
        {props.items.map((c) => (
          <Fragment key={c.id}>
            <li><a href="#">{c.name}</a></li>
            <li className={styles.divider}>
              <CaretRight size={12} />
            </li>
          </Fragment>
        ))}
      </ul>
    </div>
  )
}
