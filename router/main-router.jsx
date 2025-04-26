import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { individualRoutes, companyRoutes, guestRoutes } from "./page-routes";
import { ROLE_TYPE_COMPANY, ROLE_TYPE_INDIVIDUAL } from "../constant/role";

const MainRoutes = () => {
  const user_type = localStorage.getItem("user_type");
  const token = localStorage.getItem("access_token");

  const navigate = useNavigate();

  useEffect(() => {
    if (!token && !user_type) {
      navigate("/auth");
      localStorage.clear();
    }
  }, [token, user_type, navigate]);

  return (
    <Routes>
      {token && user_type === ROLE_TYPE_INDIVIDUAL ? (
        <>
          {individualRoutes?.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </>
      ) : token && user_type === ROLE_TYPE_COMPANY ? (
        <>
          {companyRoutes?.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </>
      ) : (
        guestRoutes?.map((route) => (
          <Route key={route.path} path={route.path} element={route.element}>
            {route?.children?.map((subRoute) => {
              return subRoute.index ? (
                <Route key={subRoute.path} index element={subRoute.element} />
              ) : (
                <Route
                  key={subRoute.path}
                  path={subRoute.path}
                  element={subRoute.element}
                />
              );
            })}
          </Route>
        ))
      )}
    </Routes>
  );
};

export default MainRoutes;
