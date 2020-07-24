import React, { useState } from "react";

//componentes do material-ui
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";

// estilos
import styles from "./Pesquisa.module.css";

const Pesquisa = () => {
  const [termoPesquisado, setTermoPesquisado] = useState("");

  const uri = "http://www.omdbapi.com/?i=tt3896198&apikey=ca9a6fca";

  const buttonClickedHandler = () => {
    console.log("cliquei com termo => ", termoPesquisado);
  };

  return (
    <form name="formPesquisar" className={styles.container}>
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
        onClick={buttonClickedHandler}
      >
        Buscar
      </Button>
    </form>
  );
};

export default Pesquisa;
