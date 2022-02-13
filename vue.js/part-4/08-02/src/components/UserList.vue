<template>
    <div class="main-body">
        <div id="realgrid" style="width: 100%; height: 400px"></div>
        <br />

        <el-pagination
            align="center"
            background
            layout="prev, pager, next"
            :total="rowCount"
            :page-size="pageSize"
            :page-count="pageCount"
            :current-page="currentPage"
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
        window.setBlocked = this.setBlocked;

        this.provider = new RealGrid.LocalDataProvider();
        this.gridView = new RealGrid.GridView("realgrid");
        this.gridView.setDataSource(this.provider);

        this.gridView.displayOptions.rowHeight = 36;

        this.gridView.setRowIndicator({
            visible: false
        });

        this.provider.setFields([
            { fieldName: "no" },
            { fieldName: "id" },
            { fieldName: "pw" },
            { fieldName: "name" },
            { fieldName: "gender" },
            { fieldName: "age" },
            { fieldName: "phoneNumber" },

            {
                fieldName: "createdAt",
                dataType: "datetime",
                datetimeFormat: "yyyy-MM-dd",
            },

            { fieldName: "statusCode" },
            { fieldName: "blocked", dataType: "boolean" },
        ]);

        this.gridView.setColumns([
            { name: "no", fieldName: "no", width: 60 },
            { name: "id", fieldName: "id", width: 60 },
            { name: "pw", fieldName: "pw",  },
            { name: "name", fieldName: "name", width: 60 },
            { name: "gender", fieldName: "gender", width: 50 },
            { name: "age", fieldName: "age", width: 50 },

            {
                name: "phoneNumber",
                fieldName: "phoneNumber",
                textFormat: "([0-9]{3})([0-9]{4})([0-9]{4}); $1-$2-$3"
            },

            {
                name: "createdAt",
                fieldName: "createdAt",
                width: 80,
                editor: {
                  type: "date"
                },
            },

            {
                name: "statusCode", fieldName: "statusCode", width: 80,
                lookupDisplay: true,
                values: ["0", "1", "2"],
                labels: ["정상", "휴면", "분리보관"],
            },

            {
                name: "blocked",
                fieldName: "blocked",
                editable: false,
                renderer: {
                    type: "html",
                    callback: this.getBlockedButton
                }
            },
        ]);

        this.gridView.setColumnFilters("age", [
            {
                name: "filter1",
                text: "10대 이하",
                tag: 10,
                callback: this.ageFilter,
            },
            {
                name: "filter2",
                text: "20대 이상",
                tag: 20,
                callback: this.ageFilter,
            },
        ]);

        this.gridView.onCurrentRowChanged = (grid, oldRow, newRow) => {
            const userId = this.provider.getValue(newRow, "id");
            this.$emit("selected", userId);
        };

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
        getBlockedButton: function (grid, cell, w, h) {
            const toBlock = `<button class="danger" onclick=setBlocked("true")>차단</button>`;
            const blocked = `<button class="success" onclick=setBlocked("false")>차단해제</button>`;

            if (cell.value) {
                return blocked;
            } else {
                return toBlock;
            }
        },
        setBlocked: function (value) {
            let current = this.gridView.getCurrent();
            let row = this.gridView.getValues(current.itemIndex);
            apiUser
                .block(row.id, value)
                .then(() => {
                    this.gridView.setValue(current.itemIndex, "blocked", value);
                });
        },
        ageFilter: (provider, row, level, fieldName, filter, value) => {
            if (filter.tag === 10) {
                return value < 20;
            } else {
                return value >= 20;
            }
        },
    },
};
</script>

<style>
.main-body {
    padding: 8px;
}
.toolbar {
    width: 100%;
    height: 64px;
}
.success {
    background-color: #67C23A;
    color: white;
    width: 80px;
    padding: 6px;
    border: 0px;
    border-radius: 4px;
}
.danger {
    background-color: #F56C6C;
    color: white;
    width: 80px;
    padding: 6px;
    border: 0px;
    border-radius: 4px;
}
</style>