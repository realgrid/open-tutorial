<template>
    <div>
        <el-row style="padding: 4px;">
            <el-button @click="print"><i class="fas fa-print" /></el-button>
            <el-button @click="exportPdf"><i class="fas fa-file-pdf" /></el-button>
        </el-row>
        <el-row>
            <div id="realreport"></div>
        </el-row>
        <iframe id="printPreview" src="/print.html" style="display: none"></iframe>
    </div>
</template>

<script>
/* eslint-disable */

export default {
    methods: {
        preview(form, data) {
            this.viewer = new RealReport.ReportViewer("realreport", form);
            this.viewer.dataSet = data;
            this.viewer.preview();
        },

        print() {
            const container = printPreview.contentWindow.document.getElementById("realreport");
            container.innerHTML = this.viewer.getHtml();
            printPreview.contentWindow.print();
        },

        exportPdf() {
            const pdfFonts = [
                {
                    name: "regular",
                    content: malgun,
                    style: "normal",
                    weight: "normal",
                },
                {
                    name: "bold",
                    content: malgunBold,
                    style: "normal",
                    weight: "bold",
                },
            ];
            this.viewer.exportPdf(pdfFonts);
        },
    }
};
</script>
