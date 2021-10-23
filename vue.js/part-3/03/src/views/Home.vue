<template>
    <el-row>
        <el-col :span="2"> </el-col>
        <el-col :span="20">
            <el-table :data="articles" style="width: 100%">
                <el-table-column prop="id" label="id" width="80">
                </el-table-column>
                <el-table-column prop="userId" label="userId" width="120">
                </el-table-column>
                <el-table-column prop="title" label="title"> </el-table-column>
            </el-table>
        </el-col>
    </el-row>
</template>

<script>
import apiBoard from "@/api/board";

export default {
    data() {
        return {
            articles: null,
        };
    },

    mounted() {
        apiBoard
            .getArticles(0)
            .then((response) => {
                console.log("getArticles", response);
                this.articles = response.data;
            })
            .catch((e) => {
                console.log(e);
            });
    },
};
</script>