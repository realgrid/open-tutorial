# Vue.js와 리얼그리드로 관리 사이트 만들기


## 개요

Vue.js와 리얼그리드를 이용해서 쉽게 관리자 사이트를 구축하는 방법에 대해서 설명 드리고자합니다.
간단한 커뮤니티 사이트 관리 사이트를 구축하면서 필요한 요소를 조금씩 채워나가는 형식으로 진행할 예정입니다.


## 기능목록

구축하려는 관리 사이트의 기능 목록은 아래와 같습니다.

* 사용자 관리
  * 로그인
  * 비번 찾기
  * 비번 수정
  * 목록 보기
* 관리자 관리
  * 목록 보기 / 검색하기
  * 생성 / 수정 / 삭제
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