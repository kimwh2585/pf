function SideBar__init() {
    // 사이드바 펼치는 이벤트를 버튼에 건다.
    $('.btn-toggle-mobile-side-bar').click(function () {
        $('html').addClass('mobile-side-bar-active');
    });

    // 사이드바 닫는 이벤트를 사이드바와 닫기버튼에 건다.
    $('.mobile-side-bar, .mobile-side-bar .content > .logo-box-1 > .btn-close').click(function () {
        $('html').removeClass('mobile-side-bar-active');

        $('.mobile-side-bar > .content > .menu-box-1 ul > li.active').removeClass('active');
    });

    // 사이드바에서 검은화면이 아닌 메뉴 부분 클릭했을 때, 사이드바가 닫히는 것을 방지
    $('.mobile-side-bar > .content').click(function (e) {
        e.stopPropagation();
    });

    // 사이브 메뉴에서 메뉴 아이템을 클릭했을 때, 자식인 메뉴를 토글하는 것
    $('.mobile-side-bar > .content > .menu-box-1 ul > li').click(function (e) {
        var $this = $(this);
        var hasClass = $this.hasClass('active');

        console.log("hasClass : " + hasClass);

        if (hasClass) {
            $this.removeClass('active');
        } else {
            $this.siblings('.active').find('li.active').removeClass('active');
            $this.siblings('.active').removeClass('active');

            $this.addClass('active');
        }

        e.stopPropagation();
    });
}

SideBar__init();

function SliderBox1__init() {
    $('.slider-box-1 > .side-btns > *').click(function () {
        var $this = $(this);

        var $slider = $this.parent().parent();

        var $current = $slider.find('> .slides > .active');
        var $post;

        var isLeft = $this.index() == 0;

        if (isLeft) {
            $post = $current.prev();

            if ($post.length == 0) {
                $post = $slider.find('> .slides > :last-child');
            }
        } else {
            $post = $current.next();

            if ($post.length == 0) {
                $post = $slider.find('> .slides > :first-child');
            }
        }

        $current.removeClass('active');
        $post.addClass('active');

        var index = $post.index();

        $slider.find('.page-btns > *.active').removeClass('active');
        $slider.find('.page-btns > *').eq(index).addClass('active');
    });

    // 페이지 버튼들에게 클릭 이벤트를 건다.
    $('.slider-box-1 > .page-btns > *').click(function () {
        var $this = $(this);

        $this.siblings('.active').removeClass('active');
        $this.addClass('active');

        var index = $this.index();

        //var $slider = $this.parent().parent();
        var $slider = $this.closest('.slider-box-1');

        $slider.find(' > .slides > .active').removeClass('active');
        //$slider.find(' > .slides > :nth-child(' + (index + 1) + ')').addClass('active');

        $slider.find(' > .slides > div').eq(index).addClass('active');
    });

    setInterval(function () {
        //$('.slider-box-1 > .side-btns > :last-child').click();
    }, 5000);
}

SliderBox1__init();
