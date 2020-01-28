("use strict");
$(document).ready(function () {
    window.WIDTH_CONST = $(window).width();

    // header
    eventHeaderSticky();
    eventOnHeaderMenuAllLink();
    headerAccordion();

    // main page
    slidersInit();
    slidersInitCities();
    // slidersInitPhotoArchive();
    slidersInitPhotoMountain();
    sliderCheckListTour();

    //  forms
    createMaskInput();
    eventTextareaSize();


    // cart-tour
    eventTabsBlock();
    eventMapSticky();
    eventFancyBoxGallery();
    // addEventListener();

    eventScrollSecondNavigation();

    // baron ks 
    initScrollReviews();

    // navigation page event
    tourDetailMenuEvents();

    eventColumnHotel();

    eventSliderOverview ();

    // закрытие popup
    closePopup();

    eventChangeHeightBody();


    eventContactButtonTab ();
    eventBaronScrollContact();
    eventPopupLinkId ();

    eventTourCardGalleryCounter();

    eventAwardsSlider();

    changePhotoBannerParallax ();
    eventHorizontalScroller ();

    $(window).resize();
});

$(window).resize(function () {
    var newWidth = $(window).width();
    window.HeaderHeight = $("header.header").outerHeight();
    // eventResizeWindowHeader ();
    $(window).trigger('resize.px.parallax');
    // меню отступ слева
    if (window.WIDTH_CONST !== newWidth) {
        closeAllSubMenu();
        eventBaronScrollContact();
        // nonePopUp();
    }
});

function eventHorizontalScroller () {
    var scrollerArr =$('.horizontal-scroller');
    if (scrollerArr.length  > 0) {
        $.each(scrollerArr, function (){
            $(this).baron({
                root: ".horizontal-scroller",
                scroller: ".horizontal-scroller__body",
                bar: ".horizontal-bar",
                scrollingCls: "_scrolling",
                draggingCls: "_dragging",
                direction: 'h',
            });
        });
    }
}

function changePhotoBannerParallax () {
    var parallax = $('.js-parallax');
    var desktopParallax = parallax.data('src-desktop');
    var mobileParallax = parallax.data('src-mobile');

    if (parallax.length > 0) {
        $(window).on('load resize', function (){
           if($(window).width() > 767){
               parallax.css({'background-image': 'url(' + desktopParallax + ')'});
           }  else {
               parallax.css({'background-image': 'url(' + mobileParallax + ')'});
           }
        });
    }
}

function eventChangeHeightBody () {
    onElementHeightChange(document.body, function(){
        $(window).trigger('resize.px.parallax');
    });
}

function onElementHeightChange(elm, callback){
    var lastHeight = elm.clientHeight, newHeight;
    (function run(){
        newHeight = elm.clientHeight;
        if( lastHeight != newHeight )
            callback();
        lastHeight = newHeight;

        if( elm.onElementHeightChangeTimer )
            clearTimeout(elm.onElementHeightChangeTimer);

        elm.onElementHeightChangeTimer = setTimeout(run, 200);
    })();
}

