# Vue.js와 리얼그리드로 관리 사이트 만들기


## 개요

Vue.js와 리얼그리드를 이용해서 쉽게 관리자 사이트를 구축하는 방법에 대해서 설명 드리고자합니다.
간단한 커뮤니티 사이트 관리 사이트를 구축하면서 필요한 요소를 조금씩 채워나가는 형식으로 진행할 예정입니다.


## 기능목록

구축하려는 관리 사이트의 기능 목록은 아래와 같습니다.

* 관리자 관리
  * 로그인
  * 목록 보기 / 검색하기
  * 생성 / 수정 / 삭제
  * 비번 찾기 / 수정
* 회원 관리
  * 목록 보기 / 검색하기
  * 수정, 차단
  * 작성 게시물 보기
* 게시물 관리
  * 목록 보기 / 검색하기
  * 상세보기 / 차단
* 신고 관리
  * 목록 보기 / 검색하기 / 신고 사유 필터링
  * 상세보기 / 차단
* 통계
  * 게시물 현황
  * 사용자 가입 현황


## REST API 목록


### 관리자 관리

#### /v1/manager/signin (로그인)
```
method: "POST"
body:
    {
        email: "email",
        pw: "pw"
    }
```

#### /v1/manager/askPassword (비번 찾기)
```
method: "GET"
body:
    {
        email: "email",
    }
```

#### /v1/manager/resetPassword (비번 수정)
```
method: "PATCH"
body:
    {
        email: "email",
        pw: "pw"
    }
```

#### /v1/managers (목록)
```
method: "GET"
```

#### /v1/managers/:id
```
method: "PUT"
body:
    {
        email: "email",
        pw: "pw",
        rule: "관리자/운영자",
        phoneNumber: "phoneNumber"
    }
```


### 회원 관리

#### /v1/users (목록 / 검색)
```
method: "GET"
query:
    {
        page: 0,
        pageSize: 20,
        keyword: "keyword",
        target: "field1, field2, ..." or "" // ""이면 전체 검색
    }
```

#### /v1/users/:id (수정)
```
method: "PUT"
body:
    {
        email: "email",
        pw: "pw",
        name: "name",
        gender: "F/M/?",
        createdAt: "2021-12-12",
        status: "정상/휴면/차단"
    }
```

#### /v1/user/block/:id (차단)
```
method: "PATCH"
body:
    {
        status: "정상/차단"
    }
```

#### /v1/user/articles/:id (작성 게시물)
```
method: "GET"
```


### 게시물 관리

#### /v1/articles (목록 / 검색)
```
method: "GET"
query:
    {
        page: 0,
        pageSize: 20,
        keyword: "keyword",
        target: "field1, field2, ..." or "" // ""이면 전체 검색
    }
```

#### /v1/articles/:id (수정)
```
method: "PUT"
body:
    {
        email: "email",
        pw: "pw",
        name: "name",
        gender: "F/M/?",
        createdAt: "2021-12-12",
        status: "정상/차단"
    }
```

#### /v1/articles/block/:id (차단)
```
method: "PATCH"
body:
    {
        status: "정상/차단"
    }
```


### 신고 관리

#### /v1/reports (목록 / 검색)
```
method: "GET"
query:
    {
        page: 0,
        pageSize: 20,
        keyword: "keyword",
        target: "field1, field2, ..." or "" // ""이면 전체 검색
    }
```

#### /v1/reports/block/user/:id (사용자 차단)
```
method: "PATCH"
body:
    {
        status: "정상/차단"
    }
```

#### /v1/reports/block/article/:id (게시물 차단)
```
method: "PATCH"
body:
    {
        status: "정상/차단"
    }
```


## Vue.js 프로젝트 생성

node.js가 설치되어 있다고 가정한 상태에서의 프로젝트 생성 절차입니다.

### vue-cli 설치

```
C:\..> npm install -g @vue/cli
```

### Vue.js 프로젝트 생성

```
C:\..> vue create realgrid
```

화면 캡쳐를 안한 곳은 디폴트로 선택된 상태에서 엔터 키를 치시면 됩니다.

![](./vue-001.png)

![](./vue-002.png)

![](./vue-003.png)

![](./vue-004.png)

![](./vue-005.png)

![](./vue-006.png)


### 추가 설정

#### 추가 모듈 설치

```
C:\..> cd realgrid
C:\..> npm install --save element-plus
C:\..> npm install --save vuex-persistedstate
```

#### index.html 수정

public 폴더에 있는 index.html 파일을 아래와 같이 수정합니다.
* 다양한 아이콘을 제공하는 font-awesome을 설치합니다.
* 배경색을 변경합니다.

``` html
<!DOCTYPE html>
<html lang="">
  <head>
    ...
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css" />
  </head>
  <body style="background-color: #2D3A4B;">
    ...
  </body>
</html>
```

#### store 수정

store 폴더에 있는 index.js 파일을 아래와 같이 수정합니다.
새로고침이 일어나도 store에 있는 데이터가 사라지지 않도록 로컬 저장소에 데이터를 저장하게 됩니다.

``` js
...
import createPersistedState from 'vuex-persistedstate'

export default createStore({
    ...
    modules: {
    },
    plugins: [createPersistedState()],
})
```

#### App.vue 수정

element plus의 css가 전역에 적용되도록 App.vue 파일에 import 시켜줍니다.

``` html
<template>
    <router-view />
</template>

<script>
import 'element-plus/dist/index.css'

export default {
}
</script>
```

#### main.js 수정

``` js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import ko from 'element-plus/es/locale/lang/ko'

createApp(App)
    .use(store)
    .use(router)
    .use(ElementPlus, {locale: ko})
    .mount('#app')
```

### 실행 및 확인

```
C:\..> npm run serve
```


## 기타

* 디자인 참고: [Vue element admin](https://github.com/PanJiaChen/vue-element-admin)
  * [온라인 데모](https://panjiachen.github.io/vue-element-admin)
* 사용한 아이콘: [Font Awesome](https://fontawesome.com/v5.15/icons?d=gallery&p=1)