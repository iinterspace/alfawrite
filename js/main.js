$(function () {
    setReviewCarousel();
    setOurClients();
    $('.navigation').mobileNav();
    $('#portfolioGallery').swipeBoxGallery();
    if ($('#one-page').length > 0) {
        var screenScroll = $('main.main').screenScroll({
            header: $('header.header'),
            footer: $('footer.footer'),
            headerFixed: true,
            responsive: {
                780: {
                    headerFixed: false,
                    screens: [
                        {
                            size: 50,
                            sections: [3, 4]
                        },
                        {
                            size: 50,
                            sections: [5, 6]
                        }
                    ]
                },
            }
        });
        screenScroll.on('screenScroll.afterMove', function (e, data) {
            if (data.currentScreenIndex == 1) {
                $('.numeric-item').addClass('animated fadeIn');
                var nums = $('.numeric-list  span.num');
                $.each(nums, function (index, value) {
                    $(value).text(0);
                    $(value).numerator({
                        easing: 'linear',
                        duration: 1700,
                        toValue: $(value).data('to')
                    });
                });
            }
            if (data.currentScreenIndex == 2) {
                $('.numeric-item-box-list .numeric-item-box').addClass('animated fadeIn');
            }
        })
        screenScroll.on('screenScroll.afterMove', function (e, data) {
            if(data.currentScreenIndex != 0){
                $('#page-up').css('display', 'block');
            } else {
                $('#page-up').css('display', 'none');
            }
        });
    }
    $('#contactForm').on('submit', function (e) {
        var fd = new FormData($('#contactForm')[0]);
        $.ajax({
            url: '/submit.php',
            data: fd,
            type: 'POST',
            dataType: "json",
            processData: false,
            contentType: false,
            beforeSend: function () {
                $('#contactForm').animate({
                    opacity: 0
                }, 200);
                $('#contactForm').before('<div id="preloader" class="loader-wrapper"><div class="cssload-loader"></div></div>');
            },
            success: function (data) {
                setTimeout(function () {
                    $('#contactForm').html('<div class="success"><div class="message text-center text30">' + data.message + '</div></div>');
                    $('#contactForm').animate({
                        opacity: 1
                    }, 200);
                    $('#preloader').remove();
                }, 500);
            }
        });

        return false;
    });
});


function setReviewCarousel(){
    var reviewCarousel = $('.reviews-item-list').owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        items: 4,
        slideBy: 2,
        navText: [
            '<span class="icon icon-next icon-next-dims"></span>',
            '<span class="icon icon-prev icon-prev-dims"></span>'
        ],
        responsive: {
            0: {
                items: 2,
            },
            560: {
                items: 2,
            },
            768: {
                items: 3,
            },
            960: {
                items: 3,
            },
            1200: {
                items: 4,
            }
        }
    });
    if(
        $(window).width() < 768 &&
        $(window).height() > $(window).width() &&
        !reviewCarousel.hasClass('mobile-carousel')
    ){
        mobile(reviewCarousel);
    }

    $(window).on('resize', function () {
        if(
            $(window).width() <= 768 &&
            $(window).height() > $(window).width() &&
            !reviewCarousel.hasClass('mobile-carousel')
        ) {
            mobile(reviewCarousel);
        }

        if($(window).width() > 768 || $(window).height() < $(window).width()) {
            reviewCarousel.removeClass('mobile-carousel');
            reviewCarousel.trigger('destroy.owl.carousel');
            reviewCarousel.trigger('remove.owl.carousel');
            var list = $('.reviews-item-list > .item-wrap');
            $.each(list, function(index, value){
                $(value).children().unwrap();
            });
            reviewCarousel.owlCarousel({
                loop: true,
                margin: 30,
                nav: true,
                items: 4,
                slideBy: 2,
                navText: [
                    '<span class="icon icon-next icon-next-dims"></span>',
                    '<span class="icon icon-prev icon-prev-dims"></span>'
                ],
                responsive: {
                    0: {
                        items: 2,
                    },
                    560: {
                        items: 2,
                    },
                    768: {
                        items: 3,
                    },
                    960: {
                        items: 3,
                    },
                    1200: {
                        items: 4,
                    }
                }
            });
        }
    });

    function mobile(reviewCarousel) {
        reviewCarousel.addClass('mobile-carousel');
        reviewCarousel.trigger('destroy.owl.carousel');
        reviewCarousel.trigger('remove.owl.carousel');
        var list = $('.reviews-item-list > .review-item');
        var group = $();
        $.each(list, function(index, value){
            group = group.add(list.eq(index));
            if(index != 0){
                if((index+1)%4 == 0){
                    group.wrapAll('<div class="item-wrap"></div>div>')
                    group = $();
                }
            }
        });
        if(group.length > 0){
            group.wrapAll('<div class="item-wrap"></div>div>')
        }
        reviewCarousel.owlCarousel({
            loop: true,
            margin: 30,
            nav: true,
            items: 1,
            slideBy: 1,
            navText: [
                '<span class="icon icon-next icon-next-dims"></span>',
                '<span class="icon icon-prev icon-prev-dims"></span>'
            ],

        });
    }
}

