// src/services/profileService.js

import axios from "axios";
import md5 from "md5";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getUserData = async (token, email) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/users/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const updateProfile = async (token, profileData, userId = profileData.email) => {
  try {
    const response = await axios.patch(
      `${BACKEND_URL}/users/update/${userId}`,
      profileData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

export const updatePassword = async (token, oldPassword, newPassword, email) => {
  try {
    const hashedOldPassword = md5(oldPassword);
    const hashedNewPassword = md5(newPassword);
    const response = await axios.patch(
      `${BACKEND_URL}/users/update-password/${email}`,
      {
        currentPassword: hashedOldPassword,
        newPassword: hashedNewPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
};
