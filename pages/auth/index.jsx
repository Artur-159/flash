// import { Link, Outlet } from "react-router-dom";
// import LanguageSelect from "../../components/selects/language-select";
// import SocialMedia from "../../components/social-media";

// import styles from "./styles.module.scss";

// const AuthPage = () => {
//   return (
//     <div className={styles.auth_page}>
//       <div className={styles.inner_page}>
//         <div className={styles.left_block}>
//           <div className={styles.top_block}>
//             <Link to="/auth">
//               <img src="/svg/logo.svg" alt="logo" width={100} height={40} />
//             </Link>
//             <LanguageSelect />
//           </div>
//           <div className={styles.login_wrapper}>
//             <Outlet />
//           </div>
//         </div>
//         <div className={styles.right_block}>
//           <img src="/images/flash_img.png" alt="flash image" />
//         </div>
//         <div className={styles.bottom_block}>
//           <div className={styles.bottom_inner}>
//             <p>© 2024 Flash. Բոլոր իրավունքները պաշտպանված են։</p>
//             <p>Գաղտնիության քաղաքականություն</p>
//             <SocialMedia />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthPage;

import { Link, Outlet } from "react-router-dom";
import LanguageSelect from "../../components/selects/language-select";
import SocialMedia from "../../components/social-media";

import styles from "./styles.module.scss";

const AuthPage = () => {
  return (
    <div className={styles.auth_page}>
      <div className={styles.inner_page}>
        <div className={styles.left_block}>
          <div className={styles.top_block}>
            <Link to="/auth">
              <img src="/svg/logo.svg" alt="logo" width={100} height={40} />
            </Link>
            <LanguageSelect />
          </div>

          <div className={styles.login_wrapper}>
            <Outlet />
          </div>

          <div className={styles.left_footer}>
            <p>© 2024 Flash. Բոլոր իրավունքները պաշտպանված են։</p>
          </div>
        </div>

        <div className={styles.right_block}>
          <img src="/images/flash_img.png" alt="flash image" />
          <div className={styles.right_footer}>
            <p>Գաղտնիության քաղաքականություն</p>
            <SocialMedia />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
