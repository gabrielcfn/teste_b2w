import React, { useContext } from "react";
import { AppContext } from "../App";

import Filme from "../Filme/Filme";

const Filmes = () => {
  // expõe o contexto
  const { state, dispatch } = useContext(AppContext);

  return (
    <div>
      {state.filmes.map((filme, idx) => {
        return <Filme key={idx} filme={filme}></Filme>;
      })}
    </div>
  );
};

export default Filmes;
