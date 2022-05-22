# 줌 & 페이지 이동


## 실습 준비

### 코드 복사

아래 링크를 클릭하고 기본 코드를 다운받습니다.

[기본코드 다운받기](https://github.com/realgrid/open-tutorial/raw/main/realreport.zip)

### 리포트 폼 및 데이터 파일 복사

* [리포트 폼 파일 복사](https://github.com/realgrid/open-tutorial/blob/main/html/part-5/01/reportForm.js)
* [리포트 데이터 파일 복사](https://github.com/realgrid/open-tutorial/blob/main/html/part-5/01/reportData.js)


## 실습

### 리포트 및 데이터 헤더에 추가하기

``` html
<!DOCTYPE html>
<html lang="">
    <head>
        ...
        <script src="./reportForm.js"></script>
        <script src="./reportData.js"></script>
        ...
    </head>
    <body>
        ...
    </body>
</html>
```

### 줌 관련 툴바

``` html
<!DOCTYPE html>
<html lang="">
    <head>
        ...
    </head>
    <body>
        <div style="height: 32px; position: fixed;">
            <input id="zoomScale" value="100%" />
            <button onclick="zoom('zoomIn')">zoomIn</button>
            <button onclick="zoom('zoomOut')">zoomOut</button>
            <button onclick="zoom('fitToHeight')">fitToHeight</button>
            <button onclick="zoom('fitToWidth')">fitToWidth</button>
            <button onclick="zoom('fitToPage')">fitToPage</button>
        </div>

        <div style="height: 64px;"></div>
        <div id="realreport" class="scroller"></div>
    </body>
</html>

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

### 줌 관련 코드 작성

``` html
<!DOCTYPE html>
<html lang="">
    ...
</html>

<script>
    const viewer = new RealReport.ReportViewer("realreport", reportForm);
    viewer.dataSet = reportData;
    viewer.preview();

    function zoom(method) {
        viewer[method]();
        zoomScale.value = Math.trunc(viewer.zoom * 100) + "%";
    }
</script>

...
```

### 페이지 이동 관련 툴바

``` html
<!DOCTYPE html>
<html lang="">
    <head>
        ...
    </head>
    <body>
        ...
        <div style="height: 32px; position: fixed; top: 32px;">
            <input id="page" value="1" onchange="onPageChange()"/>
            <button onclick="setPage('first')"><<</button>
            <button onclick="setPage('prev')"><</button>
            <button onclick="setPage('next')">></button>
            <button onclick="setPage('last')">>></button>
        </div>
        ...
        <div style="height: 64px;"></div>
        <div id="realreport" class="scroller"></div>
    </body>
</html>
```

### 페이지 이동 관련 코드 작성

``` html
<!DOCTYPE html>
<html lang="">
    ...
</html>

<script>
    ...

    function setPage(method) {
        viewer[method]();
        page.value = viewer.page;
    }

    function onPageChange() {
        viewer.page = page.value;
    }
</script>
...
```
