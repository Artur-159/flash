import { Link } from "react-router-dom";
import { FOOTER_DATA } from "../../constant/footer";
import styles from "./styles.module.scss";

const SocialMedia = () => {
  const socialItem = FOOTER_DATA.find((item) => item.icons);

  if (!socialItem) return null;

  return (
    <div className={styles.icons_block}>
      {socialItem.icons.map((icon, idx) => (
        <Link key={idx} to={socialItem.link}>
          <img src={icon} alt={`icon-${idx}`} className={styles.icon} />
          {/* add normal alt and add links */}
        </Link>
      ))}
    </div>
  );
};

export default SocialMedia;
