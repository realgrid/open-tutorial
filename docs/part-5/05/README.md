# React 연동하기

## React 프로젝트 생성

### React 개발환경 준비하기

React 개발환경을 준비하기 위해서는 NodeJS 설치가 필요합니다.
아래의 영상의 초반부를 참고하시기 바랍니다.

* [https://github.com/realgrid/open-tutorial/raw/main/docs/part-3/01/youtube-01.jpg](https://github.com/realgrid/open-tutorial/raw/main/docs/part-3/01/youtube-01.jpg)

### React 프로젝트 생성하기

```
C:..> npx create-react-app realreport
```

## 기본 코드 준비

### 리얼리포트 기본 코드 복사

아래 링크를 클릭하고 기본 코드를 다운받고 압축을 해제합니다.
* [기본코드 다운받기](https://github.com/realgrid/open-tutorial/raw/main/realreport.zip)

### 라이브러리 파일 복사

![](./pic-1.png)
* 다운받은 기본코드 폴더에서 index.html을 제외한 나머지 파일을 Vue의 public 폴더로 복사합니다.

### index.html 수정

``` html
<!DOCTYPE html>
<html lang="en">
    <head>
        ...
        <script type="text/javascript" src="/js/pdfkit.js"></script>

        <link href="/highcharts/highcharts.css" rel="stylesheet" />
        <script src="/highcharts/highcharts.js"></script>
        <script src="/highcharts/highcharts-more.js"></script>

        <link href="/realreport/realreport.css" rel="stylesheet" />
        <script src="/realreport/realreport-lic.js"></script>
        <script type="text/javascript" src="/realreport/realreport.js?v=4"></script>

        <script src="/fonts/malgun.js"></script>
        <script src="/fonts/malgun-bold.js"></script>

        <title>React App</title>
    </head>
    <body>
        ...
    </body>
</html>
```

### 리포트 폼 및 데이터 파일 복사

* src 밑에 data 폴더를 생성하고 아래 두 파일을 복사합니다.
  * [리포트 폼 파일 복사](https://github.com/realgrid/open-tutorial/blob/main/react/part-5/05/src/data/reportForm.js)
  * [리포트 데이터 파일 복사](https://github.com/realgrid/open-tutorial/blob/main/react/part-5/05/src/data/reportData.js)


## 실습

### 리얼리포트 표시하기

#### components/preview.js

``` js
import React from "react";

/* eslint-disable */

import reportForm from "../data/reportForm";
import reportData from "../data/reportData";

class Preview extends React.Component {
    componentDidMount() {
        this.viewer = new RealReport.ReportViewer("realreport", reportForm);
        this.viewer.dataSet = reportData;
        this.viewer.preview();
    }

    render() {
        return (
            <div id="realreport"></div>
        );
    }
}

export default Preview;
```

#### App.js

``` js
import Preview from './components/preview';
import './App.css';

function App() {
  return (
    <Preview />
  );
}

export default App;
```

### 리포트 출력하기 (components/preview.js)

``` js
import React from "react";

/* eslint-disable */

import reportForm from "../data/reportForm";
import reportData from "../data/reportData";

class Preview extends React.Component {
    componentDidMount() {
        this.viewer = new RealReport.ReportViewer("realreport", reportForm);
        this.viewer.dataSet = reportData;
        this.viewer.preview();
    }

    // 이벤트 콜백함수에서 this를 쓰려면 고려사항이 있습니다
    // 아래 링크를 참고하세요.
    // https://ko.reactjs.org/docs/handling-events.html
    print = () => {
        const container = printPreview.contentWindow.document.getElementById("realreport");
        container.innerHTML = this.viewer.getHtml();
        printPreview.contentWindow.print();
    }

    render() {
        return (
            <div>
                <div style={{ height: '32px', position: 'fixed' }}>
                    <button onClick={ this.print }>print</button>
                </div>
                <div style={{ height: '32px '}}></div>

                <div id="realreport" className="scroller"></div>

                <iframe id="printPreview"src="/print.html" style={{ display: 'none' }}></iframe>
            </div>
        );
    }
}

export default Preview;
```
