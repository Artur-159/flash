import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { onMessage } from "firebase/messaging";
import { generateToken, messaging } from "./notifications/firebase";
import MainRoutes from "./router/main-router";
import { setIsAuthenticated } from "./store/auth/slice";
import Layout from "./components/layout";

import "./styles/fonts.scss";
import { AuthAPI } from "./services/auth";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");
    const userType = localStorage.getItem("user_type");
    const fcm_token = localStorage.getItem("fcm_token");
    const fcm_token_send = localStorage.getItem("fcm_token_send");

    if (accessToken && refreshToken && userType) {
      dispatch(setIsAuthenticated({ accessToken, refreshToken, userType }));
    } else {
      // navigate("/auth");
    }

    if (fcm_token && !fcm_token_send) {
      dispatch(AuthAPI.postFcmToken({ fcm_token })).unwrap();
    }
  }, [dispatch]);

  useEffect(() => {
    if (navigator.serviceWorker) {
      generateToken();
      // listenForTokenRefresh();
      if (messaging) {
        onMessage(messaging, (payload) => {
          console.log("Message received. ", payload);
          // TODO - implement foreground notification handling here
          // payload has payload.notification.title, payload.notification.body, payload.notification.image
        });
      }
    }
  }, [generateToken, messaging]);

  return (
    <>
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          <MainRoutes />
        </Suspense>
      </Layout>
    </>
  );
};

export default App;
