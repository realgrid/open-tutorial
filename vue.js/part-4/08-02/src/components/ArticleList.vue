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