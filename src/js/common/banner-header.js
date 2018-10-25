/**
 *@desc banner js
 *@date 2018/10/22 10:54:30
 *@author zhangziteng
 */

/**
 *@desc 修改密码
 *@date 2018/10/22 10:55:07
 *@author zhangziteng
 */
$("#update-button-ok").click(function () {
    console.log("11111");
    // var oldpassword = $("#update-input-oldpassword").val();
    var newpassword = $("#update-input-newpassword").val();
    var userKey = '1';
    $.ajax({
        url: AJAX_URL.updatePassword,
        type: requestJson ? 'get' : 'put',
        data: JSON.stringify({
            // "": oldpassword,
            "userkey": userKey,
            "userpassword": newpassword
        }),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success:function (data) {
            if (data.ok) {
                // alert(data.message);
                // window.location.href = '../default/default.html';
                poptip.alert(POP_TIP.updateSuccess);
            } else {
                poptip.alert(POP_TIP.updateFail);
            }
        }
    });
});

/**
 *@desc 旧密码校验
 *@date 2018/10/22 13:50:59
 *@author zhangziteng
 */

$("#update-input-oldpassword").blur(function () {
    console.log("1111");
    var password = $("#update-input-oldpassword").val();
    var userkey = "1";
    $.ajax({
        url: AJAX_URL.checkPassword,
        type: requestJson ? 'get' : 'post',
        data: JSON.stringify({
            "userkey": userkey,
            "userpassword": password
        }),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success:function (data) {
            console.log(data.message);
            if (data.ok) {
                // alert(data.message);
                // window.location.href = '../default/default.html';
                poptip.alert(POP_TIP.checkPasswordsuccess);
            } else {
                poptip.alert(POP_TIP.checkPasswordfail);
            }
        }
    });
});
/**
 * 退出登录
 * 刘笑天 20181024
 */
$("#logout-li-userlogout").click(function () {
/*    //得到session
    sessionStorage.getItem("userInfo");*/
    console.log(sessionStorage.getItem("userInfo"));
    //删除item
    sessionStorage.removeItem("userInfo");
    //清除数据-----删除所有同源的本地存储的localStorage数据
    localStorage.clear();
    //清除数据-----只清空当前会话存储的数据
    sessionStorage.clear();
    if (sessionStorage.length == 0) {
        window.location.href = '../login/login.html';
    } else {
        alert("注销失败");
    }


});