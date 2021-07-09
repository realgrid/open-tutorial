# 헤더와 푸터


## 기본 코드

예제들의 기본이 되는 코드부터 살펴보겠습니다.
서버로부터 예제 데이터를 가져와서 표시해주기까지만 적용된 상태입니다.

기본 코드의 실행결과는 아래 링크에서 확인할 수 있습니다.
* [기본 코드의 실행 결과](http://10bun.tv/samples/realgrid2/part-2/02/step-00.html)

``` html
<!DOCTYPE html>
<html>
	<head>
        ...
	</head>
	<body>
		<div id="realgrid" style="width: 100%; height: 440px;">
		</div>
	</body>
</html>
<script>
    const provider = new RealGrid.LocalDataProvider();
    const gridView = new RealGrid.GridView("realgrid");
    gridView.setDataSource(provider);
    provider.setFields([ 필드 설정 ]);
    gridView.setColumns([ 컬럼 설정 ]);
	
    var data_url = 
		"https://raw.githubusercontent.com/realgrid/" +
    	"open-tutorial/main/datas/data-001.json";
    $.getJSON(data_url, function (data) {
        console.log(data);
        provider.fillJsonData(data, { fillMode: "set" });
    });
</script>
```


## 헤더와 푸터의 높이 조절

예제 코드의 실행결과는 아래 링크에서 확인할 수 있습니다.
* [헤더와 푸터의 높이 조절 예제 실행결과](http://10bun.tv/samples/realgrid2/part-2/02/step-01.html)

``` html
<!DOCTYPE html>
<html>
    ...
	<body>
        <div>
            <button onclick="setHeight(60)">헤더/푸터 높이 변경</button>
        </div>
        <br>
        ...
	</body>
</html>
<script>
    ...
    function setHeight(value) {
        gridView.header.height = value;
        gridView.footer.height = value;
    }
</script>
```


## 그룹컬럼 헤더 높이 변경

예제 코드의 실행결과는 아래 링크에서 확인할 수 있습니다.
* [그룹컬럼 헤더 높이 변경 예제 실행결과](http://10bun.tv/samples/realgrid2/part-2/02/step-02.html)

``` html
<!DOCTYPE html>
<html>
    ...
	<body>
        <div>
            <button onclick="setHeaderHeight(30, 60)">헤더 높이 변경</button>
        </div>
        <br>
        ...
	</body>
</html>
<script>
    ...
    gridView.setColumnLayout([
        {
            name: "userInfoGroup",
            direction: "horizontal",
            items: [
                "KorName",
                "Gender",
                "Age",
                "Phone"
            ],
            header: {
                text: "User Info",
            }
        },
        ...
    ]);
    ...
    function setHeaderHeight(value1, value2) {
        gridView.header.heights = [value1, value2];
    }
</script>
```

## 헤더 체크박스

예제 코드의 실행결과는 아래 링크에서 확인할 수 있습니다.
* [헤더 체크박스 예제 실행결과](http://10bun.tv/samples/realgrid2/part-2/02/step-03.html)

``` html
<!DOCTYPE html>
<html>
	<head>
        ...
        <style>
            .multi-line-css {
                white-space: pre;
            }
        </style>
	</head>
	<body>
        <div>
            <button onclick="showCheckBoxState()">헤더 체크박스 확인</button>
        </div>
        <br>
        ...
	</body>
</html>
<script>
    ...
    gridView.setColumns([
        {
            name: "KorName",    fieldName: "KorName",    width:  "80",
            header: {
                "styleName": "multi-line-css",
                checkLocation: "left"
            },
            checked: true
        },
        ...
    ]);
    ...
    function showCheckBoxState() {
        var checkColumn = gridView.columnByName("KorName");
        alert(checkColumn.checked);
    }
</script>
```


## 여러 줄로 표시하기

예제 코드의 실행결과는 아래 링크에서 확인할 수 있습니다.
* [여러 줄로 표시하기 예제 실행결과](http://10bun.tv/samples/realgrid2/part-2/02/step-04.html)

``` html
<!DOCTYPE html>
<html>
	<head>
        ...
        <style>
            .multi-line-css {
                white-space: pre;
            }
        </style>
	</head>
    ...
</html>
<script>
    ...
    gridView.header.height = 60;
    gridView.footer.height = 60;
    ...
    gridView.setColumns([
        {
            name: "KorName",    fieldName: "KorName",    width:  "80",
            header: {
                text: "한글이름\nKorName",
                "styleName": "multi-line-css",
            },
            footer: {
                text: "한글이름\nKorName",
                "styleName": "multi-line-css",
            },
        },
        ...
    ]);
    ...
</script>
```


## 컬럼 푸터

예제 코드의 실행결과는 아래 링크에서 확인할 수 있습니다.
* [컬럼 푸터 예제 실행결과](http://10bun.tv/samples/realgrid2/part-2/02/step-05.html)

``` html
...
<script>
    ...
    gridView.setColumns([
        ...
        {
            name: "OrderDate",  fieldName: "OrderDate",  width:  "80",
            footer: { text: "sum" },
        },
        {
            name: "SaveCost",   fieldName: "SaveCost",   width:  "80",
            footer: { 
                numberFormat: "#,##0",
                expression: "sum"
            },
        },
    ]);
    ...
</script>
```


## 컬럼 푸터 동적 계산

예제 코드의 실행결과는 아래 링크에서 확인할 수 있습니다.
* [컬럼 푸터 동적 계산 예제 실행결과](http://10bun.tv/samples/realgrid2/part-2/02/step-06.html)

``` html
...
<script>
    ...
    gridView.setColumns([
        ...
        {
            name: "OrderDate",  fieldName: "OrderDate",  width:  "80",
            footer: { text: "Count" },
        },
        {
            name: "SaveCost",   fieldName: "SaveCost",   width:  "80",
            footer: {
                numberFormat: "#,##0",
                valueCallback: function (grid, column, footerIndex, columnFooter, value) {
                    return grid.getSummary("SaveCost", "count");
                }
            },
        },
    ]);
    ...
</script>
```


## 상단 요약 표시

예제 코드의 실행결과는 아래 링크에서 확인할 수 있습니다.
* [상단 요약 표시 예제 실행결과](http://10bun.tv/samples/realgrid2/part-2/02/step-07.html)

``` html
...
<script>
    ...
    gridView.headerSummaries.visible = true;
    gridView.setColumns([
        ...
        {
            name: "SaveCost",   fieldName: "SaveCost",   width:  "80",
            headerSummary: {
                numberFormat: "#,##0",
                expression: "sum"
            },
        },
    ]);
    ...
</script>
```


## 상단 요약 동적 표시

예제 코드의 실행결과는 아래 링크에서 확인할 수 있습니다.
* [상단 요약 동적 표시 예제 실행결과](http://10bun.tv/samples/realgrid2/part-2/02/step-08.html)

``` html
...
<script>
    ...
    gridView.headerSummaries.visible = true;
    gridView.setColumns([
        ...
        {
            name: "SaveCost",   fieldName: "SaveCost",   width:  "80",
            headerSummary: {
                numberFormat: "#,##0",
                valueCallback: function (grid, column, footerIndex, columnFooter, value) {
                    return grid.getSummary("SaveCost", "count");
                }
            },
        },
    ]);
    ...
</script>
```


## 컬럼 푸터 병합

예제 코드의 실행결과는 아래 링크에서 확인할 수 있습니다.
* [컬럼 푸터 병합 예제 실행결과](http://10bun.tv/samples/realgrid2/part-2/02/step-08.html)

``` html
...
<script>
    ...
    gridView.setFooters([{ height: 40 }, { height: 40 }]);
    gridView.setColumnLayout([
        {
            name: "userInfoGroup",
            header: { visible: false },
            direction: "horizontal",
            items: [
                // { column: "KorName", footerUserSpans: [{}, { colspan: 2 }] },
                { column: "KorName", footerUserSpans: [{ rowspan: 2, colspan: 2 }] },
                "Gender",
                "Age",
            ],
        },
        ...
    ]);
    ...
</script>
```