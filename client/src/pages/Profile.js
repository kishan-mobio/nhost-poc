import styles from "../styles/pages/Profile.module.css";

import { useState } from "react";
import { Helmet } from "react-helmet";
import { useOutletContext } from "react-router-dom";
import Input from "../components/Input";
import { nhost } from "../nhost";
import { gql, useMutation } from "@apollo/client";

const UPDATE_USER_MUTATION = gql`
  mutation ($id: uuid!, $displayName: String!, $metadata: jsonb) {
    updateUser(
      pk_columns: { id: $id }
      _set: { displayName: $displayName, metadata: $metadata }
    ) {
      id
      displayName
      metadata
    }
  }
`;

const Profile = () => {
  const { user } = useOutletContext();

  const [firstName, setFirstName] = useState(user?.metadata?.firstName ?? "");
  const [lastName, setLastName] = useState(user?.metadata?.lastName ?? "");
  const [message, setMessage] = useState("");

  const isFirstNameDirty = firstName !== user?.metadata?.firstName;
  const isLastNameDirty = lastName !== user?.metadata?.lastName;
  const isProfileFormDirty = isFirstNameDirty || isLastNameDirty;

  const [updateUser] = useMutation(UPDATE_USER_MUTATION);

  const updateUserProfile = async (e) => {
    e.preventDefault();
    console.log(firstName, lastName);
    try {
      await updateUser({
        variables: {
          id: user.id,
          displayName: `${firstName} ${lastName}`,
          metadata: { firstName, lastName },
        },
      });
      setMessage("Profile updated successfully!");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  console.log(nhost.auth.url);

  const enableMfa = async () => {
    const response = await fetch(`${nhost.auth.url}/mfa/totp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${nhost.auth.getSession()?.accessToken}`,
      },
    });

    const data = await response.json();

    if (data.error) {
      console.error(data.error.message);
    } else {
      console.log(
        "Scan this QR code with your authenticator app:",
        response.qrCodeUrl
      );
    }
  };

  return (
    <>
      <Helmet>
        <title>Profile - Nhost</title>
      </Helmet>

      <div className={styles.container}>
        <div className={styles.info}>
          <h2>Profile</h2>
          <p>Update your personal information.</p>
        </div>

        <button onClick={enableMfa}>Enable MFA</button>

        <div className={styles.card}>
          <form onSubmit={updateUserProfile} className={styles.form}>
            <div className={styles["form-fields"]}>
              <div className={styles["input-group"]}>
                <Input
                  type="text"
                  label="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <Input
                  type="text"
                  label="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className={styles["input-email-wrapper"]}>
                <Input
                  type="email"
                  label="Email address"
                  value={user?.email}
                  readOnly
                />
              </div>
            </div>

            <div className={styles["form-footer"]}>
              <button
                type="submit"
                disabled={!isProfileFormDirty}
                className={styles.button}
                onClick={updateUserProfile}
              >
                Update
              </button>
              {message && <p>{message}</p>}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
