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

    $('body').on('click', '.window-link', function(e) {
        windowOpen($(this).attr('href'));
        e.preventDefault();
    });

    $('body').on('keyup', function(e) {
        if (e.keyCode == 27) {
            windowClose();
        }
    });

    $(document).click(function(e) {
        if ($(e.target).hasClass('window')) {
            windowClose();
        }
    });

    $(window).resize(function() {
        windowPosition();
    });

    $('body').on('click', '.window-close, .window-btn-close', function(e) {
        windowClose();
        e.preventDefault();
    });

    $('.main-popular .main-popular-content').each(function() {
        var curBlock = $(this);
        var curBig = curBlock.find('.main-big');
        if (curBig.length == 1) {
            curBlock.find('.main-mini-list').prepend('<div class="main-mini main-mini-mobile">' +
                                                        '<a href="' + curBig.find('a').attr('href') + '">' +
                                                            '<div class="main-mini-photo"><img src="' + curBig.find('.main-big-photo img').attr('src') + '" alt="" /></div>' +
                                                            '<div class="main-mini-type">' + curBig.find('.main-big-type').html() + '</div>' +
                                                            '<div class="main-mini-date-mobile">' + curBig.find('.main-big-date-mobile').html() + '</div>' +
                                                            '<div class="main-mini-title">' + curBig.find('.main-big-title').html() + '</div>' +
                                                            '<div class="main-mini-anonce">' + curBig.find('.main-big-anonce').html() + '</div>' +
                                                            '<div class="main-mini-info">' +
                                                                '<div class="main-mini-info-date">' + curBig.find('.main-big-info-date').html() + '</div>' +
                                                                '<div class="main-mini-info-view">' + curBig.find('.main-big-info-view').html() + '</div>' +
                                                            '</div>' +
                                                        '</a>' +
                                                    '</div>');
        }
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

    $(document).click(function(e) {
        if ($(e.target).hasClass('header-inner')) {
            if ($('html').hasClass('menu-open')) {
                $('.wrapper').css({'top': 'auto'});
                $('html').removeClass('menu-open');
                $(window).scrollTop($('.wrapper').data('curScroll'));
            }
        }
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

    $('.article-social a').click(function(e) {
        var curLink = $(this);
        var curSocial = curLink.parent();
        var curTitle = encodeURIComponent(curSocial.data('title'));
        var curDescription = encodeURIComponent(curSocial.data('description'));
        var curUrl = encodeURIComponent(curSocial.data('url'));

		switch (curLink.data('id')) {
			case 'fb':
				popupCenter('https://www.facebook.com/sharer/sharer.php?u=' + curUrl, curTitle);
				break;

			case 'vk':
				popupCenter('https://vk.com/share.php?url=' + curUrl + '&description=' + curTitle + '. ' + curDescription, curTitle);
				break;

			case 'tw':
				var text = curTitle || curDescription || '';
				if (curTitle.length > 0 && curDescription.length > 0) text = curTitle + ' - ' + curDescription;
				if (curDescription.length > 0) text = '&text=' + text;
				popupCenter('https://twitter.com/intent/tweet?url=' + curUrl + text, curTitle);
				break;

            default:
				break;
		}

        e.preventDefault();
    });

    $('body').on('change', '.window-policy-checkbox input', function() {
        if ($(this).prop('checked')) {
            $(this).parents().filter('form').find('.window-policy-error').removeClass('visible');
            $(this).parents().filter('form').find('.form-submit .btn').prop('diabled', false).removeClass('disabled');
        } else {
            $(this).parents().filter('form').find('.window-policy-error').addClass('visible');
            $(this).parents().filter('form').find('.form-submit .btn').prop('diabled', true).addClass('disabled');
        }
    });

    $('.page-404-menu ul li a').click(function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            $('.page-404-menu ul li.active').removeClass('active');
            curLi.addClass('active');

            var curIndex = $('.page-404-menu ul li').index(curLi);
            $('.page-404-tab').stop(true, true);
            $('.page-404-tab:visible').fadeOut(100, function() {
                $('.page-404-tab').eq(curIndex).fadeIn(100);
            });
        }
        e.preventDefault();
    });

    $('nav ul li').each(function() {
        if ($(this).find('ul').length > 0) {
            $(this).addClass('with-submenu');
        }
    });

    $('.up-link').click(function(e) {
        $('html, body').animate({'scrollTop': 0});
        e.preventDefault();
    });

    $('body').on('change', '#activity-other', function(e) {
        if ($(this).prop('checked')) {
            $('#activity-other-text').addClass('visible');
        } else {
            $('#activity-other-text').removeClass('visible');
        }
    });

    if ($('.article-infinity').length > 0) {
        $('.article-infinity').data('loading', false);
        $('.article-infinity').find('.article-infinity-item').eq(0).addClass('active');

        $(window).on('load resize scroll', function() {
            var curInifinity = $('.article-infinity');
            var curScroll = $(window).scrollTop();
            var curHeight = $(window).height();
            var curArticle = curInifinity.find('.article-infinity-item.active');
            if (curArticle.length > 0) {
                if (!curInifinity.data('loading')) {
                    if ((curScroll + curHeight) > ((curArticle.offset().top + curArticle.height()) / 2)) {
                        if (curArticle.attr('data-next') !== undefined) {
                            curInifinity.data('loading', true);
                            $.ajax({
                                type: 'POST',
                                url: curArticle.attr('data-next'),
                                dataType: 'html',
                                cache: false
                            }).done(function(html) {
                                curInifinity.append(html);
                                curInifinity.find('.article-infinity-item:last').addClass('next');
                            });
                        }
                    }
                }
                if ((curScroll + curHeight / 2) > (curArticle.offset().top + curArticle.height())) {
                    curArticle.removeClass('active');
                    curArticle.next().addClass('active').removeClass('next');
                    curInifinity.data('loading', false);
                }
            }
        });
    }

});

