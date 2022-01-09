/** 
 * RealGrid2 Utility
 * 리얼그리드 활용 방법에 대한 예제로 만들어진 함수들 입니다.
 * realgrid-utils 함수들에 대한 기술 지원은 따로 하지 않습니다.
 * 소스 수정 및 배포등 자유롭게 사용하시기 바랍니다.
 */

//컬럼 그룹핑을 위한 레이아웃을 colNames 정보로 생성한다.
function getMultiLevelColumns(colNames) {
    "use strict";

    function leastCommonMultiple(arr) {
            var result = lcm(arr[0], arr[1]);

            for (var i = 2; i < arr.length; i++) {
                    result = lcm(result, arr[i]);
            }

            return result;
    };

    function gcd(a, b) {
            while (b != 0) {
                    var temp = a % b;
                    a = b;
                    b = temp;
            }

            return a;
    };

    function lcm(a, b) {
            return a * b / gcd(a, b);
    };

    //var arrLen = colNames.map(x => x.length); //각 배열의 길이
    var arrLen = colNames.map(function (x) { return x.length }); //각 배열의 길이
    var lcmValue = leastCommonMultiple(arrLen); //최소공배수 

    var parentGrpColObj = {}
    parentGrpColObj.direction = "vertical";
    parentGrpColObj.items = [];
    parentGrpColObj.header = { visible: false };

    for (var i = 0; i < colNames.length; i++) {
            var grpColObj = {};
            grpColObj.direction = "horizontal";
            grpColObj.items = [];
            grpColObj.header = {visible: false};

            for (var j = 0; j < colNames[i].length ; j++) {
                    var cellSpan = lcmValue / colNames[i].length;;
                    var column = {};

                    column.column = colNames[i][j];
                    column.cellSpan = cellSpan;
                    column.width = 50;

                    grpColObj.items.push(column);
                    for (var k = 0; k < cellSpan - 1; k++) {
                            grpColObj.items.push(50);
                    }
            }
            parentGrpColObj.items.push(grpColObj);
    }
    
    return [parentGrpColObj];
}

//필드,컬럼 동적 생성
//조건 > 1 level 구성으로 그룹 컬럼은 지정할 수 없다.
function setFieldsNColumns(provider, grid, columnInfo) {
    var fields = [];

    for (var key in columnInfo) {
        var col = columnInfo[key];

        if (!col.fieldName) {
            col.fieldName = col.name;                
            col.header = col.name;
        };

        if (col && (!col.items)) {
            //field 구성
            var f = {};
            f.fieldName = col.name;
            if (col.tag && col.tag.dataType) f.dataType = col.tag.dataType;                
            fields.push(f);
        };
    };

    provider.setFields(fields);
    grid.setColumns(columnInfo);
};

// 페이지 네비게이션 생성 및 이동 처리
// 이 함수는 JQuery가 사용되었습니다.
function paging(totalData, dataPerPage, pageCount, currentPage){
    console.log("currentPage : " + currentPage);

    var totalPage = Math.ceil(totalData/dataPerPage);    // 총 페이지 수
    var pageGroup = Math.ceil(currentPage/pageCount);    // 페이지 그룹

    console.log("pageGroup : " + pageGroup);

    var last = pageGroup * pageCount;    // 화면에 보여질 마지막 페이지 번호
    if(last > totalPage)
        last = totalPage;
    var first = last - (pageCount-1);    // 화면에 보여질 첫번째 페이지 번호
    var next = last+1;
    var prev = first-1;

    console.log("last : " + last);
    console.log("first : " + first);
    console.log("next : " + next);
    console.log("prev : " + prev);

    var $pingingView = $("#paging");

    var html = "";

    if(prev == 0) {
        html += "<a href=# id='first' class='disabled'>|<</a> ";
        html += "<a href=# id='prev' class='disabled'><</a> ";
    } else {
        html += "<a href=# id='first'>|<</a> ";
        html += "<a href=# id='prev'><</a> ";         
    }


    for(var i=first; i <= last; i++){
        html += "<a href='#' style='width: 50px' id=" + i + ">" + i + "</a> ";
    }

    if(last < totalPage) {
        html += "<a href=# id='next'>></a>";
        html += "<a href=# id='last'>>|</a>";
    } else {
        html += "<a href=# id='next' class='disabled'>></a>";
        html += "<a href=# id='last' class='disabled'>>|</a>";
    }

    $("#paging").html(html);    // 페이지 목록 생성

    $("#paging a").css({"color": "black",
                        "padding-left": "10px"});
                        
    $("#paging a#" + currentPage).css({"text-decoration":"none", 
                                        "color":"red", 
                                        "font-weight":"bold"});    // 현재 페이지 표시
                                        
    $("#paging a").click(function(){
        var $item = $(this);
        var $id = $item.attr("id");
        var selectedPage = $item.text();
        

        if($id == "first")   selectedPage = 1;
        if($id == "next")    selectedPage = next;
        if($id == "prev")    selectedPage = prev;
        if($id == "last")    selectedPage = totalPage;
        
        gridView.setPage(selectedPage-1);
        paging(totalData, dataPerPage, pageCount, selectedPage);
    });
                                    
}

