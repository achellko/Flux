import myDispatcher from "./dispatcher";

const Actions = {
  ACTION_INC: () => {
    myDispatcher.dispatch({ type: "INC", value: 1 });
  },
  ACTION_MUL: () => {
    myDispatcher.dispatch({ type: "MUL", value: 1 });
  },
  ACTION_CLEAR: () => {
    myDispatcher.dispatch({ type: "CLEAR", value: 0 });
  },
  ACTION_DELAYED_INC: () => {
    setTimeout(() => {
      myDispatcher.dispatch({ type: "INC", value: 1 });
    }, 2000);
  },
  onWartoscChange: v => {
    myDispatcher.dispatch({ type: "UPDATE_LICZBA", value: v });
  }
};

export default Actions;