function slidersInit() {
    if ($(".main-banner__slider").length > 0) {

        firstMainBanner();




        $(".main-banner__slider").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
            focusOnSelect: false,
            swipe: false,
            autoplay: true,
            autoplaySpeed: 4000,
            speed: 200,
            fade: true,
            asNavFor: ".main-banner__sub-slider",
        });

        if ($(".main-banner__sub-slider").length > 0) {
            $(".main-banner__sub-slider").slick({
                slidesToShow: 6,
                slidesToScroll: 6,
                arrows: false,
                dots: false,
                focusOnSelect: true,

                asNavFor: ".main-banner__slider",
                // mobileFirst: true,
                infinite: false,
                responsive: [
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            infinite: true,
                            swipeToSlide: true,
                            swipe: true,
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            infinite: true,
                            swipeToSlide: true,
                            swipe: true
                        }
                    }
                ]
            });
        }

        function firstMainBanner() {
            var slideNew = $(
                '.main-banner__slider .main-banner__item'
            ).first();
            var slideNewSrc = (function () {
                if ($(window).width() > 767){
                    return      slideNew
                        .find(".main-banner__item-img-bg")
                        .attr("src");
                } else {
                    return      slideNew
                        .find(".main-banner__item-img-bg")
                        .attr("data-src-mobile");
                }

            }());
            var pickTours = $(".main-banner__pick-tours ");
            var parallaxImage = $(".main-banner__parallax .parallax-slider");
            var parallaxMainBlock = $('.main-banner__parallax ');

            // parallaxImage.attr("src", slideNewSrc);

            pickTours.css({
                "background-image": "url('" + slideNewSrc + "')"
            });
            parallaxMainBlock.css({
                "background-image": "url('" + slideNewSrc + "')"
            });
            parallaxImage.addClass("active");
        }

        $(".main-banner__slider").on("beforeChange", function (
            event,
            slick,
            currentSlide,
            nextSlide
        ) {
            $.each(slick.$slider, function (index, value) {
                if (value.classList.contains("main-banner__slider")) {
                    var slideNew = $(
                        '.main-banner__slider [data-slick-index="' + nextSlide + '"'
                    );
                    var slideNewSrc = (function () {
                        if ($(window).width() > 767){
                            return      slideNew
                                .find(".main-banner__item-img-bg")
                                .attr("src");
                        } else {
                            return      slideNew
                                .find(".main-banner__item-img-bg")
                                .attr("data-src-mobile");
                        }

                    }());
                    var pickTours = $(".main-banner__pick-tours ");
                    var parallaxImage = $(".main-banner__parallax .parallax-slider");
                    var parallaxMainBlock = $('.main-banner__parallax ');

                    // parallaxImage.attr("src", slideNewSrc);

                    pickTours.css({
                        "background-image": "url('" + slideNewSrc + "')"
                    });
                    parallaxMainBlock.css({
                        "background-image": "url('" + slideNewSrc + "')"
                    });
                    parallaxImage.addClass("active");
                }
            });
        });



    }
    if ($(".reviews__slider").length > 0) {
        var backButton =
            '<span class="slick-prev"><svg  width="45" height="102" viewBox="0 0 45.249 102.017"><path  d="M0,0,51.916,43.163,100.715,0" transform="translate(44.48 0.639) rotate(90)" fill="none" stroke="inherit"/></svg></span>';
        var nextButton =
            '<span class="slick-next"><svg  width="45" height="102" viewBox="0 0 45.249 102.017"><path  d="M0,0,51.916,43.163,100.715,0" transform="translate(44.48 0.639) rotate(90)" fill="none" stroke="inherit"/></svg></span>';
        $(".reviews__slider").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: false,
            arrows: true,
            dots: true,
            focusOnSelect: true,
            autoplay: true,
            autoplaySpeed: 4000,
            speed: 500,
            prevArrow: backButton,
            nextArrow: nextButton
        });
    }

    if ($(".tours-slider__list").length > 0) {
        var backButton2 =
            '<span class="slick-prev"><svg  width="45" height="102" viewBox="0 0 45.249 102.017"><path  d="M0,0,51.916,43.163,100.715,0" transform="translate(44.48 0.639) rotate(90)" fill="none" stroke="inherit"/></svg></span>';
        var nextButton2 =
            '<span class="slick-next"><svg  width="45" height="102" viewBox="0 0 45.249 102.017"><path  d="M0,0,51.916,43.163,100.715,0" transform="translate(44.48 0.639) rotate(90)" fill="none" stroke="inherit"/></svg></span>';
        $(".tours-slider__list").slick({
            slidesToShow: 3,
            slidesToScroll: 3,
            arrows: true,
            dots: false,
            focusOnSelect: false,
            infinite: false,
            prevArrow: backButton2,
            nextArrow: nextButton2,
            // респонсив
            responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: false,
                        arrows: false,
                        initialSlide: 0,
                        swipeToSlide: true,

                        centerPadding: "0",
                        centerMode: true,
                        variableWidth: true,
                    },
                }
            ]
        });
    }

    if ($(".main-continent__slider-item").length > 1) {
        $(".main-continent__slider").slick({
            slidesToScroll: 1,
            centerMode: false,
            arrows: false,
            dots: true,
            focusOnSelect: true,
            infinite: false,
            responsive: [
                {
                    breakpoint: 767,
                    settings: {
                        arrows: false,
                    },
                },
                {
                    breakpoints: 575,
                    settings: {
                        centerMode: true,
                        centerPadding: "20px",
                        variableWidth: true,
                    },
                }
            ]
        });

        $(".main-continent__main").on("beforeChange", function (
            event,
            slick,
            currentSlide,
            nextSlide
        ) {
            $.each(slick.$slider, function (index, value) {
                if (value.classList.contains("main-continent__slider")) {
                    var slideNew3 = $(value).find(
                        '.main-continent__slider-item[data-slick-index="' + nextSlide + '"]'
                    );

                    var slideNewSrc3 = slideNew3
                        .find(".main-continent__slider-bg")
                        .data("src");
                    var parallaxImage3 = $(".main-continent__parallax .parallax-slider");
                    // console.log(slideNewSrc3);
                    // parallaxImage3.animate({ opacity: 0.4 }, 500);
                    // setTimeout(function() {

                    if (parallaxImage3.length > 0 ) {
                        parallaxImage3.attr("src", slideNewSrc3);


                    } else {
                        $(".main-continent__parallax").css({"background-image": "url(" + slideNewSrc3 + ")"})

                    }
                    //   parallaxImage3.animate({ opacity: 1 }, 500);
                    // }, 500);
                }
            });
        });
    }

    if ($(".main-continent__main-item").length > 1) {
        // var backButton2 =
        //   '<span class="slick-prev"><svg  width="45" height="102" viewBox="0 0 45.249 102.017"><path  d="M0,0,51.916,43.163,100.715,0" transform="translate(44.48 0.639) rotate(90)" fill="none" stroke="inherit"/></svg></span>';
        // var nextButton2 =
        //   '<span class="slick-next"><svg  width="45" height="102" viewBox="0 0 45.249 102.017"><path  d="M0,0,51.916,43.163,100.715,0" transform="translate(44.48 0.639) rotate(90)" fill="none" stroke="inherit"/></svg></span>';
        $(".main-continent__main").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            dots: false,
            focusOnSelect: false,
            swipe: false,
            autoplay: false,
            speed: 500,
            fade: true,
            cssEase: "linear",
            // prevArrow: backButton2,
            // nextArrow: nextButton2,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        arrows: false,
                    },
                },
            ]
        });

        var flagMainContinent = false;

        $(".main-continent__main").on("beforeChange", function (
            event,
            slick,
            currentSlide,
            nextSlide
        ) {

            $.each(slick.$slider, function (index, value) {
                if (value.classList.contains("main-continent__main")) {
                    var slideNew2 = $(
                        '.main-continent__main .main-continent__main-item[data-slick-index="' +
                        nextSlide +
                        '"'
                    );

                    var slideButton2 = $(
                        '.main-continent__continent-item[data-slide="' + nextSlide + '"]'
                    );

                    $(".main-continent__continent-item").removeClass("active");
                    slideButton2.addClass("active");
                    eventMainContinentButton (slideButton2);
                    var slideNewSrc2 = slideNew2
                        .find(
                            '.main-continent__slider-item[tabindex="0"] .main-continent__slider-bg'
                        )
                        .data("src");
                    var parallaxImage2 =  $(".main-continent__parallax .parallax-slider");
                    // console.log(slideNewSrc2);
                    // if (flagMainContinent === true) {
                    //   parallaxImage2.attr("src", slideNewSrc2);
                    //   setTimeout(function() {
                    //     flagMainContinent = false;
                    //   }, 500);
                    // } else {
                    //   flagMainContinent = true;
                    //   parallaxImage2.animate({ opacity: 0.4 }, 500);
                    //   setTimeout(function() {
                    if (parallaxImage2.length > 0 ) {
                        parallaxImage2.attr("src", slideNewSrc2);

                    } else {
                        $(".main-continent__parallax").css({"background-image": "url(" + slideNewSrc2 + ")"})

                    }
                    //     parallaxImage2.animate({ opacity: 1 }, 500);
                    //   }, 500);
                    // }
                }
            });
        });

        $(".main-continent__continent-item").on("click", function (e) {
            e.preventDefault();
            var dataButton = $(this).data("slide");

            if (
                $('[data-item-slide="' + dataButton + '"]').length > 0 &&
                !$(this).hasClass("active")
            ) {
                $(".main-continent__continent-item").removeClass("active");
                $(this).addClass("active");
                $(".main-continent__main").slick("slickGoTo", dataButton);
                eventMainContinentButton ($(this));
            }
        });

        $(".main-continent__prev").on("click", function (e) {
            e.preventDefault();
            var mainSliderItem = $('.main-continent__main-item[tabindex="0"]');
            var continentSliderItem = mainSliderItem.find(
                ".main-continent__slider-item"
            );
            if (continentSliderItem.first().attr("tabindex") == 0) {
                var sliderPrevNumber =
                    $(".main-continent__main").slick("slickCurrentSlide") - 1;
                if (sliderPrevNumber < 0) {
                    sliderPrevNumber = $(".main-continent__main-item").length - 1;
                }
                var sliderPrev = $(
                    '.main-continent__main-item[data-slick-index="' +
                    sliderPrevNumber +
                    '"]'
                );
                var sliderInSlider = sliderPrev.find(".main-continent__slider");
                var sliderInSliderItemLength =
                    sliderPrev.find(".main-continent__slider-item").length - 1;
                sliderPrev
                    .find(".main-continent__slider")
                    .slick("slickGoTo", sliderInSliderItemLength);

                $(".main-continent__main").slick("slickPrev");
            } else {
                mainSliderItem.find(".main-continent__slider").slick("slickPrev");
            }
        });

        $(".main-continent__next").on("click", function (e) {
            e.preventDefault();
            var mainSliderItem = $('.main-continent__main-item[tabindex="0"]');
            var continentSliderItem = mainSliderItem.find(
                ".main-continent__slider-item"
            );
            if (continentSliderItem.last().attr("tabindex") == 0) {
                var sliderNextNumber =
                    $(".main-continent__main").slick("slickCurrentSlide") + 1;
                if (sliderNextNumber >= $(".main-continent__main-item").length) {
                    sliderNextNumber = 0;
                }

                var sliderNext = $(
                    '.main-continent__main-item[data-slick-index="' +
                    sliderNextNumber +
                    '"]'
                ).find(".main-continent__slider");


                sliderNext.slick("slickGoTo", 0);
                $(".main-continent__main").slick("slickNext");
            } else {
                mainSliderItem.find(".main-continent__slider").slick("slickNext");
            }
        });
    }

    if ($(".menu-relax__slider-item").length > 1) {
        var backButton =
            '<span class="slick-prev"><svg  width="16" height="32" viewBox="0 0 15.024 31.509"><path  d="M0,0,14.789,12.3,28.689,0" transform="translate(13.612 1.408) rotate(90)" fill="none" stroke="inherit" stroke-linecap="round" stroke-width="2"/></svg></span>';
        var nextButton =
            '<span class="slick-next"><svg  width="16" height="32" viewBox="0 0 15.024 31.509"><path  d="M0,0,14.789,12.3,28.689,0" transform="translate(13.612 1.408) rotate(90)" fill="none" stroke="inherit" stroke-linecap="round" stroke-width="2"/></svg></span>';
        $(".menu-relax__slider").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: false,
            arrows: true,
            dots: false,
            focusOnSelect: true,
            autoplay: true,
            autoplaySpeed: 4000,
            speed: 500,
            prevArrow: backButton,
            nextArrow: nextButton,
            variableWidth: true
        });
    }

    if ($(".main-services__list").length > 0) {
        $(".main-services__list").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            dots: true,
            arrows: false,
            focusOnSelect: true,
            autoplay: false,
            centerPadding: "20px",
            variableWidth: true,
            infinite: true,
            mobileFirst: true,
            swipeToSlide: true,

            responsive: [
                {
                    breakpoint: 650,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        infinite: true,

                        centerPadding: "50px",
                        centerMode: true,
                        variableWidth: false,
                    },
                },
                {
                    breakpoint: 768,
                    settings: "unslick",
                },
            ]
        });

        var flagServices = true;
        $(window).on('resize', function () {
            if (flagServices && $(window).width() < 768) {
                flagServices = false;
                $(window).resize();

            } else if ( $(window).width() > 768) {
                flagServices = true;
            }
        })
    }

}

