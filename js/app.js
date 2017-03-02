// Functions

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

function isValidCC(cc) {
    return /^\d{13,16}(-\d{4})?$/.test(cc);
}

function isValidUSZip(zip) {
    return /^\d{5}(-\d{4})?$/.test(zip);
}

function isValidCVV(cvv) {
    return /^\d{3}(-\d{4})?$/.test(cvv);
}

//  Set focus on the first text field

window.onload = function () {
    $('#name').focus();
    $(".activities").after('<p id="checkBoxRequired" class="textError">*You Must Select at least One Option*</p>');
    $('#other').addClass("hide");
    $('#cc').attr('selected', 'selected');
    $('#paypal').addClass('hide');
    $('#bitcoin').addClass('hide');
    $('#submitButton').addClass('hide');

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
        $('#bitcoin').addClass('hide');
        $('#paypal').removeClass('hide');
        $('#credit-card').attr('disabled', true);
    } if($elm.attr('value') === 'bitcoin'){
        $('#credit-card').addClass('hide');
        $('#paypal').addClass('hide');
        $('#bitcoin').removeClass('hide');
        $('#credit-card').attr('disabled', true);
    } if($elm.attr('value') === 'credit card'){
        $('#credit-card').attr('disabled', false);
        $('#credit-card').removeClass('hide');
        $('#paypal').addClass('hide');
        $('#bitcoin').addClass('hide')
    }
});


//  Validation
//  Name Field

$('#name').on('focusout', function () {
    let $elm = $(this);
    console.log('focus out')

    if ($elm.val().length < 2) {
        $('#nameError').remove();
        $elm.addClass('error');
        $elm.after('<p id="nameError" class="textError">Invalid Name - Too Short</p>');
    }
    if ($elm.val().length >= 2) {
        $elm.removeClass('error');
        $('#nameError').remove();
    }
});

//  Email

$('#mail').on('focusout', function () {
    let $elm = $(this);
    let text = $elm.val();

    if (!isEmail(text)) {
        $('#mailError').remove();
        $elm.addClass('error');
        $elm.after('<p id="mailError" class="textError">Invalid Email Address</p>');
        console.log('in the if')
    }
    if (isEmail($elm.val())) {
        $elm.removeClass('error');
        $('#mailError').remove();
    }


});

//  TODO - a Least one Checkbox

$(".activities").change(function () {
    let boxArray = $(".activities input:checked");
    if (boxArray.length === 0) {
        $('#submitButton').addClass('hide');
        $('#checkBoxRequired').removeClass('hide')
    }
    if ($(".activities input:checked").length > 0) {
        $('#submitButton').removeClass('hide');
        $('#checkBoxRequired').addClass('hide')
    }
});


//  TODO - Credit card needs 13-16 digits

$('#cc-num').on('focusout', function () {
    let $elm = $(this);
    let text = $elm.val();

    if (!isValidCC(text)) {
        $('#ccError').remove();
        $elm.addClass('error');
        $elm.after('<p id="ccError" class="textError">Invalid Credit Card</p>');
        console.log('in the if')
    }
    if (isValidCC($elm.val())) {
        $elm.removeClass('error');
        $('#ccError').remove();
    }
});

//  TODO - zip code 5 digits

$('#zip').on('focusout', function () {
    let $elm = $(this);
    let text = $elm.val();

    if (!isValidUSZip(text)) {
        $('#zipError').remove();
        $elm.addClass('error');
        $elm.after('<p id="zipError" class="textError">Invalid ZipCode</p>');
        console.log('in the if')
    }
    if (isValidUSZip($elm.val())) {
        $elm.removeClass('error');
        $('#zipError').remove();
    }
});


//  TODO - CVV 3 digits

$('#cvv').on('focusout', function () {
    let $elm = $(this);
    let text = $elm.val();

    if (!isValidCVV(text)) {
        $('#cvvError').remove();
        $elm.addClass('error');
        $elm.after('<p id="cvvError" class="textError">Invalid CVV</p>');
        console.log('in the if')
    }
    if (isValidCVV($elm.val())) {
        $elm.removeClass('error');
        $('#cvvError').remove();
    }
});

