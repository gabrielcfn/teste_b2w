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
      <h1>
        {filmePesquisado.Title}{" "}
        <span className={styles.Ano}>{filmePesquisado.Year}</span>
      </h1>
      {poster}
      <p>
        <span>Diretor:</span> {filmePesquisado.Director}
      </p>
      <p>
        <span>Nota:</span> {filmePesquisado.imdbRating}/10
        <span> ({filmePesquisado.imdbVotes} votos)</span>
      </p>
      <p>Classificação etária: {filmePesquisado.Rated}</p>
      <p>{filmePesquisado.Type}</p>
      <p>{filmePesquisado.Genre}</p>
      <p>{filmePesquisado.Plot}</p>
      <p>
        <span>Lançamento:</span> {filmePesquisado.Released}
        <span> - {filmePesquisado.Country}</span>
      </p>
      <p>Elenco: {filmePesquisado.Actors}</p>
      <p>Escrito por {filmePesquisado.Writer}</p>
      <p>Idioma: {filmePesquisado.Language}</p>

      <p>Prêmios: {filmePesquisado.Awards}</p>
      <p>Metascore: {filmePesquisado.Metascore}</p>
      <p>imdbiD: {filmePesquisado.imdbiD}</p>

      <Button component={RouterLink} to={`/pesquisar`}>
        Voltar para a busca
      </Button>
    </div>
  );
};

export default FilmeDetalhe;
