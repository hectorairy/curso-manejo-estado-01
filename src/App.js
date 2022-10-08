import "./App.css";
import { ClassState } from "./components/ClassState";
import { UseState } from "./components/UseState";

function App() {
  return (
    <div className="App">
      <UseState name="Use State" />

      <ClassState name="Class State" />
    </div>
  );
}

export default App;