// menu

function eventOnHeaderMenuAllLink() {
    var linkArr = $(".js-menu-link");

    eventHeaderMenu(linkArr);
}

function eventHeaderMenu(linkArr) {
    var menuOpenArr = $(".navigation__block");
    var header = $(".header");
    linkArr.on("click", function (e) {
        e.preventDefault();
        // var heightElement = header.innerHeight();
        var parentElement = $(this).parent();
        var popupElement = parentElement.find(".navigation__block");

        if ($(window).width() > 1029) {
            if (!$(this).hasClass("open")) {
                closeAllSubMenu();
                $(this).addClass("open");
                popupElement.fadeIn({
                    duration: 400,
                    start: function () {
                        popupElement.addClass("show");
                    }
                });
            } else {
                closeAllSubMenu();
            }
        } else {
            if (!$(this).hasClass("open")) {
                closeAllSubMenu();
                $(this).addClass("open");
                popupElement.slideDown({
                    duration: 400,
                    start: function () {
                        popupElement.addClass("show");
                    }
                });
            } else {
                closeAllSubMenu();
            }
        }

    });
}

$(document).mouseup(function (e) {
    // событие клика по веб-документу
    var popup = $(".navigation__block");
    var menuLink = $(".js-menu-link");
    if (
        !popup.is(e.target) && // если клик был не по нашему блоку
        popup.has(e.target).length === 0 &&
        !menuLink.is(e.target) && // если клик был не по нашему блоку
        menuLink.has(e.target).length === 0
    ) {
        // и не по его дочерним элементам
        closeAllSubMenu();
    }
});

