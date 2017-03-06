# form-table
control the table head title
## method
 1. 按钮绑定，点击控制显示的表头 showSelectField
 2. 自动执行 reflashColumn方法  参数为表格ID
```
$(function () {
        // bind the button and use the table id which your want show or hide 
        $(".box-header").on('click', '#showField', function () {
            showSelectField('form-table');
        });
        //
        reflashColumn('form-table');
        $('body').on('click', '.column', function () {
            if ($(this).hasClass('btn-default')) {
                $(this).removeClass('btn-default').addClass('btn-primary');
                $(this).find('input').attr('checked', true)
            } else {
                $(this).removeClass('btn-primary').addClass('btn-default');
                $(this).find('input').attr('checked', false)
            }
        });
    })
    ```
