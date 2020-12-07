import Axios from '../../axios';
// import Axios from 'axios';
import { server } from '../../axios';

import { errorHandler } from './errorHandler';

export const Apis = {
    register: 'user/register',
    login: 'user/login',
    logout: 'user/logout',
    verifyToken: 'user/verifyToken',
    userInfo: 'user/me',
};

export const headers = {
    'content-type': 'application/json',
};

export const get = async (endPoint, token) => {
    try {
        const result = await Axios.get(endPoint, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return result;
    } catch (e) {
        throw errorHandler(e);
    }
};

export const post = async (endPoint, data, token) => {
    try {
        const result = await Axios.post(endPoint, data);
        return result;
    } catch (e) {
        throw errorHandler(e);
    }
};
