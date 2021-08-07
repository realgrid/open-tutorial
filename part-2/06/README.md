# 버튼


## 기본 코드

예제들의 기본이 되는 코드부터 살펴보겠습니다.
서버로부터 예제 데이터를 가져와서 표시해주기까지만 적용된 상태입니다.

기본 코드의 실행결과는 아래 링크에서 확인할 수 있습니다.

* [기본 코드의 실행 결과](http://10bun.tv/samples/realgrid2/part-2/06/step-00.html)

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

## 셀 버튼

예제 코드의 실행결과는 아래 링크에서 확인할 수 있습니다.
* [셀 버튼 예제 실행결과](http://10bun.tv/samples/realgrid2/part-2/06/step-01.html)

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
        { 
            fieldName: "KorName", name: "KorName",
            button: "action"
        },

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

    gridView.onCellButtonClicked = function(grid, index, column) {
        alert(`itemIndex: ${index.itemIndex}, fieldName: ${column.fieldName}`);
    };
</script>
```


## 셀 버튼의 Visibility 설정

예제 코드의 실행결과는 아래 링크에서 확인할 수 있습니다.
* [셀 버튼의 Visibility 설정 예제 실행결과](http://10bun.tv/samples/realgrid2/part-2/06/step-02.html)

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
    <div>
        <button onclick="setButtonVisibility('always')">항상 표시</button>
        <button onclick="setButtonVisibility('default')">hovering, 포커스</button>
        <button onclick="setButtonVisibility('visible')">포커스</button>
        <button onclick="setButtonVisibility('hidden')">표시 안함</button>
    </div>
    <br>
    
    <div id="realgrid" style="width: 100%; height: 440px;"></div>
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
        { 
            fieldName: "KorName", name: "KorName",
            button: "action"
        },

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

    gridView.onCellButtonClicked = function(grid, index, column) {
        alert(`itemIndex: ${index.itemIndex}, fieldName: ${column.fieldName}`);
    };

    function setButtonVisibility(visibility) {
        gridView.columnByName("KorName").buttonVisibility = visibility;
    }
</script>
```

* always: 항상 표시
* default: hovering, focused상태에서 표시
* visible: focused상태만 표시
* hidden: 표시하지 않음


## 팝업 메뉴 버튼

예제 코드의 실행결과는 아래 링크에서 확인할 수 있습니다.
* [팝업 메뉴 버튼 예제 실행결과](http://10bun.tv/samples/realgrid2/part-2/06/step-03.html)

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
        { 
            fieldName: "KorName", name: "KorName",
            button: "popup",
            popupMenu: "menuKorName",
        },

        { fieldName: "Gender",       name: "Gender"},
        { fieldName: "Age",          name: "Age"},
        { fieldName: "Phone",        name: "Phone"},
        { fieldName: "ProductId",    name: "ProductId"},
        { fieldName: "KorCountry",   name: "KorCountry"},
        { fieldName: "OrderDate",    name: "OrderDate"},
        { fieldName: "CardNumber",   name: "CardNumber"},
    ]);

    var menuKorName = [
        {
            label: "menu1 입니다.",
            enabled: true,
            children: [
                {
                    label: "submenu1 입니다."
                },
                {
                    label: "submenu2 입니다."
                }
            ]
        },
        {
            label: "menu2 입니다",
            enabled: false
        },
        {
            label: "-"
        },
        {
            label: "menu3 입니다",
            type: "check",
            checked: true,
            tag: "check_menu"
        },
        {
            label: "group menu",
            children: [
                {
                    label: "group1 - 첫번째",
                    type: "radio",
                    group: "group1",
                    checked: true
                },
                {
                    label: "group1 - 두번째",
                    type: "radio",
                    group: "group1"
                },
                {
                    label: "group1 - 세번째",
                    type: "radio",
                    group: "group1"
                }
            ]
        }
    ];

    gridView.addPopupMenu("menuKorName", menuKorName);
    gridView.onMenuItemClicked = function(grid, item, clickData) {
        console.log(item, clickData);
    };

    var data_url = 
        "https://raw.githubusercontent.com/realgrid/" +
        "open-tutorial/main/datas/data-001.json";
    $.getJSON(data_url, function (data) {
        console.log(data);
        provider.fillJsonData(data, { fillMode: "set" });
    });
</script>
```


## 헤더에 팝업 메뉴 추가하기

예제 코드의 실행결과는 아래 링크에서 확인할 수 있습니다.
* [헤더에 팝업 메뉴 추가하기 예제 실행결과](http://10bun.tv/samples/realgrid2/part-2/06/step-04.html)

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

    var menu = [
        {
            label: "menu1 입니다.",
            enabled: true,
            children: [
                {
                    label: "submenu1 입니다.",
                    // callback을 이용해서 개별적인 이벤트 처리를 할 수 있습니다.
                    // callback: function (grid, item) {
                    //     console.log(item) 
                    // }
                },
                {
                    label: "submenu2 입니다."
                }
            ]
        },
        {
            label: "menu2 입니다",
            enabled: false
        }
    ];

    gridView.addPopupMenu("menuKorNameHeader", menu);
    gridView.setColumnProperty("KorName", "header", { popupMenu: "menuKorNameHeader" });
    gridView.onMenuItemClicked = function(grid, item, clickData) {
        console.log(item, clickData);
    };

    var data_url = 
        "https://raw.githubusercontent.com/realgrid/" +
        "open-tutorial/main/datas/data-001.json";
    $.getJSON(data_url, function (data) {
        console.log(data);
        provider.fillJsonData(data, { fillMode: "set" });
    });
</script>
```


## 숫자 편집 버튼

예제 코드의 실행결과는 아래 링크에서 확인할 수 있습니다.
* [숫자 편집 버튼 예제 실행결과](http://10bun.tv/samples/realgrid2/part-2/06/step-05.html)

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

        { 
            fieldName: "Age", name: "Age",
            editor: {
                type: "number",
                showStepButton: true,
                // direction: "horizontal",
                direction: "vertical",
                step: 1,
                min: 20,
                max: 999,
                delay: 100
            },
        },

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