import { MagnifyingGlass } from "phosphor-react";
import logoMeli from "../../assets/meli_logo.png";

import styles from "./styles.module.scss";

export function Header() {
  return (
    <header>
      <div className={styles.container}>
        <img src={logoMeli} />
        <form>
          <input type="text" placeholder="Nunca dejes de buscar" />
          <button type="submit"><MagnifyingGlass /></button>
        </form>
      </div>
    </header>
  );
}
