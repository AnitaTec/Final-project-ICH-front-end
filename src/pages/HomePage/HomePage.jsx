import Menu from "../../modules/Menu/Menu";
import Footer from "../../modules/Footer/Footer";
import styles from "./HomePage.module.css";
import UpdateImg from "../../assets/img/Update.png";
import PostCard from "../../modules/PostCard/PostCard";

const HomePage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.contentWrapper}>
        <Menu />

        <main className={styles.main}>
          <div className={styles.grid}>
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
          </div>
          <div className={styles.update}>
            <img src={UpdateImg} alt="UpdateImg" />
            <p className={styles.title}>You've seen all the updates</p>
            <p className={styles.info}>You have viewed all new publications</p>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
