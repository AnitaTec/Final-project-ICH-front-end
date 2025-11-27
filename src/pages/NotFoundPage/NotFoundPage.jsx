import LoginImg from "../../assets/img/Background.png";
import Menu from "../../modules/Menu/Menu";
import Footer from "../../modules/Footer/Footer";
import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.mainRow}>
        <Menu />
        <div className={styles.contentWrapper}>
          <main className={styles.main}>
            <div className={styles.contentRow}>
              <img src={LoginImg} alt="Login visual" />
              <div className={styles.textBlock}>
                <h3 className={styles.title}>
                  Oops! Page Not Found (404 Error)
                </h3>
                <p className={styles.description}>
                  We're sorry, but the page you're looking for doesn't seem to
                  exist.
                  <br />
                  If you typed the URL manually, please double-check.
                  <br />
                  If you clicked a link, it may be outdated.
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFoundPage;
