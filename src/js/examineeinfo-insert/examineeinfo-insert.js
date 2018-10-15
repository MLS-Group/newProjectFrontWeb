/*考生信息录入 刘志杰 2018-10-12*/


$(function () {
    tableInit(AJAX_URL.exanineeSelect)
})


/**
 * @Desc 表格初始化
 * @Author 刘志杰
 * @Date 2018-10-09
 * @param tableUrl 表格获取数据的url地址
 */
function tableInit(tableUrl) {
    $('#my-table').bootstrapTable({
        url: tableUrl,
        method: requestJson ? 'get' : 'post',                      //请求方式（*）
        dataType: "json",
        // height:  $(window).height() - 180,
        //toolbar: '#toolbar',              //工具按钮用哪个容器
        striped: true,                      //是否显示行间隔色
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
        uniqueId: "userkey",                     //每一行的唯一标识，一般为主键列
        showToggle: false,                   //是否显示详细视图和列表视图的切换按钮
        cardView: false,                    //是否显示详细视图
        detailView: false,                  //是否显示父子表
        //得到查询的参数
        queryParams: function (params) {
            //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            var temp = {
                pageSize: params.limit,                         //页面大小
                page: (params.offset / params.limit) + 1,   //页码
                sort: params.sort,      //排序列名
                sortOrder: params.order //排位命令（desc，asc）
            };
            return temp;
        },
        columns: [
            {
                field: 'checkbox',
                checkbox: true,
                visible: false               //是否显示复选框
            }, {
                field: 'examineekey',
                title: '考生主键'
            },
            {
                field: 'quasiexaminationnumber',
                title: '准考证号'
            }, {
                field: 'realname',
                title: '真实姓名'
            }, {
                field: 'sex',
                title: '性别'
            }, {
                field: 'age',
                title: '年龄'
            }, {
                field: 'idcardnumber',
                title: '身份证号'
            }, {
                field: 'registeredresidence',
                title: '户口所在地'
            }, {
                field: 'politicaloutlook',
                title: '政治面貌'
            }, {
                field: 'nativeplace',
                title: '籍贯'
            }, {
                field: 'email',
                title: '邮箱地址'
            }, {
                field: 'phonenumber',
                title: '手机号'
            }, {
                field: 'graduateschool',
                title: '毕业学校'
            }, {
                field: 'userkey',
                title: '用户主键'
            }, {
                field: 'useraccount',
                title: '登录账户'
            }, {
                field: 'userpassword',
                title: '密码'
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
                poptip.alert(POP_TIP.selectFail)
            }

        }
    });
    $('#my-table').bootstrapTable('hideColumn', 'examineekey');
    $('#my-table').bootstrapTable('hideColumn', 'userkey');


}

/**
 * @Desc 点击录入按钮，打开模态框
 * @Author 刘志杰
 * @Date 2018-10-12
 */
function openModal() {
    //清除提示
    $(".alert-warn").text("");
    //清除内容
    $("#my-modal input").val("");
    //打开模态框
    $("#my-modal").modal("show");
    console.log($("input[type='radio'][name='basicinfo-radio-sex']:checked"))
}

/**
 * @Desc 模态框（保存按钮），保存
 * @Author 刘志杰
 * @Date 2018-10-12
 */
function saveInfo() {

    //模态框中填写的考生信息(登录信息，基本信息)
    let examineeObj = {
        "userinformationEO": {
            // "useraccount":$("#logininfo-input-account").val(),
            "userpassword": $("#logininfo-input-password").val(),
        },
        "examineeinformationEO": {
            // "quasiexaminationnumber": $("#basicinfo-input-quasiexaminationnumber").val(),
            "realname": $("#basicinfo-input-realname").val(),
            "sex": $("input[type='radio'][name='basicinfo-radio-sex']:checked").val(),
            "age": $("#basicinfo-input-age").val(),
            "idcardnumber": $("#basicinfo-input-idcardnumber").val(),
            "registeredresidence": $("#basicinfo-input-registeredresidence").val(),
            "politicaloutlook": $("#basicinfo-input-politicaloutlook").val(),
            "nativeplace": $("#basicinfo-input-nativeplace").val(),
            "email": $("#basicinfo-input-email").val(),
            "phonenumber": $("#basicinfo-input-phonenumber").val(),
            "graduateschool": $("#basicinfo-input-graduateschool").val(),
        }
    }
    console.log(examineeObj)
    // $.ajax({
    //     url: AJAX_URL.exanineeInsert,
    //     type: requestJson ? 'get' : 'post',
    //     data: JSON.stringify(examineeObj),
    //     dataType: "json",
    //     contentType: "application/json;charset=utf-8",
    //     success: function (data) {
    //         poptip.alert(POP_TIP.examineeSuccess);
    //         $("#my-modal").modal("hide");
    //         $('#my-table').bootstrapTable('refresh');
    //     }
    // })
}