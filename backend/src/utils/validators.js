/**
 * validators.js — lightweight request body validators.
 * Returns an error message string if validation fails, or null if OK.
 */

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());

const validateRegisterStudent = ({ name, email, password, languageToLearn }) => {
  if (!name || !email || !password || !languageToLearn) {
    return 'name, email, password, and languageToLearn are required.';
  }
  if (!isValidEmail(email)) return 'Invalid email address.';
  if (password.length < 8) return 'Password must be at least 8 characters.';
  return null;
};

const validateRegisterTeacher = ({ name, email, password, experienceType }) => {
  if (!name || !email || !password || !experienceType) {
    return 'name, email, password, and experienceType are required.';
  }
  if (!isValidEmail(email)) return 'Invalid email address.';
  if (password.length < 8) return 'Password must be at least 8 characters.';
  return null;
};

const validateRegisterAdmin = ({ name, email, password }) => {
  if (!name || !email || !password) return 'name, email, and password are required.';
  if (!isValidEmail(email)) return 'Invalid email address.';
  if (password.length < 8) return 'Password must be at least 8 characters.';
  return null;
};

const validateLogin = ({ email, password }) => {
  if (!email || !password) return 'email and password are required.';
  if (!isValidEmail(email)) return 'Invalid email address.';
  return null;
};

module.exports = {
  validateRegisterStudent,
  validateRegisterTeacher,
  validateRegisterAdmin,
  validateLogin,
};
