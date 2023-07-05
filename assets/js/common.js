

let popup = {};
let mPopup = {};

$(function () {
    /*=============================================
        자동완성 비활성
    =============================================*/
    $('input').attr('autocomplete', 'off');

    /*=============================================
    pc / mobile 구분
    =============================================*/
    var filter = "win16|win32|win64|macintel|mac|"; // PC일 경우 가능한 값

    if (navigator.platform) {
        if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
            console.log(filter);
            console.log("모바일에서 접속하셨습니다");
            $("#wrap").addClass('mobile');
        } else {
            $("#wrap").addClass('pc');
        }
    }

    /*=============================================
        Gnb
    =============================================*/
    // let depth1 = $('.lnb_list > li .dp1');
    // let depth2 = $('.lnb_list > li .dp2 > li a')

    // depth1.on('click', function (e) {
    //     e.preventDefault();
    //     $(this).parent().addClass('on').children('.dp2').slideToggle(200);
    //     if (!$(this).children().hasClass('.dp2')) {
    //         $(this).parent().siblings('li').removeClass('on').children('.dp2').slideUp(200);
    //     }
    //     depth2.on('click', function (e) {
    //         e.preventDefault();
    //         $(this).addClass('on').closest('li').siblings('li').children('a').removeClass('on').closest(depth1).siblings('li').find('a').removeClass('on');
    //     })
    // })

    jQuery(function ($) {
        $(".lnb_list li .dp1").click(function () {
            if ($(this).siblings(".dp2").is(":hidden")) {
                $(".lnb_list li").removeClass("on");
                $(this).parent("li").addClass("on");
                $(this).siblings(".dp2").slideDown();
            } else {
                $(this).parent("li").removeClass("on");
                $(this).siblings(".dp2").slideUp();
            }
            //return false;
        });


        $('.lnbopen_btn').click(function () {
            $(this).parent('#lnb').toggleClass('active');
        });

    });

    let dataList = $('.data_list li');
    let dataArea = $('.data_area');

    dataList.on('mouseover', function (e) {
        dataArea.addClass('on')
    })

    $('body').on('click', function () {
        dataArea.removeClass('on')
    })

    $('.navigation').on('click', 'a', function () {
        $(this).addClass('on').siblings().removeClass('on')
    })

    /*=============================================
        TOP BUTTON
    =============================================*/
    let topBtn = $('.top_btn')

    $(window).on('scroll', function () {
        const scroll = document.scrollY || this.document.documentElement.scrollTop;
        // console.log(scroll);
        scroll > 0 ? topBtn.addClass('on') : topBtn.removeClass('on');

        topBtn.on('click', function () {
            window.scroll({
                top: 0,
                behavior: 'smooth'
            });
        })
    })

    /* ==========================================================================
       Main Notice List (W/M)
    ========================================================================== */
    let noticeList = $('.notice_list')
    let num = 0;

    $(function () {
        setInterval(() => {
            num++;
            if (num >= noticeList.find('li').length) {
                num = 0;
            }
            noticeList.css('marginTop', -32 * num + 'px')
        }, 3000);
    })


    /*=============================================
        Pagination
    =============================================*/
    let pagination = $('.pagination li.num');

    pagination.on('click', function () {
        $(this).addClass('on').siblings().removeClass('on');
    })

    /*=============================================
    TAB
    =============================================*/
    var tabMenu = $('.tabs li a');
    var tabContent = $('.tab_contents');

    tabMenu.on('click', function (e) {
        e.preventDefault();
        var idx = tabMenu.index(this);

        $(this).parent().addClass('on').closest('li').siblings('li').removeClass('on');
        tabContent.eq(idx).addClass('on').siblings().removeClass('on');
    });


    /*=============================================
        Table Check Box Select
    =============================================*/

    // $('.list_table.check tbody tr').on('click', function(){
    //     if ( $(this).children('td').find('input').is(':checked')) {
    //         $(this).removeClass('on').children('td').find('input').attr('checked', false)
    //     } else {
    //         $(this).addClass('on').children('td').find('input').attr('checked', true)
    //     }
    // })

    // $('.list_table.check thead th input').on('change', function(){
    //     if ( $(this).is(':checked') ){
    //         $('.list_table.check tbody tr').addClass('on').children('td').find('input').attr('checked', true)
    //     } else {
    //         $('.list_table.check tbody tr').removeClass('on').children('td').find('input').attr('checked', false)
    //     }
    // })

    // input 입력시 btn_del 활성화
    $(document).on(".group_search input", ".text_del input", function () {
        if ($(this).val() == '') {
            $(this).siblings('.btn_del').removeClass('on');
        } else {
            $(this).siblings('.btn_del').addClass('on');
        }
    });
    // btn_del 클릭시 input value 삭제
    $(document).on('click', ".text_del .btn_del", function () {
        $(this).siblings('.form_ctl').val('');
        $(this).removeClass('on');
    });



    /* table fixed ie11 */
    function isIE() {
        return navigator.userAgent.indexOf('MSIE') > -1 || navigator.appVersion.indexOf('Trident/') > -1
    }
    if (isIE()) {
        // Fix table head
        function tableFixHead(ths) {
            var sT = this.scrollTop;
            [].forEach.call(ths, function (th) {
                th.style.transform = "translateY(" + sT + "px)";
            });
        }

        [].forEach.call(document.querySelectorAll(".box_scrolly"), function (el) {
            var ths = el.querySelectorAll("thead th");
            el.addEventListener("scroll", tableFixHead.bind(el, ths));
        });
    }

    /*=============================================
    jquery ui selectmenu
    =============================================*/
    $('select.form_ctl').selectmenu({
        // appendTo: '.selectbox',
    });

    $(window).resize(function () {
        $('select.form_ctl').selectmenu("close");
    });


    /*=============================================
    jquery ui modal
    =============================================*/
    // var arr_pid = [];

    // $.widget("ui.dialog", $.ui.dialog, {
    //     options: {
    //         modal: true,
    //         resizable: false,
    //         draggable: false,
    //         show: {
    //             effect: 'fade',
    //             duration: 500,
    //         },
    //         hide: {
    //             effect: 'fade',
    //             duration: 200
    //         },
    //         showAlertMessage: '', // alert message 옵션 추가
    //         overlayBlock: true, // ui-widget-overlay block 옵션 추가
    //     },
    //     open: function () {
    //         $('body').addClass('ov_hidden');
    //         console.log('modal-open')
    //         if (this.options.showAlertMessage) {
    //             $(this).find('.msg').text(this.options.showAlertMessage);
    //         }
    //         var overlayBlock = this.options.overlayBlock;
    //         var thisId = this.element[0].id;
    //         $(document).on('click', '.ui-widget-overlay', function () {
    //             if (!overlayBlock) {
    //                 $("#" + thisId).dialog('close');
    //             }
    //         });
    //         return this._super();
    //     },
    //     close: function () {
    //         $('body').removeClass('ov_hidden');
    //         $('.pop_alert').remove(); // 버튼 div 여러개 생성 x
    //         $(".ui-widget-overlay").off('click', function () {});
    //         $(document).off('click', '.ui-widget-overlay', function () {

    //         });
    //         return this._super();
    //     },
    //     /*_create: function() {
    //          console.log(this.element);
    //         arr_pid.push(this.element[0].id);
    //         console.log(arr_pid[0]);
    //          // this.element.css( "background-color", this.options.color );

    //          // console.log(this.element, this.options);
    //          return this._super();
    //      }*/

    // });

    $.widget("ui.dialog", $.ui.dialog, {
        options: {
            modal: true,
            resizable: false,
            draggable: false,
            // show: {
            //     effect: 'fade',
            //     duration: 500,
            // },
            // hide: {
            //     effect: 'fade',
            //     duration: 200
            // },
            showAlertMessage: '', // alert message 옵션 추가
            overlayBlock: true, // ui-widget-overlay block 옵션 추가
        },
        open: function () {

            $('body').addClass('ov_hidden');
            if (this.options.showAlertMessage) {
                $(this).find('.msg').text(this.options.showAlertMessage);
            }
            var overlayBlock = this.options.overlayBlock;
            var thisId = this.element[0].id;
            $(document).on('click', '.ui-widget-overlay', function () {
                if (!overlayBlock) {
                    $("#" + thisId).dialog('close');
                }
            });

            return this._super();

        },
        close: function () {
            $('body').removeClass('ov_hidden');
            $('.pop_alert').remove(); // 버튼 div 여러개 생성 x
            $(".ui-widget-overlay").off('click', function () { });
            $(document).off('click', '.ui-widget-overlay', function () {

            });
            return this._super();
        },
        /*_create: function() {
             console.log(this.element);
            arr_pid.push(this.element[0].id);
            console.log(arr_pid[0]);
             // this.element.css( "background-color", this.options.color );

             // console.log(this.element, this.options);
             return this._super();
         }*/

    });

    // 타이틀 html 추가
    $.widget("ui.dialog", $.extend({}, $.ui.dialog.prototype, {
        _title: function (title) {
            var $title = this.options.title || '&nbsp';
            if (("titleIsHtml" in this.options) && this.options.titleIsHtml == true)
                title.html($title);
            else title.text($title);
        }
    }));


    // dialog resize
    $(window).resize(function () {
        $(".ui-dialog-content:visible").each(function () {
            $(this).dialog("option", "position", $(this).dialog("option", "position"));
        });

    });

    //반응형 넓이 값 추가
    $(document).ready(function () {
        var windowWidth = $(window).width();
        var popwidth = $('.ui-dialog').width();
        if (windowWidth < popwidth) {
            $('.ui-dialog').addClass('pop_respon');
        } else {
            $('.ui-dialog').removeClass('pop_respon');
        }
    });


    // alert web message popup
    let alertMsg = function (msg, btn1, btn2) {
        let html_alert = `<div class="popup_alert">
                             <div class="pop_contents">
                                 <div class="txt_box">
                                     <pre>${msg}</pre>
                                 </div>
                             </div>
                         </div>`;

        if (btn1 && btn2 === undefined) {
            $(html_alert).dialog({
                dialogClass: 'alert_popup',
                width: 376,
                height: 192,
                modal: false,
                buttons: [{
                    text: btn1,
                    id: "alertBtn",
                    class: "btn btn_blue",
                    click: function () {
                        $(this).dialog("close");
                    }
                }]
            });
        } else if (btn1 && btn2) {
            $(html_alert).dialog({
                dialogClass: 'alert_popup',
                width: 376,
                height: 192,
                modal: false,
                buttons: [{
                    text: btn1,
                    id: "sucessBtn",
                    class: "btn btn_blue",
                    click: function () {
                        $(this).dialog("close");
                    }
                },
                {
                    text: btn2,
                    id: "cancelBtn",
                    class: "btn btn_gray btn_outline",
                    click: function () {
                        $(this).dialog("close");
                    }
                }
                ]
            });
        } else {
            $(html_alert).dialog({
                dialogClass: 'alert_popup',
                width: 376,
                height: 192,
                modal: false,
                title: '',
                show: {
                    effect: 'bounce',
                    duration: 1000,
                },
                hide: {
                    effect: 'fade',
                    duration: 200
                },
                buttons: [{
                    text: "확인",
                    id: "alertBtn",
                    class: "btn btn_blue",
                    click: function () {
                        $(this).dialog("close");
                    }
                }]
            });
        }
    };

    let mAlertMsg = function (msg, btn1, btn2) {
        let html_alert = `<div class="popup_alert">
                             <div class="pop_contents">
                                 <div class="txt_box">
                                     <pre>${msg}</pre>
                                 </div>
                             </div>
                         </div>`;

        if (btn1 && btn2 === undefined) {
            $(html_alert).dialog({
                dialogClass: 'alert_popup m_popup',
                width: '90%',
                height: 158,
                modal: false,
                buttons: [{
                    text: btn1,
                    id: "alertBtn",
                    class: "btn btn_blue",
                    click: function () {
                        $(this).dialog("close");
                    }
                }]
            });
        } else if (btn1 && btn2) {
            $(html_alert).dialog({
                dialogClass: 'alert_popup m_popup',
                width: '90%',
                height: 158,
                modal: false,
                buttons: [{
                    text: btn2,
                    id: "cancelBtn",
                    class: "btn btn_gray btn_outline",
                    click: function () {
                        $(this).dialog("close");
                    }
                },
                {
                    text: btn1,
                    id: "sucessBtn",
                    class: "btn btn_blue",
                    click: function () {
                        $(this).dialog("close");
                    }
                },

                ]
            });
        } else {
            $(html_alert).dialog({
                dialogClass: 'alert_popup m_popup',
                width: '90%',
                height: 158,
                modal: false,
                show: {
                    effect: 'bounce',
                    duration: 1000,
                },
                hide: {
                    effect: 'fade',
                    duration: 200
                },
                buttons: [{
                    text: "확인",
                    id: "alertBtn",
                    class: "btn btn_blue",
                    click: function () {
                        $(this).dialog("close");
                    }
                }]
            });
        }
    };

    popup.alertMsg = alertMsg;
    mPopup.mAlertMsg = mAlertMsg;

    /*=============================================
    jquery ui autocomplete
    =============================================*/
    // 기본 옵션 추가
    // $.ui.autocomplete.prototype._resizeMenu = function () {
    //     var ul = this.menu.element;
    //     ul.outerWidth(this.element.outerWidth());
    // }
    // $.extend($.ui.autocomplete.prototype.options, {
    //     open: function (event, ui) {
    //         var $input = $(event.target),
    //             $results = $input.autocomplete("widget"),
    //             top = $results.position().top + 3;

    //         $results.css("top", top + "px");
    //     },
    // });


    /*=============================================
        Daterangepicker
    =============================================*/
    let today = moment();

    $(function () {
        $('input.datepicker').daterangepicker({
            singleDatePicker: true,
            autoUpdateInput: false,
            minYear: 1990,
            opens: 'right',
            // showDropdowns: true,
            autoApply: true,
            locale: {
                format: 'YYYY-MM-DD',
                daysOfWeek: ["일", "월", "화", "수", "목", "금", "토"],
                monthNames: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]
            }
        });

        $('input.monthPicker, input.yearPicker').daterangepicker({
            showDropdowns: true,
            singleDatePicker: true,
            autoUpdateInput: false,
            // minYear: 1990,
            opens: 'right',
            autoApply: true,
            locale: {
                format: 'YYYY-MM',
                daysOfWeek: ["일", "월", "화", "수", "목", "금", "토"],
                monthNames: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]
            }
        })
    });

    $('input.datepicker').on('apply.daterangepicker', function (ev, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD'));
    });
    $('input.monthPicker').on('apply.daterangepicker', function (ev, picker) {
        $(this).val(picker.startDate.format('YYYY-MM'));
    });
    $('input.yearPicker').on('apply.daterangepicker', function (ev, picker) {
        $(this).val(picker.startDate.format('YYYY'));
    });
    $('input.datepicker').on('cancel.daterangepicker', function (ev, picker) {
        $(this).val('');
    });

    $('input.datepicker').on('showCalendar.daterangepicker', function (ev, picker) {
        if ($(window).height() < 570) {
            picker.drops = 'up'
        } else {
            picker.drops = 'down'
        }

    });
    $('input.datepicker').on('hide.daterangepicker', function (ev, picker) {

    });

    /*=============================================
        timepicker
    =============================================*/

    $('.timepicker').timepicker({
        //timeFormat: 'hh:mm p',
        timeFormat: 'HH:mm',
        interval: 1,
        // minTime: '10',
        // maxTime: '6:00pm',
        //defaultTime: '00',
        // startTime: '10:00',
        // dynamic: false,
        // dropdown: true,
        maxHour: 24,
        dynamic: false,

        scrollbar: true,
        change: function (time) {
            // console.log(time);
            // the input field
            var element = $(this), text;
            // get access to this Timepicker instance
            var timepicker = element.timepicker();
            // text = 'Selected time is: ' + timepicker.format(time);
            // element.siblings('span.help-line').text(text);
        }
    });




    /*=============================================
        Text limit
    =============================================*/

    $('.limit_num').html("<span class='count'>0</span>/1000")
    $(document).on('propertychange change keyup paste input', '.write_grid textarea', function () {
        var currentVal = $(this).val();
        $(this).siblings('.limit_num').find('.count').html(currentVal.length);
        if (currentVal.length >= 1000) {
            $(this).val(currentVal.substring(0, 1000));
        }
    });

});

