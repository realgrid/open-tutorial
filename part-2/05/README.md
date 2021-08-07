# 컨텍스트 메뉴


## 기본 코드

예제들의 기본이 되는 코드부터 살펴보겠습니다.
서버로부터 예제 데이터를 가져와서 표시해주기까지만 적용된 상태입니다.

기본 코드의 실행결과는 아래 링크에서 확인할 수 있습니다.

* [기본 코드의 실행 결과](http://10bun.tv/samples/realgrid2/part-2/05/step-00.html)

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
		<div id="realgrid" style="width: 100%; height: 440px;">
		</div>
	</body>
</html>

<script>
    const provider = new RealGrid.LocalDataProvider();
    const gridView = new RealGrid.GridView("realgrid");
    gridView.setDataSource(provider);

    provider.setFields([
        { fieldName: "KorName" },
        { fieldName: "Gender" },
        { fieldName: "Age" },
        { fieldName: "Phone" },
        { fieldName: "ProductId" },
        { fieldName: "KorCountry" },
        { fieldName: "OrderDate" },
        { fieldName: "CardNumber" },
    ]);

    gridView.setColumns([
        { fieldName: "KorName",      name: "KorName"},
        { fieldName: "Gender",       name: "Gender"},
        { fieldName: "Age",          name: "Age"},
        { fieldName: "Phone",        name: "Phone"},
        { fieldName: "ProductId",    name: "ProductId"},
        { fieldName: "KorCountry",   name: "KorCountry"},
        { fieldName: "OrderDate",    name: "OrderDate"},
        { fieldName: "CardNumber",   name: "CardNumber"},
    ]);

    var data_url = 
        "https://raw.githubusercontent.com/realgrid/" +
        "open-tutorial/main/datas/data-001.json";
    $.getJSON(data_url, function (data) {
        console.log(data);
        provider.fillJsonData(data, { fillMode: "set" });
    });
</script>
```


## 컨텍스트 메뉴 보이기

예제 코드의 실행결과는 아래 링크에서 확인할 수 있습니다.
* [컨텍스트 메뉴 보이기 예제 실행결과](http://10bun.tv/samples/realgrid2/part-2/05/step-01.html)

``` html
...
<script>
    ...
    gridView.setContextMenu([
        {
            label: "Menu1"
        },
        {
            label: "Menu2"
        },
        {
            label: "-" // menu separator를 삽입합니다.
        },
        {
            label: "ExcelExport"
        }
    ]);
    ...
</script>
```


## onContextMenuItemClicked 이벤트

예제 코드의 실행결과는 아래 링크에서 확인할 수 있습니다.
* [onContextMenuItemClicked 이벤트 예제 실행결과](http://10bun.tv/samples/realgrid2/part-2/05/step-02.html)

``` html
...
<script>
    ...
    gridView.onContextMenuItemClicked = function(grid, item, clickData) {
        console.log(item, clickData);

        if (item.label == "ExcelExport") {
            grid.exportGrid({
                type: "excel",
                target: "local"
            });
        }
    };
    ...
</script>
```


## onContextMenuPopup 이벤트

예제 코드의 실행결과는 아래 링크에서 확인할 수 있습니다.
* [onContextMenuPopup 이벤트 예제 실행결과](http://10bun.tv/samples/realgrid2/part-2/05/step-03.html)

``` html
...
<script>
    ...
    gridView.onContextMenuPopup = function (grid, x, y, clickData) {
        //헤더셀 영역에서는 컨텍스트 메뉴 실행하지 않음
        return clickData.cellType != "header";
    };
    ...
</script>
```

## 동적 컨텍스트 메뉴

예제 코드의 실행결과는 아래 링크에서 확인할 수 있습니다.
* [동적 컨텍스트 메뉴 예제 실행결과](http://10bun.tv/samples/realgrid2/part-2/05/step-04.html)

``` html
...
<script>
    var menuHeader = [
        {
            label: "엑셀 내보내기",
            tag: "excel"
        }, 
        {
            label: "필터 만들기",
            tag: "filter"
        }, 
        {
            label: "-"
        }, 
        {
            label: "컬럼 감추기",
            tag: "column",
            columnVisible: true
        }, 
    ];

    var menuData = [
        {
            label: "엑셀 내보내기",
            tag: "excel"
        }, 
        {
            label: "-"
        }, 
        {
            label: "..."
        }, 
    ];
    ...
    gridView.onContextMenuPopup = function (grid, x, y, clickData) {
        if (clickData.cellType != "header") {
            grid.setContextMenu(menuHeader);
        } else {
            grid.setContextMenu(menuData);
        }
    };

    gridView.onContextMenuItemClicked = function (grid, item, clickData) {
        if (item.tag == "column") {
            menuHeader[3].columnVisible = !menuHeader[3].columnVisible;
            if (menuHeader[3].columnVisible) {
                menuHeader[3].label = "컬럼 감추기";
            } else {
                menuHeader[3].label = "컬럼 보이기";
            }

            var columns = grid.getColumns();
            for (var i in columns) {
                grid.setColumnProperty(columns[i].name, "visible", menuHeader[3].columnVisible);
            }
        }
    };    
    ...
</script>
```