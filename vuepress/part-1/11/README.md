# Lookup Tree


## 기본 코드

예제들의 기본이 되는 코드부터 살펴보겠습니다.
서버로부터 예제 데이터를 가져와서 표시해주기까지만 적용된 상태입니다.

기본 코드의 실행결과는 아래 링크에서 확인할 수 있습니다.
* [기본 코드의 실행 결과](http://10bun.tv/samples/realgrid2/part-1/11/step-00.html)

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

    var data_url = 
		"https://raw.githubusercontent.com/realgrid/" +
    	"open-tutorial/main/datas/";
    $.getJSON(data_url + "data-007.json", function (data) {
        console.log(data);
        provider.fillJsonData(data, { fillMode: "set" });
    });
	
    provider.setFields([
		{ fieldName: "uid" },
		{ fieldName: "order_date" },
		{ fieldName: "company_id" },
		{ fieldName: "category_id" },
		{ fieldName: "product_id" },
		{ fieldName: "quantity" },
    ]);

    gridView.setColumns([
		{ name: "uid",         fieldName: "uid",         width: "40" },
		{ name: "order_date",  fieldName: "order_date",  width: "80" },	
		{ name: "company_id",  fieldName: "company_id",  width: "100" },
		{ name: "category_id", fieldName: "category_id", width: "80" },	
		{ name: "product_id",  fieldName: "product_id",  width: "100" },
		{ name: "quantity",    fieldName: "quantity",    width: "40" },
    ]);
</script>
```


## 동기식으로 코드 데이터 가져오기

``` html
<!DOCTYPE html>
<html>
	...
</html>

<script>
	...
	var companies  = {id: "companies",  levels: 1, keys: [], values: []};
	var categories = {id: "categories", levels: 2, keys: [], values: []};
	var products   = {id: "products",   levels: 3, keys: [], values: []};	
	loadCodeData(data_url + "data-007-01.json", companies,  ["uid"], "company");
	loadCodeData(data_url + "data-007-04.json", categories, ["company_id", "category_id"], "category");
	loadCodeData(data_url + "data-007-03.json", products,   ["company_id", "category_id", "uid"], "product");
	...
	function loadCodeData(url, codes, fkeys, fvalue) {		
		$.ajax ({
			url: url,
			dataType: "json",
			async: false,
			success: function(data) {
				for (var i=0; i<data.length; i++) {
					var row = data[i];
					var keys = [];
					if (fkeys.length == 1) {
						keys = String(row[fkeys[0]]);
					} else {
						for (var j=0; j<fkeys.length; j++) keys.push( String(row[fkeys[j]]) );
					}
 					codes.keys.push(keys);
					codes.values.push(row[fvalue]);
				}				
				console.log(codes);
			}
		})
	}
</script>
```


## Company 컬럼을 Lookup 컬럼으로 구성하기

``` html
<!DOCTYPE html>
<html>
	...
</html>

<script>
	...
    gridView.setColumns([
		...
		{ 
			name: "company_id",  fieldName: "company_id",  width: "100",
			lookupDisplay: true, 
			values: companies.keys, 
			labels: companies.values,
			editor: { type: "dropdown" }
		},
		...
    ]);
	...
</script>
```


## Category 컬럼에 LookupSource 적용하기

``` html
<!DOCTYPE html>
<html>
	...
</html>

<script>
	...
    gridView.addLookupSource(categories);
	...	
    gridView.setColumns([
		...
		{ 
			name: "category_id", fieldName: "category_id", width: "80",
			lookupDisplay: true, 
			lookupSourceId: "categories", 
			lookupKeyFields: ["company_id", "category_id"],
			editor: { type: "dropdown" }
		},
		...
    ]);
	...
</script>
```

## Product 컬럼에 LookupSource 적용하기

``` html
<!DOCTYPE html>
<html>
	...
</html>

<script>
	...
    gridView.addLookupSource(products);
	...
    gridView.setColumns([
		...
		{ 
			name: "product_id",  fieldName: "product_id",  width: "100",
			lookupDisplay: true, 
			lookupSourceId: "products", 
			lookupKeyFields: ["company_id", "category_id", "product_id"],
			editor: { type: "dropdown" }			
		},
		...
    ]);
	...
</script>
```


## 변경이 발생하면 뒤에 오는 컬럼 초기화하기

``` html
<!DOCTYPE html>
<html>
	...
</html>

<script>
	...
    gridView.onEditCommit = function (grid, index, oldValue, newValue) {
        if (index.fieldName === "company_id") {
 			if (oldValue !== newValue) {
				grid.setValue(index.itemIndex, "category_id", "");
				grid.setValue(index.itemIndex, "product_id", "");
			}			
		} else if (index.fieldName === "category_id") {
 			if (oldValue !== newValue) {
				grid.setValue(index.itemIndex, "product_id", "");
			}
        }
    };	
	...
</script>
```