/*=============================================
   File Upload
   =============================================*/
// var fileTarget = $('.wrap_file .upload_hidden');
// fileTarget.on('change', function () { // 값이 변경되면
//     if (window.FileReader) { // modern browser
//         if ($(this)[0].files && $(this)[0].files[0]) {
//             var filename = $(this)[0].files[0].name;
//         }
//     } else { // old IE
//         var filename = $(this).val().split('/').pop().split('\\').pop(); // 파일명만 추출
//     };
//     // 추출한 파일명 삽입
//     $(this).siblings('.upload_name').val(filename);
//     showDeleteBtn();
// });

// fileTarget.on({
//     focus: function() {
//         $(this).closest('.wrap_file').addClass('outline');
//     }, focusout: function() {
//         $(this).closest('.wrap_file').removeClass('outline');
//     }
// });
// showDeleteBtn();
// function showDeleteBtn() {
//     //console.log('function 작동시');
//     $('.wrap_file').each(function() {
//         if($(this).find('.upload_name').val() !== '') {
//             if($(this).find('.btn_fileuploade_close').length < 1) {
//                 $(this).append('<button type="button" class="btn_fileuploade_close"></button>');
//             }

//         }
//     });
// };

// $(document).on('click', '.btn_fileuploade_close', function() {
//     $(this).siblings('input[type="file"]').val('');
//     $(this).siblings('input.upload_name').val('');
//     $(this).remove();
// });


