import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Layout from "./Layout";
import Product from "./pages/Product";
import ShoppingCart from "./pages/ShoppingCart";
import { Provider } from "react-redux";
import { store } from "./lib/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Loader from "./components/Loader";
import Checkout from "./pages/Checkout";
import FilterPage from "./pages/FilterPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLayout from "./components/admin/AdminLayout";
import ManageProducts from "./components/admin/products/ManageProducts";
import SignIn from "./pages/SignIn";
import Signup from "./pages/Signup";

function App() {
  const checktoken = localStorage.getItem("token");
  let persistor = persistStore(store);
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={<Loader />}>
          <Router>
            <Routes>
              <Route element={<Layout />} path="/">
                <Route element={<Homepage />} path="/" />
                <Route element={<Product />} path="/:category/:brand?/:title" />
                <Route element={<FilterPage />} path="/:category" />
                <Route element={<Homepage />} />
                <Route element={<ShoppingCart />} path="/cart" />
                <Route element={<Checkout />} path="/checkout" />
                <Route element={<SignIn />} path="/signin" />
                <Route element={<Signup />} path="/signup" />
              </Route>

              <Route element={<AdminLayout />} path="/">
                <Route element={<AdminDashboard />} path="/admin" />
                <Route element={<ManageProducts />} path="/admin/products" />
              </Route>
            </Routes>
          </Router>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
