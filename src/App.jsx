import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";

import Header from "./components/header/Header";

function App() {
  return (
    <>
      <div className="app">
        <Sidebar />
        <main className="main">
          <Header />
        </main>
      </div>
    </>
  );
}

export default App;
