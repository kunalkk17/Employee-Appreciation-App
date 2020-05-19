export const strongPassRegex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/);
export const EmpCodeRegex= RegExp(/^[0-9]*$/);
export const singlenumbRegex = RegExp( /^\d+$/);
export const CharchRegEx = RegExp( /^[a-zA-Z]*$/);
export const nameRegex = RegExp(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/)
export const emailRegEx = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
export const formValid= errors=>{
    let valid = true;
    Object.values(errors).forEach(val =>{ val.length > 0 && (valid= false)
    });
    return valid;
}

export const TeamOption =[
  {text:'NAVFAS' , value:'NAVFAS'},
  {text:'NAVRTA' , value:'NAVRTA'},
  {text:'NAVCDS' , value:'NAVCDS'},
  {text:'Partner', value:'Partner'},
  {text:'Main', value:'Main'},
  {text:'Main2', value:'Main2'}]
  
 export const DeptOption=[
    { key:1,text:'IT' , value:'IT'},
    {key:2,text:'Hr' , value:'HR'},
    {key:3,text:'Accounting' , value:'Acccounting'},
   
  ]
export const TeamLeadList= [{
 Team:'NAVFAS',
 TeamLead:'Anil Kumar Modest'
},
{
  Team:'NAVRTA',
  TeamLead:"Pankaj Sharma"
}
]

export const selectOption =[{text:'Belongs to the Same Team' ,value:"Belongs to the Same Team"},
{text:'Previously work with Him/Her' ,value:"Previously work with Him/Her"},
{text:'Working in any Integration project with him/her' ,value:"Working in any Integration project with him/her"},
{text:'Involve in any Organisation policy with Him/her' ,value:"Involve in any Organisation policy with Him/her"},
{text:'Others' ,value:"Others"}


]