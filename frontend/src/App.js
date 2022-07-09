import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import SignupScreen from "./page/SignupScreen";
import HomeScreen from "./page/HomeScreen";
import RouteHaveAcc from "./component/RouteHaveAcc";
import RouteWithoutAcc from "./component/RouteWithoutAcc";
import SigninScreen from "./page/SigninScreen";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDataAction,
  continuousUpdateCookiesAction,
} from "./action/userAction";
import { getCategoryAction } from "./action/categoryAction";
import ProfileUserScreen from "./page/ProfileUserScreen";
import EmailScreen from "./page/EmailScreen";
import SellerScreen from "./page/sellerScreens";
import CartScreen from "./page/cart";
import ProductScreen from "./page/products";
import PrivacyPolicyScreen from './page/privacy-policy';
import TermsOfServiceScreen from './page/terms-of-service';
import Video from './page/video'

function App() {
  const [isLoadingData, setIsLoadingData] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDataAction(setIsLoadingData));
    dispatch(continuousUpdateCookiesAction());
    dispatch(getCategoryAction());
  }, []);

  return (
    <>
      {isLoadingData ? (
        <div className="loading"></div>
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route
              path="/customer/signup"
              element={
                <RouteWithoutAcc>
                  <SignupScreen />
                </RouteWithoutAcc>
              }
            />
            <Route
              path="/customer/signin"
              element={
                <RouteWithoutAcc>
                  <SigninScreen />
                </RouteWithoutAcc>
              }
            />
            <Route
              path="/customer/profile"
              element={
                <RouteHaveAcc>
                  <ProfileUserScreen />
                </RouteHaveAcc>
              }
            />
            <Route
              path="/customer/profile/email"
              element={
                <RouteHaveAcc>
                  <EmailScreen />
                </RouteHaveAcc>
              }
            />
            <Route
              path="/seller/:id"
              element={
                <RouteHaveAcc>
                  <SellerScreen />
                </RouteHaveAcc>
              }
            />
            <Route
              path="/customer/cart"
              element={
                <RouteHaveAcc>
                  <CartScreen />
                </RouteHaveAcc>
              }
            />
            <Route path="/customer/products/:id" element={<ProductScreen />} />
            <Route
              path="/seller/products/:id"
              element={
                <RouteHaveAcc>
                  <ProductScreen />
                </RouteHaveAcc>
              }
            />
            <Route path="/privacy-policy" element={<PrivacyPolicyScreen />} />
            <Route
              path="/terms-of-service"
              element={<TermsOfServiceScreen />}
            />
            <Route path="/video" element={<Video />} />
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;

//thiếu tính năng tự động xóa cookie khi không hợp lệ
