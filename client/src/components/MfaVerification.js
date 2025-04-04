import { useState } from "react";
import { nhost } from "../nhost";
import PropTypes from "prop-types";

const MfaVerification = ({ ticket }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleVerify = async () => {
    const response = await nhost.auth.verifyMfa({ ticket, otp });

    if (response.error) {
      setError(response.error.message);
    } else {
      window.location.href = "/"; // Redirect after successful verification
    }
  };

  return (
    <div>
      <h3>Enter MFA Code</h3>
      <input
        type="text"
        placeholder="OTP Code"
        onChange={(e) => setOtp(e.target.value)}
        required
      />
      <button onClick={handleVerify}>Verify</button>
      {error && <p>{error}</p>}
    </div>
  );
};

MfaVerification.propTypes = {
  ticket: PropTypes.string.isRequired,
};

export default MfaVerification;
