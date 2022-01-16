<template>
    <div class="main-body">
        <div class="toolbar">
            <el-button @click="deleteRow" type="danger" round>삭제</el-button>
        </div>

        <div id="realgrid" style="width: 100%; height: 90vh"></div>
    </div>
</template>

<script>
/* eslint-disable */

import apiManagers from "@/api/manager";
import md5 from 'md5'

export default {
    mounted() {
        this.provider = new RealGrid.LocalDataProvider();
        this.gridView = new RealGrid.GridView("realgrid");
        this.gridView.setDataSource(this.provider);

        this.gridView.editOptions.insertable = true;
        this.gridView.editOptions.appendable = true;
        this.gridView.editOptions.deletable = false;

        this.provider.setFields([
            { fieldName: "email" },
            { fieldName: "pw" },
            { fieldName: "name" },
            { fieldName: "rule" },
            { fieldName: "phoneNumber" },
        ]);

        this.gridView.setColumns([
            { name: "email", fieldName: "email", width: 120 },
            { name: "pw", fieldName: "pw" },
            { name: "name", fieldName: "name" },
            { name: "rule", fieldName: "rule" },
            { name: "phoneNumber", fieldName: "phoneNumber", width: 120 },
        ]);

        this.gridView.onCellEdited = function (gridView, itemIndex, row, field) {
            if (field === 1) {
                let data = gridView.getValue(itemIndex, 'pw');
                gridView.setValue(itemIndex, 'pw', md5(data));
            }
        }

        this.provider.onRowUpdated = function (provider, row) {
            apiManagers
                .update(provider.getJsonRow(row))
                .then((response) => {
                    console.log(response);
                })
                .catch((e) => {
                    console.log(e);
                });
        };

        this.provider.onRowInserted = function (provider, row) {
            apiManagers
                .create(provider.getJsonRow(row))
                .then((response) => {
                    console.log(response);
                })
                .catch((e) => {
                    console.log(e);
                });
        };

        apiManagers
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

    methods: {
        deleteRow: async function () {
            let itemIndex = this.gridView.getCurrent().itemIndex;
            if (itemIndex === -1) {
                this.$message.error("삭제할 데이터를 선택해주세요.");
                return;
            }

            try {
                await this.$confirm("삭제 하시겠습니까?");
            } catch (e) {
                return;
            }

            apiManagers
                .delete(this.provider.getValue(itemIndex, "email"))
                .then((response) => {
                    console.log(response);
                    this.provider.removeRow(itemIndex);
                })
                .catch((e) => {
                    console.log(e);
                });
        }
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