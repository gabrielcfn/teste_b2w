import React, { useContext } from "react";
import Buscador from "../Buscador/Buscador";
import Filmes from "../Filmes/Filmes";

// importa o contexto do app
import { AppContext } from "../App";

import Pagination from "@material-ui/lab/Pagination";

const Pesquisa = (props) => {
  // expõe o contexto
  const { dispatch } = useContext(AppContext);

  // atualiza o estado (contexto)
  const atualizarPesquisa = (newValue) => {
    dispatch({ type: "UPDATE_INPUT", data: newValue });
  };

  // uri das pesquisas
  const uri = "http://www.omdbapi.com/?apikey=ca9a6fca";

  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
    buscarFilmes();
  };

  const buscarFilmes = () => {
    fetch(`${uri}&s=${dispatch.termo}&page=${page}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // sucesso
        if (data.Response === "True") {
          const payload = {
            filmes: data.Search,
          };
          atualizarPesquisa(payload);
        } else {
          // falha
          const payload = {
            filmes: [],
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
