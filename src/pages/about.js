import Head from 'next/head';
import styles from '../styles/About.module.scss';

const About = () => {
  return (
    <>
      <Head>
        <title>Hakkımda | Front-End Developer</title>
      </Head>

      <div className={styles.aboutContainer}>
        <h1 className={styles.title}>👋 Merhaba, Ben Barış!</h1>

        <div className={styles.aboutContent}>
          {/* Profil Resmi */}
          <div className={styles.imageWrapper}>
            <img 
              src="/images/profile.jpeg" 
              alt="Barış Yönel"
              width="200"
              height="200"
              className={styles.profileImage}
            />
          </div>

          <p>
            3 yıl boyunca perakende sektöründe çalışarak müşteri ilişkileri ve operasyonel süreçlerde deneyim kazandım.
            Bu süre zarfında <strong>iletişim, problem çözme ve zaman yönetimi</strong> gibi temel becerilerimi geliştirdim.
          </p>

          <p>
            Geleceğe dair meraklı bir vizyona sahip, <strong>web tasarım ve front-end geliştirme</strong> konusunda tutkulu bir
            <strong>Front-End Developer</strong> olarak kariyerimi sürdürüyorum.
          </p>

          <div className={styles.githubSection}>
            <p>📌 Projelerimi görmek için GitHub profilime göz atabilirsiniz:</p>
            <a href="https://github.com/barisyonel" target="_blank" rel="noopener noreferrer" className={styles.githubLink}>
              🔗 GitHub: github.com/barisyonel
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