function popupCenter(url, title) {
    var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;
    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
	var left = ((width / 2) - (480 / 2)) + dualScreenLeft;
    var top = ((height / 3) - (360 / 3)) + dualScreenTop;
    var newWindow = window.open(url, title, 'scrollbars=yes, width=' + 480 + ', height=' + 360 + ', top=' + top + ', left=' + left);
    if (window.focus) {
        newWindow.focus();
    }
}


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
            if (curBlock.find('.article-subscribe').length > 0) {
                curBottom = -25;
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

    if (curScroll > $(window).height()) {
        $('.up-link').addClass('visible');
    } else {
        $('.up-link').removeClass('visible');
    }
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
        $('.main-popular:not(.main-popular-articles) .main-mini-list, .main-calendar-list, .main-navigator-list, .magazine-archive-years, .page-404-tab-list').each(function() {
            var curList = $(this);
            if (curList.hasClass('slick-slider')) {
                curList.slick('unslick');
            }
        });
    } else {
        $('.main-popular:not(.main-popular-articles) .main-mini-list, .main-calendar-list, .magazine-archive-years, .page-404-tab-list').each(function() {
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
        ignore: '',
        showErrors: function(errorMap, errorList) {
            if (curForm.find('.window-policy-checkbox').length > 0) {
                if (curForm.find('.window-policy-checkbox input').prop('checked')) {
                    curForm.find('.window-policy-error').removeClass('visible');
                    curForm.find('.form-submit .btn').prop('diabled', false).removeClass('disabled');
                } else {
                    curForm.find('.window-policy-error').addClass('visible');
                    curForm.find('.form-submit .btn').prop('diabled', true).addClass('disabled');
                }
                if (this.numberOfInvalids() == 0) {
                    curForm.find('.form-submit .btn').prop('diabled', false).removeClass('disabled');
                } else {
                    curForm.find('.form-submit .btn').prop('diabled', true).addClass('disabled');
                }
            }
            this.defaultShowErrors();
        },
        submitHandler: function(form) {
            if ($(form).hasClass('ajax-form')) {
                var formData = new FormData(form);

                if ($(form).find('[type=file]').length != 0) {
                    var file = $(form).find('[type=file]')[0].files[0];
                    formData.append('file', file);
                }

                windowOpen($(form).attr('action'), formData);
            } else {
                form.submit();
            }
        }
    });
}

