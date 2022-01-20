# 관리자 목록 마무리


## dropdown 에디터 사용 (/src/views/manager/List.vue)

역활(rule) 필드의 값을 드롭다운 dropdown UI를 이용해서 변경할 수 있도록 컬럼 설정을 변경해 보겠습니다.

``` html
<template>
    ...
</template>

<script>
/* eslint-disable */
...
export default {
    mounted() {
        ...
        this.gridView.setColumns([
            ...
            {
                name: "rule",
                fieldName: "rule",
                editor: {
                    type: "dropdown",
                    domainOnly: true,
                    values: ["기본관리자", "관리자1", "관리자2", "관리자3"],
                    labels: ["기본관리자", "관리자1", "관리자2", "관리자3"],
                },
            },
            ...
        ]);
        ...
    },
    methods: {
        ...
    },
};
</script>

<style scoped>
    ...
</style>
```

## 전화번호 입력/출력 포멧 적용 (/src/views/manager/List.vue)

``` html
<template>
    ...
</template>

<script>
/* eslint-disable */
...
export default {
    mounted() {
        ...
        this.gridView.setColumns([
            ...
            {
                name: "phoneNumber",
                fieldName: "phoneNumber",
                width: 120,
                textFormat: "([0-9]{3})([0-9]{4})([0-9]{4}); $1-$2-$3",
                editor: {
                    type:"text",
                    mask: "000-0000-0000",
                },
            },
            ...
        ]);
        ...
    },
    methods: {
        ...
    },
};
</script>

<style scoped>
    ...
</style>
```


## 자동 필터링 (/src/views/manager/List.vue)

``` html
<template>
    <div class="main-body">
        <div class="toolbar">
            <el-button @click="deleteRow" type="warning">삭제</el-button>
            <el-button v-if="!filtering" @click="setFltering(true)" type="Default">필터 해제됨 </el-button>
            <el-button v-if="filtering" @click="setFltering(false)" type="danger">필터 적용중</el-button>
        </div>
        ...
    </div>
</template>

<script>
/* eslint-disable */
...
export default {
    data() {
        return {
            filtering: false,
        };
    },
    ...
    methods: {
        ...
        setFltering: function (value) {
            this.filtering = value;
            this.gridView.setColumnProperty("rule", "autoFilter", value);
        },
    },
};
</script>

<style scoped>
    ...
</style>
```


## 폼뷰 활용 (/src/views/manager/List.vue)

``` html
<template>
    <div class="main-body">
        <div class="toolbar">
            ...
            <el-button @click="formView.visible=true" type="primary">수정</el-button>
            ...
        </div>
        ...
    </div>
</template>

<script>
/* eslint-disable */
...
export default {
    ...
    mounted() {
        ...
        this.formView = this.gridView._view.container.formView;
        this.formView.visible = false;
        this.formView.options.modal = true;
        this.formView.options.saveLabel = "저장";
        this.formView.options.cancelLabel = "취소";
        this.formView.model.header.height = 40;
        this.formView.options.autoClose = true;

        this.formView.model.load({
            items: [
                { header: "email", column: "email" },
                { header: "비번", column: "pw" },
                { header: "이름", column: "name" },
                { header: "권한", column: "rule" },
                { header: "전화번호", column: "phoneNumber" },
            ],
        });
        ...
    },
    ...
};
</script>

<style scoped>
    ...
</style>
```