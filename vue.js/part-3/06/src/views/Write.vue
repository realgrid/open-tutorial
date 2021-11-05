<template>
    <el-row>
        <el-col :span="2"></el-col>
        <el-col :span="20">
            <el-card>
                <div>
                    <router-link :to="{ path: '/' }">
                        <el-button type="text" class="left-button">Back</el-button>
                    </router-link>

                    <span>{{getTitle}}</span>

                    <el-button @click="writeArticle" type="text" class="right-button">저장</el-button>
                </div>
                <br /><br />

                <div>
                    <el-form
                        :label-position="top"
                        label-width="100px"
                        :model="formLabelAlign"
                    >
                        <el-form-item label="제목">
                            <el-input
                                type="text"
                                v-model="article.title"
                                placeholder="제목을 입력하세요"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="본문">
                            <el-input
                                type="textarea"
                                v-model="article.body"
                                placeholder="본문을 입력하세요"
                                rows="10"
                            ></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
        </el-col>
        <el-col :span="2"></el-col>
    </el-row>
</template>

<script>
import apiBoard from "@/api/board";

export default {
    data() {
        return {
            article: "",
        };
    },

    computed: {
        getTitle() {
            if (this.$route.params.id) return "게시물 수정하기";
            return "게시물 작성하기";
        }
    },

    mounted() {
        if (this.$route.params.id) {
            apiBoard
                .getArticle(this.$route.params.id)
                .then((response) => {
                    console.log("getArticle", response);
                    this.article = response.data;
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    },

    methods: {
        writeArticle() {
            if ((!this.article.title) || (!this.article.body)) {
                this.$message.error("제목과 본문을 작성해주세요.");
                return;
            }

            if (this.$route.params.id) {
                apiBoard
                    .patchArticle(this.$route.params.id, this.article.title, this.article.body)
                    .then((response) => {
                        console.log(response);
                        this.$router.push({path: `/board/detail/${this.$route.params.id}`});
                    })
                    .catch((e) => {
                        console.log(e);
                        this.$message.error("게시물 수정 중 에러가 발생하였습니다.");
                    });
            } else {
                apiBoard
                    .postArticle(0, this.article.title, this.article.body)
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
    },
};
</script>

<style scoped>
.left-button {
    float: left;
    padding: 3px 0;
}
.right-button {
    float: right;
    padding: 3px 0;
}
</style>