# 회원별 게시물 목록 보기

이번 영상에서는 마스터 디테일 표현과 Vue 콤포넌트를 이용해서 코드를 모듈화하는 방법에 대해서 알아봅니다.


## API 및 data 준비

### API 추가 (/src/api/statisYear.js.js)

``` js
import statisYears from '@/data/statisYears'

let response = {
    data: {
        resultCode: 0,
        errorMsg: ""
    }
}

export default {
    list: async function () {
        return new Promise((resolve) => {
            response.data.resultCode = 0;
            response.data.rows = statisYears.rows.sort((a, b) => {
                const tempA = a.year + a.gender;
                const tempB = b.year + b.gender;
                if (tempA > tempB) return 1;
                if (tempA === tempB) return 0;
                if (tempA < tempB) return -1;
            });
            setTimeout(() => resolve(response), 500);
        });
    },
}
```

### 데이터 추가 (src/data/statisYears.js.js)

``` js
export default {
    rows: [
        {
            year: "2020",
            gender: "F",
            level: "비회원",
            count: 300,
        },
        {
            year: "2020",
            gender: "M",
            level: "비회원",
            count: 300,
        },
        {
            year: "2020",
            gender: "F",
            level: "회원",
            count: 100,
        },
        {
            year: "2020",
            gender: "M",
            level: "회원",
            count: 120,
        },
        {
            year: "2020",
            gender: "F",
            level: "VIP",
            count: 10,
        },
        {
            year: "2020",
            gender: "M",
            level: "VIP",
            count: 14,
        },

        {
            year: "2021",
            gender: "F",
            level: "비회원",
            count: 300,
        },
        {
            year: "2021",
            gender: "M",
            level: "비회원",
            count: 300,
        },
        {
            year: "2021",
            gender: "F",
            level: "회원",
            count: 100,
        },
        {
            year: "2021",
            gender: "M",
            level: "회원",
            count: 120,
        },
        {
            year: "2021",
            gender: "F",
            level: "VIP",
            count: 10,
        },
        {
            year: "2021",
            gender: "M",
            level: "VIP",
            count: 14,
        },

        {
            year: "2022",
            gender: "F",
            level: "비회원",
            count: 300,
        },
        {
            year: "2022",
            gender: "M",
            level: "비회원",
            count: 300,
        },
        {
            year: "2022",
            gender: "F",
            level: "회원",
            count: 100,
        },
        {
            year: "2022",
            gender: "M",
            level: "회원",
            count: 120,
        },
        {
            year: "2022",
            gender: "F",
            level: "VIP",
            count: 10,
        },
        {
            year: "2022",
            gender: "M",
            level: "VIP",
            count: 14,
        },
    ]
}
```


## 라우터 관련 준비

### 사이드 메뉴 수정 (/src/components/SideMenu.vue)

``` html
<template>
    <div class="title-area">
        ...
        <div class="client">
                ...
                <el-menu-item-group title="통계">
                    <el-menu-item index="/report/member/year/statistics">
                        <i class="fas fa-list-alt"></i>
                        <span>연도별 회원 비율</span>
                    </el-menu-item>
                    <el-menu-item index="/report/member/gender">
                        <i class="fas fa-list-alt"></i>
                        <span>남녀 성별 회원 비율</span>
                    </el-menu-item>
                </el-menu-item-group>
                ...
        </div>
    </div>
</template>

<script>
...
</script>
...
```

### 라우터 수정 (/src/router/index.js)

``` js
...
const routes = [
    ...
    {
        path: '/report/member/year/statistics',
        component: () => import('@/views/report/member/StatisYear.vue')
    },
    {
        path: '/report/member/gender',
        component: () => import('@/views/report/member/StatisGender.vue')
    },
]
...
```


## 연도별 회원 비율 통계 처리 (StatisYear.vue)

### 그리드 기본 코드 준비