jQuery(function ($) {
    var $fileBox = null;

    $(function () {
        init();
    });

    function init() {
        $fileBox = $(".file_up");
        fileLoad();
    }

    function fileLoad() {
        $.each($fileBox, function (idx) {
            var $this = $fileBox.eq(idx),
                $btnUpload = $this.find('[type="file"]'),
                $label = $this.find(".file_label");

            $btnUpload.on("change", function () {
                var $target = $(this),
                    fileName = $(this)[0].files[0].name;
                //$fileText = $target.siblings(".file_name");
                $fileText = $target.siblings(".file_text_wtap").children(".file_text");
                $fileText.val(fileName);
                $fileText.siblings(".file_close").addClass("on");
            });

            $btnUpload.on("focusin focusout", function (e) {
                e.type == "focusin"
                    ? $label.addClass("file_focus")
                    : $label.removeClass("file_focus");
            });
        });
    }

    $(".file_close").click(function () {
        $(this).siblings(".file_text").val('');
        $(this).removeClass("on");
    });

});




/*=============================================
    File Upload
=============================================*/
let fileUpload = {
    init() {
        let fileInput = document.querySelector('#inputUpload');
        let fileList = document.querySelector('#fileList');
        let fileInfo = document.querySelector('.file_info');
        fileInput.addEventListener('change', () => {
            let files = Array.from(fileInput.files)
            files.forEach(file => {
                fileList.innerHTML +=
                    ` <li class="fileItem" id="${file.lastModified}">
                        <p class="fileName">
                            ${file.name}
                        </p>
                        <span>
                            ${file.size < 1024 ? '(' + file.size + 'bytes)' : file.size >= 1024 && file.size < 1048576 ? '(' + (file.size / 1024).toFixed(1) + 'KB)' : file.size >= 1048576 ? '(' + (file.size / 1048576).toFixed(1) + 'MB)' : ''}
                        </span>
                        <button class="icon icon_del" data-index='${file.lastModified}'></button>
                    </li> `
            });

            if (files.length > 0) {
                fileInfo.classList.add('dn')
            }

        });
    },

    removeFile: () => {

        document.addEventListener('click', (e) => {

            if (e.target.className !== 'icon icon_del') return;

            let removeTargetId = e.target.dataset.index;
            let removeTarget = document.getElementById(removeTargetId);
            let files = document.querySelector('#inputUpload').files;
            let dataTranster = new DataTransfer();

            files = Array.from(files).filter(file => file
                .lastModified !== removeTarget);

            Array.from(files)
                .filter(file => file.lastModified != removeTargetId)
                .forEach(file => {
                    dataTranster.items.add(file);
                });

            files = dataTranster.files;

            removeTarget.remove();


        })
    }
}


