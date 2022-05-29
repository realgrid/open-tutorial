# 내보내기 & 인쇄

## 실습 준비

### 코드 복사

아래 링크를 클릭하고 기본 코드를 다운받습니다.

[기본코드 다운받기](https://github.com/realgrid/open-tutorial/raw/main/realreport.zip)

### 기본 코드 준비

``` html
<!DOCTYPE html>
<html lang="">
    <head>
        ...
        <script src="./reportForm.js"></script>
        <script src="./reportData.js"></script>

        <script src="./fonts/malgun.js"></script>
        <script src="./fonts/malgun-bold.js"></script>
        ...
    </head>
    <body>
        <div style="height: 32px; position: fixed">
            ...
        </div>

        <div style="height: 32px"></div>

        <div id="realreport" class="scroller"></div>

        <iframe id="printPreview" src="./print.html" style="display: none;"></iframe>
    </body>
</html>

<script>
    const viewer = new RealReport.ReportViewer("realreport", reportForm);
    viewer.dataSet = reportData;
    viewer.preview();
</script>

<style>
    .scroller {
        flex: 1;
        direction: ltr;
        height: 90vh;
        width: 100%;
        overflow: auto;
        position: relative;
    }
</style>
```

## 실습

### pdf 내보내기

``` html
<!DOCTYPE html>
<html lang="">
    ...
    <body>
        <div style="height: 32px; position: fixed">
            <button onclick="exportPdf()">pdf</button>
        </div>
        ...
    </body>
</html>

<script>
    ...
    function exportPdf() {
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
        viewer.exportPdf(pdfFonts);
    }
</script>
...
```

### 파일이름 지정하기

``` html
<!DOCTYPE html>
<html lang="">
    ...
    <body>
        <div style="height: 32px; position: fixed">
            <button onclick="exportPdf()">pdf</button>
        </div>
        ...
    </body>
</html>

<script>
    reportForm.report.name = "급여명세서";
    const viewer = new RealReport.ReportViewer("realreport", reportForm);
    viewer.dataSet = reportData;
    viewer.preview();
    ...
</script>
...
```

### 이미지 내보내기

``` html
<!DOCTYPE html>
<html lang="">
    ...
    <body>
        <div style="height: 32px; position: fixed">
            ...
            &nbsp;&nbsp;

            <button onclick="exportImage('png')">png</button>
            <button onclick="exportImage('jpeg')">jpeg</button>
            <button onclick="exportImage('gif')">gif</button>
            <button onclick="exportImage('tif')">tif</button>
            <button onclick="exportImage('tiff')">tiff</button>
        </div>
        ...
    </body>
</html>

<script>
    ...
    function exportImage(imageType) {
        viewer.exportImage({type: imageType});
    }
</script>
...
```

### 문서 내보내기

``` html
<!DOCTYPE html>
<html lang="">
    ...
    <body>
        <div style="height: 32px; position: fixed">
            ...
            &nbsp;&nbsp;

            <button onclick="exportDocument('hwp')">hwp</button>
            <button onclick="exportDocument('docx')">docx</button>
        </div>
        ...
    </body>
</html>

<script>
    ...
    function exportDocument(docType) {
        viewer.exportDocument({type: docType});
    }
</script>
...
```

### 인쇄하기

``` html
<!DOCTYPE html>
<html lang="">
    ...
    <body>
        <div style="height: 32px; position: fixed">
            ...
            &nbsp;&nbsp;

            <button onclick="print()">print</button>
        </div>
        ...
    </body>
</html>

<script>
    ...
    function print() {
        const container = printPreview.contentWindow.document.getElementById('realreport');
        container.innerHTML = viewer.getHtml();
        printPreview.contentWindow.print();
    }
</script>
...
```