function getColumnsToFormModel(grid){
    var model = { footer: { popupMenu: "menuForm"}, items: []};
    var formModel = model.items;
    var columns = grid.getColumns();

    //IE 11 에서 for of 실행이 안됨
    // for (var dataColumn of columns) {
    //     var f = {};
    //     f.header = dataColumn.header.text;
    //     f.column = dataColumn.name;
    //     formModel.push(f);
    // };    

    for (var col in columns) {
        var f = {};
        f.header = columns[col].header.text;
        f.column = columns[col].name;
        formModel.push(f);
    };    

    return model;
}

// 엑셀 내보내기 실행
// 엑셀 내보내기 사용하려면 소스에 jszip.min.js 인크루드해야 함
function exportExcel(grid){    
    grid.exportGrid({type: 'excel'});
    
};

// column Name이 다른 컬럼이어야 한다.
function setContextMenu(grid) {
    var columns = grid.getColumnNames();
    var row = grid.getCurrent().itemIndex + 1;

    var visibleContextMenu = [];

    for (var i in columns) {
        var menuItem = {};
        var checked;

        var column = grid.columnByName(columns[i]);

        if (column.fieldName) {
            menuItem.label = column.header.text;
            menuItem.tag = column.name;
            menuItem.checked = column.visible;

            visibleContextMenu.push(menuItem);
        }
    };

    visibleContextMenu.push(
        {
                label: "-"
        },    
        {
            label: "컬럼 모두 보기",
            tag: 'columnShow'
        },
        {
            label: "-"
        },    
        {
            label: "현재 컬럼 필터 겨기",
            tag: 'autoFilter'
        }
    );

    //var column = grid.columnByName(grid.getCurrent().column);
    var column = grid.columnByName(grid.getCurrent().column);

    var contextMenu = [
        {
            label: "고정",
            children: [
                {
                    label: "행 1개",
                    tag: '1rowFixed'
                },
                {
                    label: "행 2개",
                    tag: '2rowFixed'
                },            
                {
                label: "현재 행까지("+ row +")",
                tag: 'rowFixed'
                },
                {
                    label: "-"
                },    
                {
                    label: "첫번째 컬럼",
                    tag: '1colFixed'
                },
                {
                    label: "두번째 컬럼",
                    tag: '2colFixed'
                },            
                {
                label: "현재 컬럼까지("+ column.header.text +")",
                tag: 'colFixed'
                },
                {
                    label: "-"
                },    
                {
                label: "고정 취소",
                tag: 'cancelFixed',                    
                enabled: (grid.fixedOptions.rightCount + grid.fixedOptions.colCount + grid.fixedOptions.rowCount) != 0
                }]
        },            
        {
            label: "컬럼",
            tag: "columnMenu",
            children: visibleContextMenu
        },            
        {
            label: "행 높이",
            children: [
                {
                    label: "보통 (28px)",
                    tag: 'rowNormalHeight'
                },
                {
                    label: "좁게 (20px)",
                    tag: 'rowSmallHeight'
                },            
                {
                    label: "넓게 (36px)",
                    tag: 'rowLargeHeight'
                }
            ]
        },            
        {
            label: "-" // menu separator를 삽입합니다.
        },
        {
            label: "ExcelExport",
            tag: 'excelExport'
        }
    ];     
    grid.setContextMenu(contextMenu);
} 