jQuery(function ($) {

    /* 로그아웃 버튼 */
    $(".user_info .user").click(function () {
        if ($(this).next().is(":hidden")) {
            $(this).addClass("on").next().slideDown();
        } else {
            $(this).removeClass("on").next().slideUp();
        }
        return false;
    });

    /* 스텟 리스트 */
    $(".drive_info .state").click(function () {
        if ($(this).next().is(":hidden")) {
            $(this).addClass("on").next().slideDown();
        } else {
            $(this).removeClass("on").next().slideUp();
        }
        return false;
    });

    $(document).on('click', '.drive_option a', function () {
        $(this).toggleClass('on')
    })

    //push
    $(document).on('click', '.push', function () {
        if (!$(this).hasClass('on')) {
            $(this).addClass('on');
        } else {
            $(this).removeClass('on');
        }
    });

    // date_wrap 배경
    $(document).ready(function () {
        if ($(".date_wrap").find("input:disabled")) {
            $("input:disabled").parent(".date_wrap").addClass("disabled");
        }
        // return result;
    });
});


/* 토스트팝업 */
function toastPop_conf(msg) {
    var contentString = [
        '<div class="toast_popup toastPop_conf toastMsg_success" style="z-index: 999;">',
        '   <div class="toast">',
        '       <p class="confirm_type">',
        '           <i class="icon icon_confirm"></i>',
        '           <span>' + msg + '</span>',
        '       </p>',
        '   </div>',
        '</div>'
    ].join('');

    if (msg !== undefined) {
        if ($('.toastMsg_success').length === 0) {
            $('body').append(contentString);
        }

        $('.toastMsg_success .toast').animate({ bottom: 60, opacity: 1 }, 600).find('.confirm_type span').html(msg);
        setTimeout(function () {
            $('.toastMsg_success .toast').animate({ bottom: -60, opacity: 0 }, 400);
        }, 1500);
    } else {
        $('.toastPop_conf .toast').animate({ bottom: 60, opacity: 1 }, 600);
        setTimeout(function () {
            $('.toast_popup .toast').animate({ bottom: -60, opacity: 0 }, 400);
        }, 1500);
    }
}

