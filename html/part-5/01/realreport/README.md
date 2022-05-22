# RealReport

[RealReport](https://real-report.com)는 Javascript 리포팅 라이브러리입니다.

RealReport 사용하려면 반드시 제품 [라이선스](https://real-report.com/license)가 필요합니다. 라이선스를 발급 받고 제품을 다운로드하는 더 자세한 방법은 [라이선스 발급](https://real-report.com/license) 페이지를 참조하세요.

## JavaScript 설치

### 다운로드

라이선스 발급 사이트를 통해 다운로드 받은 제품패키지 파일의 압축을 풀면 아래와 같이 realreport 라이브러리 파일과 차트 및 PDF 내보내기를 위한 외부 라이브러리를 포함하고 있습니다.

```sh title="realreport.latest.zip"  
  highcharts
  pdffonts
  pdfkit.js
  realreport
    ⎸⎯ check-checked.png
    ⎸⎯ check-empty.png
    ⎸⎯ check-unchecked.png
    ⎸⎯ indicator.gif
    ⎸⎯ LICENSE.md
    ⎸⎯ README.md
    ⎸⎯ realreport.css
    ⎸⎯ realreport.d.ts
    ⎸⎯ realreport.es.js
    ⎸⎯ realreport.ie11.js
    ⎸⎯ realreport.js
```

:::tip

사용자 프로젝트 디렉토리의 `js` 라는 이름의 디렉토리에 압축을 푼 파일들을 복사했다고 가정하고 설치에 대한 설명을 진행 하겠습니다.

:::

### script tag

HTML에서 RealReport를 사용하려면 `<script>` 태그를 이용해 RealReport의 JavaScript 버전을 포함해 주어야 합니다. `realreport.js` 파일은 다운받은 패키지에 포함되어 있습니다.


```html
<script src='js/realreport.js'></script>
```

realreport.js 파일과 함께 들어 있는 style 파일인 `realreport.css` 도 head 부분에 포함해 줍니다.

```html title="index.html"
<html>
    <head>
        <link href='js/realreport.css' rel='stylesheet' />
        <script src='js/realreport.js'></script>
    </head>
</html>
```

### 라이선스 파일

RealReport의 라이선스를 javascript 파일로 다운받은 경우 라이선스 파일을 `realreport.js` 파일보다 먼저 페이지에 포함해야 합니다. 보통 라이선스 발급 사이트에서 다운받은 라이선스 파일의 이름은 `realreport-lic.js` 입니다.

```html title="index.html"
<html>
    <head>
        <!-- RealReport 라이브러리 및 라이선스 파일 포함하기 -->
        <link href='js/realreport.css' rel='stylesheet' />
        <script src='js/realreport-lic.js'></script>
        <script src='js/realreport.js'></script>
    </head>
</html>
```

### 차트의 사용

RealReport는 [Highcharts](https://www.highcharts.com/)와 협의를 통해 Hicharts를 기본 차트 도구로 사용하고 있습니다. 만약 차트가 포함된 리포트 양식을 출력해야 한다면 아래와 같이 `Highcharts` Javascript 파일도 포함해야 합니다.

```html title="index.html"
<html>
    <head>
        <!-- 하이차트 코드 포함 하기 -->
        <link href='js/highchart/highcharts.css' rel='stylesheet' />
        <script src="js/highchart/highcharts.js"></script>
        <script src="js/highchart/highcharts-more.js"></script>

        <link href='js/realreport.css' rel='stylesheet' />
        <script src='js/realreport-lic.js'></script>
        <script src='js/realreport.js'></script>
    </head>
</html>
```

### PDF 내보내기 기능의 사용

RealReport의 강력한 내보내기 기능중 하나인 PDF 내보내기 기능을 사용하기 위해서는 아래와 같이 `pdfkit` 라이브러리 설치가 필요합니다. 기능의 사용유무를 특정할 수 없기 때문에 메인 파일에 라이브러리 파일을 포함하지 않고 있습니다.

```html title="index.html"
<html>
    <head>
        <link href='js/highchart/highcharts.css' rel='stylesheet' />
        <script src="js/highchart/highcharts.js"></script>
        <script src="js/highchart/highcharts-more.js"></script>
        
        <!-- PDF 라이브러리 포함 하기 -->
        <script src="js/pdfkit.js"></script>

        <link href='js/realreport.css' rel='stylesheet' />
        <script src='js/realreport-lic.js'></script>
        <script src='js/realreport.js'></script>
    </head>
</html>
```

## 자세한 내용은 [RealReport 문서 사이트](https://real-report.com/)를 참조하세요.