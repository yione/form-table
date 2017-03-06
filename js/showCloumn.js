/**
 * Created by xiangjie on 17/3/3.
 */
/**
 * Created by xiangjie on 17/3/3.
 */
window.cacheData = [];
function supportLocalStroage() {
    if (!window.localStorage) {
        return false;
    }
    return true;
}
function json2local(key, jsonData) {
    if (!supportLocalStroage()) {
        window.cacheData[key] = jsonData;
        return true;
    }
    try {
        var str = JSON.stringify(jsonData);
        localStorage.setItem(key, str);
        return true;
    } catch (E) {
        console.log(E)
    }
    return false;
}
function text2local(key, jsonText) {
    if (!supportLocalStroage()) {
        window.cacheData[key] = $.parseJSON(jsonText);
        return true;
    }
    try {
        localStorage.setItem(key, jsonText);
        return true;
    } catch (E) {

    }
    return false;
}
function getLocalData(key, dataType) {
    var type = dataType || 'json';
    if (!supportLocalStroage()) {
        return window.cacheData[key];
    }
    var str = localStorage.getItem(key);
    try {
        var result = $.parseJSON(str);
        if (type == 'json') {
            return result;
        }
        var tmp = [];
        for (var k in result) {
            tmp.push(result[k])
        }
        return tmp;
    } catch (e) {
    }
    return '';
}
function showmsg(m, t, func, ot) {
    var title = t || '提示信息',
        message = m || ' ',
        other = ot;
    $.confirm({
        title: title,
        content: message,
        buttons: {
            ok:  {
                text: '确定',
                btnClass: 'btn-blue',
                action:function () {
                    if (typeof (func) == 'function') {
                        var name =  this.$content.find('form').serializeArray();

                        func(name, true, other);
                    }
                }
            },
            close: {
                text: '取消'
            }
        }
    });
}
function showSelectField(tableId) {
    var key = $.md5(location.href.split('?').shift());
    var field = getLocalData(key) || [];
    var button = '<form class="form clearfix">';
    $('#' + tableId + ' thead th').each(
        function (i) {
            var checked = '';
            var cls='btn-default';
            if (field.length == 0 || field.indexOf(i) !== -1) {
                checked = 'checked';
                cls='btn-primary'
            }
            button += '<button type="button" class="column btn '+cls+' col-xs-2"><input type="checkbox" class="hide" name="column[]" ' + checked + ' value="' + i + '">' + $(this).text() + '</button>'
        }
    );
    button += '</form>';
    showmsg(button, '选择显示项目', saveColumn2Local, tableId);
}
function saveColumn2Local(data, state, tableId) {
    if (state) {
        var keys = [];
        for (var k in data) {
            keys.push(parseInt(data[k].value));
        }
        var key = $.md5(location.href.split('?').shift());
        json2local(key, keys);
        reflashColumn(tableId);
    }
    return ;
}
function reflashColumn(tableId) {
    var key = $.md5(location.href.split('?').shift());
    var field = getLocalData(key) || [];
    var column = [];
    $('#' + tableId + ' thead th').each(function (i) {
        column.push(i);
    })
    if (field.length == 0) {
        return false;
    }
    for (var k in column) {
        if (field.indexOf(column[k]) != -1) {
            $('#' + tableId + ' thead th').eq(column[k]).show();
            $('#' + tableId + ' tbody tr').each(function () {
                $(this).find('td').eq(column[k]).show();
            })
            continue;
        }
        $('#' + tableId + ' thead th').eq(column[k]).hide();
        $('#' + tableId + ' tbody tr').each(function () {
            $(this).find('td').eq(column[k]).hide();
        })
    }
    return true;
}
