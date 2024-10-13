import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const SignIn = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [isOtpSent, setIsOtpSent] = useState(false); // State to track OTP sent
  const [otp, setOtp] = useState(""); // State for OTP input
  const [isOtpValid, setIsOtpValid] = useState(false); // Track if OTP is valid
  const [timer, setTimer] = useState(120); // 2-minute timer in seconds
  const [resendEnabled, setResendEnabled] = useState(false); // Enable resend button after timeout

  // Handle OTP resend countdown

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm();

  // Simulate sending OTP (You would replace this with an actual API call)
  const sendOtp = () => {
    setIsOtpSent(true);
    setTimer(120); // Reset the timer to 2 minutes
    setResendEnabled(false); // Disable resend button initially
  };

  // OTP validation function (For demo, assuming '1234' is the correct OTP)
  const validateOtp = () => {
    if (otp === "1234") {
      setIsOtpValid(true);
    } else {
    }
  };
  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    } else {
      setResendEnabled(true); // Enable "Send Again" button after the timer ends
    }
  }, [timer]);
  // Form submission handler
  const onSubmit = async (data) => {
    if (!isOtpValid) {
      sendOtp();
      return;
    }

    console.log(data);
    try {
      const response = await fetch(
        "https://sheetdb.io/api/v1/YOUR_SHEETDB_ID",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            phone: data.phone,
            email: data.email,
            password: data.password,
          }),
        }
      );

      if (response.ok) {
        alert("Form submitted successfully");
        reset(); // Reset the form fields
        navigate("/riturao/videos/vid232/view"); // Redirect to the video page
      } else {
        alert("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="min-h-screen bg-custom bg-cover bg-center flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 m-4 shadow-lg rounded-lg">
        {/* Logo and Heading */}
        <div className="flex flex-row items-center justify-center gap-3">
          <img src="/logo.jpg" className="h-[30px] md:h-[50px]" alt="Logo" />
          <h1 className="text-[40px] md:text-[60px] font-bold">Rawket</h1>
        </div>
        <div className="text-xs font-light text-center">
          <div className="text-xs md:text-base font-semibold py-2">
            Browse and Download videos anonymously
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
            {errors.name && (
              <p className="text-red-600 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Phone Number Field */}
          <div>
            <label className="block text-sm font-medium">Phone No.</label>
            <input
              type="tel"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Phone number must be 10 digits",
                },
              })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
            {errors.phone && (
              <p className="text-red-600 text-sm">{errors.phone.message}</p>
            )}
            <div className="text-red-600 text-xs">
              Verification OTP will be sent
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
            {errors.email && (
              <p className="text-red-600 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
            {errors.password && (
              <p className="text-red-600 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300"
            >
              Submit
            </button>
          </div>
        </form>

        {/* OTP Modal */}
        {isOtpSent && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <h2 className="text-base font-semibold mb-4">
                Enter OTP sent your mobile
              </h2>

              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              />

              <div className="flex justify-end space-x-4 mt-4">
                <button
                  onClick={validateOtp}
                  className="bg-indigo-600 text-white py-2 px-2 text-xs rounded-md hover:bg-indigo-700"
                >
                  Verify OTP
                </button>

                {/* Resend Button */}
                <button
                  onClick={sendOtp}
                  disabled={!resendEnabled}
                  className={`py-2 px-4 rounded-md ${
                    resendEnabled
                      ? "bg-gray-600 text-white hover:bg-gray-700 py-2 px-2 text-xs"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed py-2 px-2 text-xs"
                  }`}
                >
                  {resendEnabled ? "Resend OTP" : "Resend OTP (after 2 mins)"}
                </button>
              </div>
              {/* Timer Display */}
              <p className="text-red-600 pt-3 text-sm">
                Time left: {Math.floor(timer / 60)}:
                {timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
              </p>
            </div>
          </div>
        )}

        {/* Terms and Conditions Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            By signing up, you agree to our{" "}
            <a href="/terms" className="text-indigo-600 hover:underline">
              Terms and Conditions
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-indigo-600 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
