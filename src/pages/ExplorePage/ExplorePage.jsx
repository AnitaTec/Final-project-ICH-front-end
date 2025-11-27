import Menu from "../../modules/Menu/Menu";
import Footer from "../../modules/Footer/Footer";
import styles from "./ExplorePage.module.css";

const ExplorePage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.mainRow}>
        <Menu />
        <div className={styles.contentWrapper}>
          <main className={styles.main}>
            <div className={styles.contentRow}>
              <div className={styles.textBlock}></div>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ExplorePage;
