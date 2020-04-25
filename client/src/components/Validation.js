import{emailRegEx} from './CommonFunction'  
const isEmpty = require("is-empty");

 export const  ValidateTransferCoinData=(data)=>{
   console.log(data,'validate data')
    let errors={ 
    coinsErr: '',
    commentErr: '',
    optionValuErr:''}
    

if (data.optionValue==='') {
  errors.optionValuErr = "Please Select one option";
} 
if(data.comment==='')
{
  errors.commentErr ='comment field can not be empty'
}
if(data.coins==='')
{
  errors.coinsErr ='coins field can not be empty'
}
if(errors.optionValuErr==="" && errors.commentErr==="" && errors.coinsErr===""){
  errors = {}
  console.log(errors,'validation error')
}
console.log(errors,"After validatiom")
return {
  errors,
  isValid: isEmpty(errors)
};
 }

 export const  ValidateRegistrationForm=(data)=>{ 
   console.log(data.email,'Email')
  let errors ={
    nameErr: "",
    employeeIdErr: "",
    userNameErr: "",
    emailErr:"",
    depterr:'',
    teamErr:'',
    passwordErr: "",
    password2Err: "",
  }
    if (data.name ===''){errors.nameErr = "name field can not be empty"}
    if (data.userName ===''){errors.userNameErr = " User Name field can not be empty"}
    if (data.employeeId ===''){errors.employeeIdErr = " employee id  field can not be empty"}
    if (data.department ===''){errors.depterr = "please select your depatment"}
    if (data.team ===''){errors.teamErr = "please select your team"}
    if(!emailRegEx.test(data.email)){ console.log(data.email)
       errors.emailErr='Invalid Email address'}
    if (data.password ===''){errors.passwordErr = " password can not be empty"}
    if (data.password2 !== data.password){errors.password2Err = "condirm password not matched"}
    if(errors.nameErr==='' && errors.employeeIdErr==='' && errors.userNameErr===''
    &&errors.depterr===''&&errors.emailErr==='' && errors.teamErr==='' && errors.passwordErr===''&&errors.password2Err==='' ){
      errors={}
      console.log(errors)
    }
    return {
      errors,
      isValid: isEmpty(errors)
    };
 }