$(document).ready(function () {

        //========================
        // GET NOW BUTTON (in Hero area)
        //========================
            $("#buyButton").click(function() {
                $(this).css('background-image','none').css('background-color','red')
            });
    
         //========================
         // STICKY NAV
         //========================
            $('.main-navigation').onePageNav({
                scrollThreshold: 0.2, // Adjust if Navigation highlights too early or too late
                filter: ':not(.external)',
                changeHash: true
              });

        /* =================================
        ===  RESPONSIVE VIDEO  ====
        =================================== */

        $(".video-container").fitVids();
                        
        /* COLLAPSE NAVIGATION ON MOBILE AFTER CLICKING ON LINK - ADDED ON V1.5*/

        if (matchMedia('(max-width: 480px)').matches) {
            $('.main-navigation a').on('click', function () {
                $('.navbar-toggle').click();
                console.log("clicked a mobile link");
            });
        }

        if (matchMedia('(max-width: 1400px)').matches) {
            $('.main-navigation a').on('click', function () {
                $('.navbar-toggle').click();
            });
        }

        /* NAVIGATION VISIBLE ON SCROLL */

        $(document).ready(function () {
            mainNav();
        });

        $(window).scroll(function () {
            mainNav();
        });

        if (matchMedia('(min-width: 992px), (max-width: 767px)').matches) {
          function mainNav() {
                var top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
                if (top > 40) $('.sticky-navigation').stop().animate({"top": '0'});

                //else $('.sticky-navigation').stop().animate({"top": '-80'});
            }
        }

        if (matchMedia('(min-width: 768px) and (max-width: 991px)').matches) {
          function mainNav() {
                var top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
                if (top > 40) $('.sticky-navigation').stop().animate({"top": '0'});

                //else $('.sticky-navigation').stop().animate({"top": '-120'});
            }
        }

        /* =================================
        ===  SMOOTH SCROLL  ====
        =================================== */
        function scrollToAnchor(aid){
            var aTag = $("a[name='"+ aid +"']");
            $('html,body').animate({scrollTop: aTag.offset().top},'slow');
        }

        $("#exploreBtn").click(function() {
           scrollToAnchor('apps');
        });

        /* =================================
        ===  WOW ANIMATION  ====
        =================================== */
        wow = new WOW(
          {
            mobile: false
          });
        wow.init();

        /* =================================
        ===  CONTACT FORM   ====
        =================================== */

        $("#contact").submit(function (e) {
            e.preventDefault();
            var name = $("#name").val();
            var email = $("#email").val();
            var subject = $("#subject").val();
            var message = $("#message").val();
            var dataString = 'name=' + name + '&email=' + email + '&subject=' + subject + '&message=' + message;

            function isValidEmail(emailAddress) {
                var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
                return pattern.test(emailAddress);
            };

            if (isValidEmail(email) && (message.length > 1)) {
                $.ajax({
                    type: "POST",
                    url: "sendmail.php",
                    data: dataString,
                    success: function () {
                        $('.success').fadeIn(1000);
                        $('.error').fadeOut(500);
                    }
                });
            } else {
                $('.error').fadeIn(1000);
                $('.success').fadeOut(500);
            }

            return false;
        });

});






