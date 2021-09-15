(function () {
    let resized = false;
    checkOnResize();
    initRecommendSlider();

    $(window).resize(function(event) {
        var windowWidth = $(window).width();
        if (resized == windowWidth) { return; }
        resized = windowWidth;

        checkOnResize();
    });

    function checkOnResize() {
        toggleStageDevelop();
    }

    function toggleStageDevelop() {
        const scrollWrap = $('.dev-stages__right'),
        scrollDescr = $('.dev-stages__description'),
        scrollItem = $('.dev-stages__item'),
        scrollItemCount = scrollItem.length,
        toggl = $('.dev-stages__titles li');


        if ($(window).width() > 767) {
            scrollItem.off('click');
            toggl.on('mouseenter touchend', function() {
                toggleItems($(this), scrollItem);
            });

            scrollItem.on('mouseenter touchend', function() {
                toggleItems($(this), toggl);
            });
        } else {
            scrollDescr.removeAttr('style');
            toggl.off('mouseenter');
            scrollItem.off('mouseenter');
            scrollItem.on('click', function() {
                scrollItem.removeClass('active');
                $(this).addClass('active');
            });
        }



        function toggleItems(self, firstElem) {
            let index = self.index(),
            currentHei =  scrollItem.eq(index).innerHeight(),
            totalPosition = 0,
            currentPos = 0,
            scrollWrapHeight = scrollWrap.innerHeight();

            scrollItem.each(function(i, el) {
                if (i === index) {
                    return false;
                } else {
                    currentPos += $(el).outerHeight();
                }
            });

            toggl.removeClass('active');
            scrollItem.removeClass('active');

            self.addClass('active');
            firstElem.eq(index).addClass('active');

            switch (index) {
                case 0:
                    totalPosition = 0;
                    break;
                case 1:
                    totalPosition = 0;
                    break;
                case (scrollItemCount-2):
                    totalPosition = scrollDescr.innerHeight() - scrollWrapHeight;
                    break;
                case (scrollItemCount-1):
                    totalPosition = scrollDescr.innerHeight() - scrollWrapHeight;
                    break;
                default:
                    totalPosition = currentPos - currentHei;
            }

            scrollDescr.css('transform', 'translateY(-'+totalPosition+'px)');
        }
    }


    function initRecommendSlider() {
        const slider = $('.recomend-service__list');

        slider.slick({
            dots: false,
            arrows: true,
            nextArrow: '<button class="slick-next"></button>',
            prevArrow: '<button class="slick-prev"></button>',
            slidesToShow: 3,
            slidesToScroll: 3,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                        dots: true
                    }
                }
            ]
        });
    }
})();
