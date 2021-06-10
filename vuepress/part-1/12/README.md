# 엑셀 파일로 내보내기


## 기본 코드

예제들의 기본이 되는 코드부터 살펴보겠습니다.
서버로부터 예제 데이터를 가져와서 표시해주기까지만 적용된 상태입니다.

기본 코드의 실행결과는 아래 링크에서 확인할 수 있습니다.
* [기본 코드의 실행 결과](http://10bun.tv/samples/realgrid2/part-1/12/step-00.html

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

	// 필드 설정
    provider.setFields([
		...
    ]);

	// 컬럼 설정
    gridView.setColumns([
		...
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


## 엑셀 내보내기 기본 예제

예제 코드의 실행결과는 아래 링크에서 확인할 수 있습니다.
* [엑셀 내보내기 기본 예제 실행결과](http://10bun.tv/samples/realgrid2/part-1/12/step-01.html)

``` html
<!DOCTYPE html>
<html>
<head>
	...
	<script type="text/javascript" src="/lib/libs/jszip.min.js"></script>
</head>
	...
</html>
<script>
	...
    $.getJSON(data_url, function (data) {
        console.log(data);
        provider.fillJsonData(data, { fillMode: "set" });		
		gridView.exportGrid({
			type: "excel",
			target: "local",
			fileName: "gridExportSample.xlsx", 
			progressMessage: "엑셀 Export중입니다.",
			
			showProgress: true,
			indicator: "visible",
			header: "visible",
			footer: "visible",
			
			done: function () {
				alert("done excel export")
			}
		});
    });
</script>
```


## 제목 및 꼬릿말 달기

예제 코드의 실행결과는 아래 링크에서 확인할 수 있습니다.
* [제목 및 꼬릿말 달기 예제 실행결과](http://10bun.tv/samples/realgrid2/part-1/12/step-02.html)

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
		gridView.exportGrid({
			...
			documentTitle: {
				message: "리얼그리드 제목",
				visible: true,
				spaceTop: 1,
				spaceBottom: 0,
				height: 60,
				styles: { "text-align": "center", "vertical-align": "middle", "background-color": "yellow" }
			},

			documentSubtitle: {
				message: "작성자 : 김아무개, 작성일: 2021.06.10",
				visible: true,
				height: 60
			},

			documentTail: {
				message: "리얼그리드 꼬릿말",
				visible: true,
				styles: { "text-align": "right", "vertical-align": "middle" }
			},
			...
		});
	});
</script>
```


## 여러 개의 그리드를 하나의 엑셀 파일로 보내기

예제 코드의 실행결과는 아래 링크에서 확인할 수 있습니다.
* [여러 개의 그리드를 하나의 엑셀 파일로 보내기 예제 실행결과](http://10bun.tv/samples/realgrid2/part-1/12/step-03.html)

``` html
<!DOCTYPE html>
<html>
	...
	<body>
		<div><button onclick="saveToExcel()">엑셀로 내보내기</button></div><br>
		<div id="realgrid1" style="width: 100%; height: 440px;"></div><br>
		<div id="realgrid2" style="width: 100%; height: 440px;"></div>
	</body>
</html>
<script>
    const provider1 = new RealGrid.LocalDataProvider();
    const gridView1 = new RealGrid.GridView("realgrid1");
    gridView1.setDataSource(provider1);
    provider1.setFields([
		// 필드 설정
    ]);	
    gridView1.setColumns([
		// 컬럼 설정
    ]);

    const provider2 = new RealGrid.LocalDataProvider();
    const gridView2 = new RealGrid.GridView("realgrid2");
    gridView2.setDataSource(provider2);
    provider2.setFields([
		// 필드 설정
    ]);
    gridView2.setColumns([
		// 컬럼 설정
    ]);

    var data_url = 
		"https://raw.githubusercontent.com/realgrid/" +
    	"open-tutorial/main/datas/";	
    $.getJSON(data_url + "data-005.json", function (data) {
        provider1.fillJsonData(data, { fillMode: "set" });
    });
	$.getJSON(data_url + "data-006.json", function (data) {
        provider2.fillJsonData(data, { fillMode: "set" });
    });
	
	function saveToExcel() {
		RealGrid.exportGrid({
			type: "excel",
			target: "local",
			filename: "multiExport.xlsx",
			exportGrids: [
				{ grid: gridView1, sheetName: "Sheet 1" },
				{ grid: gridView2, sheetName: "Sheet 2" }
			]
		});	
	}
</script>
```