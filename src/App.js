import './App.css';
import 'antd/dist/antd.css';
import Dashboard from "./components/Dashboard";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Dashboard />
      </BrowserRouter>
    </div>
  );
}

export default App;
