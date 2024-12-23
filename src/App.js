import "./App.css";
import Stateless from "./components/stateless_learning";
import Stateful from "./components/stateful_learning";
import StateChange from "./components/learning_state.js";
import Counter from "./components/counter.js";
import EventHandleInStateless from "./components/event_handlig_in_stateless.js";
import EventBinding from "./components/event_binding.js";
import DataList from "./components/list_rendering/data_list.js";
function App() {
  return (
    <div className="App">
      <h2>Sadaqat</h2>
      <h1>Learning to ReactJs !</h1>
      <h1 className="text-3xl font-bold">Hello, Tailwind!</h1>
      <hr></hr>
      <Stateless name="Ali" department="CS">
        <p>
          Listen: here this is what I am passing into the as the children in the
          stateless component
        </p>
        <hr />
      </Stateless>
      <Stateful name="Umar" department="CS">
        <button>
          This is what I displayed as props.children in the stateful component.
        </button>
        <hr />
      </Stateful>
      <StateChange/>
      <hr></hr>
      <Counter/>
      <EventHandleInStateless/>
      <hr></hr>
      <EventBinding/>
      <hr></hr>
      <DataList/>
    </div>
  );
}

export default App;
