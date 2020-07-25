import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@material-ui/core/Button";

const FilmeDetalhe = (props) => {
  const uriDetalhe = `http://omdbapi.com/?apikey=ca9a6fca?i=`;

  console.log(props);

  return (
    <div>
      <p>FilmeDetalhe</p>
      <Button component={RouterLink} to={`/pesquisar`}>
        Botão
      </Button>
    </div>
  );
};

export default FilmeDetalhe;
