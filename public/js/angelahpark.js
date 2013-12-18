$(document).ready(function(){
    $('a[href^="#"]').on('click',function(event) {
        event.preventDefault();

        var target = this.hash,
        $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 700, 'swing'
        );
    });

    window.mySwipe = Swipe(document.getElementById('portfolioSlides'), {
        continuous: false,
        callback: function(index, elem) {
            index == 0 ? $(".arrow-prev").hide() : $(".arrow-prev").show();
            var slideCount = $(".swipe-wrap").children().length;
            index == slideCount - 1 ? $(".arrow-next").hide() : $(".arrow-next").show();
        }
    });

    $(function() {
        // links arrows
        $(".arrow-next").click(function(e) {
            e.preventDefault();
            mySwipe.next();
        });
        $(".arrow-prev").click(function(e) {
            e.preventDefault();
            mySwipe.prev();
        });
    });
});