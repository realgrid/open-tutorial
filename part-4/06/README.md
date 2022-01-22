# 사용자 목록의 페이징 및 html 렌더러 활용


## user API 추가 (/src/api/user.js)

``` js
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
```


## 사용자 데이터 추가 (src/data/users.js)

``` js
export default {
    rowCount: 20,
    rows: [
        {
            id: "user1",
            pw: "81DC9BDB52D04DC20036DBD8313ED055",
            name: "사용자1",
            gender: "남",
            age: 10,
            phoneNumber: "00000000000",
            createdAt: "2022-01-12 16:09:18",
            statusCode: 0,
            blocked: false,
        },
        {
            id: "user2",
            pw: "81DC9BDB52D04DC20036DBD8313ED055",
            name: "사용자2",
            gender: "여",
            age: 20,
            phoneNumber: "00000000000",
            createdAt: "2022-01-12 16:09:18",
            statusCode: 1,
            blocked: true,
        },
        {
            id: "user3",
            pw: "81DC9BDB52D04DC20036DBD8313ED055",
            name: "사용자3",
            gender: "남",
            age: 25,
            phoneNumber: "00000000000",
            createdAt: "2022-01-12 16:09:18",
            statusCode: 2,
            blocked: false,
        },
        {
            id: "user4",
            pw: "81DC9BDB52D04DC20036DBD8313ED055",
            name: "사용자4",
            gender: "여",
            age: 30,
            phoneNumber: "00000000000",
            createdAt: "2022-01-12 16:09:18",
            statusCode: 0,
            blocked: false,
        },
        {
            id: "user5",
            pw: "81DC9BDB52D04DC20036DBD8313ED055",
            name: "사용자5",
            gender: "남",
            age: 10,
            phoneNumber: "00000000000",
            createdAt: "2022-01-12 16:09:18",
            statusCode: 0,
            blocked: false,
        },
        {
            id: "user6",
            pw: "81DC9BDB52D04DC20036DBD8313ED055",
            name: "사용자6",
            gender: "여",
            age: 30,
            phoneNumber: "00000000000",
            createdAt: "2022-01-12 16:09:18",
            statusCode: 0,
            blocked: false,
        },
        {
            id: "user7",
            pw: "81DC9BDB52D04DC20036DBD8313ED055",
            name: "사용자7",
            gender: "남",
            age: 10,
            phoneNumber: "00000000000",
            createdAt: "2022-01-12 16:09:18",
            statusCode: 0,
            blocked: false,
        },
        {
            id: "user8",
            pw: "81DC9BDB52D04DC20036DBD8313ED055",
            name: "사용자8",
            gender: "여",
            age: 30,
            phoneNumber: "00000000000",
            createdAt: "2022-01-12 16:09:18",
            statusCode: 0,
            blocked: false,
        },
        {
            id: "user9",
            pw: "81DC9BDB52D04DC20036DBD8313ED055",
            name: "사용자9",
            gender: "남",
            age: 10,
            phoneNumber: "00000000000",
            createdAt: "2022-01-12 16:09:18",
            statusCode: 0,
            blocked: false,
        },
        {
            id: "user10",
            pw: "81DC9BDB52D04DC20036DBD8313ED055",
            name: "사용자10",
            gender: "여",
            age: 19,
            phoneNumber: "00000000000",
            createdAt: "2022-01-12 16:09:18",
            statusCode: 0,
            blocked: false,
        },
        {
            id: "user11",
            pw: "81DC9BDB52D04DC20036DBD8313ED055",
            name: "사용자11",
            gender: "남",
            age: 26,
            phoneNumber: "00000000000",
            createdAt: "2022-01-12 16:09:18",
            statusCode: 0,
            blocked: false,
        },
        {
            id: "user12",
            pw: "81DC9BDB52D04DC20036DBD8313ED055",
            name: "사용자12",
            gender: "여",
            age: 26,
            phoneNumber: "00000000000",
            createdAt: "2022-01-12 16:09:18",
            statusCode: 0,
            blocked: false,
        },
        {
            id: "user13",
            pw: "81DC9BDB52D04DC20036DBD8313ED055",
            name: "사용자13",
            gender: "남",
            age: 19,
            phoneNumber: "00000000000",
            createdAt: "2022-01-12 16:09:18",
            statusCode: 0,
            blocked: false,
        },
        {
            id: "user14",
            pw: "81DC9BDB52D04DC20036DBD8313ED055",
            name: "사용자14",
            gender: "여",
            age: 26,
            phoneNumber: "00000000000",
            createdAt: "2022-01-12 16:09:18",
            statusCode: 0,
            blocked: false,
        },
        {
            id: "user15",
            pw: "81DC9BDB52D04DC20036DBD8313ED055",
            name: "사용자15",
            gender: "남",
            age: 19,
            phoneNumber: "00000000000",
            createdAt: "2022-01-12 16:09:18",
            statusCode: 0,
            blocked: false,
        },
        {
            id: "user16",
            pw: "81DC9BDB52D04DC20036DBD8313ED055",
            name: "사용자16",
            gender: "여",
            age: 26,
            phoneNumber: "00000000000",
            createdAt: "2022-01-12 16:09:18",
            statusCode: 0,
            blocked: false,
        },
        {
            id: "user17",
            pw: "81DC9BDB52D04DC20036DBD8313ED055",
            name: "사용자17",
            gender: "남",
            age: 33,
            phoneNumber: "00000000000",
            createdAt: "2022-01-12 16:09:18",
            statusCode: 0,
            blocked: false,
        },
        {
            id: "user18",
            pw: "81DC9BDB52D04DC20036DBD8313ED055",
            name: "사용자18",
            gender: "여",
            age: 33,
            phoneNumber: "00000000000",
            createdAt: "2022-01-12 16:09:18",
            statusCode: 0,
            blocked: false,
        },
        {
            id: "user19",
            pw: "81DC9BDB52D04DC20036DBD8313ED055",
            name: "사용자19",
            gender: "남",
            age: 19,
            phoneNumber: "00000000000",
            createdAt: "2022-01-12 16:09:18",
            statusCode: 0,
            blocked: false,
        },
        {
            id: "user20",
            pw: "81DC9BDB52D04DC20036DBD8313ED055",
            name: "사용자20",
            gender: "여",
            age: 33,
            phoneNumber: "00000000000",
            createdAt: "2022-01-12 16:09:18",
            statusCode: 0,
            blocked: false,
        },
    ]
}
```

