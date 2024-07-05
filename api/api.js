import axios from 'axios';

//Modify this when server is live.
const url = 'http://localhost:9090/api'

const api = axios.create({
    baseURL: url
})

export const getUsers = () => {
    return api.get('/users')
    .then(({ data }) => {
        return data;
    })
}

export const getUserByUsername = (username) => {
    return api.get(`/users/${username}`)
    .then(({ data }) => {
        return data;
    })
}

export const getScores = () => {
    return api.get('/users/scores')
    .then(({ data }) => {
        return data;
    })
}

/* NOTE: This function is for testing purposes and will need
    a rewrite when safe password features are implemented */
export const checkPassword = (username, password) => {
    return api.post(`/users/${username}/password`, {password:password})
    .then(({ data }) => {
        return data.match;
    })
}

export const postNewUser = (username, email, password) => {
    const postBody = {
        username: username,
        email: email,
        password: password,
    }

    return api.post('/users', postBody)
    .then(({ data }) => {
        return data;
    })
}

export const deleteUserByUsername = (username) => {
    return api.delete(`/users/${username}`)
    .then(({ data }) => {
        return data;
    })
}

export const updateUserbyUsername = (refUsername, userObj) => {
    const patchBody = {...userObj}
    
    return api.patch(`/users/${refUsername}`, patchBody)
    .then(({ data }) => {
        return data;
    })
}