import React from "react";
import Styles from "./Filme.module.css";
import BlockIcon from "@material-ui/icons/Block";
import Tooltip from "@material-ui/core/Tooltip";

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
          <React.Fragment>
            <h3>
              {props.filme.Title} - {props.filme.Year}
            </h3>
            <p>{props.filme.Genre}</p>
          </React.Fragment>
        }
      >
        <div className={Styles.posterContainer}>{poster}</div>
      </Tooltip>
    </div>
  );
};

export default Filme;
