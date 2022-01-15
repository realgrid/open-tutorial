<template>
    <div class="main-body">
        <div id="realgrid" style="width: 100%; height: 400px"></div>
        <br />

        <el-pagination
            background
            layout="prev, pager, next"
            :total="rowCount"
            :page-size="pageSize"
            :page-count="pageCount"
            :current-page="currentPage"
            align="center"
            @current-change="changeCurrentPage" />
    </div>
</template>

<script>
/* eslint-disable */

import apiUser from "@/api/user";

export default {
    data() {
        return {
            rowCount: 0,
            pageSize: 10,
            currentPage: 1,
        }
    },
    mounted() {
        this.provider = new RealGrid.LocalDataProvider();
        this.gridView = new RealGrid.GridView("realgrid");
        this.gridView.setDataSource(this.provider);

        this.gridView.editOptions.insertable = true;
        this.gridView.editOptions.appendable = true;
        this.gridView.editOptions.deletable = false;

        this.provider.setFields([
            { fieldName: "id" },
            { fieldName: "pw" },
            { fieldName: "name" },
            { fieldName: "gender" },
            { fieldName: "phoneNumber" },
            { fieldName: "createdAt" },
            { fieldName: "statusCode" },
        ]);

        this.gridView.setColumns([
            { fieldName: "id", fieldName: "id" },
            { fieldName: "pw", fieldName: "pw", width: 120 },
            { fieldName: "name", fieldName: "name" },
            { fieldName: "gender", fieldName: "gender" },
            { fieldName: "phoneNumber", fieldName: "phoneNumber", width: 120 },
            { fieldName: "createdAt", fieldName: "createdAt", width: 180 },
            { fieldName: "statusCode", fieldName: "statusCode" },
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
    },
};
</script>

<style scoped>
.main-body {
    padding: 8px;
}
.toolbar {
    width: 100%;
    height: 64px;
}
</style>