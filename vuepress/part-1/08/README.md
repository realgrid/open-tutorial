# 셀 병합

이번 포스트에서는 셀과 푸터를 병합하여 표시하는 방법에 대해서 알아보겠습니다.


## 기본 코드

예제들의 기본이 되는 코드부터 살펴보겠습니다.
서버로부터 예제 데이터를 가져와서 표시해주기까지만 적용된 상태입니다.

기본 코드의 실행결과는 아래 링크에서 확인할 수 있습니다.
* [기본 코드의 실행 결과](http://10bun.tv/samples/realgrid2/part-1/08/step-00.html)

``` html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<link href="/lib/realgrid-style.css" rel="stylesheet" />
		<link href="/lib/common.css" rel="stylesheet" />
		<script type="text/javascript" src="/lib/realgrid-lic.js"></script>
		<script type="text/javascript" src="/lib/realgrid.2.2.2.min.js"></script>
		<script type="text/javascript" src="/js/jquery-3.4.0.min.js"></script>
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

	// 필드 설정
    provider.setFields([
		...
    ]);

	// 컬럼 설정
    gridView.setColumns([
		...
    ]);

	// 서버로부터 데이터 가져오기
    const data_url = "https://raw.githubusercontent.com/realgrid/open-tutorial/main/datas/data-003.json";
    $.getJSON(data_url, function (data) {
        console.log(data);
        provider.fillJsonData(data, { fillMode: "set" });
    });
</script>
```


## 셀 병합하기

아래 예제를 실행하면 성별(Gender)을 같은 값을 가진 셀끼리 묶어서 보여줍니다.
setColumns() 메소드로 컬럼을 초기화할 때 mergeRule을 설정했기 때문입니다.

이후 버튼을 클릭하시면 병합하는 기준이 달라지는데요.
자세한 설명은 코드 안을 참고하시기 바랍니다.

예제 코드의 실행결과는 아래 링크에서 확인할 수 있습니다.
* [셀 병합하기 예제 실행결과](http://10bun.tv/samples/realgrid2/part-1/08/step-01.html)

``` html
<!DOCTYPE html>
<html>
	...
	<body>
		<div>
			<button onclick="mergeRule('row div 3')">3줄씩 묶기</button>
			<button onclick="mergeRule('row div 5')">5줄씩 묶기</button>
			<button onclick="mergeRule('value')">같은 값으로 묶기</button>
			<button onclick="mergeRule('')">묶지 않기</button>
		</div>
		...
</html>

<script>
	...
    gridView.setColumns([
		...
		{ 
			name: "Gender", fieldName: "Gender", width: "40",
			mergeRule: { criteria: "value" }
		},
		...
    ]);
	...
	function mergeRule(value) {
		gridView.setColumnProperty("Gender", "mergeRule", { criteria: value });
	}
</script>
```
* 20: 컬럽을 설정할 때 병합할 기준을 정합니다. 'value'로 지정하면 값이 같은 것끼리 이웃해 있는 경우 병합하게 됩니다.
* 6: 성별(Gender) 컬럼을 3줄씩 묶어서 보여줍니다.
* 7: 성별(Gender) 컬럼을 5줄씩 묶어서 보여줍니다.
* 8: 20번 째 줄과 같이 같은 값을 가진 셀을 병합합니다.
* 9: criteria에 널 문자를 넣으면 초기화되어 셀을 묶지 않고 보여줍니다.


## 선택컬럼을 참조하여 병합하기

셀 병합 시 특정 컬럼 값을 참조해서 병합할 수 있습니다.
``` js
gridView.setColumnProperty(
	"colName", "mergeRule", 
	{
		criteria: "values['fieldName']+value"
	}
);
```
셀 병합 시 모든 선행 컬럼 값을 참조해서 병합할 수 있습니다.
``` js
gridView.setColumnProperty(
	"colName", "mergeRule", 
	{
		criteria: "prevvalues+value"
	}
);
```


## 행 병합 그룹핑

아래 예제는 그룹핑된 셀들을 병합해서 표시합니다.
표시할 때 헤더나 푸터 등을 표시하는 방식을 변경하는 방법을 함께 설명합니다.

코드가 길어서 html 태그 영역과 스크립트 영역으로 나눠서 설명을 진행합니다.

예제 코드의 실행결과는 아래 링크에서 확인할 수 있습니다.
* [행 병합 그룹핑 예제 실행결과](http://10bun.tv/samples/realgrid2/part-1/08/step-03.html)

``` html
<!DOCTYPE html>
<html>
	...
	<body>
		<h4>자식들이 `표시`되고 있을 때</h4>
		<p>
			<input type="radio" name="expanded" onclick="expanded('footer')" checked="checked" />
				FOOTER &nbsp;&nbsp;&nbsp;&nbsp;
			<input type="radio" name="expanded" onclick="expanded('header')" />
				HEADER &nbsp;&nbsp;&nbsp;&nbsp;
			<input type="radio" name="expanded" onclick="expanded('both')" />
				BOTH &nbsp;&nbsp;&nbsp;&nbsp;
			<input type="radio" name="expanded" onclick="expanded('summary')" />
				SUMMARY &nbsp;&nbsp;&nbsp;&nbsp;
			<input type="radio" name="expanded" onclick="expanded('none')" />
				NONE &nbsp;&nbsp;&nbsp;&nbsp;
		</p>
		<h4>자식들이 `감춰진 상태`일 때</h4>
		<p>	
			<input type="radio" name="collapsed" onclick="collapsed('footer')" checked="checked" />
				FOOTER &nbsp;&nbsp;&nbsp;&nbsp;
			<input type="radio" name="collapsed" onclick="collapsed('header')" />
				HEADER &nbsp;&nbsp;&nbsp;&nbsp;
			<input type="radio" name="collapsed" onclick="collapsed('both')" />
				BOTH &nbsp;&nbsp;&nbsp;&nbsp;
		</p>
		<h4>Expander 표시</h4>
		<p>
			<input type="radio" name="expander" onclick="expander('default')" checked="checked" />
				표시 &nbsp;&nbsp;&nbsp;&nbsp;
			<input type="radio" name="expander" onclick="expander('none')" />
				감춤 &nbsp;&nbsp;&nbsp;&nbsp;
		</p>
		<div id="realgrid" style="width: 100%; height: 440px;">
		</div>
	</body>
</html>
```
* 5-17: 병합된 셀의 자식 셀들이 표시되고 있을 때, 헤더와 푸터를 표시하는 방법을 선택하기 위해 라디오 버튼을 정의하는 영역입니다.
* 18-26: 병합된 셀의 자식 셀들이 보이지 않을 때, 헤더와 푸터를 표시하는 방법을 선택하기 위해 라디오 버튼을 정의하는 영역입니다.
* 27-33: Expander 아이콘을 보이거나 감추기를 선택하기 위해 라디오 버튼을 정의하는 영역입니다.

``` html
<script>
	...
    const data_url = "https://raw.githubusercontent.com/realgrid/open-tutorial/main/datas/data-004.json";
    $.getJSON(data_url, function (data) {
        console.log(data);
        provider.fillJsonData(data, { fillMode: "set" });

		gridView.groupPanel.visible = true;
		gridView.groupBy(["KorCountry"]);	
		gridView.setRowGroup({mergeMode: true});	
    });
	
	function expanded(value) {
		gridView.setRowGroup({ expandedAdornments: value });
	}

	function collapsed(value) {
		gridView.setRowGroup({ collapsedAdornments: value });
	}

	function expander(value) {
		gridView.setRowGroup({ mergeExpanderVisibility: value });
	}	
</script>
```
* 8-10: 데이터가 다운로드되고 난 이후 setRowGroup() 메소를 실행하기 위해서 $.getJSON() 안쪽에 코드를 구현하였습니다.
* 13-15: 병합된 셀의 자식 셀들이 표시되고 있을 때, 선택된 라디오 버튼에 따라서 헤더와 푸터를 표시하는 방식을 변경합니다.
* 17-19: 병합된 셀의 자식 셀들이 보이지 않을 때, 선택된 라디오 버튼에 따라서 헤더와 푸터를 표시하는 방식을 변경합니다.
* 21-23: Expander 아이콘을 보이거나 사라지게 합니다.


## 그룹 푸터 표시 제한 설정

여러 개의 컬럼을 기준으로 그룹핑되었을 때 푸터가 표시되는 래밸을 정하는 예제입니다.

아래의 이미지는 createFooterCallback 설정을 하지 않은 디폴트 상태에서의 그룹핑입니다.
그룹핑된 컬럼의 갯수와 동일하게 푸터가 생성되어 있는 것을 알 수 있습니다.

![](./mergedRowGroup1.png)

아래 이미지는 createFooterCallback 설정을 통해서 두 번 째 컬럼까지만 푸터가 생기도록 코드를 구현했을 때의 결과입니다.
그룹핑된 컬럼은 3개이지만 푸터는 2개만 생성되어 있는 것을 알 수 있습니다.

![](./mergedRowGroup2.png)

예제 코드의 실행결과는 아래 링크에서 확인할 수 있습니다.
* [그룹 푸터 표시 제한 설정 예제 실행결과](http://10bun.tv/samples/realgrid2/part-1/08/step-04.html)

``` html
<!DOCTYPE html>
<html>
	...
</html>

<script>
	...	
    $.getJSON(data_url, function (data) {
        console.log(data);
        provider.fillJsonData(data, { fillMode: "set" });
		
		gridView.groupPanel.visible = true;
		gridView.groupBy(["KorCountry", "Monetary", "Gender"]);
		gridView.setRowGroup({
			mergeMode: true,
			createFooterCallback: function (grid, group) {
				return group.level < 3;
			},
		});
    });
</script>
```
* 12-19: 데이터가 다운로드되고 난 이후 setRowGroup() 메소를 실행하기 위해서 $.getJSON() 안쪽에 코드를 구현하였습니다.
* 16-18: createFooterCallback을 구현해서 group.level이 3보다 작은 경우에만 true가 리턴되도록 하였습니다. 결과적으로 group.level이 2 이하까지만 푸터가 표시됩니다.
