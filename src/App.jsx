import "./App.css";
import Home from "./components/Home";
import Experience from "./components/Experience";
import Project from "./components/Project";
import Contact from "./components/Contact";
import Header from "./components/Header";

import { ContextProvider } from "./contexts/ContextProvider";

function App() {
  return (
    <div className="app min-h-screen max-w-screen-md mx-auto">
      <ContextProvider>
        <Header />
        <main className="lg:ml-[500px] md:ml-[500px] px-10 lg:px-5 md:px-5">
          <Home />
          <hr />
          <Experience />
          <hr />
          <Project />
          <hr />
          <Contact />
        </main>
      </ContextProvider>
    </div>
  );
}

export default App;