function setOurClients(){
    var ourClientCarousel = $('.clients-item-list').owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        items: 6,
        slideBy: 6,
        navText: [
            '<span class="icon icon-next icon-next-dims"></span>',
            '<span class="icon icon-prev icon-prev-dims"></span>'
        ],
        responsive: {
            0: {
                items: 2,
                slideBy: 2,
            },
            560: {
                items: 3,
                slideBy: 3,
            },
            780: {
                items: 4,
                slideBy: 4
            },
            1300: {
                items: 4,
                slideBy: 4
            },
            1500: {
                items: 5,
                slideBy: 5
            },
            1600: {
                items: 6,
                slideBy: 6
            }
        }
    });
    if(
        $(window).width() < 768 &&
        $(window).height() > $(window).width() &&
        !ourClientCarousel.hasClass('mobile-carousel')
    ){
        mobile(ourClientCarousel);
    }

    function mobile(ourClientCarousel) {
        ourClientCarousel.addClass('mobile-carousel');
        ourClientCarousel.trigger('destroy.owl.carousel');
        ourClientCarousel.trigger('remove.owl.carousel');
        var list = $('.clients-item-list > .client-item');
        var group = $();
        $.each(list, function(index, value){
            group = group.add(list.eq(index));
            if(index != 0){
                if((index+1)%4 == 0){
                    group.wrapAll('<div class="item-wrap"></div>')
                    group = $();
                }
            }
        });
        if(group.length > 0){
            group.wrapAll('<div class="item-wrap"></div>div>')
        }
        ourClientCarousel.owlCarousel({
            loop: true,
            margin: 30,
            nav: true,
            items: 1,
            slideBy: 1,
            navText: [
                '<span class="icon icon-next icon-next-dims"></span>',
                '<span class="icon icon-prev icon-prev-dims"></span>'
            ],
        });
    }
}

