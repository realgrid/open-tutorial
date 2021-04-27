# 셀과 푸터의 병합

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

    provider.setFields([
		...
    ]);

    gridView.setColumns([
		...
    ]);

    const data_url = "https://raw.githubusercontent.com/realgrid/open-tutorial/main/datas/data-003.json";
    $.getJSON(data_url, function (data) {
        console.log(data);
        provider.fillJsonData(data, { fillMode: "set" });
    });
</script>
```


## 셀 병합하기

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
			name: "Gender",               fieldName: "Gender", width: "40",
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

## 행을 묶어서 표시하기

## 선택컬럼을 참조하여 병합하기

## 컬럼 푸터 병합

### 멀티푸터 설정

### 컬럼 푸터 병합

## 행 병합 그룹핑

## 행 병합 그룹핑

* 자식들이 표시 되고 있을 때
* 자식들이 감춰진 상태 일 때
* Expander 표시

