<template>
    <div id="realgrid1" style="width: 100%; height: 90vh"></div>
</template>

<script>
/* eslint-disable */

import apiUser from "@/api/user";

export default {
    mounted() {
        this.provider1 = new RealGrid.LocalDataProvider();
        this.gridView1 = new RealGrid.GridView("realgrid1");
        this.gridView1.setDataSource(this.provider1);

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

        this.gridView1.onCurrentRowChanged = (grid, oldRow, newRow) => {
            const userId = this.provider1.getValue(newRow, "id");
            this.$emit("selected", userId);
        };

        apiUser
            .list()
            .then((response) => {
                this.provider1.fillJsonData(response.data.rows, { fillMode: "set" });
            })
            .catch((e) => {
                console.log(e);
            });
    },
};
</script>