(function ($) {
    $.fn.mobileNav = function () {
        var el = $(this);
        init();

        function init() {
            mainMenu();
            setMenuMode();
        }

        $('html').on('click', function () {
            menuClose();
        });

        function menuClose() {
            if (el.data('mode') == 'mobile' && el.hasClass('open')) {
                el.animate({
                    left: '-100%'
                }, 500);
                el.removeClass('open');
                el.addClass('close');
            }
        }

        function setMenuMode() {
            var w = $(document).width();
            var offset = 15;
            if ($('#one-page').length > 0)
                offset = 0;
            if (w < 780 - offset) {
                el.attr('data-mode', 'mobile');
                if (el.hasClass('open')) {
                    el.css('left', '-15px');
                } else {
                    el.css('left', '-100%');
                }

            } else {
                el.attr('data-mode', 'full');
                el.removeClass('open');
                el.removeClass('close');
                el.css('left', 0);
            }
        }

        function mainMenu() {
            $(window).resize(function () {
                setMenuMode();
            });
            $('*[data-event="menu"]').on('click', function (e) {
                openMenu();
                e.stopPropagation();
            });
        }

        function openMenu() {
            if (el.data('mode') == 'mobile') {
                el.animate({
                    left: '-15px'
                }, 500);
                el.removeClass('close');
                el.addClass('open');
            }
        }
    };
    $.fn.onePage = function () {
        if ($('#one-page').length == 0)
            return false;

        var docHeight = 0;
        var headerHeight = 0;
        var documentWidth = 0;
        var sectionCount = $('.main > section').length;

        function mouseEvents(elems) {
            elems.on("touchmove", function (e) {
                e.preventDefault();
                //e.stopPropagation();
            });

            var ts;
            var tsx;
            elems.bind('touchstart', function (e) {
                ts = e.originalEvent.touches[0].clientY;
                tsx = e.originalEvent.touches[0].clientX;
            });

            elems.bind('touchend', function (e) {
                var te = e.originalEvent.changedTouches[0].clientY;
                var tex = e.originalEvent.changedTouches[0].clientX;
                var deltaY = Math.abs(te - ts);
                var deltaX = Math.abs(tex - tsx);

                if (deltaY > deltaX) {
                    if (ts > te + 5) {
                        if (!$(this).is(':last-child')) {
                            next();
                        }
                    } else if (ts < te - 5) {
                        if (!$(this).is(':first-child')) {
                            prev();
                        }
                    }
                }
            });


            elems.on('mousewheel', function (e) {
                e.preventDefault();
                if (e.originalEvent.deltaY > 0) {
                    if (!$(this).is(':last-child')) {
                        next();
                    }
                } else {
                    if (!$(this).is(':first-child')) {
                        prev();
                    }
                }
            });
        }

        function setHeight() {
            var docHeight = $(window).height();
            var headerHeight = $('header.header').height();
            var documentWidth = $(window).width();

            if (documentWidth <= 780) {
                var elems = $('.row-two-block > div');
                elems.unwrap();
                $.each(elems, function (index, value) {
                    $(value).wrap('<section class="bg-block two-block"></section>');
                });
                mouseEvents($('section.two-block'));
            } else {
                var elems = $('.two-block > div');
                if (elems.length > 0) {
                    $.each(elems, function (index, value) {
                        $(value).unwrap();
                    });

                    for (var i = 0; i < elems.length; i = i + 2) {
                        var group = elems.slice(i, i + 2);
                        group.wrapAll('<section class="row-two-block"></section>');
                        mouseEvents($('section.row-two-block'));
                    }
                }
            }
            sectionCount = $('.main > section').length;

            $('#one-page .main > section').height(docHeight);
            $('#one-page .main > section').first().height(docHeight - headerHeight);
            $('#one-page .main > section').not('.bg-block').height('');
            var footer = $('#one-page .footer').height();
            if (documentWidth <= 780) {
                $('#one-page .main > section > .bg-block_half-height').height('100%');
                $('#one-page .main > section:last > .bg-block_half-height:last').height(docHeight - footer);
            } else {
                $('#one-page .main > section > .bg-block_half-height').height(docHeight / 2);
                $('#one-page .main > section:last > .bg-block_half-height:last').height((docHeight / 2) - footer);
            }

        }

        setHeight();

        $('html').addClass('onepage');
        var scrollHeight = 0;
        var section = 0;

        var canscroll = true;
        var timer;

        mouseEvents($('.main > section'));

        $('*[data-onepage="next"]').on('click', function () {
            next();
            return false;
        });

        $(window).resize(function (e) {
            setHeight();
            var isContact = $('main > section').eq(section).find('#contactForm').length;
            if (!isContact) {
                section = 0;
                scrollHeight = 0;
                $('#one-page').animate({textIndent: 0}, {
                    step: function (go) {
                        $(this).css('-moz-transform', 'translate3d(0, ' + scrollHeight + 'px, 0)');
                        $(this).css('-webkit-transform', 'translate3d(0, ' + scrollHeight + 'px, 0)');
                        $(this).css('-o-transform', 'translate3d(0, ' + scrollHeight + 'px, 0)');
                        $(this).css('transform', 'translate3d(0, ' + scrollHeight + 'px, 0)');
                    },
                    duration: 10,
                });

                mouseEvents($('.main > section'));
            } else {
                /*
                var header = $('.content header.header').height();
                for (var i = 0; i < section; i++) {
                    scrollHeight -= $('.main > section').eq(i).height();
                }
                if (section != 0)
                    scrollHeight -= header;

                var documentWidth = $(window).width();
                if (documentWidth <= 780) {
                    //scrollHeight += $('.main > section').eq(sectionCount-1).height();
                    if (section == sectionCount - 1) {
                        scrollHeight -= ($('#one-page .footer').height());
                    }
                } else {
                    if (section == sectionCount - 1) {
                        scrollHeight += $('.main > section').eq(sectionCount).height();
                        scrollHeight += ($('#one-page .footer').height());
                    } else {
                        console.log('section='+section);
                        console.log('sectionCount='+sectionCount);
                    }
                }
                */
            }


        });

        function next() {
            if (canscroll) {
                //var h = $(this).height();
                section++;
                var h = $('.main > section').eq(section).height();
                scrollHeight -= h;
                if (section == sectionCount - 1) {
                    scrollHeight -= $('#one-page .footer').height();
                }
                $('#one-page').animate({textIndent: 0}, {
                    step: function (go) {
                        $(this).css('-moz-transform', 'translate3d(0, ' + scrollHeight + 'px, 0)');
                        $(this).css('-webkit-transform', 'translate3d(0, ' + scrollHeight + 'px, 0)');
                        $(this).css('-o-transform', 'translate3d(0, ' + scrollHeight + 'px, 0)');
                        $(this).css('transform', 'translate3d(0, ' + scrollHeight + 'px, 0)');
                    },
                    duration: 10,
                    //complete: function(){ alert('done') }
                });
                canscroll = false;
                setTimeout(function () {
                    canscroll = true
                }, 800);
                animate(section);
            }

            return false;
        }

        function prev() {
            if (canscroll) {
                var prevSection = section;
                section--;
                var h = $('.main > section').eq(section).height();
                if (section != sectionCount - 2) {
                    scrollHeight += h;
                } else {
                    scrollHeight += $('.main > section').eq(sectionCount - 1).height();
                    scrollHeight += $('#one-page footer.footer').height();
                }
                if (section == 0) {
                    scrollHeight += $('.content header.header').height();
                }
                $('#one-page').animate({textIndent: 0}, {
                    step: function (go) {
                        $(this).css('-moz-transform', 'translate3d(0, ' + scrollHeight + 'px, 0)');
                        $(this).css('-webkit-transform', 'translate3d(0, ' + scrollHeight + 'px, 0)');
                        $(this).css('-o-transform', 'translate3d(0, ' + scrollHeight + 'px, 0)');
                        $(this).css('transform', 'translate3d(0, ' + scrollHeight + 'px, 0)');
                    },
                    duration: 10,
                    //complete: function(){ alert('done') }
                });
                canscroll = false;
                setTimeout(function () {
                    canscroll = true
                }, 800);
            }

            return false;
        }

        function animate(section) {
            switch (section) {
                case 1 : {
                    $('.numeric-item').addClass('animated fadeIn');
                    var nums = $('.numeric-list  span.num');
                    $.each(nums, function (index, value) {
                        $(value).text(0);
                        $(value).numerator({
                            easing: 'linear',
                            duration: 1700,
                            toValue: $(value).data('to')
                        });
                    });
                    break;
                }
                case 2 : {
                    $('.numeric-item-box-list .numeric-item-box').addClass('animated fadeIn');
                }
            }
        }
    };
    $.fn.swipeBoxGallery = function () {
        var el = $(this);
        var items = el.find('[data-gallery]');
        var galleryName = '';
        var galleryItems;

        var overlay = $('<div id="swipeBoxOverlay"></div>'),
            closeButton = $('<div id="swipeBoxGalleryClose"><span class="icon icon-close icon-close-dims"></span> </div>'),
            modal = $('<div class="modal">'),
            modalBody = $('<div class="modal__body">'),
            gallery = $('<div id="swipeBoxGallery">');

        init();

        function init() {
            $('body').append(overlay.hide());
            modal.appendTo(overlay);
            closeButton.appendTo(overlay);
            modalBody.appendTo(modal);
            gallery.appendTo(modalBody);

            items.on('click', function (e) {
                var itemGalleryName = $(this).data('gallery');
                if (galleryName != itemGalleryName) {
                    galleryName = itemGalleryName;
                    loadGalleryItems(this);
                    initCarousel();
                }

                open(this);
                e.preventDefault();
            });

            overlay.on('click', function (e) {
                close();
            });

            gallery.on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
            });

            return false;
        }

        function loadGalleryItems(elem) {
            galleryItems = el.find('[data-gallery="' + galleryName + '"]');
            galleryItemsHTML = '';
            $.each(galleryItems, function (index, value) {
                galleryItemsHTML += '<div class="gallery-list__item"><img src="' + $(value).attr('href') + '" /></div>';
            });
            $(galleryItemsHTML).appendTo(gallery);
        }

        function initCarousel() {
            gallery.addClass('owl-carousel owl-theme');
            gallery.owlCarousel({
                loop: true,
                margin: 10,
                nav: true,
                items: 1,
                navText: [
                    '<span class="icon icon-next icon-next-dims"></span>',
                    '<span class="icon icon-prev icon-prev-dims"></span>'
                ],
                responsive: {
                    0: {
                        items: 1
                    }
                }
            })
        }

        function open(elem) {
            var index = 0;
            $.each(galleryItems, function (index, value) {
                if (elem == value) {
                    gallery.trigger("to.owl.carousel", index);
                    return false;
                }
            });
            overlay.css('opacity', 0);
            $('.wrapper').css('overflow', 'hidden');
            overlay.show();
            overlay.animate({opacity: 1}, 600);
        }

        function close() {
            overlay.animate({opacity: 0}, 600, function () {
                overlay.hide();
                $('.wrapper').css('overflow', 'auto');
                overlay.css('opacity', 1);
            });

        }

        function destroy() {

        }
    }

})(jQuery);
