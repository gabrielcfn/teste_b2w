import React from "react";
import "./App.css";
import Container from "@material-ui/core/Container";
import Pesquisa from "./Pesquisa/Pesquisa";
import Filmes from "./Filmes/Filmes";

function App() {
  return (
    <div className="App">
      <Container maxWidth="sm">
        <Pesquisa />
        <Filmes />
      </Container>
    </div>
  );
}

export default App;
