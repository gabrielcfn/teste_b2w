import React from "react";
import "./App.css";
import Container from "@material-ui/core/Container";
import Pesquisa from "./Pesquisa/Pesquisa";

function App() {
  return (
    <div className="App">
      <Container maxWidth="sm">
        <Pesquisa />
      </Container>
    </div>
  );
}

export default App;
