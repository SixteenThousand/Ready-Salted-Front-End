import axios from 'axios';

const api = axios.create({
    baseURL: 'https://ready-salted-server.onrender.com/api'
})

export const getUsers = () => {
    return api.get('/users')
    .then(({ data }) => {
        return data;
    })
}

export const getUserByUsername = (username) => {
    return api.get(`/users/username/${username}`)
    .then(({ data }) => {
        return data;
    })
}

export const getUserByEmail = (email) => {
    return api.get(`/users/email/${email}`)
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