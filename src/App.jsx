import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  return (
    <>
      <div className="app">
        <Sidebar />
        <main className="main">
          <header>Header Content</header>
        </main>
      </div>
    </>
  );
}

export default App;