function closeAllSubMenu() {
    var menuOpenArr = $(".navigation__block");
    var linkArr = $(".js-menu-link");
    linkArr.removeClass("open");
    // linkIconArr.removeClass("open");
    if ($(window).width() > 1029) {
        menuOpenArr.fadeOut(400);
    } else {
        menuOpenArr.slideUp(400);
    }

    menuOpenArr.removeClass("show");
}

// header sticky
function eventHeaderSticky() {
    $(window).on("scroll load resize", function () {
        if ($(this).scrollTop() > window.HeaderHeight) {
            if (!$(".header").hasClass("sticky")) {
                $(".header").addClass("sticky");
                // $(".navigation__wrapper.navigation__wrapper--info").slideUp(300);
                // $(".logo__text").addClass("animation");

                // setTimeout(function() {
                //   $(".logo__text").removeClass("animation");
                //   $(".header .header__logo").css({
                //     "flex-direction": "row",
                //     "align-items": "center"
                //   });
                // }, 300);
            }
        } else {
            if ($(".header").hasClass("sticky")) {
                $(".header").removeClass("sticky");
                // $(".navigation__wrapper.navigation__wrapper--info").slideDown(300);
                // $(".logo__text").addClass("animation");
                // setTimeout(function() {npm
                //   $(".logo__text").removeClass("animation");
                //   $(".header .header__logo").css({
                //     "flex-direction": "column",
                //     "align-items": "flex-start"
                //   });
                // }, 300);
            }
        }
    });
}

// header accordion
function headerAccordion() {
    var accordionButtons = $(".menu-country__accordion-item");
    var accordionBlocks = $(".menu-country__item");
    var firstLoadActive = $(".menu-country__accordion-item.active").first();

    accordionShow(firstLoadActive, accordionButtons, accordionBlocks);

    accordionButtons.on("click", function () {
        accordionShow($(this), accordionButtons, accordionBlocks);
    });
}

function accordionShow(link, arrLink, arrBlock) {
    arrLink.removeClass("active");
    link.addClass("active");
    var dataLink = link.data("accordion");

    $.each(arrBlock, function (index, value) {
        if ($(value).data("block") != dataLink) {
            $(value).removeClass("active");
            $(value).fadeOut(100);
        } else {
            $(value).fadeIn(500);
            $(value).addClass("active");
        }
    });
}

//  form
// form mask
function createMaskInput() {
    if ($('[data-valid="phone"]').length > 0) {
        $('[data-valid="phone"]').mask("+0 000 000-00-00");
    }
}

