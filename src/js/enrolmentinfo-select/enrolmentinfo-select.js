/**
 * 招生信息模块
 *  宣文彬
 *  2018-10-20
 */

$(function () {
    tableInit(AJAX_URL.enrolmentinfoSelectData)
})


/**
 * @Desc 表格初始化
 * @Author 宣文彬
 * @Date 2018-10-22
 * @param tableUrl 表格获取数据的url地址
 */
function tableInit(tableUrl) {
    // $('#show-table-enrolmentinfo').bootstrapTable('destroy');
    $('#show-table-enrolmentinfo').bootstrapTable({
        url: tableUrl,
        method: requestJson ? 'get' : 'post',                      //请求方式（*）
        dataType: "json",
        //toolbar: '#toolbar',              //工具按钮用哪个容器
        striped: false,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: false,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        sidePagination: requestJson ? "client" : "server",           //分页方式：client客户端分页，server服务端分页（*）
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
        uniqueId: "ID",                     //每一行的唯一标识，一般为主键列
        showToggle: false,                   //是否显示详细视图和列表视图的切换按钮
        cardView: false,                    //是否显示详细视图
        detailView: false,                  //是否显示父子表
        //得到查询的参数
        queryParams: function (params) {
            console.log($("#select-input-school").val())
            //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            var temp = {
                rows: params.limit,                         //页面大小
                page: (params.offset / params.limit) + 1,   //页码
                sort: params.sort,      //排序列名
                sortOrder: params.order, //排位命令（desc，asc）
                schoolname:$("#select-input-school").val(),
                majorname: $("#select-input-major").val(),
                provincename: $("#select-input-province").val()
            };
            return temp;
        },
        columns: [{
            checkbox: true,
            visible: true                  //是否显示复选框
        }, {
            align: 'center',
            field: 'number',
            title: '序号',
            formatter: function (value, row, index) {
                //通过formatter可以自定义列显示的内容
                //value：当前field的值，即id
                //row：当前行的数据
                return index + 1;
            }
        }, {
            align: 'center',
            field: 'schoolname',
            title: '学校名称'
        }, {
            align: 'center',
            field: 'majorname',
            title: '专业名称'
        }, {
            align: 'center',
            field: 'adminssionsnumber',
            title: '招生人数'
        }, {
            align: 'center',
            field: 'publishtime',
            title: '发布时间'
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
            // console.log(result)
            if (result.ok) {
                if (requestJson) {
                    return result.rows;
                } else {
                    return {
                        "rows": result.data.list,
                        "total": result.data.count
                    };
                }
            } else {
                poptip.alert(result.message)
            }

        }
    });
}

//学校，专业，省份 查询事件
$("#search-button").click(function () {

    tableInit(AJAX_URL.enrolmentinfoSelectData);

// var selectObj = {  //查询 选择的信息
//     "schoolname": $("#select-input-school").val(),
//     "majorname": $("#select-input-major").val(),
//     "provincename": $("#select-input-province").val()
// };
// $.ajax({
//     url: AJAX_URL.enrolmentinfoSelectData,
//     type: requestJson ? 'get' : 'post',
//     data: {
//         "schoolname": $("#select-input-school").val(),
//         "majorname": $("#select-input-major").val(),
//         "provincename": $("#select-input-province").val()
//     },
//     dataType: "json",
//     contentType: "application/json;charset=utf-8",
//     success: function (data) {
//         console.log(data);
//         if (data.ok) {
//             // console.log(data);
//             // poptip.alert(POP_TIP);
//             // tableInit(AJAX_URL.enrolmentinfoSelectData);
//             // $('#show-table-enrolmentinfo').bootstrapTable('destroy');
//             // $('#show-table-enrolmentinfo').bootstrapTable("load",data.data.list)
//             $('#show-table-enrolmentinfo').bootstrapTable("refresh");
//         }
//     }
// })
})