function windowOpen(linkWindow, dataWindow) {
    if ($('html').hasClass('menu-open')) {
        $('.wrapper').css({'top': 'auto'});
        $('html').removeClass('menu-open');
        $(window).scrollTop($('.wrapper').data('curScroll'));
    }

    if ($('.window').length > 0) {
        windowClose();
    }

    var curPadding = $('.wrapper').width();
    var curWidth = $(window).width();
    if (curWidth < 480) {
        curWidth = 480;
    }
    var curScroll = $(window).scrollTop();
    $('html').addClass('window-open');
    curPadding = $('.wrapper').width() - curPadding;
    $('body').css({'margin-right': curPadding + 'px'});
    $('body').append('<div class="window"><div class="window-loading"></div></div>')
    $('.wrapper').css({'top': -curScroll});
    $('.wrapper').data('curScroll', curScroll);
    $('meta[name="viewport"]').attr('content', 'width=' + curWidth);

    $.ajax({
        type: 'POST',
        url: linkWindow,
        processData: false,
        contentType: false,
        dataType: 'html',
        data: dataWindow,
        cache: false
    }).done(function(html) {
        $('.window').append('<div class="window-container window-container-preload"><div class="window-content">' + html + '<a href="#" class="window-close"></a></div></div>')

        windowPosition();

        $('.window-container-preload').removeClass('window-container-preload');

        $('.window form').each(function() {
            initForm($(this));
        });

        $('.window #activity-other').each(function() {
            if ($(this).prop('checked')) {
                $('#activity-other-text').addClass('visible');
            } else {
                $('#activity-other-text').removeClass('visible');
            }
        });

    });
}

function windowPosition() {
    if ($('.window').length > 0) {
        $('.window-container').css({'left': '50%', 'margin-left': -$('.window-container').width() / 2});

        $('.window-container').css({'top': '50%', 'margin-top': -$('.window-container').height() / 2, 'padding-bottom': 0});
        if ($('.window-container').height() > $('.window').height() - 80) {
            $('.window-container').css({'top': 40, 'margin-top': 0, 'padding-bottom': 40});
        }
    }
}

function windowClose() {
    if ($('.window').length > 0) {
        $('.window').remove();
        $('html').removeClass('window-open');
        $('body').css({'margin-right': 0});
        $('.side-developer, .side-copyrights').css({'margin-right': 0});
        $('.wrapper').css({'top': 0});
        $(window).scrollTop($('.wrapper').data('curScroll'));
        $('meta[name="viewport"]').attr('content', 'width=device-width');
    }
}

const googleTranslateConfig = {
    lang: 'ru'
};

function TranslateInit() {

    var code = TranslateGetCode();
    $('.header-lang div').removeClass('active');
    $('.header-lang div[data-google-lang="' + code + '"]').addClass('active');

    if (code == googleTranslateConfig.lang) {
        TranslateClearCookie();
    }

    new google.translate.TranslateElement({
        pageLanguage: googleTranslateConfig.lang
    });

    $('[data-google-lang]').click(function(e) {
        TranslateSetCookie($(this).attr('data-google-lang'));
        e.preventDefault();
        window.location.reload();
    });
}

function TranslateGetCode() {
    var lang = ($.cookie('googtrans') != undefined && $.cookie('googtrans') != 'null') ? $.cookie('googtrans') : googleTranslateConfig.lang;
    return lang.substr(-2);
}

function TranslateClearCookie() {
    $.removeCookie("googtrans");
    $.removeCookie("googtrans", {
        domain: "." + document.domain
    });
    $.cookie("googtrans", null, {
        expires: 365
    });
    $.cookie("googtrans", null, {
        domain: "." + document.domain,
        expires: 365
    });
}

function TranslateSetCookie(code) {
    $.cookie("googtrans", "\/auto\/" + code, {
        expires: 365
    });
    $.cookie("googtrans", "\/auto\/" + code, {
        domain: "." + document.domain,
        expires: 365
    });
}