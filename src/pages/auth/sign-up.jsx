import { useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export function SignUp() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone_number: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setPasswordError("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("username", formData.username);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone_number", formData.phone_number);
    formDataToSend.append("password", formData.password);
    if (profilePhoto) {
      formDataToSend.append("profile_photo", profilePhoto);
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/register/",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data.message);
      navigate("/auth/otp");
    } catch (error) {
      setMessage(error.response?.data?.error || "Registration failed");
    }
  };

  return (
    <section className="m-8 flex">
      <div className="w-2/5 h-full hidden lg:block">
        <img src="/img/signup.jpeg" className="h-full w-full object-cover rounded-3xl" />
      </div>
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Join Us Today</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">
            Enter your details to register.
          </Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col gap-2">
            <Typography variant="small" color="blue-gray" className="font-medium">Username</Typography>
            <Input size="lg" name="username" value={formData.username} onChange={handleChange} placeholder="Enter your username" />
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <Typography variant="small" color="blue-gray" className="font-medium">Email ID</Typography>
            <Input size="lg" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" />
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <Typography variant="small" color="blue-gray" className="font-medium">Phone Number</Typography>
            <Input size="lg" type="tel" name="phone_number" value={formData.phone_number} onChange={handleChange} placeholder="Enter your phone number" />
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <Typography variant="small" color="blue-gray" className="font-medium">Password</Typography>
            <Input size="lg" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" />
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <Typography variant="small" color="blue-gray" className="font-medium">Confirm Password</Typography>
            <Input size="lg" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm your password" />
            {passwordError && <Typography color="red" className="text-xs">{passwordError}</Typography>}
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <Typography variant="small" color="blue-gray" className="font-medium">Upload Profile Photo</Typography>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {preview && <img src={preview} alt="Profile Preview" className="w-24 h-24 rounded-full mt-2" />}
          </div>
          <Button className="mt-6" fullWidth type="submit">Register Now</Button>
          {message && <Typography color="red" className="text-xs mt-2">{message}</Typography>}
          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Already have an account?
            <Link to="/auth/sign-in" className="text-gray-900 ml-1">Sign in</Link>
          </Typography>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
