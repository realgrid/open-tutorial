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

import apiUser from "@/api/user";
import apiArticle from "@/api/article";

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

        apiUser
            .list()
            .then((response) => {
                this.provider1.fillJsonData(response.data.rows, { fillMode: "set" });
            })
            .catch((e) => {
                console.log(e);
            });

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
.main-body {
    padding: 8px;
}
.grid {
    padding: 8px;
}
</style>