function onContextMenuClick(grid, data, index) {
    var cell = grid.getCurrent();
    var col = grid.columnByName(cell.column);

    // data.parent 에 Tag 속성이 없어 switch문 전에 확인한다.
    // parent에 Tag가 추가되면 switch 문에서 처리하자.
    if (data.parent.label == "컬럼") {
        grid.setColumnProperty(data.tag, "visible", !data.checked);
    }

    switch (data.tag){
        case "1rowFixed" : 
            grid.setFixedOptions({rowCount: 1});
            break;
        case "2rowFixed" :
            grid.setFixedOptions({rowCount: 2});            
            break;
        case "rowFixed" :
            grid.setFixedOptions({rowCount: cell.itemIndex + 1});            
            break;
        case "1colFixed" :
            grid.setFixedOptions({colCount: 1});            
            break;
        case "2colFixed" :
            grid.setFixedOptions({colCount: 2});            
            break;
        case "colFixed" :
            grid.setFixedOptions({colCount: col.index + 1});            
            break;
        case "cancelFixed" :
            grid.setFixedOptions({colCount: 0, rowCount: 0});            
            break;
        case "rowNormalHeight" :
            grid.displayOptions.rowHeight = 28;
            break;
        case "rowSmallHeight" :
            grid.displayOptions.rowHeight = 20;
            break;
        case "rowLargeHeight" :
            grid.displayOptions.rowHeight = 36;
            break;
        case "excelExport" :
            exportExcel(grid);
            break;
        case "autoFilter" :
            {
                col.autoFilter = true;
                grid.refresh();
                break;
            }
        case "columnHide" :
            col.visible = false;
            break;
        case "columnShow" :
            {
                var columns = grid.getColumns();
                for (var i in columns) {
                    columns[i].visible = true;
                }
            };
            break;
    }
};

// 선택된 dataType이 "number"인 셀들의 합계를 반환 한다.
function getSelectionSummary(grid) {
    var sum = 0; 
    var cnt = 0;     
    var selectData = grid.getSelectionData();

    for(var rows in selectData){        
      for(var col in selectData[rows]){
        if(grid.columnByName(col).valueType == "number"){
          sum += selectData[rows][col];
          cnt ++;
        };          
      };
    };
    return sum;
}  

function getMultiLevelColumns (colNames) {
    "use strict";

    function leastCommonMultiple(arr) {
            var result = lcm(arr[0], arr[1]);

            for (var i = 2; i < arr.length; i++) {
                    result = lcm(result, arr[i]);
            }

            return result;
    };

    function gcd(a, b) {
            while (b != 0) {
                    var temp = a % b;
                    a = b;
                    b = temp;
            }

            return a;
    };

    function lcm(a, b) {
            return a * b / gcd(a, b);
    };

    //var arrLen = colNames.map(x => x.length); //각 배열의 길이
    var arrLen = colNames.map(function (x) { return x.length }); //각 배열의 길이
    var lcmValue = leastCommonMultiple(arrLen); //최소공배수 

    var parentGrpColObj = {}
    parentGrpColObj.direction = "vertical";
    parentGrpColObj.items = [];
    parentGrpColObj.header = { visible: false };

    for (var i = 0; i < colNames.length; i++) {
            var grpColObj = {};
            grpColObj.direction = "horizontal";
            grpColObj.items = [];
            grpColObj.header = {visible: false};

            for (var j = 0; j < colNames[i].length ; j++) {
                    var cellSpan = lcmValue / colNames[i].length;;
                    var column = {};

                    column.column = colNames[i][j];
                    column.cellSpan = cellSpan;
                    column.width = 50;

                    grpColObj.items.push(column);
                    for (var k = 0; k < cellSpan - 1; k++) {
                            grpColObj.items.push(50);
                    }
            }
            parentGrpColObj.items.push(grpColObj);
    }
    
    return [parentGrpColObj];
}
