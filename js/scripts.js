// Here we will set the logo and allow it to change colors if the background changes
var setLogo = function () {
    // for each moveable logo
    $('.moveable').each(function () {
        // change the css top value
        $(this).css('top',
            // to however far the default is from the top
            $('.default').offset().top -
            // minus however far the moveable logo is from the top
            $(this).closest('.container').offset().top
        );
    });
};

$(document).scroll(function () {
    setLogo();
});

setLogo();