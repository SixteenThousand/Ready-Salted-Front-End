import {getUserByUsername, checkPassword} from'../api/api'

export const login = (username, password) => {
    let userObj = {}
    return getUserByUsername(username)
    .then((user) => {
        if(user){
            userObj = {...user}
            return checkPassword(username, password)
        }
        else return false
    })
    .then((result) => {
        if(result){return userObj}
        else return false
    })
}