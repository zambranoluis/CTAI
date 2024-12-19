"use client";

import { Button } from "@nextui-org/button";
import Form from "@/components/Form";
import { TiArrowSortedDown } from "react-icons/ti";
import { showUserProfile, showUpdatePassword } from "@/assets/Profile.js";
import { profileFieldsConfig } from "@/assets/FieldsConfig";

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Section = ({
  profileSection,
  profileData,
  handleUpdateProfile,
  handleUpdatePassword,
  handleChange,
  togglePasswordVisibility,
  showCurrentPassword,
  showNewPassword,
  showConfirmPassword,
  passwordUpdate,
  handlePasswordChange,
  loading,
  errors,
}) => {
  return (
    <div className='w-full flex flex-col md:flex-row gap-4'>
      {profileSection}
      <div className='w-full md:w-[60%] flex flex-col gap-4'>
        <div className='rounded-lg border-[var(--color-text)] border-[1px] bg-[var(--color-background-shade)]'>
          <div
            id='user-profile'
            className='userProfileDesplegado  select-none w-[100%] p-[10px] border-b-[var(--color-text-shade)] border-b-[1px] rounded-t-lg bg-[var(--color-background)] text-[var(--color-text)] flex justify-start items-center text-center font-bold gap-2 hover:cursor-pointer'
            onClick={(e) => {
              e.preventDefault();
              showUserProfile();
            }}>
            <TiArrowSortedDown id='arrowUserProfile' className='rotate-[0deg]' />
            User Profile
          </div>
          <Form
            initialData={profileData || {}} // Pasamos formData al formulario
            fieldsConfig={profileFieldsConfig}
            handleSubmit={handleUpdateProfile}
            handleChange={handleChange}
            formData={profileData || {}}
            loading={loading}
            buttonText='Update Profile'
            errors={errors} // Pasamos `errors` como objeto
          />
        </div>

        <div className='rounded-lg border-[var(--color-text)] border-[1px] bg-[var(--color-background-shade)]'>
          <div
            id='update-password'
            className='select-none w-[100%] p-[10px] border-b-[var(--color-text-shade)] border-b-[1px] rounded-t-lg bg-[var(--color-background)] text-[var(--color-text)] text-center font-bold flex justify-start items-center gap-2 hover:cursor-pointer'
            onClick={(e) => {
              e.preventDefault();
              showUpdatePassword();
            }}>
            <TiArrowSortedDown id='arrowUpdatePassword' className='rotate-[-90deg]' />
            Update Password
          </div>
          <form
            id='formUpdatePassword'
            onSubmit={handleUpdatePassword}
            className='hidden p-[20px] space-y-[10px] transition-all ease-out'>
            <div className='max-sm:flex-col flex items-center w-full bgred-300 gap-6'>
              <label className='text-center w-[140px] font-bold text-[16px] text-[var(--color-text)]'>
                Current Password
              </label>

              <div className='bg-blue400 flex relative border-gray-300 rounded w-full'>
                <input
                  type={`${showCurrentPassword ? "text" : "password"}`}
                  name='oldPassword'
                  value={passwordUpdate.oldPassword}
                  onChange={handlePasswordChange}
                  className='w-full  text-[var(--color-text)] bg-[var(--color-background)] border-[1px] border-[var(--color-text-shade)] rounded-[5px] p-[5px]'
                  placeholder='*******'
                />
                {showCurrentPassword ? (
                  <FaEye
                    className='absolute right-[15px] top-[25%] text-xl cursor-pointer'
                    onClick={(e) => {
                      e.preventDefault;
                      togglePasswordVisibility("current");
                    }}
                  />
                ) : (
                  <FaEyeSlash
                    className='absolute right-[15px] top-[25%] text-xl cursor-pointer'
                    onClick={(e) => {
                      e.preventDefault;
                      togglePasswordVisibility("current");
                    }}
                  />
                )}
              </div>
            </div>
            <div className='max-sm:flex-col flex  items-center w-full bgred-300 gap-6'>
              <label className='text-center w-[140px] font-bold text-[16px] text-[var(--color-text)]'>
                New Password
              </label>
              <FaEye className='absolute flex top-0 right-0' />
              <div className='bg-blue400 flex relative border-gray-300 rounded w-full'>
                <input
                  type={`${showNewPassword ? "text" : "password"}`}
                  name='newPassword'
                  value={passwordUpdate.newPassword}
                  onChange={handlePasswordChange}
                  className='w-full  text-[var(--color-text)] bg-[var(--color-background)] border-[1px] border-[var(--color-text-shade)] rounded-[5px] p-[5px]'
                  placeholder='*******'
                />
                {showNewPassword ? (
                  <FaEye
                    className='absolute right-[15px] top-[25%] text-xl cursor-pointer'
                    onClick={(e) => {
                      e.preventDefault;
                      togglePasswordVisibility("new");
                    }}
                  />
                ) : (
                  <FaEyeSlash
                    className='absolute right-[15px] top-[25%] text-xl cursor-pointer'
                    onClick={(e) => {
                      e.preventDefault;
                      togglePasswordVisibility("new");
                    }}
                  />
                )}
              </div>
            </div>
            <div className='max-sm:flex-col flex items-center w-full bgred-300 gap-6 bgred-300'>
              <label className='w-[140px] font-bold text-[16px] text-center text-[var(--color-text)]'>
                Confirm Password
              </label>
              <div className='bg-blue400 flex relative border-gray-300 rounded w-full'>
                <input
                  type={`${showConfirmPassword ? "text" : "password"}`}
                  name='repeatNewPassword'
                  value={passwordUpdate.repeatNewPassword}
                  onChange={handlePasswordChange}
                  className='w-full  text-[var(--color-text)] bg-[var(--color-background)] border-[1px] border-[var(--color-text-shade)] rounded-[5px] p-[5px]'
                  placeholder='*******'
                />
                {showConfirmPassword ? (
                  <FaEye
                    className='absolute right-[15px] top-[25%] text-xl cursor-pointer'
                    onClick={(e) => {
                      e.preventDefault;
                      togglePasswordVisibility("confirm");
                    }}
                  />
                ) : (
                  <FaEyeSlash
                    className='absolute right-[15px] top-[25%] text-xl cursor-pointer'
                    onClick={(e) => {
                      e.preventDefault;
                      togglePasswordVisibility("confirm");
                    }}
                  />
                )}
              </div>
            </div>
            <div className='max-sm:flex-col flex items-center justify-end'>
              <Button
                type='submit'
                className='bg-[#575a5f] border-[var(--color-text)] place-self-end text-[--color-background] border-[1px] px-[17px] py-[3px] font-bold rounded hover:bg-[var(--color-primary)] hover:text-[var(--color-text)]'
                auto
                isLoading={loading}
                disabled={loading}>
                {loading ? "Updating..." : "Update Password"}
              </Button>
            </div>
            {errors.password && (
              <div className='text-center text-red-500'>{errors.password}</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Section;
