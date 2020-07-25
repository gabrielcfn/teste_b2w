import React from "react";
import Buscador from "../Buscador/Buscador";
import Filmes from "../Filmes/Filmes";

const Pesquisa = (props) => {
  return (
    <React.Fragment>
      <Buscador />
      <Filmes filmes={props.filmes} />
    </React.Fragment>
  );
};

export default Pesquisa;