function toastPop_err(msg) {
    // console.log($('.toastMsg_error').length)
    var contentString = [
        '<div class="toast_popup toastPop_err toastMsg_error" style="z-index: 999;">',
        '   <div class="toast">',
        '       <p class="error_type">',
        '           <i class="icon icon_error"></i>',
        '           <span>' + msg + '</span>',
        '       </p>',
        '   </div>',
        '</div>'
    ].join('');

    if (msg !== undefined) {
        if ($('.toastMsg_error').length === 0) {
            $('body').append(contentString);
        }

        $('.toastMsg_error .toast').animate({ bottom: 60, opacity: 1 }, 600).find('.error_type span').html(msg);
        setTimeout(function () {
            $('.toastMsg_error .toast').animate({ bottom: -60, opacity: 0 }, 400);
        }, 1500);
    } else {
        $('.toastPop_err .toast').animate({ bottom: 60, opacity: 1 }, 600);
        setTimeout(function () {
            $('.toast_popup .toast').animate({ bottom: -60, opacity: 0 }, 400);
        }, 1500);
    }
}


/* 패스워드 비밀번호 입력*/
$(document).on('click', '.pass_change_wrap .pass_change', function () {
    if (!$(this).hasClass('on')) {
        $(this).addClass('on');
        $(this).siblings('input').attr("type", "text");
    } else {
        $(this).removeClass('on');
        $(this).siblings('input').attr("type", "password");
    }
});

$(document).ready(function () {
    if ($(".pass_change_wrap").find("input:disabled")) {
        $("input:disabled").next(".pass_change").addClass("disabled");
    } else {
        $("input:disabled").next(".pass_change").removeClass("disabled");
    }
});

$(document).ready(function () {
    if ($(".pass_change_wrap").find("input:disabled")) {
        $("input:disabled").next(".pass_change").addClass("disabled");
    } else {
        $("input:disabled").next(".pass_change").removeClass("disabled");
    }
});

