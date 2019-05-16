import React from "react";
import ReactDOM from "react-dom";

import myDispatcher from "./dispatcher";
import { ReduceStore, Container } from "flux/utils";
import Actions from "./actions.js";

import "./styles.css";

class MyStore extends ReduceStore {
  getInitialState() {
    return {
      wartosc: 0
    };
  }

  reduce(state, action) {
    console.log(action);
    console.log(state);
    switch (action.type) {
      case "INC":
        // state.wartosc = state.wartosc + action.value;
        if (!isNaN(parseInt(state.liczba, 10)))
          state.wartosc = state.wartosc + parseInt(state.liczba, 10);
        return { ...state };
      case "MUL":
        if (!isNaN(parseInt(state.liczba, 10)))
          state.wartosc = state.wartosc * parseInt(state.liczba, 10);
        return { ...state };
      case "CLEAR":
        state.wartosc = 0;
        return { ...state };
      case "UPDATE_LICZBA":
        if (isNaN(action.value)) {
          state.komunikat = "nieprwadiłowa liczba całkowita: " + action.value;
        } else {
          state.komunikat = undefined;
        }
        state.liczba = action.value;
        return { ...state };
      default:
        return state;
    }
  }
}

const myStore = new MyStore(myDispatcher);

function App(props) {
  console.log(props);
  return (
    <div className="App">
      <h1>Licznik</h1>
      <p>Bieżąca wartość: {props.gs.wartosc}</p>
      <p>
        <input
          type="text"
          value={props.gs.liczba}
          onChange={e => {
            Actions.onWartoscChange(e.target.value);
          }}
        />
        <button onClick={Actions.ACTION_INC}>+</button>
        <button onClick={Actions.ACTION_DELAYED_INC}>Opóźnone dodawanie</button>
        <button onClick={Actions.ACTION_MUL}>Mnozenie</button>
        <button onClick={Actions.ACTION_CLEAR}>Wyczysc</button>
      </p>
      {props.gs.komunikat && <p>{props.gs.komunikat}</p>}
    </div>
  );
}

function getStores() {
  return [myStore];
}

function getState() {
  return {
    gs: myStore.getState()
  };
}

const ContApp = Container.createFunctional(App, getStores, getState);

const rootElement = document.getElementById("root");
ReactDOM.render(<ContApp />, rootElement);
