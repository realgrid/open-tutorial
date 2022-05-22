<template>
    <div class="main-body">
        <div id="realgrid" style="width: 100%; height: 90vh"></div>
    </div>
</template>

<script>
/* eslint-disable */

import apiStatisYear from "@/api/statisYear";

export default {
    mounted() {
        this.provider = new RealGrid.LocalDataProvider();
        this.gridView = new RealGrid.GridView("realgrid");
        this.gridView.setDataSource(this.provider);

        this.provider.setFields([
            { fieldName: "year" },
            { fieldName: "gender" },
            { fieldName: "level" },
            { fieldName: "count" },
        ]);

        this.gridView.setColumns([
            {
                name: "year", fieldName: "year",
                mergeRule: { criteria: "value" }
            },

            {
                name: "gender", fieldName: "gender",
                mergeRule: { criteria: "value" }
            },

            { name: "level", fieldName: "level" },
            { name: "count", fieldName: "count" },
        ]);

        apiStatisYear
            .list()
            .then((response) => {
                this.provider.fillJsonData(response.data.rows, {
                    fillMode: "set",
                });
            })
            .catch((e) => {
                console.log(e);
            });
    },
};
</script>

