# 트리뷰


## 기본 코드

예제들의 기본이 되는 코드부터 살펴보겠습니다.
서버로부터 예제 데이터를 가져와서 표시해주기까지만 적용된 상태입니다.

트리뷰(TreeView)가 아닌 그리드뷰(GridView)를 이용해서 예제에 사용할 데이터를 확인할 수 있도록 하였습니다.

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
        "kr.png", "de.png", "es.png", "fr.png", "grd_treeicon_leaf.png", "hu.png", "is.png",
        "kr.png", "mx.png", "pt.png", "us.png", "ve.png"
    ]
    treeView.treeOptions.defaultIcon = 4;
	...
    treeView.setColumns([
		...
    ]);
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


## LocalTreeDataProvider.setRows()

``` js
setRows(rows, treeField, needSorting, childrenField, iconField)
```
* rows: 설정할 데이터
* treeField: 트리로 묶을 정보가 담긴 필드 명
* needSorting: 소팅 여부
* childrenField: 자식 행이 있는 지를 지시하는 필드, 자식의 필드 명
* iconField: 트리 노드에 표시할 아이콘 경로를 값으로 가지고 있는 필드 이름


## 트리뷰 제약 사항

트리뷰(TreeView)는 그리드뷰(GridView)와 달리 몇 가지 제약사항이 있습니다.
* RowGrouping: 트리는 그룹핑을 지원하지 않습니다.
* Filtering: 부모 행이 필터로 제외되면 자식 행들 역시 제외됩니다.
* Sorting: 정렬시 계층 구조를 유지한 채 자식들만 정렬됩니다.
* 트리 컬럼: 트리가 보여지는 컬럼은 항상 첫 번째 컬럼 입니다.
* 트리가 보여지는 첫 번째 컬럼에는 html renderer 사용이 제한됩니다.