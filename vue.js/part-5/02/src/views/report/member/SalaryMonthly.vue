<template>
    <el-row>
        <div id="realreport"></div>
    </el-row>
</template>

<script>
/* eslint-disable */

const reportForm = {
    page: {
        pageHeader: {
            items: [
                {
                    type: "text",
                    text: "리포트 제목",
                    height: "100px",
                    width: "100%",
                    styles: {
                        fontSize: "25px",
                        fontWeight: "bold",
                        backgroundColor: "#ccc",
                    },
                },
            ],
        },
        body: {
            items: [
                {
                    type: "text",
                    text: "RealReport는 Javascript를 이용해 간단하게 리포트를 출력 할 수 있습니다.",
                    height: "100px",
                    styles: {
                        fontSize: "13px",
                    },
                },
                {
                    type: "text",
                    data: "myData",
                    value: "company",
                    styles: {
                        color: "blue",
                    },
                },
                {
                    type: "text",
                    data: "myData",
                    value: "age",
                    styles: {
                        fontWeight: "bold",
                    },
                },
            ],
        },
    },
};

const reportData = {
    myData: {
        values: {
            company: "우리테크",
            age: 10,
        },
    },
};

export default {
    mounted() {
        this.viewer = new RealReport.ReportViewer("realreport", reportForm);
        this.viewer.dataSet = reportData;
        this.viewer.preview();
    },
};
</script>
