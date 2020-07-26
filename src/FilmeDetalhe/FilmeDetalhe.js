import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@material-ui/core/Button";

const FilmeDetalhe = (props) => {
  const uriDetalhe = `http://omdbapi.com/?apikey=ca9a6fca&i=`;

  const imdbID = props.match.params.imdbID;
  const [filmePesquisado, setFilmePesquisado] = useState("");

  useEffect(() => {
    buscarDetalhes();
  });

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

  return (
    <div>
      <p>FilmeDetalhe</p>
      <p>{filmePesquisado.Actors}</p>

      <Button component={RouterLink} to={`/pesquisar`}>
        Botão
      </Button>
    </div>
  );
};

export default FilmeDetalhe;
