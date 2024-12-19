// src/services/authService.js

import axios from "axios";
import md5 from "md5";
import Cookies from "js-cookie";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const registerUser = async (formData) => {
  const hashedPassword = md5(formData.password1);
  try {
    const response = await axios.post(`${BACKEND_URL}/users/register`, {
      ...formData,
      password: hashedPassword,
    });
    return response.data;
  } catch (error) {
    console.error("Error during user registration:", error);
    throw error;
  }
};

export const verifyCode = async (email, verificationCode) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/users/verify-code`, {
      email,
      code: verificationCode,
    });
    return response.data;
  } catch (error) {
    console.error("Error during code verification:", error);
    throw error;
  }
};

// src/services/authService.js
export const sendVerificationCode = async (email, phone) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/users/send-verification-code`, {
      email,
      phone,
    });
    return response.data;
  } catch (error) {
    console.error("Error sending verification code:", error);
    throw error;
  }
};

// Nueva función para el restablecimiento de contraseña
export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/users/forgot-password`, {
      email,
    });
    return response.data;
  } catch (error) {
    console.error("Error during forgot password request:", error);
    throw error;
  }
};

// Nueva función para el restablecimiento de contraseña con token
export const resetPassword = async (token, newPassword) => {
  const hashedPassword = md5(newPassword);
  try {
    const response = await axios.post(`${BACKEND_URL}/users/reset-password`, {
      token,
      newPassword: hashedPassword,
    });
    return response.data;
  } catch (error) {
    console.error("Error during password reset:", error);
    throw error;
  }
};

export const logoutUser = async (token) => {

  const response = await fetch(`${BACKEND_URL}/users/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Envía el token en el encabezado
    },
  });

  if (!response.ok) {
    throw new Error("Logout failed");
  }

  return response.json();
};

