import axios from 'axios'

export const register = newUser => {
  console.log(newUser)
  return axios
    .post('http://localhost:5000/api/users/register', {
      name: newUser.name,
      employeeId: newUser.employeeId,
      userName: newUser.userName,
      password: newUser.password,
      password2:newUser.password2
    })
    .then(response => {
      console.log('Registered')
    })
}

export const login = user => {
  //console.log("insoide login func")
  return axios
    .post('http://localhost:5000/api/users/login', {
      employeeId: user.employeeId,
      password: user.password
    })
    .then(response => {
      //console.log(response.data.token)
      localStorage.setItem('usertoken', response.data.token)
      alert("Login SUccessful")
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const getUsers = (token) => {
  return axios
    .get('http://localhost:5000/api/users/profile', {
      headers: { Authorization: token }
    })
    .then(response => {
      console.log(response)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const transferCoins=(users)=>{
  return axios.post('http://localhost:5000/api/users/transfercoins',users).
  then(response => {
    console.log("Coins Transferred");
  })
}