# 리포트와 데이터 연동하기 (Band Data)

## 개요
여러 개의 레코드(row)를 가지는 table 형식의 데이터를 리포트와 연동하는 방법에 대해서 알아봅니다.

## 리포트 파일 생성
* 동영상 설명 추가 예정

## 기본 코드 준비
* 본 저장소의 /vue.js/part-6/03 폴더의 소스를 기본 토대로 설명을 진행하겠습니다.
* 기본 코드에는 아래와 같은 코드가 준비되어 있습니다.
  * 이전 영상에서 공부했던 리얼리포트와 Vue.js 연동 코드가 준비되어 있습니다.
  * axios를 통해서 서버로부터 데이터를 가져오는 코드가 추가되어 있습니다.
  * 데이터는 dummyjson.com에서 장바구니 데이터 예제를 가져와서 사용할 예정입니다. [https://dummyjson.com/carts](https://dummyjson.com/carts)

## 리포트 파일 가져오기
* R2 디자이너에서 작업한 리포트 파일을 열고 내용을 복사해서 /vue.js/part-6/03/src/data/reportForm.js 파일에 덮어 씁니다.
* 맨 앞에 export default를 추가해서 외부에서 사용할 수 있도록 준비합니다.

``` js
export default {
  리포트 파일에서 가져온 내용
}
```

## 서버에서 데이터 가져와 연동하기

``` js
<template>
  ...
</template>

<script>
/* eslint-disable */

import axios from 'axios';
import reportForm from "./data/reportForm";
// import reportData from "./data/reportData";

export default {
    mounted() {
        this.viewer = new RealReport.ReportViewer("realreport", reportForm);
   
        // 서버로부터 데이터를 가져옵니다.
        axios.get('https://dummyjson.com/carts').then(response => {
            console.log(response.data);
            const data = {
                // 리포트에서 생성한 band 데이터의 이름을 그대로 입력합니다.
                "dataset-1": {
                    // band 데이터의 컬럼 구조와 같은 데이터를 values 속성에 전달합니다.
                    "values": response.data.carts
                }
            }
            
            // 가져온 데이터를 리포트에 적용하고 화면에 표시합니다.
            this.viewer.dataSet = data;
            this.viewer.preview();
        });
    },

    methods: {
      ...
    },
};
</script>
```
