import { useState, useEffect } from "React";
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { MagnifyingGlass } from "phosphor-react";

import logoMeli from "../../assets/meli_logo.png";
import styles from "./styles.module.scss";

export function Header() {

  const location = useLocation();
  
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const q = searchParams.get("q");
    (q && q != '') ? setSearch(q) : setSearch("");
  }, [location])

  function handleSubmit(event) {
    event.preventDefault();

    if (search && search != '' && search.length > 0) event.target.submit();
  }

  function handleSearchChange(event) {
    setSearch(event.target.value);
  }

  return (
    <header>
      <div className={styles.container}>
        <NavLink to="/" className={styles.logoLink}><img src={logoMeli}  /></NavLink>
        <form action="/items" onSubmit={handleSubmit}>
          <input
            type="text"
            name="q"
            value={search}
            onChange={handleSearchChange}
            placeholder="Nunca dejes de buscar"
            autoComplete="off"
          />
          <button type="submit"><MagnifyingGlass /></button>
        </form>
      </div>
    </header>
  );
}
