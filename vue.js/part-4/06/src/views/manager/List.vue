<template>
    <div class="main-body">
        <div class="toolbar">
            <el-button @click="showFormView" type="primary">수정</el-button>
            <el-button @click="deleteRow" type="warning">삭제</el-button>

            <el-button v-if="!filtering" @click="setFltering(true)" type="Default">필터 해제됨 </el-button>
            <el-button v-if="filtering" @click="setFltering(false)" type="danger">필터 적용중</el-button>
        </div>

        <div id="realgrid" style="width: 100%; height: 90vh"></div>
    </div>
</template>

<script>
/* eslint-disable */

import apiManagers from "@/api/manager";
import md5 from "md5";

export default {
    data() {
        return {
            filtering: false,
        };
    },
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

            {
                name: "rule",
                fieldName: "rule",
                editor: {
                    type: "dropdown",
                    domainOnly: true,
                    values: ["기본관리자", "관리자1", "관리자2", "관리자3"],
                    labels: ["기본관리자", "관리자1", "관리자2", "관리자3"],
                },
            },

            {
                name: "phoneNumber",
                fieldName: "phoneNumber",
                width: 120,
                textFormat: "([0-9]{3})([0-9]{4})([0-9]{4}); $1-$2-$3",
                editor: {
                    type:"text",
                    mask: "000-0000-0000",
                },
            },
        ]);

        this.formView = this.gridView._view.container.formView;
        this.formView.visible = false;
        this.formView.options.modal = true;
        this.formView.options.saveLabel = "저장";
        this.formView.options.cancelLabel = "취소";
        this.formView.model.header.height = 40;
        this.formView.options.autoClose = true;

        this.formView.model.load({
            items: [
                {
                    header: "email",
                    column: "email",
                },
                {
                    header: "비번",
                    column: "pw",
                },
                {
                    header: "이름",
                    column: "name",
                },
                {
                    header: "권한",
                    column: "rule",
                },
                {
                    header: "전화번호",
                    column: "phoneNumber",
                },
            ],
        });

        this.gridView.onCellEdited = function (gridView, itemIndex, row, field) {
            if (field === 1) {
                let data = gridView.getValue(itemIndex, "pw");
                gridView.setValue(itemIndex, "pw", md5(data));
            }
        };

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
        showFormView: function () {
            if (this.gridView.getCurrent().itemIndex === -1) {
                this.$message.error("편집할 데이터를 선택해주세요.");
                return;
            }
            this.formView.visible = true;
        },
        deleteRow: function () {
            let itemIndex = this.gridView.getCurrent().itemIndex;
            if (itemIndex === -1) {
                this.$message.error("삭제할 데이터를 선택해주세요.");
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
        },
        setFltering: function (value) {
            this.filtering = value;
            if (value) {
                this.gridView.setColumnProperty("rule", "autoFilter", true);
            } else {
                this.gridView.setColumnProperty("rule", "autoFilter", false);
            }
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