import store from '@/store'
import managers from '@/data/managers'
import md5 from 'md5'

let response = {
    data: {
        resultCode: 0,
        errorMsg: ""
    }
}

export default {
    signin: async function (email, pw) {
        pw = md5(pw).toUpperCase();
        return new Promise((resolve) => {
            const found = managers.find((e) => {
                console.log("manager.signin", email, pw, e.email, e.pw);
                if ((e.email === email) && (e.pw === pw)) return e;
            });
            setTimeout(() => {
                if (found) {
                    store.dispatch("updateToken", found.email);
                    response.data.resultCode = 0;
                    response.data.errorMsg = "";
                } else {
                    store.dispatch("updateToken", "");
                    response.data.resultCode = 101;
                    response.data.errorMsg = "아이디 또는 암호가 틀렸습니다.";
                }
                resolve(response);
            }, 1000);
        });
    },

    signout: async function () {
        return new Promise((resolve) => {
            store.dispatch("updateToken", "");
            response.data.resultCode = 0;
            setTimeout(() => resolve(response), 500);
        });
    },

    list: async function () {
        return new Promise((resolve) => {
            response.data.resultCode = 0;
            response.data.rows = managers;
            setTimeout(() => resolve(response), 500);
        });
    },
}