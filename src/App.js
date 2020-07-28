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
  erro: "",
  pagina: 1,
  termo: "",
  total: 0,
  uri: "http://www.omdbapi.com/?apikey=ca9a6fca",
  carregando: false,
  pesquisa: false,
};

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "ATUALIZAR_PESQUISA":
      return {
        ...state,
        filmes: action.data.filmes,
        erro: action.data.Error,
        pagina: action.data.pagina,
        termo: action.data.termo,
        total: action.data.total,
        carregando: action.data.carregando,
        pesquisa: action.data.pesquisa,
      };
    case "CARREGANDO":
      return {
        ...state,
        carregando: action.data.carregando,
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
        <Container>
          <AppContext.Provider value={{ state, dispatch }}>
            <Switch>
              <Route path="/pesquisar" component={Pesquisa} />
              <Route
                path="/detalhe/:imdbID"
                render={(props) => (
                  <FilmeDetalhe {...props} uri={initialState.uri} />
                )}
              />
              <Redirect from="/" to="/pesquisar" />
            </Switch>
          </AppContext.Provider>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