``` js
<template>
    <div class="main-body">
        <div id="realgrid" style="width: 100%; height: 90vh"></div>
    </div>
</template>

<script>
/* eslint-disable */

import apiStatisYear from "@/api/statisYear";

export default {
    mounted() {
        this.provider = new RealGrid.LocalDataProvider();
        this.gridView = new RealGrid.GridView("realgrid");
        this.gridView.setDataSource(this.provider);

        this.provider.setFields([
            { fieldName: "year" },
            { fieldName: "gender" },
            { fieldName: "level" },
            { fieldName: "count" },
        ]);

        this.gridView.setColumns([
            { name: "year", fieldName: "year" },
            { name: "gender", fieldName: "gender" },
            { name: "level", fieldName: "level" },
            { name: "count", fieldName: "count" },
        ]);

        apiStatisYear
            .list()
            .then((response) => {
                this.provider.fillJsonData(response.data.rows, {
                    fillMode: "set",
                });
            })
            .catch((e) => {
                console.log(e);
            });
    },
};
</script>
```

### 셀머지를 통해서 그리드를 단순하게 만들기

``` js
...
<script>
...
export default {
    mounted() {
        ...
        this.gridView.setColumns([
            {
                name: "year", fieldName: "year",
                mergeRule: { criteria: "value" }
            },
            {
                name: "gender", fieldName: "gender",
                mergeRule: { criteria: "value" }
            },
            ...
        ]);
        ...
    },
};
</script>
```


## 남녀 성별 회원 비율 통계 처리 (StatisGender.vue)

### 그리드 기본 코드 준비

``` js
<template>
    <div class="main-body">
        <div id="realgrid" style="width: 100%; height: 90vh"></div>
    </div>
</template>

<script>
/* eslint-disable */

import apiStatisYear from "@/api/statisYear";

export default {
    mounted() {
        this.provider = new RealGrid.LocalDataProvider();
        this.gridView = new RealGrid.GridView("realgrid");
        this.gridView.setDataSource(this.provider);

        this.provider.setFields([
            { fieldName: "year" },
            { fieldName: "gender" },
            { fieldName: "level" },
            { fieldName: "count", dataType: "number" },
        ]);

        this.gridView.setColumns([
            { name: "year", fieldName: "year" },
            { name: "gender", fieldName: "gender" },
            { name: "level", fieldName: "level" },
            { name: "count", fieldName: "count" },
        ]);

        apiStatisYear
            .list()
            .then((response) => {
                this.provider.fillJsonData(response.data.rows, {
                    fillMode: "set",
                });
            })
            .catch((e) => {
                console.log(e);
            });

        this.gridView.groupPanel.visible = true;
        this.gridView.groupBy(["year", "gender"]);
    },
};
</script>
```

### 셀머지

``` js
...
<script>
...
export default {
    mounted() {
        ...
        this.gridView.setColumns([
            {
                name: "year", fieldName: "year",
                mergeRule: { criteria: "value" }
            },
            {
                name: "gender", fieldName: "gender",
                mergeRule: { criteria: "value" }
            },
            ...
        ]);
        ...
    },
};
</script>
```

### 그룹핑 판넬 사용하기

``` js
...
<script>
...
export default {
    mounted() {
        ...
        this.gridView.groupPanel.visible = true;
    },
};
</script>
```
### 그룹핑 컬럼 선택하기

``` js
...
<script>
...
export default {
    mounted() {
        ...
        this.gridView.groupPanel.visible = true;
        this.gridView.groupBy(["year", "gender"]);
    },
};
</script>
```

### 그룹 푸터 동적 계산

#### 콜백 메소드 선언

``` js
...
export default {
    mounted() {
        ...
        this.gridView.setColumns([
            ...
            {
                name: "count", fieldName: "count",
                groupFooter: {
                    valueCallback: this.callbackGroupCount,
                },
            },
        ]);
        ...
    },
    methods: {
        callbackGroupCount(grid, column, groupFooterIndex, group, value) {
            ...
        },
    },
};
</script>
```

#### 콜백 메소드 구현

``` js
...
export default {
    mounted() {
        ...
        this.gridView.setColumns([
            ...
            {
                name: "count", fieldName: "count",
                groupFooter: {
                    valueCallback: this.callbackGroupCount,
                },
            },
        ]);
        ...
    },
    methods: {
        callbackGroupCount(grid, column, groupFooterIndex, group, value) {
            var level = group.level == 1 ? "합계: " : "소계: ";
            var groupModel = grid.getGroupModel(group.index);
            return level + grid.getGroupSummary(groupModel, "count").sum;
        },
    },
};
```

> getGroupSummary 참고 자료: [https://docs.realgrid.com/refs/group-summary](https://docs.realgrid.com/refs/group-summary)
