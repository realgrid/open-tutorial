# 랜더러


## 기본 코드

예제들의 기본이 되는 코드부터 살펴보겠습니다.
서버로부터 예제 데이터를 가져와서 표시해주기까지만 적용된 상태입니다.

기본 코드의 실행결과는 아래 링크에서 확인할 수 있습니다.
* [기본 코드의 실행 결과](http://10bun.tv/samples/realgrid2/part-2/01/step-00.html)

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

## 텍스트 랜더러

셀의 텍스트의 스타일을 변경할 수 있는 가장 기본이 되는 랜더러입니다. 

예제 코드의 실행결과는 아래 링크에서 확인할 수 있습니다.
* [텍스트 랜더러 예제 실행결과](http://10bun.tv/samples/realgrid2/part-2/01/step-01.html)

``` html
<html>
	...
    <style>
        .rgsample-blue-column {
            color: blue;
        }
        .rgsample-bold-column {
            font-weight: bold;
        }
    </style>
</html>

<script>
    ...
    gridView.setColumns([
        { 
            name: "KorName",    fieldName: "KorName",    width:  "80",
            styleName: "rgsample-blue-column rgsample-bold-column",
        },
        ...
        { 
            name: "OrderDate",  fieldName: "OrderDate",  width:  "80",
            datetimeFormat: "yyyy.MM.dd",
        },
        {
            name: "SaveCost",   fieldName: "SaveCost",   width:  "80",
            numberFormat: "#,##0.###",
        },
    ]);
    ...
</script>
```

### HTML 랜더러

예제 코드의 실행결과는 아래 링크에서 확인할 수 있습니다.
* [HTML 랜더러 예제 실행결과](http://10bun.tv/samples/realgrid2/part-2/01/step-02.html)

``` html
...
<script>
    ...
    gridView.setColumns([
        ...
        {
			name: "Age",        fieldName: "Age",        width:  "60",
			renderer: {
				type: "html",
				callback: renderAge
			},
		},
        ...
    ]);
    ...
	function renderAge(grid, cell, w, h) {
		if (cell.value < 30) {
			return `<span style="color: red">${cell.value}</span>`;
		} else {
			return `<span style="color: royalblue">${cell.value}</span>`;
		}
	}
</script>
```


## 아이콘 랜더러

예제 코드의 실행결과는 아래 링크에서 확인할 수 있습니다.
* [아이콘 랜더러 예제 실행결과](http://10bun.tv/samples/realgrid2/part-2/01/step-03.html)

``` html
...
<script>
    ...
    gridView.setColumns([
        ...
        {
			name: "Gender",     fieldName: "Gender",     width:  "60",
			renderer: {
				type: "icon",
				iconMap: {
					"남": "/images/man.png",
					"여": "/images/woman.png"
				},
				iconHeight: 15,
				iconWidth: 10
			},
		},
        {
			name: "Gender2",     fieldName: "Gender",     width:  "60",
			renderer: {
				type: "icon",
				iconCallback: function (grid, cell) {
					var gender = cell.value == "남" ? "man" : "woman";
					return `/images/${gender}.png`;
				},
				iconHeight: 15,
				iconWidth: 10
			},
		},
        ...
    ]);
    ...
</script>
```


## 도형 랜더러

예제 코드의 실행결과는 아래 링크에서 확인할 수 있습니다.
* [도형 랜더러 예제 실행결과](http://10bun.tv/samples/realgrid2/part-2/01/step-04.html)

``` html
...
<script>
    ...
    gridView.setColumns([
        { 
			name: "KorName",    fieldName: "KorName",    width:  "80",
			renderer: {
				type: "shape",
				shape: "star"
			},
		},
        {
			name: "Gender",     fieldName: "Gender",     width:  "60",
			renderer: {
				type: "shape",
				shapeMap: {
					"남": "plus",
					"여": "minus"
				},
			},
		},
        {
			name: "Age",        fieldName: "Age",        width:  "60",
			renderer: {
				type: "shape",
				shapeCallback: renderAge,
			},
		},
        ...
    ]);
    ...
	function renderAge(grid, cell) {
		if (cell.value <  10) return 'star';
		if (cell.value <  20) return 'rectangle';
		if (cell.value <  30) return 'triangle';
		if (cell.value <  40) return 'itriangle';
		if (cell.value <  50) return 'diamond';
		if (cell.value <  60) return 'uparrow';
		if (cell.value <  70) return 'downarrow';
		if (cell.value <  80) return 'leftarrow';
		if (cell.value <  90) return 'rightarrow';
		if (cell.value < 100) return 'minus';
		return 'plus';
	}
</script>
```


## 이미지 랜더러

예제 코드의 실행결과는 아래 링크에서 확인할 수 있습니다.
* [이미지 랜더러 예제 실행결과](http://10bun.tv/samples/realgrid2/part-2/01/step-05.html)

``` html
...
<script>
    ...
    gridView.displayOptions.rowHeight = 80;
    ...
    gridView.setColumns([
        {
			name: "imageUrl",   fieldName: "imageUrl",   width: "120",
			renderer: {
				type: "image",
				imageHeight: 80,
				imageField: "imageUrl",
			},
		},
        {
			name: "imageUrl3",   fieldName: "Monetary",   width: "120",
			renderer: {
				type: "image",
				imageHeight: 80,
				imageMap: {
					"EUR": "/images/monetaryFlag/EUR.png",
					"USD": "/images/monetaryFlag/USD.png"
				},
			},
		},
        {
			name: "imageUrl2",   fieldName: "imageUrl",   width: "120",
			renderer: {
				type: "image",
				imageHeight: 80,
				imageCallback: function (grid, cell) {
					var monetary = grid.getValue(cell.item.index, "Monetary");
					return `/images/monetaryFlag/${monetary}.png`;
				},
			},
		},
        ...
    ]);
    var data_url = 
		"https://raw.githubusercontent.com/realgrid/" +
    	"open-tutorial/main/datas/data-008.json";
    ...
</script>
```


## 바 & 시그널 랜더러

예제 코드의 실행결과는 아래 링크에서 확인할 수 있습니다.
* [바 & 시그널 랜더러 예제 실행결과](http://10bun.tv/samples/realgrid2/part-2/01/step-06.html)

``` html
...
<script>
    ...
    gridView.setColumns([
        ...
        {
			name: "Age",        fieldName: "Age",        width:  "60",
			renderer: {
				type: "bar",
				origin: "left",
				minimum: 0,
				maximum: 100,
				barWidth: "80%"
			},
		},
        {
            name: "Age2", fieldName: "Age", width: "60",
            renderer: {
                type: "signalbar",
                barCount: 10,
                minimum: 0,
                maximum: 100,
                startRate: 0,
                endRate: 100
            },
        },
        ...
    ]);
    ...
</script>
```


## 체크 랜더러

## 링크 렌더러

## 바코드 랜더러

## 커스텀 랜더러 - 이미지 버튼

## 차트 연동

