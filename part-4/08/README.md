# 회원별 게시물 목록 보기

이번 영상에서는 마스터 디테일 표현과 Vue 콤포넌트를 이용해서 코드를 모듈화하는 방법에 대해서 알아봅니다.


## API 및 data 준비

### article API 추가 (/src/api/article.js)

``` js
import articles from '@/data/articles'

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

            if (!currentPage) {
                response.data.rows = articles.rows;
                setTimeout(() => resolve(response), 500);
                return;
            }

            response.data.rows = [];

            var startNo = (currentPage - 1) * 10;
            try {
                for (var i=0; i<10; i++) {
                    articles.rows[startNo + i].no = startNo + i + 1;
                    response.data.rows.push(articles.rows[startNo + i]);
                }
            } catch (error) {
                // range 에러 무시
            }

            setTimeout(() => resolve(response), 500);
        });
    },

    findByUserId: async function (userId) {
        return new Promise((resolve) => {
            response.data.resultCode = 0;
            response.data.rows = articles.rows.filter((e) => e.userId === userId);
            setTimeout(() => resolve(response), 500);
        });
    }
}
```

### 게시물 데이터 추가 (src/data/articles.js)

``` js
export default {
    rows: [
        {
            id: 0,
            userId: "user1",
            name: "사용자1",
            createdAt: "2022-01-12 16:09:18",
            title: "게시물 제목 1",
            content: "게시물 내용 1"
        },
        {
            id: 1,
            userId: "user1",
            name: "사용자1",
            createdAt: "2022-01-12 16:09:18",
            title: "게시물 제목 2",
            content: "게시물 내용 2"
        },
        {
            id: 2,
            userId: "user1",
            name: "사용자1",
            createdAt: "2022-01-12 16:09:18",
            title: "게시물 제목 3",
            content: "게시물 내용 3"
        },
        {
            id: 3,
            userId: "user2",
            name: "사용자2",
            createdAt: "2022-01-12 16:09:18",
            title: "게시물 제목 4",
            content: "게시물 내용 4"
        },
        {
            id: 4,
            userId: "user2",
            name: "사용자2",
            createdAt: "2022-01-12 16:09:18",
            title: "게시물 제목 5",
            content: "게시물 내용 5"
        },
        {
            id: 5,
            userId: "user2",
            name: "사용자2",
            createdAt: "2022-01-12 16:09:18",
            title: "게시물 제목 6",
            content: "게시물 내용 6"
        },
        {
            id: 6,
            userId: "user2",
            name: "사용자2",
            createdAt: "2022-01-12 16:09:18",
            title: "게시물 제목 7",
            content: "게시물 내용 7"
        },
        {
            id: 7,
            userId: "user2",
            name: "사용자2",
            createdAt: "2022-01-12 16:09:18",
            title: "게시물 제목 8",
            content: "게시물 내용 8"
        },
    ]
}
```

### 라우터 수정 (/src/router/index.js)

``` js
...
const routes = [
    ...
    {
        path: '/article/listByUser',
        component: () => import('@/views/article/ListByUser.vue')
    },
]
...
```

### 사이드 메뉴 수정 (/src/components/SideMenu.vue)

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

                <el-menu-item-group title="게시물 관리">
                    <el-menu-item index="/article/listByUser">
                        <i class="fas fa-list-alt"></i>
                        <span>회원별 게시물 목록</span>
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


## 마스터 디테일

### /src/views/article/ListByUser.vue 추가

``` html
<template>
    <div class="main-body">
        <el-row>
            <el-col class="grid" :span=12>
                <div id="realgrid1" style="width: 100%; height: 90vh"></div>
            </el-col>
            <el-col class="grid" :span=12>
                <div id="realgrid2" style="width: 100%; height: 90vh"></div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
/* eslint-disable */

export default {
    mounted() {
        this.provider1 = new RealGrid.LocalDataProvider();
        this.gridView1 = new RealGrid.GridView("realgrid1");
        this.gridView1.setDataSource(this.provider1);

        this.provider2 = new RealGrid.LocalDataProvider();
        this.gridView2 = new RealGrid.GridView("realgrid2");
        this.gridView2.setDataSource(this.provider2);

        this.provider1.setFields([
            { fieldName: "id" },
            { fieldName: "name" },
            { fieldName: "gender" },
            { fieldName: "age" },

            {
                fieldName: "createdAt",
                dataType: "datetime",
                datetimeFormat: "yyyy-MM-dd"
            },
        ]);

        this.gridView1.setColumns([
            { name: "id", fieldName: "id", width: 60 },
            { name: "name", fieldName: "name", width: 60 },
            { name: "gender", fieldName: "gender", width: 50 },
            { name: "age", fieldName: "age", width: 50 },
            { name: "createdAt", fieldName: "createdAt", width: 80},
        ]);

        this.provider2.setFields([
            { fieldName: "id" },
            { fieldName: "userId" },
            { fieldName: "name" },
            { fieldName: "createdAt" },
            { fieldName: "title" },
            { fieldName: "content" },
        ]);

        this.gridView2.setColumns([
            { name: "id", fieldName: "id", width: 60 },
            { name: "createdAt", fieldName: "createdAt", width: 80},
            { name: "title", fieldName: "title", width: 100},
            { name: "content", fieldName: "content", width: 80},
        ]);
    },
};
</script>

<style scoped>
.main-body {
    padding: 8px;
}
.grid {
    padding: 8px;
}
</style>
```


