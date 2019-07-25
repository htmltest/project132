$(document).ready(function() {

    $.validator.addMethod('phoneRU',
        function(phone_number, element) {
            return this.optional(element) || phone_number.match(/^\+7 \(\d{3}\) \d{3}\-\d{2}\-\d{2}$/);
        },
        'Ошибка заполнения'
    );

    $('form').each(function() {
        initForm($(this));
    });

    $('.table-scroll').mCustomScrollbar({
        axis: 'x'
    });

    $('body').on('click', '.main-news-more .btn', function(e) {
        var curLink = $(this);
        if (!curLink.hasClass('loading')) {
            curLink.addClass('loading');
            $.ajax({
                type: 'POST',
                url: curLink.attr('href'),
                dataType: 'html',
                cache: false
            }).done(function(html) {
                var newHTML = $(html);
                $('.main-news-list').append(newHTML.find('.main-news-list').html());
                if (newHTML.find('.main-news-more .btn').length > 0) {
                    curLink.attr('href', newHTML.find('.main-news-more .btn').attr('href'));
                    curLink.removeClass('loading');
                } else {
                    curLink.parent().remove();
                }
                $(window).trigger('scroll');
            });
        }
        e.preventDefault();
    });

    $('body').on('click', '.main-popular-more .btn', function(e) {
        var curLink = $(this);
        if (!curLink.hasClass('loading')) {
            curLink.addClass('loading');
            $.ajax({
                type: 'POST',
                url: curLink.attr('href'),
                dataType: 'html',
                cache: false
            }).done(function(html) {
                var newHTML = $(html);
                $('.main-popular .main-mini-list').append(newHTML.find('.main-mini-list').html());
                if (newHTML.find('.main-popular-more .btn').length > 0) {
                    curLink.attr('href', newHTML.find('.main-popular-more .btn').attr('href'));
                    curLink.removeClass('loading');
                } else {
                    curLink.parent().remove();
                }
                $(window).trigger('scroll');
            });
        }
        e.preventDefault();
    });

    $('.main-projects-list').slick({
        infinite: false,
        slidesToShow: 6,
        slidesToScroll: 6,
        prevArrow: '<button type="button" class="slick-prev"><svg width="13" height="20" viewBox="0 0 13 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.22379 10L13 18.3777L11.6371 20L-4.37114e-07 10L11.6371 -5.08674e-07L13 1.62234L3.22379 10Z" /></svg></button>',
        nextArrow: '<button type="button" class="slick-next"><svg width="13" height="20" viewBox="0 0 13 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.77621 10L8.8276e-07 1.62234L1.3629 -5.08674e-07L13 10L1.3629 20L1.50361e-07 18.3777L9.77621 10Z" /></svg></button>',
        dots: false,
        responsive: [
            {
                breakpoint: 1159,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    arrows: false,
                    dots: true
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    arrows: false,
                    dots: true
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    arrows: false,
                    dots: true
                }
            }
        ]
    });

    $('.menu-link').click(function(e) {
        if ($('html').hasClass('menu-open')) {
            $('.wrapper').css({'top': 'auto'});
            $('html').removeClass('menu-open');
            $(window).scrollTop($('.wrapper').data('curScroll'));
        } else {
            $('.wrapper').css({'top': -$(window).scrollTop()});
            $('.wrapper').data('curScroll', $(window).scrollTop());
            $('html').addClass('menu-open');
        }
        e.preventDefault();
    });

    $('.header-search-link').click(function(e) {
        $('.header-search').addClass('open');
        $('.header-search-input input').trigger('focus');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.header-search').length == 0) {
            $('.header-search').removeClass('open');
        }
    });

    $('.marketing-media-select-title').click(function() {
        $(this).parent().toggleClass('open');
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.marketing-media-select').length == 0) {
            $('.marketing-media-select').removeClass('open');
        }
    });

    $('.gallery').each(function() {
        var curGallery = $(this);
        curGallery.find('.gallery-list').slick({
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: '<button type="button" class="slick-prev"><svg width="13" height="20" viewBox="0 0 13 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.22379 10L13 18.3777L11.6371 20L-4.37114e-07 10L11.6371 -5.08674e-07L13 1.62234L3.22379 10Z" /></svg></button>',
            nextArrow: '<button type="button" class="slick-next"><svg width="13" height="20" viewBox="0 0 13 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.77621 10L8.8276e-07 1.62234L1.3629 -5.08674e-07L13 10L1.3629 20L1.50361e-07 18.3777L9.77621 10Z" /></svg></button>',
            dots: false,
            responsive: [
                {
                    breakpoint: 1159,
                    settings: {
                        arrows: false,
                        dots: true
                    }
                }
            ]
        }).on('setPosition', function(event, slick) {
            var currentSlide = curGallery.find('.gallery-list').slick('slickCurrentSlide') + 1;
            curGallery.find('.gallery-ctrl-current').html(currentSlide);
        });
    });

    $('.brand-footer-close').click(function(e) {
        $('.brand-footer').fadeOut();
        e.preventDefault();
    });

    $('body').on('click', '.form-reset input', function() {
        window.setTimeout(function() {
            $('.form-select select').trigger('chosen:updated');
            $('.form-file input').each(function() {
                var curInput = $(this);
                var curField = curInput.parent();
                if (curInput.val() == '') {
                    curField.find('.form-file-name').html('');
                    curField.removeClass('success');
                }
            });
        }, 100);
    });

    $('.menu-section').each(function() {
        var curSection = $(this);
        if (curSection.next().hasClass('menu-section-list')) {
            curSection.addClass('with-submenu');
        }
    });

    $('.menu-section a').click(function(e) {
        if ($(window).width() < 1160) {
            if ($(this).parent().hasClass('with-submenu')) {
                $(this).parent().toggleClass('open');
                e.preventDefault();
            }
        }
    });

});

