import React, { useContext } from "react";
import { AppContext } from "../App";

import styles from "./Filmes.module.css";

import Filme from "../Filme/Filme";

const Filmes = () => {
  // expõe o contexto
  const { state } = useContext(AppContext);
  let filmes;

  if (state.filmes.length === 0 && state.pesquisa === true) {
    filmes = <span>Nenhum resultado encontrado</span>;
  } else {
    filmes = state.filmes.map((filme, idx) => {
      return <Filme key={idx} filme={filme}></Filme>;
    });
  }

  return <div className={styles.Filmes}>{filmes}</div>;
};

export default Filmes;