function eventTextareaSize() {
    $(".textarea-auto-height").on("input", function () {
        var $this = $(this);
        var $parent = $(this).closest(".form__label-input");
        var $divTextarea = $parent.find(".form__textarea-div");
        var $divMinHeight = $this.css("min-height").replace(/px/g, "");
        $divTextarea.html($this.val());
        var $divHeight = $divTextarea.outerHeight();

        if ($divHeight > $divMinHeight) {
            $this.css("height", $divHeight);
        } else {
            $this.css("height", $divMinHeight);
        }
    });

}

//  cart-tours

function eventTabsBlock() {
    var arrTab = $(".tour__tabs-link");
    tourInfoSlideUp();
    arrTab.on("click", eventTab);
}

function tourInfoSlideUp() {
    var arrActiveTab = $(".tour__tabs-link.active");

    var arrBlock = $(".tour__info");
    arrBlock.slideUp();
    $.each(arrActiveTab, function (index, value) {
        var dataThis = $(value).data("tabs");
        var parent = $(value).closest(".tour__info-block");
        var thisContent = parent.find('[data-block="' + dataThis + '"]');
        thisContent.slideDown(100);
    });
}

function eventTab(e) {
    e.preventDefault();
    var parent = $(this).closest(".tour__info-block");
    var arrTab = parent.find(".tour__tabs-link");
    var arrBlock = parent.find(".tour__info");
    var cartTourTitle = $(this)
        .closest(".tour__city")
        .find(".tour__title-block");

    if (!$(this).hasClass("active")) {
        var dataThis = $(this).data("tabs");
        var thisContent = parent.find('[data-block="' + dataThis + '"]');
        var scrollBlockTabs = cartTourTitle.offset().top - 90;

        arrBlock.slideUp(300);
        arrTab.removeClass("active");
        thisContent.slideDown(500);
        $(this).addClass("active");
        $("html, body").animate({scrollTop: scrollBlockTabs}, 600);
    }
}

function eventMapSticky() {
    var mapTour = $(".tour .tour__map");
    if (mapTour.length > 0) {
        var container = $(".tour");
        var containerOffsetTop = container.offset().top;
        var headerHeight, widthFixed, leftFixed, topFixed, ScrollTop, ScrollBottom;
        $(window).on("scroll load resize", function () {
            //   var headerHeight = $(".header").innerHeight();
            var scrollTop = containerOffsetTop;
            var scrollBottom =
                containerOffsetTop + container.innerHeight() - mapTour.innerHeight();
            if (
                $(this).scrollTop() > scrollTop &&
                $(this).scrollTop() < scrollBottom
            ) {
                mapTour.addClass("fixed");
            } else if ($(this).scrollTop() > scrollBottom) {
                mapTour.addClass("bottom");
                mapTour.removeClass("fixed");
            } else {
                mapTour.removeClass("fixed");
                mapTour.removeClass("bottom");
            }
        });
    }
}

function eventFancyBoxGallery() {
    if ($(".tour").length > 0) {
        var arrGallery = $(".tour-gallery__block");

        $.each(arrGallery, function (index, value) {
            var galleryItem = $(value).find('[data-fancybox="gallery"]');
            // console.log(galleryItem);
            galleryItem.fancybox({
                animationEffect: "zoom",
                animationDuration: 500,
                transitionEffect: "zoom-in-out",
                transitionDuration: 500,
                backFocus: false,
            });
        });
    }
    var arrGalleryCard = $(".list__photo__cities-wrap");
    if (arrGalleryCard.length > 0) {
        $.each(arrGalleryCard, function (index, value) {
            var galleryItem = $(value).find('[data-fancybox="gallery"]');
            // console.log(galleryItem);
            galleryItem.fancybox({
                animationEffect: "zoom",
                animationDuration: 500,
                transitionEffect: "zoom-in-out",
                transitionDuration: 500,
                backFocus: false,
            });
        });
    }

}

function eventScrollToMainSelectTour(element) {
    var newElement = $(element);
    var backButton2 =
        '<span class="slick-prev"><svg  width="45" height="102" viewBox="0 0 45.249 102.017"><path  d="M0,0,51.916,43.163,100.715,0" transform="translate(44.48 0.639) rotate(90)" fill="none" stroke="inherit"/></svg></span>';
    var nextButton2 =
        '<span class="slick-next"><svg  width="45" height="102" viewBox="0 0 45.249 102.017"><path  d="M0,0,51.916,43.163,100.715,0" transform="translate(44.48 0.639) rotate(90)" fill="none" stroke="inherit"/></svg></span>';
    newElement.slick({
            slidesToShow: 3,
            slidesToScroll: 3,
            arrows: true,
            dots: false,
            focusOnSelect: false,
            infinite: false,
            prevArrow: backButton2,
            nextArrow: nextButton2,
            // респонсив
            responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        infinite: false,
                        arrows: false,
                        initialSlide: 1,
                        swipeToSlide: true,

                        centerPadding: "0",
                        centerMode: true,
                        variableWidth: true,
                    },
                }
            ]
        });

    var MainSelectTour = $(".main-banner__pick-tours").offset().top - 150;
    $("html, body").animate({scrollTop: MainSelectTour}, 600);
}

