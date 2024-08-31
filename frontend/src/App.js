import "./App.css";
import { HomeCards, Popup, SelectBar } from "./components";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Popup />
      <SelectBar />
      <HomeCards />
    </div>
  );
}

export default App;
