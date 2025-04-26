import Sidebar from "../sidebar/index";
import styles from "./styles.module.scss";
import Header from "../header";
import Footer from "../footer";

const Layout = ({ children }) => {
  const isAuthenticated = localStorage.getItem("access_token");

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.layout} ${
          !isAuthenticated ? styles.fullWidthLayout : ""
        }`}
      >
        {isAuthenticated && (
          <div className={styles.sidebar}>
            <Sidebar />
          </div>
        )}
        {isAuthenticated && (
          <div className={styles.header}>
            <Header />
          </div>
        )}
        <div className={styles.children}>{children}</div>
      </div>
      {isAuthenticated && (
        <div className={styles.footer}>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Layout;
