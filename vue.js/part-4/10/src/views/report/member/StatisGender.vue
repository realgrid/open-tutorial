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
            var level = group.level == 1 ? "합계: " : "소계: ";
            var groupModel = grid.getGroupModel(group.index);
            return level + grid.getGroupSummary(groupModel, "count").sum;
        },
    },
};
</script>
