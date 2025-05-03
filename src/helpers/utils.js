export function setLocalStorage(name, data) {
  localStorage.setItem(name, JSON.stringify(data));
}

export function getLocalStorage(name) {
  return JSON.parse(localStorage.getItem(name));
}

export function removeItem(name) {
  localStorage.removeItem(name);
}

export function checkIfValidIndianMobileNumber(str) {
  // Regular expression to check if string is a Indian mobile number
  const regexExp = /^[6-9]\d{9}$/gi;

  return regexExp.test(str);
}

export function checkIfValidEmail(str) {
  // Regular expression to check if string is a valid email
  const EMAIL_REGEX = /^[^@]+@\w+(\.\w+)+\w$/;

  return EMAIL_REGEX.test(str);
}

export function checkIfValidPasswordWithSpecialCharacters(str) {
  // Regular expression to check if string contain special characters
  const PASSWORD_REGEX = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  return PASSWORD_REGEX.test(str);
}

export function checkIfValidPasswordWithNumbers(str) {
  // Regular expression to check if string contain numbers

  return /\d/.test(str);
}

export function getMid() {
  const mids = {
    PROD_MID: "PAWWAL10169441055823",
    STG_MID: "DYSMow69518681919288",
  };
  return mids.PROD_MID;
  // return mids[name]; # When Passing "name" as Params
}

export function getWebPayTm() {
  const webs = {
    PROD_Web: "DEFAULT",
    STG_Web: "WEBSTAGING",
  };
  return webs.PROD_Web;
  // return mids[name]; # When Passing "name" as Params
}
