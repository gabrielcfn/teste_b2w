import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";

const FilmeDetalhe = () => {
  return (
    <div>
      <p>FilmeDetalhe</p>
      <Button
        onClick={() => {
          console.log("cliquei no botão");
        }}
      >
        Botão
      </Button>
    </div>
  );
};

export default FilmeDetalhe;
