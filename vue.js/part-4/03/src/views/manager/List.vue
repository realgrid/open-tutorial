<template>
    <div id="realgrid" style="width: 100%; height: 440px"></div>
</template>

<script>
/* eslint-disable */

import apiManagers from '@/api/manager'

export default {
    mounted() {
        this.provider = new RealGrid.LocalDataProvider();
        this.gridView = new RealGrid.GridView("realgrid");
        this.gridView.setDataSource(this.provider);

        this.provider.setFields([
            { fieldName: "email" },
            { fieldName: "pw" },
            { fieldName: "name" },
            { fieldName: "rule" },
            { fieldName: "phoneNumber" },
        ]);

        this.gridView.setColumns([
            { name: "email",       fieldName: "email",       width: 120 },
            { name: "pw",          fieldName: "pw" },
            { name: "name",        fieldName: "name"},
            { name: "rule",        fieldName: "rule"},
            { name: "phoneNumber", fieldName: "phoneNumber", width: 120 },
        ]);

        apiManagers
            .list()
            .then((response) => {
                this.provider.fillJsonData(response.data.rows, { fillMode: "set" });
            })
            .catch((e) => {
                console.log(e);
            });
    },
};
</script>
