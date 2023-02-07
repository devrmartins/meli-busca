import { formatNumber } from '../../utils/number-utils';
import styles from './styles.module.scss';

export default function ShowItem() {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img src="https://http2.mlstatic.com/D_NQ_NP669264-MLA51079234633_082022-B.webp" alt="" />
        <div className={styles.description}>
          <h1>Descripcion del producto</h1>
          <p>Laborum ex officia magna et aliqua. Nostrud excepteur anim officia quis irure magna ut cillum. Nulla non eu consequat non fugiat in aliquip voluptate. Qui nostrud officia dolor fugiat duis. Occaecat cillum tempor qui occaecat amet. Non consectetur laboris deserunt aliquip amet qui duis do consequat. Sint sint officia occaecat pariatur elit fugiat cupidatat voluptate tempor mollit tempor sit laborum elit.</p>
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.info_subtitle}>
          <span>Nuevo - 234 vendidos</span>
        </div>
        <div className={styles.info_title}>
          <h1>Deco Reverse Sombrero Oxford</h1>
        </div>
        <div className={styles.info_price}>
          <span>{formatNumber(198000)}</span>
        </div>
        <button>Comprar</button>
      </div>
    </div>
  )
}
