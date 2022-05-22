# 게시물 수정하기


## 라우터 수정

src/router/index.js

``` js
...
const routes = [
    {
        path: '/board/write/:id?',
        ...
    },
]
...
```

## API 추가

``` js
...
export default {
    ...
    patchArticle: function (id, title, body) {
        return axios.patch(BASE_URL + `posts/${id}`, {
            title: title,
            body: body,
        });
    },
}
```


## 게시물 작성하기 템플릿 구성 (Write.vue)

``` html
<template>
    <el-button @click="writeArticle" type="text" class="right-button">저장</el-button>
    <br />

    <el-form>
        <el-form-item label="제목">
            <el-input type="text" v-model="title"></el-input>
        </el-form-item>
        <el-form-item label="본문">
            <el-input type="textarea" v-model="body" rows="10" ></el-input>
        </el-form-item>
    </el-form>
</template>
```
* 변화 없음


## 게시물 작성하기 스크립트 (Write.vue)

``` html
<script>
...
export default {
    ...
    mounted() {
        if (this.$route.params.id) {
            apiBoard
                .getArticle(this.$route.params.id)
                .then((response) => {
                    console.log("getArticle", response);
                    this.title = response.data.title;
                    this.body = response.data.body;
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    },

    methods: {
        writeArticle() {
            ...
            if (this.$route.params.id) {
                apiBoard
                    .patchArticle(this.$route.params.id, this.title, this.body)
                    .then((response) => {
                        console.log(response);
                        this.$router.push({path: `/board/detail/${this.$route.params.id}`});
                    })
                    .catch((e) => {
                        console.log(e);
                        this.$message.error("게시물 수정 중 에러가 발생하였습니다.");
                    });
                return;
            }
            ...
        },
    },
};
</script>
```