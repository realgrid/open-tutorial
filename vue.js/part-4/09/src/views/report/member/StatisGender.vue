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

        this.gridView.editOptions.insertable = true;
        this.gridView.editOptions.appendable = true;
        this.gridView.editOptions.deletable = false;

        this.provider.setFields([
            { fieldName: "year" },
            { fieldName: "gender" },
            { fieldName: "level" },
            { fieldName: "count", dataType: "number" },
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

            {
                name: "level", fieldName: "level",
            },

            {
                name: "count", fieldName: "count",
                groupFooter: {
                    valueCallback: this.callbackGroupCount,
                },
            },
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

        this.gridView.groupPanel.visible = true;
        this.gridView.groupBy(["year", "gender"]);
    },

    methods: {
        callbackGroupCount(grid, column, groupFooterIndex, group, value) {
            var groupModel = grid.getGroupModel(group.index);
            return grid.getGroupSummary(groupModel, "count").sum;
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