"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useSession } from "next-auth/react";
import { getUserData, updateProfile, updatePassword } from "@/services/profileService";
import Verification from "../Verification";
import { sendVerificationCode } from "@/services/authService";
import { useDataContext } from "@/context/DataContext";
import { Button } from "@nextui-org/button";
import { FaCopy } from "react-icons/fa6";
import Swal from "sweetalert2";
import {
  validateTextWithSpaces,
  validateEmail,
  validatePassword,
  validateText,
} from "@/utils/validation";
import dinamyc from "next/dynamic";

const Section = dinamyc(() => import("./Section"), { ssr: false });

const Profile = () => {
  const { data: session } = useSession();
  const { profileData, setProfileData } = useDataContext();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [passwordUpdate, setPasswordUpdate] = useState({
    oldPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  });

  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [pendingAction, setPendingAction] = useState("");
  const [pendingData, setPendingData] = useState(null);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = (password) => {
    switch (password) {
      case "current":
        setShowCurrentPassword(!showCurrentPassword);
        break;
      case "new":
        setShowNewPassword(!showNewPassword);
        break;
      case "confirm":
        setShowConfirmPassword(!showConfirmPassword);
        break;
      default:
        break;
    }
  };

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setProfileData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [setProfileData],
  );

  useEffect(() => {
    const fetchData = async () => {
      if (session && !profileData) {
        try {
          const data = await getUserData(session.accessToken, session.user.email);
          setProfileData(data.data);
        } catch (err) {
          console.error("Error fetching profile data:", err);
        }
      }
    };

    fetchData();
  }, [session, profileData, setProfileData]);

  const requestVerificationCode = useCallback(
    async (action, data) => {
      setLoading(true);
      if (!session || !session.user) return;

      try {
        await sendVerificationCode(session.user.email, session.user.phone);
        setPendingAction(action);
        setPendingData(data);
        setShowVerificationModal(true);
      } catch (err) {
        setErrors({ general: "Failed to send verification code." });
        setLoading(false);
      }
    },
    [session],
  );

  const handleVerificationSuccess = useCallback(async () => {
    if (!pendingAction) return;

    try {
      if (pendingAction === "profile") {
        await updateProfile(session.accessToken, pendingData);
        Swal.fire({
          icon: "success",
          title: "Profile updated successfully",
          showConfirmButton: true,
        });
      } else if (pendingAction === "password") {
        await updatePassword(
          session.accessToken,
          passwordUpdate.oldPassword,
          passwordUpdate.newPassword,
          session.user.email,
        );
        Swal.fire({
          icon: "success",
          title: "Password updated successfully",
          showConfirmButton: true,
        });
      }
      handleCloseVerificationModal();
      const updatedData = await getUserData(session.accessToken, session.user.email);
      setProfileData(updatedData.data);
    } catch (err) {
      setErrors({ general: `Failed to update ${pendingAction}.` });
    } finally {
      setLoading(false);
      setPendingAction("");
      setPendingData(null);
    }
  }, [pendingAction, session, pendingData, passwordUpdate, setProfileData]);

  const handleUpdateProfile = useCallback(
    (profileData) => {
      const validationErrors = {};
      if (!validateTextWithSpaces(profileData.givenName)) {
        validationErrors.givenName = "First Name must contain only letters and spaces.";
      }
      if (!validateTextWithSpaces(profileData.familyName)) {
        validationErrors.familyName = "Last Name must contain only letters and spaces.";
      }
      if (!validateText(profileData.address)) {
        validationErrors.address =
          "Address must contain only letters, numbers, and spaces.";
      }
      if (!validateEmail(profileData.email)) {
        validationErrors.email = "Invalid email format.";
      }

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      setErrors({});
      requestVerificationCode("profile", profileData);
    },
    [requestVerificationCode],
  );

  const handleUpdatePassword = useCallback(
    (e) => {
      e.preventDefault();

      if (passwordUpdate.newPassword !== passwordUpdate.repeatNewPassword) {
        setErrors({ password: "Passwords do not match" });
        return;
      }

      if (!validatePassword(passwordUpdate.newPassword)) {
        setErrors({
          password:
            "Password must be at least 8 characters, include 1 number, 1 lowercase, and 1 uppercase letter.",
        });
        return;
      }

      setErrors({});
      requestVerificationCode("password", passwordUpdate);
    },
    [passwordUpdate, requestVerificationCode],
  );

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordUpdate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCloseVerificationModal = () => {
    setShowVerificationModal(false);
    setPendingAction("");
    setPendingData(null);
  };

  const handleCopyId = useCallback((id) => {
    try {
      navigator.clipboard.writeText(id);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "ID copied to clipboard.",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to copy ID.",
      });
    }
  }, []);

  const profileSection = useMemo(
    () => (
      <div className='w-full md:w-[40%] px[10px] flex justify-center items-start'>
        <div className='w-full h-[300px] bg-background border[1px] border-[var(--color-text)] rounded-lg relative '>
          {/* <div className="flex w-full h-full rounded-xl">
            <video className="object-cover w-full h-full bggreen-600 rounded-xl " autoPlay muted loop src="https://github.com/BPM94/SCCTMD/raw/main/lavaLamp.mp4"></video>
          </div> */}
          <div className='wfull hfull flex flex-col p-2 absolute top-[15%] left-[15%] bgwhite rounded-md w-[70%] h-[60%] justify-center items-center '>
            <h2 className='text[#ca0000] text-2xl font-bold text-center drop-shadow-[0px_3px_3px_rgba(0,0,0,1)]'>{session.user.userName}</h2>
            <Button
              onClick={() => handleCopyId(profileData.id)}
              className='bg-transparent hover:text-[#ca0000] text-[var(--color-text)] text-md drop-shadow-[0_6px_6px_rgba(0,0,0,1)]'>
              <FaCopy className='text-2xl' />
              Copy ID
            </Button>
            <h2 className='text-[var(--color-text)] text-lg font-bold text-center drop-shadow-[0_3px_3px_rgba(0,0,0,1)]'>
              {session.user.givenName} {session.user.familyName}
            </h2>
          </div>
        </div>
      </div>
    ),
    [session, profileData, handleCopyId],
  );

  return (
    <section
      id='section_profile'
      className='flex flex-col gap-4 w-[95%] h-[95%] rounded-md p-8 bg-[var(--color-background-shade)] overflow-y-scroll noScrollBar z-50'>
      <Section
        profileSection={profileSection}
        profileData={profileData}
        handleUpdateProfile={handleUpdateProfile}
        handleUpdatePassword={handleUpdatePassword}
        handleChange={handleChange}
        togglePasswordVisibility={togglePasswordVisibility}
        showCurrentPassword={showCurrentPassword}
        setShowCurrentPassword={setShowCurrentPassword}
        showNewPassword={showNewPassword}
        setShowNewPassword={setShowNewPassword}
        showConfirmPassword={showConfirmPassword}
        setShowConfirmPassword={setShowConfirmPassword}
        passwordUpdate={passwordUpdate}
        handlePasswordChange={handlePasswordChange}
        loading={loading}
        errors={errors}
      />
      {showVerificationModal && (
        <Verification
          email={session.user.email}
          onClose={handleCloseVerificationModal}
          onSuccess={handleVerificationSuccess}
        />
      )}
    </section>
  );
};

export default Profile;
