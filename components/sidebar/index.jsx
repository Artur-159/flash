import { useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { SIDEBAR_DATA, SIDEBAR_BOTTOM_DATA } from "../../constant/header";
import { useDispatch, useSelector } from "react-redux";
import { AuthAPI } from "../../services/auth";
import { handleError } from "../../utils/handle-error";
import Toast from "../../helpers/status-text";
import MainButton from "../button";

import styles from "./styles.module.scss";

const Sidebar = () => {
  const fcm_token = localStorage.getItem("fcm_token");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sidebarRef = useRef(null);
  const { refreshToken } = useSelector((state) => state.auth);

  const logout = async () => {
    try {
      await dispatch(AuthAPI.deleteFcmToken({ fcm_token })).unwrap();
      const res = await dispatch(
        AuthAPI.logout({ refresh_token: refreshToken })
      ).unwrap();
      if (res?.message) {
        Toast.success(res.message);
        localStorage.clear();
        navigate("/auth");
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <nav ref={sidebarRef} className={styles.sidebar}>
      <div className={styles.sidebar_inner}>
        <header className={styles.sidebar_header}>
          <Link to="/">
            <img src="/svg/logo.svg" alt="logo" width={100} height={40} />
          </Link>
        </header>

        <div className={styles.sidebar_menu}>
          <div className={styles.nav_section}>
            <ul>
              {SIDEBAR_DATA.map((item, idx) => (
                <li
                  key={idx}
                  className={
                    location.pathname === item.href ? styles.active : undefined
                  }
                >
                  <NavLink to={item.href}>
                    {item.icon && (
                      <img
                        width={20}
                        height={20}
                        src={item.icon}
                        alt={item.title}
                      />
                    )}
                    {item.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.nav_section}>
            <ul className={styles.bottom_links}>
              {SIDEBAR_BOTTOM_DATA.map((item, idx) => (
                <li
                  key={`bottom-${idx}`}
                  className={
                    location.pathname === item.href ? styles.active : undefined
                  }
                >
                  {item.name === "logout" ? (
                    <MainButton
                      onClick={logout}
                      className={styles.nav_link_btn}
                    >
                      {item.icon && (
                        <img
                          width={20}
                          height={20}
                          src={item.icon}
                          alt={item.title}
                        />
                      )}
                      {item.title}
                    </MainButton>
                  ) : (
                    <NavLink to={item.href}>
                      {item.icon && (
                        <img
                          width={20}
                          height={20}
                          src={item.icon}
                          alt={item.title}
                        />
                      )}
                      {item.title}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
