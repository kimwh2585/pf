console.clear();

var storeWithExpiration = {
  set: function(key, val, exp) {
    store.set(key, { val:val, exp:exp, time:new Date().getTime() });
  },
  get: function(key) {
    var info = store.get(key);
    if (!info) { return null; }
    if (new Date().getTime() - info.time > info.exp) { return null; }
    return info.val;
  }
};

$('.btn-toggle-top-banner-bar').click(function() {
  $('html').toggleClass('top-bar-visible');
});

function TopSlider1__init() {
  $('.top-slider-1 > .page-menu > li').click(function(e) {
    $(this).siblings('.active').removeClass('active');

    $(this).addClass('active');

    var $slider = $(this).parent().parent();

    $slider.find(' > .slides > .active').removeClass('active');
    var index = $(this).index();
    $slider.find(' > .slides > *').eq(index).addClass('active');
    
    e.stopPropagation();
  });

  setInterval(function() {
    var $current = $('.top-slider-1 > .page-menu > li.active');
    var $post = $current.next();

    // 디버깅의 좋은 예
    console.log("$post.length : " + $post.length);

    if ( $post.length == 0 ) {
      //$post = $current.siblings().eq(0);
      $post = $current.siblings(':first-child');
    }

    $post.click();
  }, 5000); 
}

TopSlider1__init();

function SliderBox1__init() {
  $('.slider-box-1 > .slider').slick({
    dots: true,
    arrows: false,
    autoplay: true,
    customPaging: function(slick, index) {
      return '<span><img src="img/whybt_off_0' + (index + 1) + '.png"><img src="img/whybt_on_0' + (index + 1) + '.png"></span>';
    }
  });
}

SliderBox1__init();

function SliderBox2__init() {
  $('.slider-box-2 > .slider').slick({
    dots: true,
    fade:true,
    arrows: false,
    autoplay: true,
    customPaging: function(slick, index) {
      return '<span><img src="img/why_off.jpg"><img src="img/why_on.jpg"></span>';
    }
  });
}

SliderBox2__init();

function SliderBox3__init() {
  $('.slider-box-3 > .slider').slick({
    dots: true,
    fade:true,
    arrows: false,
    autoplay: true
  });
}

SliderBox3__init();

function SliderBox4__init() {
  $('.slider-box-4 > .slider').slick({
    dots: true,
    arrows: false,
    autoplay: true,
  });
}

SliderBox4__init();

/* 팝업 슬라이더 1 시작 */
function PopupSlider1__init() {
  $('.pop .popup-slider-1 > .menu-bar > ul > li').click(function() {
    $(this).siblings('.active').removeClass('active');

    $(this).addClass('active');

    var $slider = $(this).closest('.popup-slider-1');

    $slider.find(' > .content-bar > ul > li.active').removeClass('active');
    var index = $(this).index();
    $slider.find(' > .content-bar > ul > li').eq(index).addClass('active');
  });
  
  var moveNext = function() {
    var $current = $('.pop .popup-slider-1 > .menu-bar > ul > li.active');
    var $post = $current.next();

    // 디버깅의 좋은 예
    console.log("$post.length : " + $post.length);

    if ( $post.length == 0 ) {
      //$post = $current.siblings().eq(0);
      $post = $current.siblings(':first-child');
    }

    $post.click();
  };
  
  var $popSlider1 = $('.pop .popup-slider-1');
  
  // 변수 버전
  /*
  var popSlider1MouseEntered = false;
  
  $popSlider1.mouseenter(function() {
    popSlider1MouseEntered = true;
  });
  
  $popSlider1.mouseleave(function() {
    popSlider1MouseEntered = false;
  });
  
  setInterval(function() {
    if ( popSlider1MouseEntered == false ) {
      moveNext();
    }
  }, 5000); 
  */

  // 데이터 버전
  var popSlider1MouseEntered = false;
  
  // 초기값 지정
  $popSlider1.data('mouseenterd', false);
  
  $popSlider1.mouseenter(function() {
    //$popSlider1.data('mouseenterd', true);
    $(this).data('mouseenterd', true);
  });
  
  $popSlider1.mouseleave(function() {
    //$popSlider1.data('mouseenterd', false);
    $(this).data('mouseenterd', false);
  });
  
  setInterval(function() {
    if ( $popSlider1.data('mouseenterd') == false ) {
      moveNext();
    }
  }, 5000); 
  
  $('.pop .popup-slider-1 > .btn-next').click(moveNext);
}

PopupSlider1__init();
/* 팝업 슬라이더 1 끝 */

/* 팝업 시작 */
function Popup__show(no) {
  var popBgClassName = 'pop-bg-' + no;
  
  $('.' + popBgClassName).show();
}

function Popup__hide(no) {
  var popBgClassName = 'pop-bg-' + no;
  
  $('.' + popBgClassName).hide();
}

function Popup__init() {
  $('.btn-close-forever').click(function(e) {
    var popNo = $(this).attr('data-pop-no');
    var popName = 'pop-' + popNo + '-closed-for-a-while';
    
    var duration = parseInt($(this).attr('data-close-duration'));
  
    storeWithExpiration.set(popName, true, duration * 1000);
    
    e.stopPropagation();
  });
  
  $('.pop-closeable').click(function(e) {
    var popNo = $(this).attr('data-pop-no');
    Popup__hide(popNo);
    
    e.stopPropagation();
  });
  
  $('.pop').click(function(e) {
    e.stopPropagation();
  });
}

Popup__init();

if ( storeWithExpiration.get('pop-1-closed-for-a-while') !== true ) {
  Popup__show(1);
}

/*
if ( storeWithExpiration.get('pop-2-closed-for-a-while') !== true ) {
  Popup__show(2);
}
*/
/* 팝업 끝 */

/* 퀵바 시작 */
function QuickBar__init() {
  var $quickBar = $('.quick-bar');
  
  $quickBar.click(function(e) {
    e.stopPropagation();
  });
  
  $quickBar.find(' > a').click(function() {
    var $quickBar = $(this).parent();
    var $ul = $quickBar.find(' > ul');
    
    if ( $quickBar.hasClass('active') ) {
      $quickBar.removeClass('active');
      $ul.stop().slideUp(200);
    }
    else {
      $quickBar.addClass('active');
      $ul.stop().slideDown(100);
    }
  });
  
  $('body').click(function() {
    if ( $quickBar.hasClass('active') ) {
      $quickBar.find(' > a').click();
    }
  });
  
  var onScroll1 = function() {
    var top = $(window).scrollTop();
    
    var minTop = 163;
    
    if ( top < minTop ) {
      top = minTop;
    }
    
    $quickBar.css('top', top);
  };
  
  $(window).scroll(onScroll1);
  
  onScroll1();
}

QuickBar__init();
/* 퀵바 끝 */

/* 전체 메뉴 박스 시작 */
function AllMenuBox__init() {
  $('.btn-show-all-menu').click(function() {
    $('.all-menu-box').addClass('active');
    $('html').addClass('all-menu-box-visible');
  });
  
  $('.all-menu-box, .all-menu-box .btn-close').click(function(e) {
    $('.all-menu-box').removeClass('active');
    $('html').removeClass('all-menu-box-visible');
    
    e.stopPropagation();
  });
  
  $('.all-menu-box > .menu-box-1').click(function(e) {
    e.stopPropagation();
  });
}

AllMenuBox__init();
/* 전체 메뉴 박스 끝 */



