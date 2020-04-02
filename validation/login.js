const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.employeeId = !isEmpty(data.employeeId) ? data.employeeId : "";
  data.password = !isEmpty(data.password) ? data.password : "";
// Employee Id checks
  if (Validator.isEmpty(data.employeeId)) {
    errors.employeeId = "employeeId field is required";
  } 
// Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
}