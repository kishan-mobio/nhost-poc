import styles from "../styles/pages/Dashboard.module.css";

import { useOutletContext } from "react-router-dom";
import { Helmet } from "react-helmet";
import Todos from "../components/Todos";

const Dashboard = () => {
  const { user } = useOutletContext();
  console.log(user?.defaultRole);
  const userName = user?.metadata?.firstName || "";

  return (
    <>
      <Helmet>
        <title>Dashboard - Nhost</title>
      </Helmet>

      <div>
        <h2 className={styles.title}>Dashboard</h2>

        <p className={styles["welcome-text"]}>
          Welcome {userName} <span>👋</span>
        </p>

        <Todos isAdmin={user?.defaultRole === "admin"} />
      </div>
    </>
  );
};

export default Dashboard;
