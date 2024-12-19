// utils/validation.js

export const validateText = (text) => {
  const regex = /^[0-9A-Za-z\s]+$/;
  return regex.test(text);
};

export const validateTextWithSpaces = (text) => {
  const regex = /^[A-Za-z\s]+$/;
  return regex.test(text);
};

export const validateNumber = (number) => {
  const regex = /^[0-9]+$/;
  return regex.test(number);
};

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return regex.test(password);
};
