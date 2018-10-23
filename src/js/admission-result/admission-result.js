/**
 *@desc 录取光荣榜
 *@date 2018/10/23 14:00:45
 *@author zhangziteng
 */

/**
 *@desc 页面初始化
 *@date 2018/10/23 14:14:45
 *@author zhangziteng
 */
// $(function () {
//     tableInit('','');
// });

/**
 *@desc 表格初始化
 *@date 2018/10/23 14:16:40
 *@author zhangziteng
 */

function tableInit(tableUrl) {
    $('#admission-table-all').bootstrapTable({
        url: tableUrl,
        method: requestJson ? 'post' : 'get',                      //请求方式（*）
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        //toolbar: '#toolbar',              //工具按钮用哪个容器
        striped: false,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: false,                   //是否显示分页（*）
        // paginationHAlign:'center',       //分页水平位置
        paginationDetailHAlign:"right",      //分页详细信息位置
        sortName:'admissiontime',                //排序的数据字段名
        sortable: true,                     //是否启用排序
        sortOrder: "desc",                   //排序方式
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                      //初始化加载第一页，默认第一页,并记录
        pageSize: 10,                     //每页的记录行数（*）
        pageList: [10],                   //可供选择的每页的行数（*）
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
        queryParams : function (params) {
            //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            var temp = {
                    rows: params.limit,                         //页面大小
                    // page: (params.offset / params.limit) + 1, //页码
                    examinationnumber:$("#admission-input-search").val()
                    // sort: params.sort,      //排序列名
                    // sortOrder: params.order //排位命令（desc，asc）
                };
                return temp;
        },
        columns: [{
            field: 'schoolname',
            align: 'center',
            title: '学校名称',
            width:300
        }, {
            field: 'volunteers',
            align: 'center',
            title: '专业名称',
            width:300
        },{
            field: 'admissiontime',
            align: 'center',
            title: '录取时间',
            width:200
        }, {
            field: 'briefintroduction',
            title: '  ',
            width: 100,
            align: 'center',
            formatter: function (value,row) {
                //通过formatter可以自定义列显示的内容
                //value：当前field的值，即id
                //row：当前行的数据
                console.log(value);
                console.log(row);
                let a = '<a href="#" id="school-button-info" data-target="#admission-modal-modal" data-toggle="modal">详情</a>';
                $("#admission-modal-info").html('<div class="form-group">' + row + '</div>');
                return a;
            }
        }],
        onLoadSuccess: function (e) {
            // console.log(e)
        },
        onLoadError: function () {
            console.log("数据加载失败！");
        },
        onDblClickRow: function (row, $element) {
        },
        //客户端分页，需要指定到rows
        responseHandler: function (result) {
            console.log(result);
                return result;
        }
    });
}

/**
 *@desc 搜索按钮
 *@date 2018/10/23 14:32:27
 *@author zhangziteng
 */
$("#admission-button-search").click(function () {
    $('#admission-table-all').bootstrapTable("destroy");
    tableInit(AJAX_URL.admissionResult);
});