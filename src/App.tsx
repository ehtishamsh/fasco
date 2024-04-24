import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Layout from "./Layout";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Layout />} path="/">
            <Route element={<Homepage />} path="/" />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
