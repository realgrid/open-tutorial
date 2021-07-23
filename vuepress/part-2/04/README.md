# 페이징

## 기본 코드

예제들의 기본이 되는 코드부터 살펴보겠습니다.
서버로부터 예제 데이터를 가져와서 표시해주기까지만 적용된 상태입니다.

트리뷰(TreeView)가 아닌 그리드뷰(GridView)를 사용하는 코드인데요.
지금까지 설명했던 기본코드에서 어떤 부분들을 변경해야 트리뷰를 사용할 수 있는지 유의해서 살펴보시기 바랍니다.

기본 코드의 실행결과는 아래 링크에서 확인할 수 있습니다.
* [기본 코드의 실행 결과](http://10bun.tv/samples/realgrid2/part-2/04/step-00.html)

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


## 페이징 처리 1

예제 코드의 실행결과는 아래 링크에서 확인할 수 있습니다.
* [트리뷰로 전환하기 예제 실행결과](http://10bun.tv/samples/realgrid2/part-2/04/step-01.html)

``` html
...
<script>
    ...
    gridView.setPaging(true, 10);
    ...
    var data_url = 
        "https://raw.githubusercontent.com/realgrid/" +
        "open-tutorial/main/datas/data-001.json";
    $.getJSON(data_url, function (data) {
        console.log(data);
        provider.fillJsonData(data, { fillMode: "set" });
        showCurrentPage();
    });
    function showCurrentPage() {
        $("#currentPage").text(
            "현재 페이지: " + (gridView.getPage() + 1) + 
            " / " + gridView.getPageCount()
        );
    }
    function prevPage() {
        gridView.setPage(gridView.getPage() - 1);
        showCurrentPage();
    }
    function nextPage() {
        gridView.setPage(gridView.getPage() + 1);
        showCurrentPage();
    }
</script>
```


## 페이징 처리 2

예제 코드의 실행결과는 아래 링크에서 확인할 수 있습니다.
* [트리뷰로 전환하기 예제 실행결과](http://10bun.tv/samples/realgrid2/part-2/04/step-02.html)

``` html
<!DOCTYPE html>
<html>
	<head>
        ...
		<link href="/css/bootstrap.min.css" rel="stylesheet" />
		<script type="text/javascript" src="/js/bootstrap.min.js"></script>
		<script type="text/javascript" src="/js/luckmoshyJqueryPagnation.js"></script>
	</head>
	<body>
		<div id="realgrid" style="width: 100%; height: 440px;">
		</div>
        <br>
        <div id="pagination"></div>
	</body>
</html>
<script>
    ...
    var data_url = 
        "https://raw.githubusercontent.com/realgrid/" +
        "open-tutorial/main/datas/data-001.json";
    $.getJSON(data_url, function (data) {
        console.log(data);
        provider.fillJsonData(data, { fillMode: "set" });

        $('#pagination').luckmoshyPagination({
            totalPages: gridView.getPageCount(),
            startPage: 1,
            onPageClick: function (event, page) {
                gridView.setPage(page);
            },
        });
    });
</script>
```
