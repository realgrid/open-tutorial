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
            const found = managers.rows.find((e) => {
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
            response.data.rows = managers.rows;
            setTimeout(() => resolve(response), 500);
        });
    },

    create: async function (manager) {
        let data = {
            email: manager.email,
            pw: manager.pw,
            name: manager.name,
            rule: manager.rule,
            phoneNumber: manager.phoneNumber
        };
        managers.rows.push(data);
        return new Promise((resolve) => {
            response.data.resultCode = 0;
            setTimeout(() => resolve(response), 500);
        });
    },

    update: async function (manager) {
        managers.rows = managers.rows.map((e) => {
            if (e.email === manager.email) {
                e.pw = manager.pw;
                e.name = manager.name;
                e.rule = manager.rule;
                e.phoneNumber = manager.phoneNumber;
            }
            return e;
        });
        return new Promise((resolve) => {
            response.data.resultCode = 0;
            setTimeout(() => resolve(response), 500);
        });
    },

    delete: async function (email) {
        var found = false;
        managers.rows = managers.rows.filter((e) => {
            if (e.email === email) {
                found = true;
            }
            return e.email !== email;
        });
        return new Promise((resolve, reject) => {
            if (found) {
                response.data.resultCode = 0;
                setTimeout(() => resolve(response), 500);
            } else {
                reject();
            }
        });
    },
}