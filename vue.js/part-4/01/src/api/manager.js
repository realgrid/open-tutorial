import store from '@/store'
import managers from '@/data/managers'

let response = {
    data: {
        resultCode: 0,
        errorMsg: ""
    }
}

export default {
    signin: async function (email, pw) {
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
            let response = {
                data: {
                    resultCode: 0
                }
            }
            setTimeout(() => resolve(response), 1000);
        });
    },
}