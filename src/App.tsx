import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Layout from "./Layout";
import Product from "./pages/Product";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Layout />} path="/">
            <Route element={<Homepage />} path="/" />
            <Route element={<Product />} path="/:category/:id" />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
