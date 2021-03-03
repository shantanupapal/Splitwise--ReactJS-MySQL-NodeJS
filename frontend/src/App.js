import { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Main from "./Main";
import { createStore, applyMiddleware } from "redux"; // REDUX
import rootReducer from "./reducers/rootReducer";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore } from "redux-persist";
import Localforage from "localforage";

// const store = createStore(
//     rootReducer,
//     composeWithDevTools(applyMiddleware(thunk))
// );
class App extends Component {
    //     componentDidUpdate() {
    //         persistStore(this.props.store, { storage: Localforage }, () => {
    //             this.state({ rehydrated: true });
    //         });
    //     }
    //
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Main />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
