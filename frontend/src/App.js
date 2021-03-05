import { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Main from "./Main";

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
