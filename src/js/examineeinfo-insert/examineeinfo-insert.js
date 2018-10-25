/*考生信息录入 刘志杰 2018-10-12*/


$(function () {
    init();
})

/**
 * @Desc 初始化 加载该用户信息
 * @Author 刘志杰
 * @Date 2018-10-25
 */
function init() {
    if (sessionStorage.getItem("user-info")){

    }
    $.ajax({
        url: AJAX_URL.exanineeSelect,
        type: requestJson ? 'get' : 'post',
        data: {"examineekey": "1"},
        dataType: "json",
        // contentType: "application/json;charset=utf-8",
        success: function (result) {
            console.log(result)
            if (result.ok) {
                //给表单赋值
                $("#logininfo-input-userkey").val(result.data[0].userkey)
                $("#logininfo-input-account").val(result.data[0].useraccount);
                $("#logininfo-input-password").val(result.data[0].userpassword)
                $("#basicinfo-input-examineekey").val(result.data[0].examineekey)
                $("#basicinfo-input-quasiexaminationnumber").val(result.data[0].quasiexaminationnumber)
                $("#basicinfo-input-realname").val(result.data[0].realname)
                $("input[name='basicinfo-radio-sex'][value=" + result.data[0].sex + "]").attr("checked", true)
                $("#basicinfo-input-age").val(result.data[0].age)
                $("#basicinfo-input-idcardnumber").val(result.data[0].idcardnumber)
                $("#basicinfo-input-registeredresidence").val(result.data[0].registeredresidence)
                $("#basicinfo-input-politicaloutlook").val(result.data[0].politicaloutlook)
                $("#basicinfo-input-nativeplace").val(result.data[0].nativeplace)
                $("#basicinfo-input-email").val(result.data[0].email)
                $("#basicinfo-input-phonenumber").val(result.data[0].phonenumber)
                $("#basicinfo-input-graduateschool").val(result.data[0].graduateschool)
            } else {
                poptip.alert(data.message);
            }
        }
    })

}

/**
 * @Desc 录入
 * @Author 刘志杰
 * @Date 2018-10-12
 */
function saveInfo() {
    //模态框中填写的考生信息(登录信息，基本信息)
    let examineeObj = {
        "userinformationEO": {
            "userkey": $("#logininfo-input-userkey").val(),
            "useraccount": $("#logininfo-input-account").val(),
            "userpassword": $("#logininfo-input-password").val(),
        },
        "examineeinformationEO": {
            "examineekey": $("#basicinfo-input-examineekey").val(),
            "quasiexaminationnumber": $("#basicinfo-input-quasiexaminationnumber").val(),
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
    // console.log(examineeObj)
    if (requestJson) {
        $("#my-modal").modal("hide");
        poptip.alert(POP_TIP.examineeSuccess);
    } else {
        $.ajax({
            url: AJAX_URL.exanineeInsert,
            type: requestJson ? 'get' : 'post',
            data: JSON.stringify(examineeObj),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                if (data.ok) {
                    $("#my-modal").modal("hide");
                    poptip.alert(POP_TIP.examineeSuccess);
                    $('#my-table').bootstrapTable("refresh");
                } else {
                    poptip.alert(data.message);
                }
            }
        })
    }

}