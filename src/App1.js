import "./App.css";
import Stateless from "./components/stateless_learning";
import Stateful from "./components/stateful_learning";
import StateChange from "./components/learning_state.js";
import Counter from "./components/counter.js";
import EventHandleInStateless from "./components/event_handlig_in_stateless.js";
import EventBinding from "./components/event_binding.js";
import DataList from "./components/list_rendering/data_list.js";
import Form from "./components/form.js";
import MountingLifeCycleMethod from "./components/Parent_Mounting_lifecycleMethod.js";
import ReactRefs from "./components/react_refs.js";
import FocusInput from "./components/refs_with_class_component/focusInput.js";
import Parent from "./components/ref_forwarding/parent.js";
import ErrorSampleCodeFile from "./components/error_boundry/ErrorSampleCodeFile.js";
import ErrorBoundary from "./components/error_boundry/ErrorBoundry.js";
import ClickCounter from "./components/Higher_OrdeR_Component/ClickCounter.js";
import HoverCounter from "./components/Higher_OrdeR_Component/HoverCounter.js";
import RenderPropsCounter from "./components/Render_props/RenderPropsCounter.js";
import RenderPropsClickCounter from "./components/Render_props/RenderPropsClickCounter.js";
import RenderPropsHoverCounter from "./components/Render_props/RenderPropsHoverCounter.js";
import { UserProvider } from "./components/context/UserContext.js";
import ComponentA from "./components/context/ComponentA.js";


function App() {
  return (
    <div className="App">
      <h2 className="">Sadaqat</h2>
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
      <StateChange />
      <hr></hr>
      <Counter />
      <EventHandleInStateless />
      <hr></hr>
      <EventBinding />
      <hr></hr>
      <DataList />
      <hr></hr>
      <Form />
      <hr></hr>
      <MountingLifeCycleMethod />
      <hr></hr>
      <ReactRefs />
      <hr></hr>
      <FocusInput />
      <hr></hr>
      <h4>Thr forwarding ref...</h4>
      <Parent />
      <hr></hr>
      <ErrorBoundary>
        <ErrorSampleCodeFile name="Sadaqat" department="CS" />
      </ErrorBoundary>
      <ErrorBoundary>
        <ErrorSampleCodeFile name="Sajid" department="EE" />
      </ErrorBoundary>
      <ErrorBoundary>
        <ErrorSampleCodeFile name="Ali" department="CS" />
      </ErrorBoundary>
      <hr></hr>
      <h4>
        !...This section contains the learning of the Higher Order Component...!{" "}
      </h4>
      <ClickCounter name="Sadaqat" />
      <br></br>
      <HoverCounter name="Ali">
        <h3>hey this is me</h3>
      </HoverCounter>
      <hr></hr>
      <h4>
        !...This section contains the learning of the Render Props...!{" "}
      </h4>
      <RenderPropsCounter>
        {(count, ClickHandler) => (
          <RenderPropsClickCounter count={count} ClickHandler={ClickHandler} />
        )}
      </RenderPropsCounter>

      <RenderPropsCounter>
        {(count, ClickHandler) => (
          <RenderPropsHoverCounter
            count={count}
            ClickHandler={ClickHandler}
          ></RenderPropsHoverCounter>
        )}
      </RenderPropsCounter>
      <hr></hr>
      <UserProvider value="Sadaqat">
      <ComponentA/>
      </UserProvider>
      <hr></hr>
    </div>
  );
}

export default App;
