import "bulmaswatch/slate/bulmaswatch.min.css";
import "victormono";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./index.css";
import { store } from "./store/store";
import CellList from "./components/CellList";

const App: React.FunctionComponent = () => {
  return (
    <Provider store={store}>
      <div>
        <CellList />
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
