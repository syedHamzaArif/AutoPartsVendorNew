import { Apis, get, post } from './';

export const Service = {
    register: async (data) => {
        let result = await post(Apis.register, data);
        if (result.status === 200) return result.data;
        else throw result;
    },
    login: async (data) => {
        let result = await post(Apis.login, data);
        if (result.status === 200) return result.data;
        else throw result;
    },
    logout: async (token) => {
        let result = await get(Apis.logout, token);
        if (result.status === 200) return result.data;
        else throw result;
    },
    verifyToken: async (data) => {
        let result = await post(Apis.verifyToken, data);
        if (result.status === 200) return result.data;
        else throw result;
    },
    userInfo: async (token) => {
        let result = await get(Apis.userInfo, token);
        if (result.status === 200) return result.data;
        else throw result;
    },
};

