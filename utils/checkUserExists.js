import { getUserByEmail, getUserByUsername } from "../api/api";

export const checkUserExists = (email, username) => {

    let userExists;
    let emailExists;

    return getUserByUsername(username)
    .then((user) => {
      userExists = user ? true : false;
    })
    .then(() => {
      return getUserByEmail(email);
    })
    .then((user) => {
      emailExists = user ? true : false;
    })
    .then(() => {
      return {userExists, emailExists}
    })
    .catch((err) => {console.log(err)})
  };

export const validateUserDetails = (username, email, password) => {
    //min 8 char, at least one Uppercase, lowercase, number, special character
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g

    if(!username || !username.length >= 6){
      alert('Username must be a minimum of 6 characters')
      return false;
    }
    else if(!emailRegex.test(email)){
      alert('Email format invalid, please try again')
      return false;
    }
    else if(!passwordRegex.test(password)){
      alert('Password format invalid. Passwords should be a minimum of 8 characters, and contain at least one uppercase character, one lowercase, a number and a special character')
      return false;
    }
    else{return true}
}