import React, { useContext } from "react";
import Buscador from "../Buscador/Buscador";
import Filmes from "../Filmes/Filmes";

import Pagination from "@material-ui/lab/Pagination";
import Skeleton from "@material-ui/lab/Skeleton";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import styles from "./Pesquisa.module.css";

// importa o contexto do app
import { AppContext } from "../App";

const Pesquisa = (props) => {
  // expõe o contexto
  const { state, dispatch } = useContext(AppContext);

  // atualiza o estado (contexto)
  const atualizarPesquisa = (newValue) => {
    dispatch({ type: "ATUALIZAR_PESQUISA", data: newValue });
  };

  const loader = (newValue) => {
    dispatch({ type: "CARREGANDO", data: newValue });
  };

  // uri das pesquisas
  const uri = state.uri;

  // atualiza a página
  const handleChange = (event, value) => {
    // exibe o esqueleto
    loader({ carregando: true });
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
        loader({ ...state, carregando: false });

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

  const mobile = useMediaQuery("(max-width:480px)");

  // placeholder da pesquisa
  const skelly = (
    <div className={styles.Skelly}>
      <Skeleton
        variant="rect"
        width={300}
        height={450}
        className={styles.skellyChildren}
      />
      <Skeleton
        variant="rect"
        width={300}
        height={450}
        className={styles.skellyChildren}
      />
      <Skeleton
        variant="rect"
        width={300}
        height={450}
        className={styles.skellyChildren}
      />
      <Skeleton
        variant="rect"
        width={300}
        height={450}
        className={styles.skellyChildren}
      />
      <Skeleton
        variant="rect"
        width={300}
        height={450}
        className={styles.skellyChildren}
      />
      <Skeleton
        variant="rect"
        width={300}
        height={450}
        className={styles.skellyChildren}
      />
      <Skeleton
        variant="rect"
        width={300}
        height={450}
        className={styles.skellyChildren}
      />
      <Skeleton
        variant="rect"
        width={300}
        height={450}
        className={styles.skellyChildren}
      />
      <Skeleton
        variant="rect"
        width={300}
        height={450}
        className={styles.skellyChildren}
      />
    </div>
  );

  return (
    <React.Fragment>
      <Buscador />
      {mobile ? (
        <span>
          Use um toque longo sobre o poster para ver mais detalhes do filme
        </span>
      ) : null}
      {state.carregando ? skelly : <Filmes filmes={props.filmes} />}

      {state.total > 0 ? paginacao : null}
    </React.Fragment>
  );
};

export default Pesquisa;
