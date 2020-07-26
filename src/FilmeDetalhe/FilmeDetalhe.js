import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import BlockIcon from "@material-ui/icons/Block";
import styles from "./FilmeDetalhe.module.css";

const FilmeDetalhe = (props) => {
  const uriDetalhe = `http://omdbapi.com/?apikey=ca9a6fca&i=`;

  const imdbID = props.match.params.imdbID;
  const [filmePesquisado, setFilmePesquisado] = useState("");

  useEffect(() => {
    buscarDetalhes();
  }, []);

  const buscarDetalhes = () => {
    fetch(`${uriDetalhe}${imdbID}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // sucesso
        if (data.Response === "True") {
          console.log(data);
          setFilmePesquisado(data);
        } else {
          // falha
          console.log("erro", data);
          return data;
        }
      });
  };

  let poster;

  if (filmePesquisado.Poster === "N/A") {
    poster = (
      <div className={styles.notFound}>
        <BlockIcon style={{ fontSize: 36 }}></BlockIcon>
        <p>Poster não encontrado</p>
      </div>
    );
  } else {
    poster = (
      <img
        src={filmePesquisado.Poster}
        alt={`poster do filmes ${filmePesquisado.Title}`}
      ></img>
    );
  }

  return (
    <div className={styles.FilmeDetalhe}>
      <h1 className={styles.titleBar}>
        {filmePesquisado.Title}
        <span className={styles.Ano}>{filmePesquisado.Year}</span>
      </h1>
      {poster}
      <div className={styles.bloco}>
        <p>
          <span className={styles.destaque}>Nota:</span>
          {filmePesquisado.imdbRating}/10
          <span> ({filmePesquisado.imdbVotes} votos)</span>
          <span className={styles.destaque}> Classificação etária:</span>
          {filmePesquisado.Rated}
        </p>
        <p>
          <span className={styles.destaque}>Tipo: </span>
          {filmePesquisado.Type}
        </p>

        <p>
          <span className={styles.destaque}>Gênero: </span>
          {filmePesquisado.Genre}
        </p>
        <p>
          <span className={styles.destaque}>Lançamento:</span>
          {filmePesquisado.Released}
          <span> - {filmePesquisado.Country}</span>
        </p>
      </div>

      <div className={`${styles.bloco} ${styles.blocoSinopse} `}>
        <p className={`${styles.titleBar} ${styles.destaque} `}>Sinopse</p>
        <p>{filmePesquisado.Plot}</p>
      </div>

      <div className={styles.bloco}>
        <p className={`${styles.titleBar} ${styles.destaque} `}>
          Ficha Técnica
        </p>
        <p>
          <span className={styles.destaque}>Elenco: </span>
          {filmePesquisado.Actors}
        </p>
        <p>
          <span className={styles.destaque}>Escrito por </span>
          {filmePesquisado.Writer}
        </p>
        <p>
          <span className={styles.destaque}>Dirigido por: </span>
          {filmePesquisado.Director}
        </p>
        <p>
          <span className={styles.destaque}>Idioma: </span>
          {filmePesquisado.Language}
        </p>

        <p>
          <span className={styles.destaque}>Prêmios: </span>
          {filmePesquisado.Awards}
        </p>
        <p>
          <span className={styles.destaque}>Metascore: </span>
          {filmePesquisado.Metascore}
        </p>
        <p>
          <span className={styles.destaque}>imdbID: </span>
          {filmePesquisado.imdbID}
        </p>
      </div>
      <Button component={RouterLink} to={`/pesquisar`}>
        Voltar para a busca
      </Button>
    </div>
  );
};

export default FilmeDetalhe;
