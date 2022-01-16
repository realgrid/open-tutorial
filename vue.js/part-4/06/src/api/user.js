import users from '@/data/users'

let response = {
    data: {
        resultCode: 0,
        errorMsg: ""
    }
}

export default {
    list: async function (currentPage) {
        return new Promise((resolve) => {
            response.data.resultCode = 0;
            response.data.rowCount = users.rowCount;
            var count = 0;
            response.data.rows = users.rows.filter(() => {
                var page = parseInt(count / 10) + 1;
                count = count + 1;
                return currentPage === page;
            });
            setTimeout(() => resolve(response), 500);
        });
    },

    update: async function (user) {
        users.rows = users.rows.map((e) => {
            if (e.id === user.id) {
                e.pw = user.pw;
                e.name = user.name;
                e.gender = user.gender;
                e.phoneNumber = user.phoneNumber;
                e.createdAt = user.createdAt;
                e.statusCode = user.statusCode;
                e.blocked = user.blocked;
            }
            return e;
        });
        return new Promise((resolve) => {
            response.data.resultCode = 0;
            setTimeout(() => resolve(response), 500);
        });
    },

    delete: async function (id) {
        var found = false;
        users.rows = users.rows.filter((e) => {
            if (e.id === id) {
                found = true;
            }
            return e.id !== id;
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

    block: async function (id, value) {
        users.rows = users.rows.map((e) => {
            if (e.id === id) {
                e.blocked = value;
            }
            return e;
        });
        return new Promise((resolve) => {
            response.data.resultCode = 0;
            setTimeout(() => resolve(response), 500);
        });
    },
}