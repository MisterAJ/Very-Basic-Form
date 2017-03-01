//  Set focus on the first text field

window.onload = function () {
    $('#name').focus();
    $('#other').addClass("hide");

    // Extra Credit - Hide the "Color" label and select menu until a T-Shirt design is selected from the "Design" menu
    $('#colors-js-puns').addClass('hide')
};

//  ”Job Role” section of the form

$('#title').on('change', function () {
    let $elm = $(this).children('option:selected');

    if ($elm.attr('value') === 'other') {
        $('#other').removeClass("hide");
    }
    if ($elm.attr('value') !== 'other') {
        $('#other').addClass("hide");
    }

});

//  Only show available shirt colors

$("#design").on("change", function () {
    let $elm = $(this).children('option:selected');

    $('#colors-js-puns').removeClass('hide')

    if ($elm.attr("value") === 'js puns') {
        $('.punsShirt').removeClass('hide').attr('selected', "selected");
        $('.heartShirt').addClass('hide').removeAttr('selected');
    }
    if ($elm.attr("value") === 'heart js') {
        $('.punsShirt').addClass('hide').removeAttr('selected');
        $('.heartShirt').removeClass('hide').attr('selected', "selected");
    }
});


//  Block out courses with conflicting times

$('.activities input').on("click", function () {
    let $elm = $(this);
    let elmClass = '.' + $(this).attr('class');
    let elmArr = $(this).parents().parents().find(elmClass);


    if(!$elm.prop("checked")) {
        $(elmArr).attr("disabled", false);
        $elm.attr("disabled", false);
    }

    if($elm.prop("checked")) {
        $(elmArr).attr("disabled", true);
        $elm.attr("disabled", false);
    }

});


// Payment Info section of the form

$('#payment').on("change", function () {
    let $elm = $(this).children('option:selected');

    if($elm.attr('value') === 'paypal'){
        $('#credit-card').addClass('hide');
        $('#bitcoin').addClass('hide')
        $('#paypal').removeClass('hide')
        $('#credit-card').attr('disabled', true);
    } if($elm.attr('value') === 'bitcoin'){
        $('#credit-card').addClass('hide');
        $('#paypal').addClass('hide')
        $('#bitcoin').removeClass('hide')
        $('#credit-card').attr('disabled', true);
    } if($elm.attr('value') === 'credit card'){
        $('#credit-card').attr('disabled', false);
        $('#credit-card').removeClass('hide');
        $('#paypal').addClass('hide')
        $('#bitcoin').addClass('hide')
    }
});

// Form validation: was done with HTML5