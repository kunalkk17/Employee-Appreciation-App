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
    {text:'NAVFAS' , value:'FAS'},
  {text:'NAVRTA' , value:'RTA'},
  {text:'NAVCDS' , value:'CDS'},
  {text:'Partner', value:'Partner'},
  {text:'Main', value:'Main'},
  {text:'Main2', value:'Main2'}]
  
 export const DeptOption=[
    { key:1,text:'IT' , value:'it'},
    {key:2,text:'Hr' , value:'hr'},
    {key:3,text:'Accounting' , value:'accounting'},
   
  ]
export const TeamLeadList= [{
 Team:'FAS',
 TeamLead:'Anil Kumar Modest'
},
{
  Team:'RTA',
  TeamLead:"Pankaj Sharma"
}
  
]