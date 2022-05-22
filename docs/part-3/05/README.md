# 게시물 작성하기


## 라우터 수정

``` js
...
import Write from '../views/Write.vue'

const routes = [
    {
        path: '/board/write',
        name: 'Write',
        component: Write
    },
]
...
```


## API 추가

``` js
...
export default {
    ...
    postArticle: function (userId, title, body) {
        return axios.post(BASE_URL + 'posts', {
            userId: userId,
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

## 게시물 작성하기 스크립트 (Write.vue)

``` html
<script>
import apiBoard from "@/api/board";
export default {
    data() {
        return {
            title: "",
            body: "",
        };
    },
    methods: {
        writeArticle() {
            if ((!this.title) || (!this.body)) {
                this.$message.error("제목과 본문을 작성해주세요.");
                return;
            }

            apiBoard
                .postArticle(0, this.title, this.body)
                .then((response) => {
                    console.log(response);
                    this.$router.push({path: "/"});
                })
                .catch((e) => {
                    console.log(e);
                    this.$message.error("게시물 작성 중 에러가 발생하였습니다.");
                });
        }
    },
};
</script>
```