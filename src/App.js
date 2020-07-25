import React, { useReducer } from "react";
import "./App.css";
import Container from "@material-ui/core/Container";
import Pesquisa from "./Pesquisa/Pesquisa";
import FilmeDetalhe from "./FilmeDetalhe/FilmeDetalhe";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// context
export const AppContext = React.createContext();

// State inicial, será compartilhado por todo o app;
const initialState = {
  filmes: [],
  pesquisa: false,
  erro: "",
};

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_INPUT":
      return {
        filmes: action.data.filmes,
        pesquisa: action.data.pesquisa,
        erro: action.data.Error,
      };

    default:
      return initialState;
  }
};

function App() {
  // inicializar o state para useReducer
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BrowserRouter>
      <div className="App">
        <Container maxWidth="sm">
          <AppContext.Provider value={{ state, dispatch }}>
            <Switch>
              <Route path="/pesquisar" component={Pesquisa} />
              <Route path="/detalhe/:imdbID" component={FilmeDetalhe} />
              <Redirect from="/" to="/pesquisar" />
            </Switch>
          </AppContext.Provider>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
