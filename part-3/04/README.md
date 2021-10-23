# 게시물 상세 보기


## 라우터 수정

src/router/index.js

``` js
...
import Detail from '../views/Detail.vue'

const routes = [
    ...
    {
        path: '/board/detail/:id',
        name: 'Detail',
        component: Detail
    },
]
...
```

## 상세보기 테스트

src/views/Detail.vue

``` html
<template>
    <div>
        {{ article }}
    </div>
</template>

<script>
export default {
    data() {
        return {
            article: "",
        }
    },
    mounted() {
        this.article = this.$route.params.id;
    },
}
</script>
```


## 게시판 목록 클릭 이벤트 추가

src/views/Home.vue

``` html
<template>
    ...
    <el-table @row-click="rowClicked" :data="articles" style="width: 100%">
        ...
    </el-table>
    ...
</template>

<script>
  ...
  methods: {
      rowClicked(row) {
        this.$router.push({
            path: `/board/detail/${row.id}`,
        });
      },
  },
}
</script>
```

## 게시물 상세 정보 가져오기

src/views/Detail.vue

``` html
<template>
    <div>
        <p>{{ article.id }}</p>
        <p>{{ article.userId }}</p>
        <p>{{ article.title }}</p>
        <p>{{ article.body }}</p>
    </div>
</template>

<script>
import apiBoard from '@/api/board'

export default {
    data() {
        return {
            article: "",
        }
    },
    mounted() {
        apiBoard.getArticle(this.$route.params.id)
        .then((response) => {
            console.log("getArticle", response);
            this.article = response.data;
        })
        .catch((e) => {
            console.log(e);
        });
    },
}
</script>
```

## 상세보기에서 뒤로 가기 버튼 추가

``` html
<template>
    <div>
        ...
        <br>
        <el-button type="success" @click="goBack">Back</el-button>
    </div>
</template>

<script>
import apiBoard from "@/api/board";

export default {
    ...
    methods: {
        goBack() {
            this.$router.go(-1);
        }
    },
};
</script>
```