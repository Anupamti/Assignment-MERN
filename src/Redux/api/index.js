import axios from 'axios';

// const url = 'http://localhost:5000/posts';

const API = axios.create({ baseURL: 'https://assignment-tiwarianupam760.herokuapp.com/' })

const url = 'https://assignment-tiwarianupam760.herokuapp.com/userData';
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const createUser = (formData) => API.post('userData/createuser', formData)
export const getUserData = () => API.get('userData/getuser')

export const signIn = (formData) => API.post('user/signin', formData)
export const signUp = (formData) => API.post('user/signup', formData)

export const deleteData = (id) => API.delete(`${url}/${id}`)