$(window).on('load resize scroll', function() {
    var curScroll = $(window).scrollTop();

    if (curScroll > $('header').offset().top + $('header').height()) {
        $('html').addClass('fixed');
    } else {
        $('html').removeClass('fixed');
    }

    $('.banner-side').each(function() {
        var curBanner = $(this);
        curBanner.height(curBanner.find('.banner-side-wrap').height());
        var curSide = curBanner.parent();
        var curBlock = curSide.parent();
        var curHeader = 0;
        if ($('html').hasClass('fixed')) {
            curHeader = $('.header-inner').height();
        }
        if (curScroll + curHeader > curBlock.offset().top + (curSide.offset().top - curBlock.offset().top)) {
            var newTop = curScroll + curHeader - curBlock.offset().top;
            var curBottom = 39;
            if (curBlock.hasClass('main-popular-container')) {
                curBottom = -16;
            }
            if (curBlock.hasClass('main-popular-container') && curBlock.find('.pager').length > 0) {
                curBottom = -33;
            }
            if (curBlock.hasClass('main-news-container') && curBlock.find('.pager').length > 0) {
                curBottom = 22;
            }
            if (curBlock.hasClass('main-news-companies')) {
                curBottom = 64;
            }
            if (curBlock.find('.magazine-archive-list').length > 0) {
                curBottom = -11;
            }
            if (curBlock.find('.magazines-list').length > 0) {
                curBottom = -3;
            }
            if (curBlock.hasClass('project')) {
                curBottom = -27;
            }
            if (curBlock.hasClass('search')) {
                curBottom = -33;
            }
            if (curBlock.find('.publishers-team').length > 0) {
                curBottom = -28;
            }
            if (curBlock.find('.marketing-list').length > 0) {
                curBottom = -1;
            }
            if (newTop + curBanner.height() < curBlock.height() + (curSide.offset().top - curBlock.offset().top - curBottom)) {
                curBanner.css({'top': curHeader, 'position': 'fixed', 'left': curBanner.offset().left});
            } else {
                curBanner.css({'top': curBlock.height() - curBanner.height() - curBottom, 'position': 'relative', 'left': 'auto'});
            }
        } else {
            curBanner.css({'top': 'auto', 'position': 'relative', 'left': 'auto'});
        }
    });
});

$(window).on('resize', function() {
    $('.form-select select').chosen('destroy');
    $('.form-select select').chosen({disable_search: true});
});

$(window).on('load resize', function() {
    $('.main-calendar-list').each(function() {
        var curList = $(this);

        curList.find('.main-calendar-item-inner').css({'min-height': '0px'});

        curList.find('.main-calendar-item-inner').each(function() {
            var curBlock = $(this);
            var curHeight = curBlock.outerHeight();
            var curTop = curBlock.offset().top;

            curList.find('.main-calendar-item-inner').each(function() {
                var otherBlock = $(this);
                if (otherBlock.offset().top == curTop) {
                    var newHeight = otherBlock.outerHeight();
                    if (newHeight > curHeight) {
                        curBlock.css({'min-height': newHeight + 'px'});
                    } else {
                        otherBlock.css({'min-height': curHeight + 'px'});
                    }
                }
            });
        });
    });

    if ($(window).width() > 1159) {
        $('.main-popular:not(.main-popular-articles) .main-mini-list, .main-calendar-list, .main-navigator-list, .magazine-archive-years').each(function() {
            var curList = $(this);
            if (curList.hasClass('slick-slider')) {
                curList.slick('unslick');
            }
        });
    } else {
        $('.main-popular:not(.main-popular-articles) .main-mini-list, .main-calendar-list, .magazine-archive-years').each(function() {
            var curList = $(this);
            if (!curList.hasClass('slick-slider')) {
                curList.slick({
                    infinite: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: false
                });
            }
        });

        $('.main-navigator-list').each(function() {
            var curList = $(this);
            if (!curList.hasClass('slick-slider')) {
                curList.slick({
                    infinite: false,
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    arrows: false,
                    dots: true,
                    responsive: [
                        {
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3
                            }
                        },
                        {
                            breakpoint: 767,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2
                            }
                        }
                    ]
                });
            }
        });
    }

});

function initForm(curForm) {
    curForm.find('.form-select select').chosen({disable_search: true});

    curForm.find('input.phoneRU').mask('+7 (000) 000-00-00');

    curForm.find('.form-file input').change(function() {
        var curInput = $(this);
        var curField = curInput.parent();
        curField.find('.form-file-name').html(curInput.val().replace(/.*(\/|\\)/, ''));
        curField.addClass('success');
    });

    curForm.validate({
        ignore: ''
    });
}