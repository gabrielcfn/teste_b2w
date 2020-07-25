import React, { useReducer } from "react";
import "./App.css";
import Container from "@material-ui/core/Container";
import Pesquisa from "./Pesquisa/Pesquisa";
import Filmes from "./Filmes/Filmes";

// context
export const AppContext = React.createContext();

// State inicial, será compartilhado por todo o app;
const initialState = {
  filmes: [],
};

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_INPUT":
      return {
        filmes: action.data,
      };

    default:
      return initialState;
  }
};

function App() {
  // inicializar o state para useReducer
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <Container maxWidth="sm">
        <AppContext.Provider value={{ state, dispatch }}>
          <Pesquisa />
          <Filmes filmes={initialState.filmes} />
        </AppContext.Provider>
      </Container>
    </div>
  );
}

export default App;
