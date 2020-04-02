const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
    console.log(" inside registervalidate function : Data :Name : ",data.name)
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.userName = !isEmpty(data.userName) ? data.userName : "";
  data.employeeId = !isEmpty(data.employeeId) ? data.employeeId : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
// Name checks
console.log(" inside registervalidate function : Data :Name : ",data.name)
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
  console.log("error after name check",errors)
// Username checks
  if (Validator.isEmpty(data.userName)) {
    errors.userName = "username field is required";
  }
  //id check
  if (Validator.isEmpty(data.employeeId)) {
    errors.employeeId = "Employee id field is required";
  }
// Password checks
console.log("password check : ", data.password)
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }
if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};