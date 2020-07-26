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

  // atualiza a página
  const handleChange = (event, value) => {
    const payload = {
      ...state,
      pagina: value,
    };

    atualizarPesquisa(payload);
    buscarFilmes(value);
  };

  // faz a chamada da paginação
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

  const calcularPaginas = (total) => {
    return Math.ceil(total / 10);
  };

  const paginacao = (
    <Pagination
      count={calcularPaginas(state.total)}
      onChange={handleChange}
      page={state.pagina}
    />
  );

  return (
    <React.Fragment>
      <Buscador />
      <Filmes filmes={props.filmes} />
      {state.total > 0 ? paginacao : null}
    </React.Fragment>
  );
};

export default Pesquisa;
