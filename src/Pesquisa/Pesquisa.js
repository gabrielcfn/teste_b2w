import React, { useState, useContext } from "react";
import Buscador from "../Buscador/Buscador";
import Filmes from "../Filmes/Filmes";

// importa o contexto do app
import { AppContext } from "../App";

import Pagination from "@material-ui/lab/Pagination";

const Pesquisa = (props) => {
  // expõe o contexto
  const { state, dispatch } = useContext(AppContext);

  // atualiza o estado (contexto)
  const atualizarPesquisa = (newValue) => {
    dispatch({ type: "ATUALIZAR_PESQUISA", data: newValue });
  };

  // uri das pesquisas
  const uri = "http://www.omdbapi.com/?apikey=ca9a6fca";

  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
    buscarFilmes(value);
  };

  const buscarFilmes = (pg) => {
    fetch(`${uri}&s=${state.termo}&page=${pg}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // sucesso
        if (data.Response === "True") {
          const payload = {
            ...state,
            filmes: data.Search,
            pagina: pg,
          };
          atualizarPesquisa(payload);
        } else {
          // falha
          const payload = {
            ...state,
            filmes: [],
            pagina: pg,
            erro: data.Error,
          };
          atualizarPesquisa(payload);
        }
      });
  };

  return (
    <React.Fragment>
      <Buscador />
      <Filmes filmes={props.filmes} />
      <Pagination count={10} onChange={handleChange} />
    </React.Fragment>
  );
};

export default Pesquisa;