function eventScrollToMainSelectTourNoFounded () {
    var MainSelectTour = $(".main-banner__pick-tours").offset().top - 150;
    $("html, body").animate({scrollTop: MainSelectTour}, 600);
}

function readMore(dom) {
    /*var more = document.getElementById("more");
    var btn = document.getElementById("btn");*/
    console.log(dom);
    var domTOp = dom.offset().top;
    var more = $(dom).find('.content-more'),
        btn = $(dom).find('.show-more__link');

    if (more.css('display') === "none") {

        more.attr("style", "display:inline");
        btn.text('Скрыть');
    } else {
        btn.text('Показать ещё');
        more.attr("style", "display:none");
        $('html, body').animate({
            scrollTop: domTOp - 120
        }, 300);
        // more.hide("slow");
    }

}

function slidersInitCities() {
    if ($(".slider-slick__wrap").length > 0) {
        var backButton =
            '<span class="slick-prev"><svg  width="45" height="102" viewBox="0 0 45.249 102.017"><path  d="M0,0,51.916,43.163,100.715,0" transform="translate(44.48 0.639) rotate(90)" fill="none" stroke="#fff" stroke-width="2px"/></svg></span>';
        var nextButton =
            '<span class="slick-next"><svg  width="45" height="102" viewBox="0 0 45.249 102.017"><path  d="M0,0,51.916,43.163,100.715,0" transform="translate(44.48 0.639) rotate(90)" fill="none" stroke="#fff" stroke-width="2px"/></svg></span>';
        $(".slider-slick__wrap").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            dots: true,
            prevArrow: backButton,
            nextArrow: nextButton,
            speed: 1000,
            responsive: [{
                breakpoint: 1220,
                settings: {
                    arrows: false
                }
            }]
        });
    }
}

// function slidersInitPhotoArchive() {
//     if ($(".photo-archive__list").length > 0) {
//         $(".photo-archive__list").slick({
//             slidesToShow: 5,
//             slidesToScroll: 1,
//             arrows: true,
//             dots: false,
//             prevArrow: ".back__slide",
//             nextArrow: ".next__slide",
//             speed: 1000,
//             centerMode: true,
//             centerPadding: '50px',
//             variableWidth: true,
//             responsive: [{
//                 breakpoint: 576,
//                 settings: {
//                     slidesToShow: 1,
//                     centerPadding: '40px',
//                 }
//             }]
//         });
//     }
// }

function slidersInitPhotoMountain() {
    if ($(".photo-archive__list__mountain").length > 0) {
        $(".photo-archive__list__mountain").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            dots: false,
            prevArrow: ".back__slide",
            nextArrow: ".next__slide",
            speed: 1000,
            centerMode: true,
            centerPadding: '50px',
            variableWidth: true,
        });
    }
}

function sliderCheckListTour() {
    var arrElement = $('.check-list__item');
    var element = $('.check-list__item.check-list__item--cash').clone();
    var indexElement, flagElementCheckList = false;
    $.each(arrElement, function (index){
        if ($(this).hasClass('check-list__item--cash')) {
            indexElement = index - 1;
        }
    });

    $(window).on('resize load', function () {
        if ($(window).width() < 576) {
            if ($(".check-list__list").length > 0 && flagElementCheckList === false) {
                $('.check-list__item.check-list__item--cash').remove();
                $(".check-list__list").slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: false,
                    speed: 1000,
                    centerMode: true,
                    centerPadding: '20px',
                    variableWidth: true,
                    infinite: true,
                });
                flagElementCheckList = true;
            }
        } else {
            if(flagElementCheckList) {
                $(".check-list__list").slick('unslick');
                arrElement.eq(indexElement).after(element);

                flagElementCheckList = false;
            }
        }
    });
}


function openBurger() {
    headerNavMoble = $('.header__navigation');
    imgOpen = $('.burger__img__open');
    imgCLose = $('.burger__img__close');

    if (headerNavMoble.css('display') === "none") {
        imgOpen.slideUp("slow");
        imgCLose.slideDown("slow");
        headerNavMoble.slideDown("slow")
    } else if (headerNavMoble.css('display') === "block") {
        imgOpen.slideDown("slow");
        imgCLose.slideUp("slow");
        headerNavMoble.slideUp("slow");
    }
}

function eventScrollSecondNavigation() {
    if ($('.navigation__wrap').length > 0) {
        midNavTxt = $('.navigation__link__item');
        companyNavList = $('.navgitaion__list__cities');
        $(window).scroll(function () {
            var scrollElement = $('.navigation__wrap').prev().offset().top + $('.header').innerHeight() +  $('.navigation__wrap').height();
            if ($(window).scrollTop() >= scrollElement) {
                    if (!$('.navigation__wrap').hasClass('middle__nav__bar')) {
                        $('.navigation__wrap').addClass('middle__nav__bar')
                        // midNavTxt.attr('style','color:#b7b7b7');
                        companyNavList.attr('style', 'background:#fffff;');
                    }
                } else {
                    $('.navigation__wrap').removeClass('middle__nav__bar');
                    // midNavTxt.attr('style','color:#b7b7b7;font-weight:700;');
                    companyNavList.attr('style', 'background:white;');
                }
            }
        );
    }

}