## 사이드 메뉴 수정 (/src/components/SideMenu.vue)

``` html
<template>
    <div class="title-area">
        ...
        <div class="client">
                ...
                <el-menu-item-group title="회원 관리">
                    <el-menu-item index="/user/list">
                        <i class="fas fa-address-book"></i>
                        <span>회원 목록</span>
                    </el-menu-item>
                </el-menu-item-group>
                ...
        </div>
    </div>
</template>

<script>
...
</script>
...
```

## 라우터 수정 (/src/router/index.js)

``` js
...
const routes = [
    ...
    {
        path: '/user/list',
        component: () => import('@/views/user/List.vue')
    },
]
...
```


## /src/views/user/List.vue 추가


### 기본 코드

``` html
<template>
    <div class="main-body">
        <div id="realgrid" style="width: 100%; height: 400px"></div>
    </div>
</template>

<script>
/* eslint-disable */

import apiUser from "@/api/user";

export default {
    mounted() {
        this.provider = new RealGrid.LocalDataProvider();
        this.gridView = new RealGrid.GridView("realgrid");
        this.gridView.setDataSource(this.provider);

        this.provider.setFields([
            { fieldName: "id" },
            { fieldName: "pw" },
            { fieldName: "name" },
            { fieldName: "gender" },
            { fieldName: "age" },
            { fieldName: "phoneNumber" },
            { fieldName: "createdAt" },
            { fieldName: "statusCode" },
        ]);

        this.gridView.setColumns([
            { name: "id", fieldName: "id", width: 60 },
            { name: "pw", fieldName: "pw",  },
            { name: "name", fieldName: "name", width: 60 },
            { name: "gender", fieldName: "gender", width: 50 },
            { name: "age", fieldName: "age", width: 50 },
            { name: "phoneNumber", fieldName: "phoneNumber" },
            { name: "createdAt", fieldName: "createdAt"},
            { name: "statusCode", fieldName: "statusCode", width: 80 },
        ]);
    },
};
</script>

<style>
.main-body {
    padding: 8px;
}
.toolbar {
    width: 100%;
    height: 64px;
}
.success {
    background-color: #67C23A;
    color: white;
    width: 80px;
    padding: 6px;
    border: 0px;
    border-radius: 4px;
}
.danger {
    background-color: #F56C6C;
    color: white;
    width: 80px;
    padding: 6px;
    border: 0px;
    border-radius: 4px;
}
</style>
```

### 페이징 처리

``` html
<template>
    <div class="main-body">
        <div id="realgrid" style="width: 100%; height: 400px"></div>
        <br>

        <el-pagination
            :total="rowCount"
            :page-size="pageSize"
            :page-count="pageCount"
            :current-page="currentPage"
            @current-change="changeCurrentPage" />
    </div>
</template>

<script>
...
export default {
    data() {
        return {
            rowCount: 0,
            pageSize: 10,
            currentPage: 1,
        }
    },
    mounted() {
        ...
        this.changeCurrentPage(1);
    },
    methods: {
        changeCurrentPage: function (currentPage) {
            apiUser
                .list(currentPage)
                .then((response) => {
                    this.provider.fillJsonData(response.data.rows, { fillMode: "set" });
                    this.rowCount = response.data.rowCount;
                    this.currentPage = currentPage;
                })
                .catch((e) => {
                    console.log(e);
                });
        },
    },
};
</script>
...
```


### html 렌더러 활용

차단 여부를 표시하는 blocked 필드를 버튼으로 토글해서 수정할 수 있도록 합니다.

``` html
...
<script>
...
export default {
    ...
    mounted() {
        window.setBlocked = this.setBlocked;
        ...
        this.provider.setFields([
            ...
            { fieldName: "blocked", dataType: "boolean" },
        ]);

        this.gridView.displayOptions.rowHeight = 36;
        this.gridView.setColumns([
            ...
            {
                name: "blocked",
                fieldName: "blocked",
                renderer: {
                    type: "html",
                    callback: this.getBlockedButton
                }
            },
        ]);

        this.changeCurrentPage(1);
    },
    methods: {
        changeCurrentPage: function (currentPage) {
            apiUser
                .list(currentPage)
                .then((response) => {
                    this.provider.fillJsonData(response.data.rows, { fillMode: "set" });
                    this.rowCount = response.data.rowCount;
                    this.currentPage = currentPage;
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        getBlockedButton: function (grid, cell, w, h) {
            const toBlock = `<button class="danger" onclick=setBlocked("true")>차단</button>`;
            const blocked = `<button class="success" onclick=setBlocked("false")>차단해제</button>`;

            if (cell.value) {
                return blocked;
            } else {
                return toBlock;
            }
        },
        setBlocked: function (value) {
            let current = this.gridView.getCurrent();
            let row = this.gridView.getValues(current.itemIndex);
            apiUser
                .block(row.id, value)
                .then(() => {
                    this.gridView.setValue(current.itemIndex, "blocked", value);
                });
        },
    },
};
</script>
...
```