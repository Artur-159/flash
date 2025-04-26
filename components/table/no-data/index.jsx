import styles from "./styles.module.scss";

const NoData = ({
  imageSrc,
  title = "Դուք չունեք տվյալներ",
  description = "Ավելացրեք տեղեկություններ ցանկում և տեսեք տվյալներ մեր համակարգում",
}) => {
  return (
    <div className={styles.no_data}>
      {imageSrc && (
        <div className={styles.image}>
          <img src={imageSrc} alt="No data" />
        </div>
      )}
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default NoData;
