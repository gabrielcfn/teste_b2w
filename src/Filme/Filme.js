import React from "react";
import Styles from "./Filme.module.css";
import BlockIcon from "@material-ui/icons/Block";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";

const Filme = (props) => {
  console.log(props);

  // prepara a imagem ou um quadrado com ícone caso não seja encontrada
  let poster;

  if (props.filme.Poster === "N/A") {
    poster = <BlockIcon></BlockIcon>;
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
              onClick={() => {
                console.log(`cliquei em ${props.filme.Title}`);
              }}
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
