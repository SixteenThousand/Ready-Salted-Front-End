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

export const validateUserDetails = (email, password) => {
    //min 8 char, at least one Uppercase, lowercase, number, special character
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g

    if(emailRegex.test(email) && passwordRegex.test(password)){return true}
    else{console.log("rejected"); return false}
}