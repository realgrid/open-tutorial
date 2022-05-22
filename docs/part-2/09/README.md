# 모바일 폼뷰

[![](youtube-01.png)](https://youtu.be/IX9aU7zKkM8)


## 기본 코드

예제들의 기본이 되는 코드부터 살펴보겠습니다.
서버로부터 예제 데이터를 가져와서 표시해주기까지만 적용된 상태입니다.

기본 코드의 실행결과는 아래 링크에서 확인할 수 있습니다.

* [기본 코드의 실행 결과](http://10bun.tv/samples/realgrid2/part-2/09/step-00.html)

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
        { fieldName: "KorName",      name: "KorName" },
        { fieldName: "Gender",       name: "Gender" },
        { fieldName: "Age",          name: "Age" },
        { fieldName: "Phone",        name: "Phone" },
        { fieldName: "ProductId",    name: "ProductId" },
        { fieldName: "KorCountry",   name: "KorCountry" },
        { fieldName: "OrderDate",    name: "OrderDate" },
        { fieldName: "CardNumber",   name: "CardNumber" },
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


## 폼뷰 보이기

예제 코드의 실행결과는 아래 링크에서 확인할 수 있습니다.
* [폼뷰 보이기 예제 실행결과](http://10bun.tv/samples/realgrid2/part-2/09/step-01.html)

``` html
<!DOCTYPE html>
<html>
    ...
<body>
    <div>
        <button onclick="showFormView()">FormView 보이기</button>
    </div>
    <br>
    <div id="realgrid" style="width: 100%; height: 440px;"></div>
</body>

</html>

<script>
    ...
    const formView = gridView._view.container.formView;
    formView.visible = false;
    formView.options.modal = true;
    formView.options.saveLabel = "저장";
    formView.options.cancelLabel = "취소";

    formView.model.load({
        items: [
            {
                header: "이름",
                column: "KorName"
            },
            {
                header: "성별",
                column: "Gender"
            },
            {
                header: "주문일",
                column: "OrderDate"
            },
        ]
    });  
    
    function showFormView() {
        if (gridView.getCurrent().itemIndex == -1) {
            alert("편집할 데이터를 선택해주세요.");
            return;
        }

        formView.visible = true;
    }
</script>
```


## 행 추가

예제 코드의 실행결과는 아래 링크에서 확인할 수 있습니다.
* [행 추가 예제 실행결과](http://10bun.tv/samples/realgrid2/part-2/09/step-02.html)

``` html
<!DOCTYPE html>
<html>
    ...
</html>

<script>
    ...
    gridView.editOptions.appendable = true;
    ...
    function showFormView() {
        if (gridView.getCurrent().itemIndex == -1) {
            gridView.setFocus();
        }

        formView.visible = true;
        formView.appendRow();
    }
</script>
```


## 편집기 속성 변경

예제 코드의 실행결과는 아래 링크에서 확인할 수 있습니다.
* [편집기 속성 변경 예제 실행결과](http://10bun.tv/samples/realgrid2/part-2/09/step-03.html)

``` html
<!DOCTYPE html>
<html>
    ...
</html>

<script>
    ...
    provider.setFields([
        ...
        { 
            fieldName: "OrderDate", 
            dataType: "datetime", 
            datetimeFormat: "yyyy-MM-dd",
        },
        ...
    ]);

    gridView.setColumns([
        ...
        { 
            fieldName: "OrderDate",    name: "OrderDate",
            editor: {
                type: "date"
            },
        },
        ...
    ]);
    ...
</script>
```