function initScrollReviews() {
    if ($(".reviews-clients__list").length > 0) {
        baron({
            root: ".reviews-clients__container",
            scroller: ".reviews-clients__list",
            bar: ".reviews-clients__bar",
            scrollingCls: "_scrolling",
            draggingCls: "_dragging"
        });

    }

}


function openCardBurger() {
    if ($(window).width() < 767) {
        cardBurgetContainer = $('.main-continent__list__container');
        if (!cardBurgetContainer.hasClass('display-block')) {
            cardBurgetContainer.addClass('display-block')
        } else {
            cardBurgetContainer.removeClass('display-block')
        }
    }
}


$(window).ready(function () {
    $(".main-continent__continent-item").on("click", function textCard() {
        if ($(window).width() < 767) {
            var textCardBurger = $(this).text();
            var cardBurgerContainer = $('.main-continent__list__container');
            // var cardColorBurget = $('.main-continent__continent-text');

            $('.main-continent__continent-placholder .main-continent__continent-text').text(textCardBurger);
            cardBurgerContainer.removeClass('display-block');
            $('.main-continent__continent-placholder .main-continent__continent-text').attr('style', 'color:white');
        }
    });
});



// // Замена текста
// $( ".main-continent__continent-item" ).on( "click", function textCard() {
//   if($(window).width() < 767){
//     // console.log("1")
//   var textCardBurger = $( this ).text();
//   cardBurgerContainer = $('.main-continent__list__container');
//   cardColorBurget = $('.main-continent__continent-text');

//   $('.main-continent__continent-placholder .main-continent__continent-text').text(textCardBurger);
//   cardBurgerContainer.hide();
//   $('.main-continent__continent-placholder .main-continent__continent-text').attr('style','color:white');
//   }
//  });


function tourDetailMenuEvents() {
    var $navigationWrap = $('.navigation__wrap');
    if($navigationWrap.length > 0) {
        var $navigationLinkArr = $('.navigation__link__item');
        var $arrBlocks = $('.js-navigation-block');
        $navigationLinkArr.on('click', clickLinkNavigationPage);
        activeNavigationWhenScrollPage ($arrBlocks, $navigationLinkArr);
    }
}

function clickLinkNavigationPage (e) {
    // e.preventDefault();
    var $this = $(this);
    var target = $this.attr('href');
    var $block = $(target);
    if ($block.length > 0) {
        var scrollToBlock = $block.offset().top - 120;
        $('html, body').animate({scrollTop: scrollToBlock}, 600);
        return false;
    }
}

function activeNavigationWhenScrollPage (arrBlock, arrLink) {
    var lastCurrent = arrBlock[0];
    $(window).on("scroll", function() {
        var windowScroll = $(window).scrollTop();

        var currentElements = arrBlock.map(function() {
            if ($(this).offset().top <= windowScroll + 125) {
                return this;
            }
        });
        if (currentElements.length > 0) {
            lastCurrent = currentElements[currentElements.length - 1];
        }

        var lastCurrentData = $(lastCurrent).attr('id');
        var  activeLink= $('.navigation__link__item[href="#'+lastCurrentData+'"]');
        if (!activeLink.hasClass('active') && activeLink.length > 0) {
            arrLink.removeClass('active');
            activeLink.addClass('active');
        }
    });
}

function eventColumnHotel () {
    var hotelCity = $('.hotel-city__list');
    var cityList = $('.city__list');
    if (hotelCity.length > 0){
        $.each(hotelCity, function (){
            eventColumnHotelLoadOrResize($(this));
        });
    }

    if (cityList.length > 0){
        $.each(cityList, function (){
            eventColumnHotelLoadOrResize($(this));
        });
    }
}

function eventColumnHotelLoadOrResize (value) {
    var $value = $(value);
    var heightValue;
    $(window).on('load resize', function () {
        if (!$value.hasClass('list--flex-column')) {
            heightValue = $value.innerHeight() + 25;
            $value.css({height: heightValue});
            $value.addClass('list--flex-column');
        } else {
            $value.removeClass('list--flex-column');
            $value.attr('style','');
            heightValue = $value.innerHeight() + 25;
            $value.css({height: heightValue});
            $value.addClass('list--flex-column');
        }
    });
}

function createPopup(elem,classBlock,title) {

    var $this = $(elem);
    var classElement = "." + classBlock;
    var $element = $this.closest(classElement).find('.content-for-popup');
    var popup = $('.popup:not(.popup-id)').first();
    var popupTitlte = popup.find('.popup__title');
    var popupContent = popup.find('.popup__content');
    popupTitlte.html(title);
    popupContent.html($element.html());

    $('body').addClass('no-scroll-no-fixed');
    popup.fadeIn(400);
    var scroller = popup.find('.popup__wrapper');
    scroller.baron({
        root: ".popup__wrapper",
        scroller: ".popup__content",
        bar: ".popup__bar",
        scrollingCls: "_scrolling",
        draggingCls: "_dragging"
    });
}


function closePopup() {
    var popup = $('.popup');
    var popupClose = popup.find('.popup__close')
    popupClose.on('click', function (e){
       e.preventDefault();
        $('body').removeClass('no-scroll-no-fixed');
        popup.fadeOut(300);
        eventFitsButtonPopupContact($(this).parent());
    });
}


