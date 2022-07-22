<template>
    <div>
        <div style="height: 32px; position: fixed">
            <button @click="exportPdf()">pdf</button>
            &nbsp;&nbsp;

            <button @click="exportImage('png')">png</button>
            <button @click="exportImage('jpeg')">jpeg</button>
            <button @click="exportImage('gif')">gif</button>
            <button @click="exportImage('tif')">tif</button>
            <button @click="exportImage('tiff')">tiff</button>
            &nbsp;&nbsp;

            <button @click="exportDocument('hwp')">hwp</button>
            <button @click="exportDocument('docx')">docx</button>
            &nbsp;&nbsp;

            <button @click="print()">print</button>
        </div>

        <div style="height: 32px"></div>

        <div id="realreport" class="scroller"></div>

        <iframe id="printPreview" src="/print.html" style="display: none"></iframe>
    </div>
</template>

<script>
/* eslint-disable */

import axios from 'axios';

import reportForm from "./data/reportForm";
import reportData from "./data/reportData";

export default {
    mounted() {
        this.viewer = new RealReport.ReportViewer("realreport", reportForm);
        this.viewer.dataSet = reportData;
        this.viewer.preview();

        axios.get('https://dummyjson.com/carts').then(response => {
            console.log(response.data);
        });
    },

    methods: {
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

        exportImage(imageType) {
            this.viewer.exportImage({ type: imageType });
        },

        exportDocument(docType) {
            this.viewer.exportDocument({ type: docType });
        },

        print() {
            const container = printPreview.contentWindow.document.getElementById("realreport");
            container.innerHTML = this.viewer.getHtml();
            printPreview.contentWindow.print();
        },
    },
};
</script>

<style scoped>
.scroller {
    flex: 1;
    direction: ltr;
    height: 90vh;
    width: 100%;
    overflow: auto;
    position: relative;
}
</style>
