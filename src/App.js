import "./App.css";
import { UseReducer } from "./components/UseReducer";
import { UseState } from "./components/UseState";

function App() {
  return (
    <div className="App">
      <UseState name="Use State" />

      <UseReducer name="Use Reducer" />
    </div>
  );
}

export default App;
