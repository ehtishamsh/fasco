import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
import WishlistPage from "./pages/WishlistPage";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import Products from "./pages/admin/Products";
import Add from "./pages/admin/new/Add";
import AddCate from "./components/admin/category/new/AddCate";
import Categories from "./pages/admin/Categories";
import Brands from "./pages/admin/Brands";
import AddBrand from "./components/admin/brand/new/AddBrand";
import Dashboard from "./components/user/Dashboard";
import UserDashboardPage from "./pages/user/UserDashboardPage";
import OrdersPage from "./pages/user/OrdersPage";
import AddressBookPage from "./pages/user/AddressBookPage";
import ProfilePage from "./pages/user/ProfilePage";
import OrderSinglePage from "./pages/user/OrderSinglePage";
import Success from "./pages/Success";
import CancelPage from "./pages/CancelPage";
import Orders from "./pages/admin/Orders";
import ViewOrder from "./components/admin/orders/view/ViewOrder";
import EditProductPage from "./pages/admin/edit/EditProductPage";
import ReviewsPage from "./pages/user/ReviewsPage";
import GiveReviewsPage from "./pages/user/GiveReviewsPage";
import DiscountPage from "./pages/DiscountPage";
import AboutUs from "./pages/AboutUs";
import Error404 from "./pages/Error404";
import HelpPage from "./pages/HelpPage";
import ContactUsPage from "./pages/ContactUsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";

function ProtectedRoute({ Element, isAllowed }: any) {
  return isAllowed ? <Element /> : <Navigate to="/" replace />;
}

function ProtectedLayoutRoute({ children, isAllowed, Layout }: any) {
  return isAllowed ? <Layout>{children}</Layout> : <Navigate to="/" replace />;
}

function App() {
  const checktoken = localStorage.getItem("token");
  const checkuser = JSON.parse(localStorage.getItem("user") || "{}");
  let persistor = persistStore(store);

  const isAuthenticated = !!checktoken;
  const isAdmin = checkuser?.role === "admin";

  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={<Loader />}>
          <Router>
            <Routes>
              {/* General Routes */}
              <Route element={<Layout />} path="/">
                <Route element={<Homepage />} path="/" />
                <Route
                  element={<Product />}
                  path="/shop/:category/:brand?/:title"
                />
                <Route element={<FilterPage />} path="/shop/:category" />
                <Route element={<Homepage />} />
                <Route element={<ShoppingCart />} path="/cart" />
                <Route element={<DiscountPage />} path="/discount" />
                <Route element={<AboutUs />} path="/about" />
                <Route element={<WishlistPage />} path="/wishlist" />
                <Route element={<Success />} path="/success" />
                <Route element={<CancelPage />} path="/cancel" />
                <Route element={<Error404 />} path="/404" />
                <Route element={<HelpPage />} path="/help" />
                <Route element={<ContactUsPage />} path="/contact" />
                <Route element={<PrivacyPolicyPage />} path="/privacy" />
                <Route element={<TermsAndConditionsPage />} path="/terms" />
                <Route
                  element={
                    <ProtectedRoute
                      Element={SigninPage}
                      isAllowed={!isAuthenticated}
                    />
                  }
                  path="/signin"
                />
                <Route
                  element={
                    <ProtectedRoute
                      Element={SignupPage}
                      isAllowed={!isAuthenticated}
                    />
                  }
                  path="/signup"
                />
                <Route
                  element={
                    <ProtectedRoute
                      Element={Checkout}
                      isAllowed={isAuthenticated}
                    />
                  }
                  path="/checkout"
                />
              </Route>

              {/* Admin Routes */}
              <Route
                element={
                  <ProtectedLayoutRoute
                    isAllowed={isAuthenticated && isAdmin}
                    Layout={AdminLayout}
                  />
                }
                path="/"
              >
                <Route element={<AdminDashboard />} path="/admin" />
                <Route element={<Products />} path="/admin/products" />
                <Route
                  element={<EditProductPage />}
                  path="/admin/products/:id"
                />
                <Route element={<Add />} path="/admin/products/new" />
                <Route element={<Categories />} path="/admin/categories" />
                <Route element={<AddCate />} path="/admin/categories/new" />
                <Route element={<Orders />} path="/admin/orders" />
                <Route element={<ViewOrder />} path="/admin/orders/:id" />
                <Route element={<Brands />} path="/admin/brands" />
                <Route element={<AddBrand />} path="/admin/brands/new" />
              </Route>

              {/* User Dashboard Routes */}
              <Route
                element={
                  <ProtectedLayoutRoute
                    isAllowed={isAuthenticated}
                    Layout={Dashboard}
                  />
                }
                path="/"
              >
                <Route element={<UserDashboardPage />} path="/dashboard" />
                <Route element={<OrdersPage />} path="/orders" />
                <Route element={<ReviewsPage />} path="/reviews" />
                <Route element={<GiveReviewsPage />} path="/reviews/:id" />
                <Route element={<AddressBookPage />} path="/address" />
                <Route element={<ProfilePage />} path="/profile" />
                <Route element={<OrderSinglePage />} path="/orders/view/:id" />
              </Route>

              <Route path="*" element={<Error404 />} />
            </Routes>
          </Router>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
