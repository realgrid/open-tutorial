# 마스터 디테일

## 기본 형태

``` html
<!DOCTYPE html>
<html>
	<head>
		<link href="/lib/realgrid-style.css" rel="stylesheet" />
		<script type="text/javascript" src="/lib/realgrid-lic.js"></script>
		<script type="text/javascript" src="/lib/realgrid.2.2.2.min.js"></script>
	</head>
	<body>
		<div id="master_grid" style="width: 100%; height: 440px;">
		</div>
		<div id="detail_grid" style="width: 100%; height: 440px;">
		</div>
	</body>
</html>

<script>
	document.addEventListener('DOMContentLoaded', function () {
		const master_container = document.getElementById('master_grid');
		const master_provider = new RealGrid.LocalDataProvider(false);
		const master_grid = new RealGrid.GridView(master_container);
		master_grid.setDataSource(master_provider);

		const detail_container = document.getElementById('detail_grid');
		const detail_provider = new RealGrid.LocalDataProvider(false);
		const detail_grid = new RealGrid.GridView(detail_container);
		detail_grid.setDataSource(detail_provider);

		master_provider.setFields([
			{ fieldName: "OrderID" },
			{ fieldName: "CustomerID" },
			{ fieldName: "CompayName" },
		]);

		master_grid.setColumns([
			{ name: "OrderID",    fieldName: "OrderID",    width:  "80" },
			{ name: "CustomerID", fieldName: "CustomerID", width:  "80" },
			{ name: "CompayName", fieldName: "CompayName", width: "300" },
		]);

		detail_provider.setFields([
			{ fieldName: "OrderID" },
			{ fieldName: "ProductName" },
			{ fieldName: "UnitPrice" },
			{ fieldName: "Quantity" },
		]);

		detail_grid.setColumns([
			{ name: "OrderID",     fieldName: "OrderID",     width:  "80" },
			{ name: "ProductName", fieldName: "ProductName", width: "300" },
			{ name: "UnitPrice",   fieldName: "UnitPrice",   width:  "80" },
			{ name: "Quantity",    fieldName: "Quantity",    width:  "80" },
		]);
	});
</script>
```


## 데이터 제공 및 마스터 디테일 적용

``` html
<!DOCTYPE html>
<html>
    ...
</html>

<script>
	document.addEventListener('DOMContentLoaded', function () {
        ...
		master_grid.onCurrentRowChanged = function (grid, oldRow, newRow) {
			detail_provider.clearRows();
			if (newRow < 0) return;

			var mstKey = parseInt(master_provider.getValue(newRow, "OrderID"));
			var datas = detail_data.filter(function (element) {
				return element.OrderID === mstKey;
			});
			detail_provider.setRows(datas);
		};

		var master_data = [
			{ OrderID: 10248, CustomerID: "VINET", CompayName: "Vins et alcools Chevalier" },
			{ OrderID: 10249, CustomerID: "TOMSP", CompayName: "Toms Spezialitäten" },
		];

		var detail_data = [
			{ OrderID: 10248, ProductName: "Queso Cabrales", UnitPrice: 14, Quantity: 12 },
			{ OrderID: 10248, ProductName: "Singaporean Hokkien Fried Mee", UnitPrice: 9.8, Quantity: 10 },
			{ OrderID: 10248, ProductName: "Mozzarella di Giovanni", UnitPrice: 34.8, Quantity: 5 },
			{ OrderID: 10249, ProductName: "Tofu", UnitPrice: 18.6, Quantity: 9 },
			{ OrderID: 10249, ProductName: "Manjimup Dried Apples", UnitPrice: 42.4, Quantity: 40 },
		];

		master_provider.fillJsonData(master_data, { fillMode: "set" });
	});
</script>
```