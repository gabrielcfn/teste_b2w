import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import BlockIcon from "@material-ui/icons/Block";
import styles from "./FilmeDetalhe.module.css";
import Skeleton from "@material-ui/lab/Skeleton";

const FilmeDetalhe = (props) => {
  const uri = props.uri;
  const imdbID = props.match.params.imdbID;
  const [filmePesquisado, setFilmePesquisado] = useState("");
  const [carregandoDetalhe, setCarregandoDetalhe] = useState("false");

  useEffect(() => {
    buscarDetalhes();
  }, []);

  const buscarDetalhes = () => {
    setCarregandoDetalhe(true);
    fetch(`${uri}&i=${imdbID}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // sucesso
        if (data.Response === "True") {
          setFilmePesquisado(data);
          setCarregandoDetalhe(false);
        } else {
          // falha
          console.log("erro", data);
          setCarregandoDetalhe(false);
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

  // placeholder da pesquisa
  const skelly = (
    <div className={styles.FilmeDetalhe}>
      <Skeleton
        variant="text"
        width={300}
        height={30}
        className={styles.skellyTitle}
      />
      <Skeleton
        variant="rect"
        width={300}
        height={450}
        className={styles.skellyChildren}
      />
      <Skeleton
        variant="text"
        width={300}
        height={16}
        className={styles.skellyChildren}
      />
      <Skeleton
        variant="text"
        width={300}
        height={16}
        className={styles.skellyChildren}
      />
      <Skeleton
        variant="text"
        width={300}
        height={16}
        className={styles.skellyChildren}
      />
    </div>
  );

  const filmePronto = (
    <div className={styles.FilmeDetalhe}>
      <h1 className={styles.titleBar}>
        {filmePesquisado.Title}
        <span className={styles.Ano}> ({filmePesquisado.Year})</span>
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
      <Button
        variant="outlined"
        color="primary"
        component={RouterLink}
        to={`/pesquisar`}
      >
        Voltar para a busca
      </Button>
    </div>
  );

  return carregandoDetalhe ? skelly : filmePronto;
};

export default FilmeDetalhe;
