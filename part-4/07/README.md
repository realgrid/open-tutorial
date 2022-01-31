# 사용자 목록 마무리


## 날짜 포멧

``` html
...
<script>
...
export default {
    ....
    mounted() {
        ...
        this.provider.setFields([
            ...
            {
                fieldName: "createdAt",
                dataType: "datetime",
                datetimeFormat: "yyyy-MM-dd",
            },
            ...
        ]);
        ...
    },
    ...
}
</script>
```


## 날짜 입력

``` html
...
<script>
...
export default {
    ....
    mounted() {
        ...
        this.gridView.setColumns([
            ...
            {
                name: "createdAt",
                fieldName: "createdAt",
                width: 80,
                editor: {
                  type: "date"
                },
            },
            ...
        ]);
        ...
    },
    ...
}
</script>
```


## Lookup Display

``` html
...
<script>
...
export default {
    ....
    mounted() {
        ...
        this.gridView.setColumns([
            ...
            {
                name: "statusCode", fieldName: "statusCode", width: 80,
                lookupDisplay: true,
                values: ["0", "1", "2"],
                labels: ["정상", "휴면", "분리보관"],
            },
            ...
        ]);
        ...
    },
    ...
}
</script>
```


## 수동 필터링

수동으로 필터링하는 방식이나 활용은 다양한 방법이 있습니다.
여기서는 콜백 함수를 이용하는 방법을 설명하겠습니다.
자세한 내용은 아래 링크를 참고하시기 바랍니다.

* [https://github.com/realgrid/open-tutorial/tree/main/part-1/06](https://github.com/realgrid/open-tutorial/tree/main/part-1/06)

``` html
...
<script>
...
export default {
    ....
    mounted() {
        ...
        this.gridView.setColumnFilters("age", [
            {
                name: "filter1",
                text: "10대 이하",
                tag: 10,
                callback: this.ageFilter,
            },
            {
                name: "filter2",
                text: "20대 이상",
                tag: 20,
                callback: this.ageFilter,
            },
        ]);
    },
    methods: {
            ...
            ageFilter: (provider, row, level, fieldName, filter, value) => {
            if (filter.tag === 10) {
                return value < 20;
            } else {
                return value >= 20;
            }
        }
    }
}
</script>
```


## RowIndicator 설정

RowIndicator 설정에 대한 자세한 내용은 아래 링크를 참고하시기 바랍니다.

* https://docs.realgrid.com/refs/row-indicator


### Indicator 감추기

``` html
<template>
    ...
</template>

<script>
...
export default {
    ...
    mounted() {
        ...
        this.gridView.setRowIndicator({
            visible: false
        });
        ...
    },
    ...
};
</script>
...
```


### 순번 표시하기

``` js
export default {
    list: async function (currentPage) {
        return new Promise((resolve) => {
            response.data.resultCode = 0;
            response.data.rowCount = users.rowCount;
            response.data.rows = [];

            var startNo = (currentPage - 1) * 10;
            try {
                for (var i=0; i<10; i++) {
                    users.rows[startNo + i].no = startNo + i + 1;
                    response.data.rows.push(users.rows[startNo + i]);
                }

            } catch (error) {
                // range 에러 무시
            }

            setTimeout(() => resolve(response), 500);
        });
    },
    ...
}
```

``` html
<template>
    ...
</template>

<script>
...
export default {
    ...
    mounted() {
        ...
        this.provider.setFields([
            { fieldName: "no" },
            ...
        ]);
        this.gridView.setColumns([
            { name: "no", fieldName: "no", width: 60 },
            ...
        ]);
        ...
    },
    ...
};
</script>
...
```