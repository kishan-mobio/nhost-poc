import styles from "../styles/components/SignIn.module.css";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "./Input";
import { useSignInEmailPassword } from "@nhost/react";
import Spinner from "./Spinner";
import { nhost } from "../nhost";

const SignIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    signInEmailPassword,
    isLoading,
    error,
    isError,
    needsEmailVerification,
  } = useSignInEmailPassword();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    await signInEmailPassword(email, password);
    navigate("/");
  };

  const handleGoogleSignIn = async () => {
    try {
      await nhost.auth.signIn({
        provider: "google",
      });
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  const disableForm = isLoading || needsEmailVerification;

  return (
    <>
      {needsEmailVerification ? (
        <p className={styles.text}>
          Please verify your email by clicking the link in the email we sent
          you.
        </p>
      ) : (
        <form onSubmit={handleOnSubmit} className={styles.form}>
          <Input
            type="email"
            label="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={disableForm}
          />
          <Input
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={disableForm}
          />
          <div className={styles.buttons}>
            <button type="submit" disabled={disableForm}>
              {isLoading ? <Spinner size="ms" /> : "Sign in"}
            </button>
            <button
              onClick={handleGoogleSignIn}
              className={styles.googleButton}
            >
              Sign in with Google
            </button>
          </div>
          {isError && <p className={styles.error}>{error.message}</p>}
        </form>
      )}
      <p className={styles.text}>
        No account yet?{" "}
        <Link to="/sign-up" className={styles.link}>
          Sign up
        </Link>
      </p>
    </>
  );
};

export default SignIn;
