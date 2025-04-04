import styles from "../styles/pages/SignIn.module.css";
import styles1 from "../styles/components/SignIn.module.css";

import { Helmet } from "react-helmet";
import SignIn from "../components/SignIn";
import MagicLink from "../components/MagicLink";
import OTP from "../components/OTP";
import React, { useState } from "react";

const SignInPage = () => {
  const [activeTab, setActiveTab] = useState("default");

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "default":
        return <SignIn />;
      case "otp":
        return <OTP />;
      case "magicLink":
      default:
        return <MagicLink />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign in - Nhost</title>
      </Helmet>

      <div className={styles.container}>
        <div className={styles1.container}>
          <div className={styles1.card}>
            <div className={styles1["logo-wrapper"]}>
              <img src={process.env.PUBLIC_URL + "logo.svg"} alt="logo" />
            </div>
            {renderActiveComponent()}
          </div>
        </div>
        <div className={styles.buttons}>
          <button onClick={() => setActiveTab("default")}>default</button>
          <button onClick={() => setActiveTab("otp")}>OTP</button>
          <button onClick={() => setActiveTab("magicLink")}>Magic Link</button>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
