import "./App.css";
import Navbar from "./Components/Layout/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Index from "./Components/Layout/Index";
import { Provider } from "./Context/Context";
import Lyric from "./Components/Tracks/Lyric";

function App() {
  return (
    <Provider>
      <Router>
        <Navbar />
        <div className="container-fluid">
          <Switch>
            <Route path="/" exact component={Index} />
            <Route path="/lyrics/track/:id" component={Lyric} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