### 사용자 데이터 가져오기

``` html
<template>
    ...
</template>

<script>
...
import apiUser from "@/api/user";

export default {
    mounted() {
        ...
        apiUser
            .list()
            .then((response) => {
                this.provider1.fillJsonData(response.data.rows, { fillMode: "set" });
            })
            .catch((e) => {
                console.log(e);
            });
        };
    },
};
</script>

<style scoped>
...
</style>
```


### 게시물 가져오기

``` html
<template>
    ...
</template>

<script>
...
import apiArticle from "@/api/article";

export default {
    mounted() {
        ...
        this.gridView1.onCurrentRowChanged = (grid, oldRow, newRow) => {
            const userId = this.provider1.getValue(newRow, "id");
            apiArticle
                .findByUserId(userId)
                .then((response) => {
                    this.provider2.fillJsonData(response.data.rows, { fillMode: "set" });
                })
                .catch((e) => {
                    console.log(e);
                });
        };
    },
};
</script>

<style scoped>
...
</style>
```


## 콤포넌트로 모듈화 하기

### /src/components/UserList.vue 추가

``` html
<template>
    <div id="realgrid1" style="width: 100%; height: 90vh"></div>
</template>

<script>
/* eslint-disable */

import apiUser from "@/api/user";

export default {
    mounted() {
        this.provider1 = new RealGrid.LocalDataProvider();
        this.gridView1 = new RealGrid.GridView("realgrid1");
        this.gridView1.setDataSource(this.provider1);

        this.provider1.setFields([
            { fieldName: "id" },
            { fieldName: "name" },
            { fieldName: "gender" },
            { fieldName: "age" },
            { fieldName: "createdAt",
                dataType: "datetime",
                datetimeFormat: "yyyy-MM-dd"
            },
        ]);

        this.gridView1.setColumns([
            { name: "id", fieldName: "id", width: 60 },
            { name: "name", fieldName: "name", width: 60 },
            { name: "gender", fieldName: "gender", width: 50 },
            { name: "age", fieldName: "age", width: 50 },
            { name: "createdAt", fieldName: "createdAt", width: 80},
        ]);

        this.gridView1.onCurrentRowChanged = (grid, oldRow, newRow) => {
            const userId = this.provider1.getValue(newRow, "id");
            this.$emit("selected", userId);
        };

        apiUser
            .list()
            .then((response) => {
                this.provider1.fillJsonData(response.data.rows, { fillMode: "set" });
            })
            .catch((e) => {
                console.log(e);
            });
    },
};
</script>
```

### /src/components/ArticleList.vue 추가

``` html
<template>
    <div id="realgrid2" style="width: 100%; height: 90vh"></div>
</template>

<script>
/* eslint-disable */

import apiArticle from "@/api/article";

export default {
    mounted() {
        this.provider2 = new RealGrid.LocalDataProvider();
        this.gridView2 = new RealGrid.GridView("realgrid2");
        this.gridView2.setDataSource(this.provider2);

        this.provider2.setFields([
            { fieldName: "id" },
            { fieldName: "userId" },
            { fieldName: "name" },
            { fieldName: "createdAt" },
            { fieldName: "title" },
            { fieldName: "content" },
        ]);

        this.gridView2.setColumns([
            { name: "id", fieldName: "id", width: 60 },
            { name: "createdAt", fieldName: "createdAt", width: 80},
            { name: "title", fieldName: "title", width: 100},
            { name: "content", fieldName: "content", width: 80},
        ]);
    },

    methods: {
        load(userId) {
            apiArticle
                .findByUserId(userId)
                .then((response) => {
                    this.provider2.fillJsonData(response.data.rows, { fillMode: "set" });
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    },
};
</script>
```


### /src/views/article/ListByUser.vue 수정

``` html
<template>
    <div class="main-body">
        <el-row>
            <el-col class="grid" :span=12>
                <UserList @selected="onUserIdSelected" style="width: 100%; height: 90vh" />
            </el-col>
            <el-col class="grid" :span=12>
                <ArticleList ref="articleList" style="width: 100%; height: 90vh" />
            </el-col>
        </el-row>
    </div>
</template>

<script>
import UserList from "@/components/UserList";
import ArticleList from "@/components/ArticleList";

export default {
    components: {
        UserList,
        ArticleList,
    },

    data() {
        return {
            users: [],
        }
    },

    mounted() {
    },

    methods: {
        onUserIdSelected(userId) {
            this.$refs.articleList.load(userId);
        }
    },
};
</script>

<style scoped>
.main-body {
    padding: 8px;
}
.grid {
    padding: 8px;
}
</style>
```
