# 관리자 목록의 CRUD 구현


## 백엔드 API 추가 (/src/api/manager.js)

CRUD에 해당하는 API 중 아직 구현이 안된 create, update, delete 메소드를 아래와 같이 추가합니다.

``` js
...
export default {
    ...
    create: async function (manager) {
        let data = {
            email: manager.email,
            pw: manager.pw,
            name: manager.name,
            rule: manager.rule,
            phoneNumber: manager.phoneNumber
        };
        managers.rows.push(data);
        return new Promise((resolve) => {
            response.data.resultCode = 0;
            setTimeout(() => resolve(response), 500);
        });
    },
    update: async function (manager) {
        managers.rows = managers.rows.map((e) => {
            if (e.email === manager.email) {
                e.pw = manager.pw;
                e.name = manager.name;
                e.rule = manager.rule;
                e.phoneNumber = manager.phoneNumber;
            }
            return e;
        });
        return new Promise((resolve) => {
            response.data.resultCode = 0;
            setTimeout(() => resolve(response), 500);
        });
    },
    delete: async function (email) {
        var found = false;
        managers.rows = managers.rows.filter((e) => {
            if (e.email === email) {
                found = true;
            }
            return e.email !== email;
        });
        return new Promise((resolve, reject) => {
            if (found) {
                response.data.resultCode = 0;
                setTimeout(() => resolve(response), 500);
            } else {
                reject();
            }
        });
    },
}
```


## 관리지 DB 수정 (src/data/managers.js)

CRUD 요청에 의해서 데이터를 수정하기 쉽게 하기 위해서 기존의 관리자 DB의 구조를 변경합니다.

``` js
export default {
    rows: [
        {
            email: "admin",
            pw: "81DC9BDB52D04DC20036DBD8313ED055",
            name: "기본관리자",
            rule: "관리자",
            phoneNumber: "000-0000-0000"
        },
        {
            email: "User 1",
            pw: "81DC9BDB52D04DC20036DBD8313ED055",
            name: "관리자1",
            rule: "관리자1",
            phoneNumber: "000-0000-0000"
        },
        {
            email: "User 2",
            pw: "81DC9BDB52D04DC20036DBD8313ED055",
            name: "관리자2",
            rule: "관리자2",
            phoneNumber: "000-0000-0000"
        },
        {
            email: "User 3",
            pw: "81DC9BDB52D04DC20036DBD8313ED055",
            name: "관리자3",
            rule: "관리자3",
            phoneNumber: "000-0000-0000"
        },
    ]
}
```


## 관리자 목록 수정 (/src/views/manager/List.vue)


### 삭제 버튼 추가

그리드 자체내의 삭제를 응용해도 되지만 코드를 보다 간단하게 작성하기 위해서
선택된 데이터를 삭제하기 위해서 버튼을 사용합니다.

``` html
<template>
    <div class="main-body">
        <div class="toolbar">
            <el-button @click="deleteRow" type="danger" round>삭제</el-button>
        </div>

        <div id="realgrid" style="width: 100%; height: 90vh"></div>
    </div>
</template>
...
```

### deleteRow 메소드 추가

``` html
...
<script>
...
export default {
    ...
    methods: {
        deleteRow: async function () {
            let itemIndex = this.gridView.getCurrent().itemIndex;
            if (itemIndex === -1) {
                this.$message.error("편집할 데이터를 선택해주세요.");
                return;
            }

            try {
                await this.$confirm("삭제 하시겠습니까?");
            } catch (e) {
                return;
            }

            apiManagers
                .delete(this.provider.getValue(itemIndex, "email"))
                .then((response) => {
                    console.log(response);
                    this.provider.removeRow(itemIndex);
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    },
</script>
...
```

### md5를 이용해서 비번 감추기

``` html
...
<script>
/* eslint-disable */
import apiManagers from "@/api/manager";
import md5 from 'md5'

export default {
    mounted() {
        ...
        this.gridView.onCellEdited = function (gridView, itemIndex, row, field) {
            if (field === 1) {
                let data = gridView.getValue(itemIndex, 'pw');
                gridView.setValue(itemIndex, 'pw', md5(data));
            }
        }
        ...
</script>
...
```

### 그리드 옵션 추가 설정

그리드에서 데이터를 추가할 수 있도록 하고, 직접 삭제는 할 수 없도록 옵션을 조절합니다.

``` html
...
<script>
...
export default {
    mounted() {
        ...
        this.gridView.editOptions.insertable = true;
        this.gridView.editOptions.appendable = true;
        this.gridView.editOptions.deletable = false;
        ...
</script>
...
```

### onRowUpdated 이벤트를 이용해서 변경사항을 API에 전달하기

``` html
...
<script>
...
export default {
    mounted() {
        ...
        this.provider.onRowUpdated = function (provider, row) {
            apiManagers
                .update(provider.getJsonRow(row))
                .then((response) => {
                    console.log(response);
                })
                .catch((e) => {
                    console.log(e);
                });
        };
        ...
</script>
...
```

### onRowInserted 이벤트를 이용해서 변경사항을 API에 전달하기

``` html
...
<script>
...
export default {
    mounted() {
        ...
        this.provider.onRowInserted = function (provider, row) {
            apiManagers
                .create(provider.getJsonRow(row))
                .then((response) => {
                    console.log(response);
                })
                .catch((e) => {
                    console.log(e);
                });
        };
        ...
</script>
...
```