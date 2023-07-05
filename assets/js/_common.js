var lmsModule = {};



$(function () {
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
   //  var nav_gnb = $('.nav_gnb > li');
   //  var gnb_2depth = nav_gnb.find('.gnb_2depth');
   //  var overlay = $('#header .overlay');
   //  var fadeTime = 200;

   //  var idx_1depth, idx_2depth;

   //  $('.inner').on('mouseenter', '.nav_gnb > li ', function () {

   //      var depth2 = $('.nav_gnb > li:first-child .gnb_2depth li');
   //      let minHeightValue = 224;

   //      overlay.fadeIn(fadeTime);
   //      idx_1depth = nav_gnb.index(this);
   //      nav_gnb.removeClass().eq(idx_1depth).addClass('active');
   //      gnb_2depth.fadeIn(fadeTime).find('>li').removeClass('active');

   //      if (depth2.length >= 5 && depth2.length <= 6) {
   //          overlay.css('height', minHeightValue * 1.5 + 'px')
   //      } else if (depth2.length >= 7) {
   //          overlay.css('height', minHeightValue * 2 + 'px')
   //      }

   //  })

   //  $(document).on('mouseleave', '.nav_gnb', function () {
   //      overlay.fadeOut(fadeTime);
   //      nav_gnb.removeClass();
   //      gnb_2depth.fadeOut(fadeTime);
   //  })

    /*=============================================
        Gnb
    =============================================*/
    let depth1 = $('.lnb_list > li');
    let depth2 = $('.lnb_list > li .dp2 > li a')

    // depth1.on('click', function(e){
    //   e.preventDefault();
    //   $(this).addClass('on').siblings('li').removeClass('on').find('.dp2 li a').removeClass('on');
    //   depth2.on('click', function(e){
    //      e.preventDefault();
    //      $(this).addClass('on').closest('li').siblings('li').children('a').removeClass('on');
    //   })      
    // })

    depth1.on('click', function(e){
      e.preventDefault();
      $(this).addClass('on').children('.dp2').slideDown(200)
      if ( !$(this).children().hasClass('.dp2') ){
        $(this).siblings('li').removeClass('on').children('.dp2').slideUp(200)
      }
      depth2.on('click', function(e){
         e.preventDefault();
         $(this).addClass('on').closest('li').siblings('li').children('a').removeClass('on').closest(depth1).siblings('li').find('a').removeClass('on');
      })      
    })

    /*=============================================
        Pagination
    =============================================*/
    let pagination = $('.pagination li.num')

    pagination.on('click', function(){
        $(this).addClass('on').siblings().removeClass('on')
    })



   //  $(document).on('mouseenter', '.lst_member li > a', function () {
   //      $(this).next().addClass('on');
   //  });
   //  $(document).on('mouseleave', '.group_userinfo', function () {
   //      $(this).removeClass('on');
   //  });
   //  $(document).on('click', '.group_userinfo .btn_close', function () {
   //      $(this).closest('.group_userinfo').removeClass('on');
   //  });

   

   /*=============================================
	TAB
	=============================================*/
    var tabMenu = $('.tabs li a');
    var tabContent = $('.tab_contents');

    tabMenu.on('click', function (e) {
      console.log(e)
        e.preventDefault();
        var idx = tabMenu.index(this);

        $(this).parent().addClass('on').closest('li').siblings('li').removeClass('on');
        tabContent.eq(idx).addClass('on').siblings().removeClass('on');
    });

    // var tabMenu_in = $('.tabs_in li a');
    // var tabContent_in = $('.tab_contents_in');

    // tabMenu_in.on('click', function (e) {
    //     e.preventDefault();
    //     var idx = tabMenu_in.index(this);

    //     $(this).addClass('on').closest('li').siblings().children('a').removeClass('on');
    //     tabContent_in.eq(idx).addClass('on').siblings().removeClass('on');
    // });

 
    /*=============================================
    File Upload
    =============================================*/


    var fileTarget = $('.wrap_file .upload_hidden');

    // fileTarget.on('change', function () { // 값이 변경되면
    //     if (window.FileReader) { // modern browser
    //         if ($(this)[0].files && $(this)[0].files[0]) {
    //             var filename = $(this)[0].files[0].name;
    //             $(this).siblings('.upload_name').val(filename);
    //         }
    //     } else { // old IE
    //         var filename = $(this).val().split('/').pop().split('\\').pop(); // 파일명만 추출
    //         $(this).siblings('.upload_name').val(filename);
    //     };
    //     // 추출한 파일명 삽입

    //     showDeleteBtn();
    // });
    
    $(document).on('change','.wrap_file .upload_hidden', function () { // 값이 변경되면
        if (window.FileReader) { // modern browser
            if ($(this)[0].files && $(this)[0].files[0]) {
                var filename = $(this)[0].files[0].name;
                $(this).siblings('.upload_name').val(filename);
            }
        } else { // old IE
            var filename = $(this).val().split('/').pop().split('\\').pop(); // 파일명만 추출
            $(this).siblings('.upload_name').val(filename);
        };
        // 추출한 파일명 삽입

        showDeleteBtn();
    });

    fileTarget.on({
        focus: function () {
            $(this).closest('.wrap_file').addClass('outline');
        },
        focusout: function () {
            $(this).closest('.wrap_file').removeClass('outline');
        }
    });

    function showDeleteBtn() {
        console.log('function 작동시');
        $('.wrap_file').each(function (e) {
            if ($(this).find('.upload_name').val() !== '') {
                if ($(this).find('.btn_fileuploade_close').length < 1) {
                    $(this).append('<button type="button" class="btn_fileuploade_close"></button>');
                }
            }
        });
    };

    $(document).on('click', '.btn_fileuploade_close', function () {
        $(this).siblings('input[type="file"]').val('');
        $(this).siblings('input.upload_name').val('');
        $(this).remove();
    });



    // input 입력시 btn_del 활성화
    $(document).on("propertychange change keyup paste input", ".group_search input", function () {
        if ($(this).val() == '') {
            $(this).siblings('.btn_del').removeClass('on');
        } else {
            $(this).siblings('.btn_del').addClass('on');
        }
    });
    // btn_del 클릭시 input value 삭제
    $(document).on('click', '.group_search .btn_del', function () {
        $(this).siblings('.form_control').val('');
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
    $('select.form_ctl').selectmenu();
    $(window).resize(function () {
        $('select.form_ctl').selectmenu("close");
    });

    /*=============================================
    jquery ui sortable
    =============================================*/
    // 테이블 정렬
    $(".lst_control .content").sortable({
        connectWith: ".lst_control .content",
        placeholder: "ui-state-highlight",
        delay: 150,
        axis: "y",
        containment: "parent",
        handle: ".btn_move",
        // cancel: "",
        stop: function (e, ui) {
            fn_menuOrder();
        }
    }).disableSelection();

    /*=============================================
    jquery ui modal
    =============================================*/
    var arr_pid = [];

    $.widget("ui.dialog", $.ui.dialog, {
        options: {
            modal: true,
            resizable: false,
            draggable: false,
            // maxWidth: $(window).width(),
            // maxHeight: $(window).height(),
            show: {
                effect: 'fade',
                duration: 500,
            },
            hide: {
                effect: 'fade',
                duration: 200
            },
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
            $(".ui-widget-overlay").off('click', function () {});
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

    /*=============================================
    reply (댓글)
    =============================================*/
    // $(document).on('click', '.reply_list .text_area .btn_wrap .btn_reply', function () {
    //     if (!$(this).closest('.btn_wrap').siblings('.reply').hasClass('on')) {
    //         $('.reply_list .text_area .reply').removeClass('on');
    //         $(this).closest('.btn_wrap').siblings('.reply').addClass('on');
    //     } else {
    //         $(this).closest('.btn_wrap').siblings('.reply').removeClass('on');
    //     }
    // })

    // $(document).on('click', '.reply_list .text_area .btn_wrap .btn_toggle', function () {
    //     $(this).closest('.reply').removeClass('on');
    // })

    // $(document).on('propertychange change keyup paste input', '.reply_list textarea', function () {
    //     var currentVal = $(this).val();
    //     $(this).siblings('.option').find('.text_size .count').html(currentVal.length);
    //     if (currentVal.length >= 300) {
    //         $(this).val(currentVal.substring(0, 300));
    //     }
    // });

    /*=============================================
    question (문제 채점)
    =============================================*/
    // var lst_question = $('.lst_question dt');
    // lst_question.removeClass('on').siblings('dd').hide();
    // lst_question.eq(0).addClass('on').siblings('dd').show();
    // $(document).on('click', '.lst_question dt', function() {
    //     if($(this).hasClass('on')){
    //         $(this).removeClass('on').siblings('dd').slideUp(300);
    //     }else{
    //         lst_question.removeClass('on').siblings('dd').slideUp(300);
    //         $(this).addClass('on').siblings('dd').slideDown(300);
    //     }
    // })

    // dialog resize
    $(window).resize(function () {
        // $(".pop_wrap").dialog("option", "position", {my: "center", at: "center", of: window});
        $(".ui-dialog-content:visible").each(function () {
            /* 21.09.30 팝업기능 수정 */
            $(this).dialog("option", "position", $(this).dialog("option", "position"));
            // $(this).dialog("option", "maxWidth", $(window).width());
            // $(this).dialog("option", "maxHeight", $(window).height());
        })
    });

    // alert message popup
    var alertMessage = function (msg, btn1, btn2) {
        var html_alert = '<div class="pop_wrap alert_msg">' +
            '<div class="pop_contents">' +
            '<p class="msg">' + msg + '</p>' +
            '</div>' +
            '</div>';

        if (btn1 && btn2 === undefined) {
            $(html_alert).dialog({
                dialogClass: 'pop_alert',
                buttons: [{
                    text: btn1,
                    id: "alertBtn",
                    class: "btn btn_darkgray",
                    click: function () {
                        $(this).dialog("close");
                    }
                }]
            });
        } else if (btn1 && btn2) {
            $(html_alert).dialog({
                dialogClass: 'pop_alert',
                buttons: [{
                        text: btn1,
                        id: "sucessBtn",
                        class: "btn btn_darkgray w50",
                        click: function () {
                            $(this).dialog("close");
                        }
                    },
                    {
                        text: btn2,
                        id: "cancelBtn",
                        class: "btn btn_darkgray w50",
                        click: function () {
                            $(this).dialog("close");
                        }
                    }
                ]
            });
        } else {
            $(html_alert).dialog({
                dialogClass: 'pop_alert',
                buttons: [{
                    text: "확인",
                    id: "alertBtn",
                    class: "btn btn_darkgray",
                    click: function () {
                        $(this).dialog("close");
                    }
                }]
            });
        }
    };

    lmsModule.alertMessage = alertMessage;

    /*=============================================
	jquery ui autocomplete
	=============================================*/
    // 기본 옵션 추가
    $.ui.autocomplete.prototype._resizeMenu = function () {
        var ul = this.menu.element;
        ul.outerWidth(this.element.outerWidth());
    }
    $.extend($.ui.autocomplete.prototype.options, {
        open: function (event, ui) {
            var $input = $(event.target),
                $results = $input.autocomplete("widget"),
                top = $results.position().top + 3;

            $results.css("top", top + "px");
        },
    });

    /*=============================================
	Datepicker
	=============================================*/
    var tg_dpi;
    var pos_dpi_x;
    var pos_dip_y;
    $.datepicker.setDefaults({
        // showOn: 'text',
        // changeMonth: true,
        // changeYear: true,
        dateFormat: 'yy-mm-dd',
        prevText: '이전 달',
        nextText: '다음 달',
        monthNames: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
        monthNamesShort: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
        dayNames: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        dayNamesShort: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        showMonthAfterYear: true,
        showOtherMonths: true,
        yearSuffix: '.',
        beforeShow: function (el) {
            tg_dpi = $(el);
        },
    });

    $(document).on('click',function(){
        $('.datepicker').datepicker();
        
    })
    $( function() {
        var dateFormat = "mm-dd-yy",
          from = $( "#date_start" )
            .datepicker({
              defaultDate: "+1w",
              changeMonth: true,
              numberOfMonths: 2
            })
            .on( "change", function() {
              to.datepicker( "option", "minDate", getDate( this ) );
            }),
          to = $( "#date_end" ).datepicker({
            defaultDate: "+1w",
            changeMonth: true,
            numberOfMonths: 2
          })
          .on( "change", function() {
            from.datepicker( "option", "maxDate", getDate( this ) );
          });
     
        function getDate( element ) {
          var date;
          try {
            date = $datepicker.parseDate( dateFormat, element.value );
          } catch( error ) {
            date = null;
          }
     
          return date +'~'+ date;
        }
      } );    

    $(window).resize(function () {
        if (tg_dpi) {
            pos_dpi_x = tg_dpi.offset().left;
            pos_dip_y = tg_dpi.offset().top + tg_dpi.outerHeight();
            $('#ui-datepicker-div').css({
                'left': pos_dpi_x,
                'top': pos_dip_y
            });
        }
    });

    /*$('.timepicker').timepicker({
        timeFormat: 'hh:mm p',
        interval: 30,
        // minTime: '10',
        // maxTime: '6:00pm',
        // defaultTime: '11',
        // startTime: '10:00',
        // dynamic: false,
        // dropdown: true,
        scrollbar: true,
        change: function(time) {
            // console.log(time);
            // the input field
            var element = $(this), text;
            // get access to this Timepicker instance
            var timepicker = element.timepicker();
            // text = 'Selected time is: ' + timepicker.format(time);
            // element.siblings('span.help-line').text(text);
        }
    });*/


    /* ==========================================================================
       Theme
       ========================================================================== */

    $(document).ready(function () {
        $('body').addClass('theme_default');
        // $('body').addClass('theme_red_brown');
        // $('body').addClass('theme_brown');
        // $('body').addClass('theme_khaki');
        // $('body').addClass('theme_green');
        // $('body').addClass('theme_blue');
        // $('body').addClass('theme_deep_blue');
    })

    /* ==========================================================================
      password icon add
      ========================================================================== */

    let eyeIcon = $('.eye_icon');

        
    $(document).on('click', '.eye_icon',function () {

        idx = eyeIcon.index(this);

        eyeIcon.eq(idx).parent().toggleClass('on');
        eyeIcon.find('.eye_icon').removeClass('on');

        if ( eyeIcon.eq(idx).parent().hasClass('on') ) {
            eyeIcon.eq(idx).siblings('input').attr('type', 'text');
        } else {
            eyeIcon.eq(idx).siblings('input').attr('type', 'password');
        }
    })

    /*=============================================
	CAM full screen 
	=============================================*/

    $('.wrap_cam .row').prepend('<button class="toggle_btn"></button>')

    let chatToggleBtn = $('.toggle_btn');
    let chatSreen = $('#wrap .col_left')
    let camContainer = $('.share_container')
    let shareModeBtn = $('.share_mode')

    function toggleHandler(){
        chatToggleBtn.toggleClass('on');
        chatSreen.toggleClass('on');
        camContainer.toggleClass('on')
        shareModeBtn.toggleClass('on')
    }

    $(document).on('click', '.toggle_btn', toggleHandler);

    /*=============================================
	Student user Icon  
	=============================================*/
    $(document).ready(function(){
        if($('.wrap_main').hasClass('stu')){
           $('.lst_member li > a').removeClass('btn_userinfo');
           $('.lst_member li > a').addClass('btn_stuinfo');
        }
     })

});




/*=============================================
	LNB Layout
	=============================================*/

// $(function(){
    
//     $('body').addClass('theme_type_left')

// });


// var nav_lnb = $('#lnb_nav');
// var nav_lnb_depth1 = nav_lnb.find('dt a');
// var nav_lnb_depth2 = nav_lnb.find('dd');

// $(document).on('click','#lnb_nav dt', function(){
//     nav_lnb_depth1.removeClass('active');
//     $(this).closest('dt').siblings('dd').stop().slideUp(200);
//     $(this).find('a').toggleClass('active').closest('dt').next('dd').stop().slideToggle(200);
//     $(this).siblings().children('a').removeClass('active');
// })

// $(document).on('click','#lnb_nav dd a', function(){
//     $(this).addClass('active');
//     $(this).parent().siblings().find('a').removeClass('active')
// })



