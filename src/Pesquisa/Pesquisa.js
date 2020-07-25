import React, { useState, useContext } from "react";
// importa o contexto do app
import { AppContext } from "../App";

//componentes do material-ui
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";

// estilos
import styles from "./Pesquisa.module.css";

const Pesquisa = () => {
  const [termoPesquisado, setTermoPesquisado] = useState("");

  // expõe o contexto
  const { dispatch } = useContext(AppContext);

  // uri das pesquisas
  const uri = "http://www.omdbapi.com/?apikey=ca9a6fca";

  // atualiza o estado
  const atualizarPesquisa = (newValue) => {
    dispatch({ type: "UPDATE_INPUT", data: newValue });
  };

  // controla o disparo da pesquisa
  const formSubmitHandler = (ev) => {
    ev.preventDefault();
    buscarFilmes();
  };

  const buscarFilmes = () => {
    fetch(`${uri}&s=${termoPesquisado}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // sucesso
        if (data.Response === "True") {
          const payload = { filmes: data.Search, pesquisa: true };
          atualizarPesquisa(payload);
        } else {
          // falha
          const payload = { filmes: [], pesquisa: true };
          atualizarPesquisa(payload);
        }
      });
  };

  return (
    <form
      name="formPesquisar"
      onSubmit={(event) => {
        formSubmitHandler(event);
      }}
      className={styles.container}
    >
      <TextField
        id="outlined-basic"
        label="Pesquisar filmes"
        variant="outlined"
        type="text"
        value={termoPesquisado}
        onChange={(event) => {
          setTermoPesquisado(event.target.value);
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Button
        variant="contained"
        color="primary"
        className={styles.botao}
        type="submit"
        disabled={termoPesquisado.length === 0}
      >
        Buscar
      </Button>
    </form>
  );
};

export default Pesquisa;
