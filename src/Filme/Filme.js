import React from "react";
import { Link as RouterLink } from "react-router-dom";

import Styles from "./Filme.module.css";

import BlockIcon from "@material-ui/icons/Block";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";

const Filme = (props) => {
  // prepara a imagem ou um quadrado com ícone caso não seja encontrada
  let poster;

  if (props.filme.Poster === "N/A") {
    poster = (
      <div className={Styles.notFound}>
        <BlockIcon style={{ fontSize: 36 }}></BlockIcon>
        <p>Poster não encontrado</p>
      </div>
    );
  } else {
    poster = (
      <img
        src={props.filme.Poster}
        alt={`poster do filmes ${props.filme.Title}`}
      ></img>
    );
  }

  return (
    <div className={Styles.containerFilme}>
      <Tooltip
        title={
          <div className={Styles.tooltip}>
            <h3>
              {props.filme.Title} - {props.filme.Year}
            </h3>
            <p>Tipo: {props.filme.Type}</p>
            <Button
              variant="contained"
              color="secondary"
              component={RouterLink}
              to={`/detalhe/${props.filme.imdbID}`}
            >
              Ver Mais
            </Button>
          </div>
        }
        arrow
        width="300px"
        interactive
        placement="bottom"
      >
        <div className={Styles.posterContainer}>{poster}</div>
      </Tooltip>
    </div>
  );
};

export default Filme;
