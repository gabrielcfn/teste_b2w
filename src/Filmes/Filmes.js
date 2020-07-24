import React, { useState } from "react";
import Filme from "../Filme/Filme";

const Filmes = () => {
  const [filmesState, setFilmesState] = useState({
    filmes: [],
  });

  const montarFilmes = () => {
    return filmesState.map((x) => {
      return <Filme filme={x} />;
    });
  };
  return (
    <div>
      {filmesState.filmes.map((filme, idx) => {
        return <Filme key={idx} filme={filme}></Filme>;
      })}
    </div>
  );
};

export default Filmes;
