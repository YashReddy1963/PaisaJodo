import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Typography } from "@material-tailwind/react";

export function Otp() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/otp_verification/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp_code: otp }), 
      });

      const data = await response.json();

      if (response.ok) {
        alert("OTP verified successfully!");
        navigate("/auth/sign-in");
      } else {
        setError(data.error || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <section className="m-8 flex">
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/otp.jpeg"
          className="object-cover rounded-3xl"
          style={{ height: "800px", width: "1100px", marginLeft: "30px" }}
        />
      </div>
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Enter OTP</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">
            Enter the OTP sent to your email to complete registration.
          </Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleOtpSubmit}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your OTP
            </Typography>
            <Input
              size="lg"
              placeholder="Enter OTP"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <Button className="mt-6" fullWidth type="submit">
            Submit
          </Button>
        </form>
      </div>
    </section>
  );
}

export default Otp;
