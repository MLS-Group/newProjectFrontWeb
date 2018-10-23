/**
 * 报考分析JS
 * 刘笑天 20181022
 */
$(function() {
    $("#signanalysis-table").bootstrapTable({
        url: AJAX_URL.signAnalysis,
        method: 'post',                    //请求方式（*）
        dataType: "json",
        // toolbar: '.main-search-group',              //工具按钮用哪个容器
        // toolbar:"#toolbar",
        // buttonsToolbar:'#search-btn-signanalysis',
        striped: false,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: false,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                      //初始化加载第一页，默认第一页,并记录
        pageSize: 10,                     //每页的记录行数（*）
        pageList: [10],        //可供选择的每页的行数（*）
        search: false,                      //是否显示表格搜索
        strictSearch: true,
        //showColumns: true,                  //是否显示所有的列（选择显示的列）
        showRefresh: false,                  //是否显示刷新按钮
        minimumCountColumns: 2,             //最少允许的列数
        clickToSelect: true,                //是否启用点击选中行
        //height: 500,                      //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
        // uniqueId: "adminssionkey",                     //每一行的唯一标识，一般为主键列
        showToggle: false,                   //是否显示详细视图和列表视图的切换按钮
        cardView: false,                    //是否显示详细视图
        detailView: false,                  //是否显示父子表
        //得到查询的参数
        queryParams: function (params) {
            //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            var temp = {
                pageSize: params.limit,                         //页面大小
                page: (params.offset / params.limit) + 1,   //页码
                // sort: params.sort,      //排序列名
                // sortOrder: params.order, //排位命令（desc，asc）
                // provincename: $("#search-input-schoolname").val(),
                // schoolname: $("#search-input-province").val(),
                // majorname: $("#search-input-major").val()
                // provincename: "天津",
                // schoolname: "天津理工大学",
                // majorname: "数学"
            };
            return temp;
        },
        columns: [{
            checkbox: false,
            visible: false                  //是否显示复选框
        }, {
            field: 'adminssionskey',
            align: 'center',
            title: '序号',
            formatter: function (value, row, index) {
                //通过formatter可以自定义列显示的内容
                //value：当前field的值，即id
                //row：当前行的数据
                return index + 1;
            }
        }, {
            field: 'schoolname',
            align: 'center',
            title: '学校'
        }, {
            field: 'majorname',
            align: 'center',
            title: '专业'
        }, {
            field: 'adminssionsnumber',
            align: 'center',
            title: '计划招生人数'
        }, {
            field: 'adminssionsnumber',
            align: 'center',
            title: '实际招生人数'
        }],
        onLoadSuccess: function (e) {
            console.log(e)
        },
        onLoadError: function () {
            console.log("数据加载失败！");
        },
        onDblClickRow: function (row, $element) {
        },
        //客户端分页，需要指定到rows
        responseHandler: function (result) {
            console.log(result)
            if (requestJson) {
                return result.rows;
            } else {
                return {
                    "rows": result.data.list,
                    "total": result.data.count
                };
            }
        }
    });
});
/**
 * 搜索按钮
 * 刘笑天 20181023
 */
$("#search-btn-signanalysis").click(function () {
    var opt = {
        url: AJAX_URL.signAnalysis,
        silent: true,
        query:{
            provincename: $("#search-input-province").val(),
            schoolname: $("#search-input-schoolname").val(),
            majorname: $("#search-input-major").val()
        }
    };

    $("#signanalysis-table").bootstrapTable('refresh', opt)
});
;