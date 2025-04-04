import React, { useState } from "react";
import styles from "../styles/components/SignIn.module.css";
import { nhost } from "../nhost";
import { useNavigate } from "react-router-dom";

const OTP = () => {
  const navigate = useNavigate();
  const [otp, setOTP] = useState("");
  const [email, setEmail] = useState("");
  const handleOTP = async (e) => {
    e.preventDefault();
    console.log(otp);
    try {
      await nhost.auth.verifyEmailOTP(email, otp);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    nhost.auth.signInEmailOTP(email);
  };

  return (
    <div>
      <br />
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button onClick={handleSendEmail} className={styles.googleButton}>
        Sign in with OTP
      </button>{" "}
      <br />
      <form onSubmit={handleOTP}>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOTP(e.target.value)}
          placeholder="Enter your OTP"
        />
        <button type="submit">Verify OTP</button>
      </form>
    </div>
  );
};

export default OTP;
