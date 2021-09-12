# 기본 편집기


## 기본 코드

예제들의 기본이 되는 코드부터 살펴보겠습니다.
서버로부터 예제 데이터를 가져와서 표시해주기까지만 적용된 상태입니다.

기본 코드의 실행결과는 아래 링크에서 확인할 수 있습니다.

* [기본 코드의 실행 결과](http://10bun.tv/samples/realgrid2/part-2/10/step-00.html)

``` html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <link href="/lib/realgrid-style.css" rel="stylesheet" />
    <script type="text/javascript" src="/lib/realgrid-lic.js"></script>
    <script type="text/javascript" src="/lib/realgrid.2.3.3.min.js"></script>
    <script type="text/javascript" src="/js/jquery-3.4.0.min.js"></script>
    <script type="text/javascript" src="/js/jszip.min.js"></script>
</head>
<body>
    <div id="realgrid" style="width: 100%; height: 440px;"></div>
</body>
</html>
<script>
    const provider = new RealGrid.LocalDataProvider();
    const gridView = new RealGrid.GridView("realgrid");
    gridView.setDataSource(provider);

    provider.setFields([
        { fieldName: "CompanyName" },
        { fieldName: "Country" },
        { fieldName: "EmployeeID" },
        { fieldName: "OrderDate" },
        { fieldName: "OrderID" },
        { fieldName: "UnitPrice" },
    ]);

    gridView.setColumns([
        { fieldName: "CompanyName", name: "CompanyName" },
        { fieldName: "Country",     name: "Country" },
        { fieldName: "EmployeeID",  name: "EmployeeID" },
        { fieldName: "OrderDate",   name: "OrderDate" },
        { fieldName: "OrderID",     name: "OrderID" },
        { fieldName: "UnitPrice",   name: "UnitPrice" },
    ]);

    var data_url =
        "https://raw.githubusercontent.com/realgrid/" +
        "open-tutorial/main/datas/data-005.json";
    $.getJSON(data_url, function (data) {
        console.log(data);
        provider.fillJsonData(data, { fillMode: "set" });
    });
</script>
```


## 대소문자 입력 모드

예제 코드의 실행결과는 아래 링크에서 확인할 수 있습니다.
* [대소문자 입력 모드 예제 실행결과](http://10bun.tv/samples/realgrid2/part-2/10/step-01.html)

``` html
<!DOCTYPE html>
<html>
    ...
<body>
    <div>
        <input type="radio" onclick="changeCaseMode('normal')" name="caseMode" value="normal" checked="checked"> Normal
        <input type="radio" onclick="changeCaseMode('upper')" name="caseMode" value="upper"> 대문자로 입력
        <input type="radio" onclick="changeCaseMode('lower')" name="caseMode" value="lower"> 소문자로 입력
    </div>
    <br>
    <div id="realgrid" style="width: 100%; height: 440px;"></div>
</body>
</html>
<script>
    ...
    function changeCaseMode(textCase) {
        gridView.setColumnProperty("CompanyName", "editor", { textCase: textCase });
    }
</script>
```


## 숫자 포멧 변경경

예제 코드의 실행결과는 아래 링크에서 확인할 수 있습니다.
* [숫자 포멧 변경경 예제 실행결과](http://10bun.tv/samples/realgrid2/part-2/10/step-02.html)

``` html
<!DOCTYPE html>
<html>
    ...
<body>
    <div>
        <button onclick="changeNumberFormat('#,##0.##;,;.')">,과 . 바꾸기</button>
        <button onclick="changeNumberFormat('#,##0.000')">소수점 3자리 고정</button>
    </div>
    <br>
    <div id="realgrid" style="width: 100%; height: 440px;"></div>
</body>
</html>
<script>
    ...
    function changeNumberFormat(format) {
        gridView.setColumnProperty("UnitPrice", "numberFormat", format);
    }
</script>
```


## 검색 편집기

예제 코드의 실행결과는 아래 링크에서 확인할 수 있습니다.
* [검색 편집기 예제 실행결과](http://10bun.tv/samples/realgrid2/part-2/10/step-03.html)

``` html
<!DOCTYPE html>
<html>
    ...
</html>
<script>
    ...
    provider.setFields([
        ...
        { fieldName: "UnitPrice", dataType: "number" },
    ]);

    gridView.setColumns([
        ...
        { 
            fieldName: "Country",     name: "Country",
            editor: {
                type: "search",
                searchLength: 1,   // 검색하기 위한 최소 글잡 입력 수
                searchDelay: 500,  // 검색이 시작되기 전까지의 시간 (ms)
            },
        },
        ...
    ]);
    ...
    var Countries = ["Germany", "Brazil", "France", "Belgium", "Switzerland"];
    gridView.onEditSearch = function (grid, index, text) {
      var items = Countries.filter(function (str) {
          return str.indexOf(text) == 0;
      });
      grid.fillEditSearchItems(index.column, text, items);
  };
</script>
```


## 줄바꿈 허용

예제 코드의 실행결과는 아래 링크에서 확인할 수 있습니다.
* [줄바꿈 허용 예제 실행결과](http://10bun.tv/samples/realgrid2/part-2/10/step-04.html)

``` html
<!DOCTYPE html>
<html>
<head>
    ...
    <style>
        .multiline-editor {
            white-space: pre;
        }
    </style>
</head>
<body>
    <div>
        <button onclick="allowMultiLine()">줄바꿈 허용</button>
    </div>
    <br>
    <div id="realgrid" style="width: 100%; height: 440px;"></div>
</body>
</html>
<script>
    ...
    gridView.setColumns([
        { 
            fieldName: "CompanyName", name: "CompanyName",
            width: 200,
            editor: {
                type: "multiline",
            },
            styleName: "multiline-editor",
        },
        ...
    ]);
    ...
    gridView.displayOptions.rowHeight = 36;
    function allowMultiLine() {
        gridView.setColumnProperty("CompanyName", "editor", {
            type: "multiline",
            altEnterNewLine: true
        });
    }
</script>
```
