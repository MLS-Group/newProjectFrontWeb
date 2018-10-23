/**
 *@desc 考生报考志愿
 *@date 2018/10/15 09:22:49
 *@author zhangziteng
 */

/**界面初始化
 *@desc
 *@date 2018/10/15 10:01:53
 *@author zhangziteng
 */
$(function () {
    tableInit(AJAX_URL.applyVolunteer);
});

/**
 *@desc 报考志愿列表
 *@date 2018/10/15 10:02:53
 *@author zhangziteng
 */
function tableInit(tableUrl) {
    $('#volunteer-table-all').bootstrapTable({
        url: tableUrl,
        method: requestJson ? 'post' : 'get',                      //请求方式（*）
        // dataType: "json",
        contentType: "application/json;charset=utf-8",
        //toolbar: '#toolbar',              //工具按钮用哪个容器
        striped: false,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: false,                   //是否显示分页（*）
        // paginationHAlign:'center',       //分页水平位置
        paginationDetailHAlign:"right",      //分页详细信息位置
        sortName:'declaretime',                //排序的数据字段名
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
                // rows: params.limit,                         //页面大小
                examinationnumber:'20115939',
                // page: (params.offset / params.limit) + 1,   //页码
                // pageSize:10,
                // sort: params.sort,      //排序列名
                // sortOrder: params.order //排位命令（desc，asc）
            };
            return temp;
        },
        columns: [{
            checkbox: true,
            visible: true                  //是否显示复选框
        }, {
            field: 'schoolname',
            title: '准考证号',
            align: 'center',
            width:200
        }, {
            field: 'schoolname',
            title: '志愿编号',
            align: 'center',
            width:200
        }, {
            field: 'SchoolInformationEO.schoolname',
            title: '学校名称',
            align: 'center',
            width:300
        },{
            field: 'MajorInformationEO.majorname',
            title: '专业名称',
            width:200
        },{
            field: 'declaretime',
            title: '申报时间',
            align: 'center',
            width:200
        }
            // ,{
            //     field:'ID',
            //     title: '操作',
            //     width: 220,
            //     align: 'center',
            //     valign: 'middle',
            //     formatter:function(value,row,index){
            //         //通过formatter可以自定义列显示的内容
            //         //value：当前field的值，即id
            //         //row：当前行的数据
            //         // let a = '<a href="#" onclick="openContinueModal()" data-target="#allproblem-continue" data-toggle="modal">继续提问</a>';
            //         let b = '<a href="#" onclick="openAllModal()" id="check-allproblem" data-target="#allproblem" data-toggle="modal">修改</a>';
            //         let c = '<a href="#" onclick="openDeleteModal()">删除</a>';
            //         return b +'   '+ c;
            //     }
        ],
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
 *@desc 申报按钮初始化
 *@date 2018/10/23 16:48:33
 *@author zhangziteng
 */
function AddVolunteerModal() {
    // $("#add-input-school").val('');
    // $("#add-input-discipline").val('');
    // $(".alert-warn").text("");
    $.ajax({
        url: AJAX_URL.schoolVolunteer,
        type: 'post',
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            console.log(data);
        }
    })
}
/**
 *@desc 修改按钮
 *@date 2018/10/23 16:48:47
 *@author zhangziteng
 */
function AlterVolunteerModal() {

}
/**
 *@desc 批量删除
 *@date 2018/10/23 16:49:17
 *@author zhangziteng
 */
function DeleteVolunteer() {

}

/**
 *@desc 申报提交数据按钮
 *@date 2018/10/23 17:12:20
 *@author zhangziteng
 */
$("#add-button-submit").click(function () {
    var Obj = {
        "examinationnumber":20115939,
        "volunteernumber":$("#add-input-years").val(),
        "schoolkey":1,
        "majorkey":2
    };
    $.ajax({
        url: AJAX_URL.addVolunteer,
        type: requestJson ? 'get' : 'post',
        data: Obj,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            if (data.ok) {
                $("#add-volunteer-modal").modal("hide");
                poptip.alert(POP_TIP.examineeSuccess);
                $('#volunteer-table-all').bootstrapTable("refresh");
            } else {
                poptip.alert(data.message);
            }
        }
    })
});