function eventMainContinentButton (button) {
    var $button = $(button);
    var dataButton = $button.data('btn-value');
    var otherToursSelect =$('.js-select-other-tours');
    var otherToursForm = otherToursSelect.closest('.pick-tours__form ');
    var selectElement = otherToursSelect.find('[data-value="'+dataButton+'"]');
    var buttonForm = otherToursForm.find('.pick-tours__button');
    if (selectElement.length > 0) {
        selectElement.trigger('click');
        buttonForm.trigger('click');
    }
}

function eventSliderOverview () {
    var overviewSlider = $('.country-overview__list');
    if(overviewSlider.length > 0) {
        var slickOption = {
                dots: false,
                arrows: false,
                infinite: false,
                speed: 300,
                slidesToScroll: 1,
                swipeToSlide: true,
                swipe: true,
                centerMode: false,
                variableWidth: true,
                mobileFirst: true,
                centerPadding: '0',
            },
            sliderIsLive = false;

        $(window).on("load resize", function() {
            if ($(window).width() >= 768) {
                if (overviewSlider.hasClass('slick-slider')) {
                    overviewSlider.slick('unslick');
                    sliderIsLive = false;
                }
            }
            else {
                if (!sliderIsLive) {

                    overviewSlider.slick(slickOption);
                    sliderIsLive = true;
                }
            }
        });
    }
}



function eventFitsButtonPopupContact(popup) {
    var popupParent = $(popup).find('.js-parent');
    if (popupParent.length > 0) {
        var arrTab = popupParent.find('.communication-button');
        arrTab.removeClass('activeBtn');
        arrTab.first().addClass('activeBtn');
        var dataBlock =  arrTab.first().data('block-tab');
        if (dataBlock !== undefined) {
            eventShowBlock (dataBlock,popupParent);
        }
    }
}



function eventBaronScrollContact () {
    var formBlock = $('.communication__wrapper');
    if($('.communication__wrapper').length > 0) {
        formBlock.baron({
            root: ".communication__wrapper",
            scroller: ".communication__scroller",
            bar: ".communication__bar",
            scrollingCls: "_scrolling",
            draggingCls: "_dragging"
        });
    }

}



function eventContactButtonTab () {
    var arrBtn = $('.communication-button');
    arrBtn.on('click', function (e) {
        e.preventDefault();
        if(!$(this).hasClass('activeBtn')) {
            var dataBlock = $(this).data('block-tab');
            var parent = $(this).closest('.js-parent');
            arrBtn.removeClass('activeBtn');
            $(this).addClass('activeBtn');
            if (dataBlock !== undefined) {
                eventShowBlock (dataBlock,parent);
            }
        }
    });
}

function eventShowBlock (dataBlock,parent) {
    var arrBlock = $(parent).find('.js-block');
    var thisBlock = arrBlock.map(function (index,element) {
        if ($(element).data('block') === dataBlock) {
            return element;
        }
    });
    arrBlock.fadeOut();
    thisBlock.fadeIn(300);
    eventBaronScrollContact();
}



function openPopupId(id) {
    var idForJQ = '#' + id;
    var popup = $(idForJQ);
    $('body').addClass('no-scroll-no-fixed');
    popup.fadeIn(400);
    var scroller = popup.find('.popup__wrapper');
    if(scroller.length > 0) {
        scroller.baron({
            root: ".popup__wrapper",
            scroller: ".popup__content",
            bar: ".popup__bar",
            scrollingCls: "_scrolling",
            draggingCls: "_dragging"
        });
    }
}

function eventPopupLinkId () {
    var arrLink = $('.js-popup-id-open');
    arrLink.on('click', function (e) {
        e.preventDefault();
        var id = $(this).data('popup');
        openPopupId(id);
    })
}


function eventTourCardGalleryCounter () {
    var arrGallery  = $('.tour-gallery__block');
    // var plus = "+";
    $.each(arrGallery, function (index){
        var blockCounter = $(this).find('.tour-gallery__zoom-counter');
        var visuallyBlock =  $(this).find('div.visually-hidden');
        var numb;
        var text;

        $(window).on('load resize',function () {
            if ($(window).width() < 1200 && $(window).width() > 420) {
                numb = visuallyBlock.children().length + 1;
                text = '+' + numb;
                blockCounter.html(text)
            } else {
                numb = visuallyBlock.children().length;
                text = '+' + numb;
                blockCounter.html(text)
            }
        })
    });
}

function eventAwardsSlider () {
    var awards = $('.awards__slider');
    if (awards.length > 0) {
        awards.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            dots: false,
            focusOnSelect: false,
            infinite: true,
            swipe: true,
            swipeToSlide: true,
            centerMode: true,
            centerPadding: '50px',
            variableWidth: true,
            prevArrow: ".awards__controls .back__slide",
            nextArrow: ".awards__controls .next__slide",

        });


        var fancyboxAward = awards.find('.awards__link');
        fancyboxAward.fancybox({
            animationEffect: "zoom",
            animationDuration: 500,
            transitionEffect: "zoom-in-out",
            transitionDuration: 500,
            backFocus: false,
            buttons: [
                // "zoom",
                //"share",
                // "slideShow",
                //"fullScreen",
                //"download",
                // "thumbs",
                "close"
            ],
            arrows: false,
            keyboard : false,
        });
    }
}