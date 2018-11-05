/**
 *@desc 登录页面初始化
 *@date 2018/10/09 14:50:15
 *@author zhangziteng
 */

$(function () {
    $.idcode.setCode();
});

/**
 *@desc 验证码验证
 *@date 2018/10/09 14:50:33
 *@author zhangziteng
 */

(function check($) {
    let settings = {
        e: 'idcode',
        codeType: {name: 'follow', len: 4},//len是修改验证码长度的
        codeTip: '<img class="F5" src="../../images/f5.png" />',
        inputID: 'captchac'//验证元素的ID
    };

    let _set = {
        storeLable: 'codeval',
        store: '#ehong-code-input',
        codeval: '#ehong-code'
    };
    let flag = "验证码错误";
    $.idcode = {
        getCode: function (option) {
            _commSetting(option);
            return _storeData(_set.storeLable, null);
        },
        setCode: function (option) {
            _commSetting(option);
            _setCodeStyle("#" + settings.e, settings.codeType.name, settings.codeType.len);

        },
        validateCode: function (option) {
            console.log(option)
            _commSetting(option);
            let inputV;
            if (settings.inputID) {
                inputV = $('#' + settings.inputID).val();
            } else {
                inputV = $(_set.store).val();
            }
            if (inputV.toUpperCase() == _storeData(_set.storeLable, null).toUpperCase()) {
                //修改的不区分大小写
                return true;
            } else {
                _setCodeStyle("#" + settings.e, settings.codeType.name, settings.codeType.len);
                return flag;
            }
        }
    };

    function _commSetting(option) {
        $.extend(settings, option);
    }

    function _storeData(dataLabel, data) {
        let store = $(_set.codeval).get(0);
        if (data) {
            $.data(store, dataLabel, data);
        } else {
            return $.data(store, dataLabel);
        }
    }

    function _setCodeStyle(eid, codeType, codeLength) {
        let codeObj = _createCode(settings.codeType.name, settings.codeType.len);
        let randNum = Math.floor(Math.random() * 6);
        let htmlCode = '';
        if (!settings.inputID) {
            htmlCode = '<span><input id="ehong-code-input" type="text" maxlength="4" /></span>';
        }
        htmlCode += '<div id="ehong-code" class="ehong-idcode-val ehong-idcode-val';
        htmlCode += String(randNum);
        htmlCode += '" href="#" onblur="return false" onfocus="return false" oncontextmenu="return false" onclick="$.idcode.setCode()">' + _setStyle(codeObj) + '</div>';
        $(eid).html(htmlCode);
        _storeData(_set.storeLable, codeObj);
    }

    function _setStyle(codeObj) {
        let fnCodeObj = [];
        let col = ['#BF0C43', '#E69A2A', '#707F02', '#18975F', '#BC3087', '#73C841', '#780320', '#90719B', '#1F72D8', '#D6A03C', '#6B486E', '#243F5F', '#16BDB5'];
        let charIndex;
        for (let i = 0; i < codeObj.length; i++) {
            charIndex = Math.floor(Math.random() * col.length);
            fnCodeObj.push('<font color="' + col[charIndex] + '">' + codeObj.charAt(i) + '</font>');
        }
        return fnCodeObj.join('');
    }

    function _createCode(codeType, codeLength) {
        let codeObj;
        if (codeType == 'follow') {
            codeObj = _createCodeFollow(codeLength);
        } else if (codeType == 'calc') {
            codeObj = _createCodeCalc(codeLength);
        } else {
            codeObj = "";
        }
        return codeObj;
    }

    function _createCodeCalc(codeLength) {
        let code1,
            code2,
            codeResult;
        let selectChar = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        let charIndex;
        for (let i = 0; i < codeLength; i++) {
            charIndex = Math.floor(Math.random() * selectChar.length);
            code1 += selectChar[charIndex];

            charIndex = Math.floor(Math.random() * selectChar.length);
            code2 += selectChar[charIndex];
        }
        return [parseInt(code1), parseInt(code2), parseInt(code1) + parseInt(code2)];
    }

    function _createCodeFollow(codeLength) {
        let code = "";
        let selectChar = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

        for (let i = 0; i < codeLength; i++) {
            let charIndex = Math.floor(Math.random() * selectChar.length);
            if (charIndex % 2 == 0) {
                code += selectChar[charIndex].toLowerCase();
            } else {
                code += selectChar[charIndex];
            }
        }
        return code;
    }
})(jQuery);

/**
 * 登录按钮
 * 刘笑天 2018-10-15
 * 最后修改 刘笑天 2018-10-19
 */
$("#login-button-examineelogin").click(function () {
    var username = $("#login-input-username").val();
    var password = $("#login-input-password").val();
    $.ajax({
        url: AJAX_URL.examineeLogin,
        type: requestJson ? 'get' : 'post',
        data: {
            "userAccount": username,
            "userPassword": password
        },
        dataType: "json",
        // contentType: "application/json;charset=utf-8",
        success: function (result) {
            if (result.ok) {
                // alert(data.message);
                if (result.data.userrole != '0') {
                    alert(POP_TIP.roleFail);
                    window.location.href = '../login/login.html';
                    return 0;
                }
                sessionStorage.setItem("userInfo", JSON.stringify(result.data));//用户信息存入session
                window.location.href = '../default/default.html';
            } else {
                alert(result.message);
            }
        }
    });
})
;
/**
 * 注册模态框 验证准考证号
 * 若验证成功 下面的文本框才可以输入
 * 刘笑天 2018-10-19
 */
$("#regist-input-examinationnumber").blur(function () {
    var quasiExaminationNumber = $("#regist-input-examinationnumber").val();
    if (quasiExaminationNumber != "") {
        $.ajax({
            url: AJAX_URL.checkExaminationNumber,
            type: "post",
            data: {
                "quasiExaminationNumber": quasiExaminationNumber
            },
            dataType: "json",
            success: function (data) {
                if (data.ok) {
                    alert(data.message);
                    $("#regist-input-username").attr("disabled", false);
                    $("#regist-input-password").attr("disabled", false);
                    $("#regist-input-email").attr("disabled", false);
                    $("#regist-input-phonenumber").attr("disabled", false);
                    $("#regist-input-verfication").attr("disabled", false);
                } else {
                    alert(data.message);
                }
            }
        });
    } else {
    }
    ;
});
/**
 * 注册模态框 注册按钮
 */
$("#regist-button-userreg").click(function () {
    var quasiExaminationNumber = $("#regist-input-examinationnumber").val();
    var userAccount = $("#regist-input-username").val();
    var userPassword = $("#regist-input-password").val();
    var email = $("#regist-input-email").val();
    var phoneNumber = $("#regist-input-phonenumber").val();
    $.ajax({
        url: AJAX_URL.userRegist,
        type: 'post',
        data: JSON.stringify({

            "examineeinformationEO": {
                "email": email,
                "phonenumber": phoneNumber,
                "quasiexaminationnumber": quasiExaminationNumber
            },
            "userinformationEO": {
                "useraccount": userAccount,
                "userpassword": userPassword
            }
        }),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            alert(data.message);
        }
    });
});
