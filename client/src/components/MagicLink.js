import React, { useState } from "react";
import styles from "../styles/components/SignIn.module.css";
import { nhost } from "../nhost";

const MagicLink = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  console.log("yes");
  const handleMagicLinkSignIn = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await nhost.auth.signIn({
        email: email,
      });
      setSuccess(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleMagicLinkSignIn}>
      <br />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Sending..." : "Send Magic Link"}
      </button>
      {error && <p className={styles.error}>{error}</p>}
      {success && (
        <p className={styles.success}>Check your email for the login link!</p>
      )}
    </form>
  );
};

export default MagicLink;
