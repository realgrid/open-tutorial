# 트리뷰


## 기본 코드

예제들의 기본이 되는 코드부터 살펴보겠습니다.
서버로부터 예제 데이터를 가져와서 표시해주기까지만 적용된 상태입니다.

트리뷰(TreeView)가 아닌 그리드뷰(GridView)를 사용하는 코드인데요.
지금까지 설명했던 기본코드에서 어떤 부분들을 변경해야 트리뷰를 사용할 수 있는지 유의해서 살펴보시기 바랍니다.

기본 코드의 실행결과는 아래 링크에서 확인할 수 있습니다.
* [기본 코드의 실행 결과](http://10bun.tv/samples/realgrid2/part-2/03/step-00.html)

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
    	"open-tutorial/main/datas/areatree.json";
    $.getJSON(data_url, function (data) {
        console.log(data);
        provider.fillJsonData(data, { fillMode: "set" });
    });
</script>
```


## 트리뷰로 전환하기

다른 예제와 달리 LocalDataProvider가 아닌 LocalTreeDataProvider를 사용하는 것과
GridView가 아닌 TreeView를 사용하고 있는 점을 유의하셔야 합니다.

예제 코드의 실행결과는 아래 링크에서 확인할 수 있습니다.
* [트리뷰로 전환하기 예제 실행결과](http://10bun.tv/samples/realgrid2/part-2/03/step-01.html)

``` html
...
<script>
    const provider = new RealGrid.LocalTreeDataProvider();
    const treeView = new RealGrid.TreeView("realgrid");
    treeView.setDataSource(provider);
    treeView.treeOptions.iconImagesRoot = "/images/flags/";
    treeView.treeOptions.iconImages = [
        "kr.png", "de.png", "es.png", "fr.png", "leaf.png"
    ]
    treeView.treeOptions.defaultIcon = 4;
	...
    $.getJSON(data_url, function (data) {
        console.log(data);
        provider.setRows(data, "treeId", false, "", "iconField");
        treeView.refresh();
    });
</script>
```
* 3: LocalDataProvider가 아닌 LocalTreeDataProvider를 사용합니다.
* 4: GridView가 아닌 TreeView를 사용합니다.
* 6-10: 트리 노드에 표시할 아이콘의 경로와 이미지 파일명을 설정합니다.
* 11: 아이콘이 지정되지 않았을 경우 표시할 기본 이미지의 순번입니다. iconImages 배열에서 해당 순번의 이미지가 표시됩니다.
* 13: GridView가 아닌 TreeView로 변경해야 하는 점에 유의하세요.
* 19: 서버로부터 가져온 데이터를 provider에 입력합니다.
* 20: 새로 변경된 데이터를 TreeView에 적용합니다.


### LocalTreeDataProvider.setRows()

``` js
setRows(rows, treeField, needSorting, childrenField, iconField)
```
* rows: 설정할 데이터
* treeField: 트리로 묶을 정보가 담긴 필드 명
* needSorting: 소팅 여부
* childrenField: 자식 행이 있는 지를 지시하는 필드, 자식의 필드 명
* iconField: 트리 노드에 표시할 아이콘 경로를 값으로 가지고 있는 필드 이름


### 트리뷰 제약 사항

트리뷰(TreeView)는 그리드뷰(GridView)와 달리 몇 가지 제약사항이 있습니다.
* RowGrouping: 트리는 그룹핑을 지원하지 않습니다.
* Filtering: 부모 행이 필터로 제외되면 자식 행들 역시 제외됩니다.
* Sorting: 정렬시 계층 구조를 유지한 채 자식들만 정렬됩니다.
* 트리 컬럼: 트리가 보여지는 컬럼은 항상 첫 번째 컬럼 입니다.
* 트리가 보여지는 첫 번째 컬럼에는 html renderer 사용이 제한됩니다.


## 모두 펼치기, 모두 접기

예제 코드의 실행결과는 아래 링크에서 확인할 수 있습니다.
* [모두 펼치기, 모두 접기 예제 실행결과](http://10bun.tv/samples/realgrid2/part-2/03/step-02.html)

``` html
<!DOCTYPE html>
<html>
    ...
	<body>
        <div>
            <button onclick="treeView.expandAll()">모두 펼치기</button>
            <button onclick="treeView.collapseAll()">모두 접기</button>
        </div>
        <br>
        ...
	</body>
</html>
```


## 펼침, 닫힘 아이콘 지정

예제 코드의 실행결과는 아래 링크에서 확인할 수 있습니다.
* [펼침, 닫힘 아이콘 지정 예제 실행결과](http://10bun.tv/samples/realgrid2/part-2/03/step-03.html)

``` html
...
<script>
    ...
    treeView.treeOptions.iconImagesRoot = "/images/";
    treeView.treeOptions.iconImages = [
        "folder_open.png", "folder_close.png", "leaf.png"]
    treeView.treeOptions.expandedIcon  = 0;
    treeView.treeOptions.collapsedIcon = 1;
    treeView.treeOptions.defaultIcon   = 2;
    ...
</script>
```


## 트리 이벤트

예제 코드의 실행결과는 아래 링크에서 확인할 수 있습니다.
* [트리 이벤트 예제 실행결과](http://10bun.tv/samples/realgrid2/part-2/03/step-04.html)

``` html
...
<script>
    ...
    treeView.onTreeItemExpanding = function (tree, itemIndex, rowId) {
        var value = tree.getValue(itemIndex, "treeName")
        return value != '종로구';
    };
    treeView.onTreeItemExpanded = function (tree, itemIndex, rowId) {
        console.log("expanded");
    }

    treeView.onTreeItemCollapsing = function (tree, itemIndex, rowId) {
        var value = tree.getValue(itemIndex, "treeName")
        return value != '중구';
    };
    treeView.onTreeItemCollapsed = function (tree, itemIndex, rowId) {
        console.log("collpased");
    }
    ...
</script>
```


## Object Data

예제 코드의 실행결과는 아래 링크에서 확인할 수 있습니다.
* [Object Data 예제 실행결과](http://10bun.tv/samples/realgrid2/part-2/03/step-05.html)

``` html
...
<script>
    provider.setFields([
        { fieldName: "col0", dataType: "text"   },
        { fieldName: "icon", dataType: "text"   },
        { fieldName: "col1", dataType: "number" },
        ...
    ]);
    treeView.setColumns([
        { fieldName: "col0", name: "col0", width: 150 },
        { fieldName: "icon", name: "icon" },
        { fieldName: "col1", name: "col1" },
        ...
    ]);
    var data_url = 
		"https://raw.githubusercontent.com/realgrid/" +
    	"open-tutorial/main/datas/treedata.json";
    $.getJSON(data_url, function (data) {
        console.log(data);
        provider.setObjectRows(data, "rows", "", "icon");
        treeView.expandAll();
    });
</script>
```

### LocalTreeDataProvider.setObjectRows()

``` js
setObjectRows(json, rowsProp, childrenProp, iconProp)
```
* json: 설정할 데이터. Json 배열이거나 Json 배열을 속성으로 갖는 object. Json 배열이 아닌 경우 rowsProp에 지정된 속성을 배열로 지정해야 한다.
* rowsProp: Json 중 트리의 데이터 행들로 사용될 배열을 값으로 하는 속성의 이름
* childrenProp: 자식 행이 있는 지를 지시하는 속성 이름. 해당 속성의 값이 자식의 필드 이름과 같아야한다.
* iconProp: 트리 노드에 표시할 아이콘 경로를 값으로 가지고 있는 속성 이름