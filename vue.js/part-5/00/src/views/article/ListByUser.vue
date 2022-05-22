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