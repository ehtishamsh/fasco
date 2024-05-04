import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Layout from "./Layout";
import Product from "./pages/Product";
import ShoppingCart from "./pages/ShoppingCart";
import { Provider } from "react-redux";
import { store } from "./lib/redux/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route element={<Layout />} path="/">
              <Route element={<Homepage />} path="/" />
              <Route element={<Product />} path="/:category/:id" />
              <Route element={<Homepage />} />
              <Route element={<ShoppingCart />} path="/shopping" />
            </Route>
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
