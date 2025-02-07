import styles from '../styles/HeroSection.module.scss';

const HeroSection = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h1>En Lezzetli Yemek Tarifleri</h1>
        <p>Farklı mutfaklardan en iyi yemek tariflerini keşfedin ve deneyin!</p>
      </div>
    </div>
  );
};

export default HeroSection;
