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
            response.data.rows = [];

            var startNo = (currentPage - 1) * 10;
            try {
                for (var i=0; i<10; i++) {
                    users.rows[startNo + i].no = startNo + i + 1;
                    response.data.rows.push(users.rows[startNo + i]);
                }

            } catch (error) {
                // range 에러 무시
            }

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