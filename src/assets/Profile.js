function showUserProfile() {
  const userProfile = document.getElementById("user-profile");
  const contenedorUserProfile = document.getElementById("formUserProfile");
  const flechaUserProfile = document.getElementById("arrowUserProfile");
  if (userProfile.classList.contains("userProfileDesplegado")) {
    userProfile.classList.remove("userProfileDesplegado");
    contenedorUserProfile.classList.add("hidden");
    flechaUserProfile.classList.remove("rotate-[0deg]");
    flechaUserProfile.classList.add("rotate-[-90deg]");
  } else {
    userProfile.classList.add("userProfileDesplegado");
    contenedorUserProfile.classList.remove("hidden");
    flechaUserProfile.classList.remove("rotate-[-90deg]");
    flechaUserProfile.classList.add("rotate-[0deg]");
  }
}

function showUpdatePassword() {
  const updatePassword = document.getElementById("update-password");
  const contenedorUpdatePassword = document.getElementById("formUpdatePassword");
  const flechaUpdatePassword = document.getElementById("arrowUpdatePassword");

  if (updatePassword.classList.contains("updatePasswordDesplegado")) {
    updatePassword.classList.remove("updatePasswordDesplegado");
    contenedorUpdatePassword.classList.add("hidden");
    flechaUpdatePassword.classList.remove("rotate-[0deg]");
    flechaUpdatePassword.classList.add("rotate-[-90deg]");
  } else {
    updatePassword.classList.add("updatePasswordDesplegado");
    contenedorUpdatePassword.classList.remove("hidden");
    flechaUpdatePassword.classList.remove("rotate-[-90deg]");
    flechaUpdatePassword.classList.add("rotate-[0deg]");
  }
}

export { showUserProfile, showUpdatePassword };
