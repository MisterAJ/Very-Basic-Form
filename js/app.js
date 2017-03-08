// Global Variables

let valName = false;
let valEMail = false;
let valCourse = false;
let valCCN = false;
let valZip = false;
let valCVV = false;

let other;
let money = 0;
let paypal;
let bitcoin;

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

function fullFormValidation() {
    if (valName && valEMail && valCourse && valCCN && valZip && valCVV) {
        $('#submitButton').removeClass('hide');
        $('#validated').remove();
    }
}

//  Set focus on the first text field

window.onload = function () {
    $('#name').focus();
    $(".activities").after('<p id="checkBoxRequired" class="textError">*You Must Select at least One Option*</p>');
    other = $('#other').remove();
    $('#cc').attr('selected', 'selected');
    paypal = $('#paypal').remove();
    bitcoin = $('#bitcoin').remove();
    $('#submitButton').addClass('hide');

    // Extra Credit - Hide the "Color" label and select menu until a T-Shirt design is selected from the "Design" menu

    $('#colors-js-puns').addClass('hide')
};

//  ”Job Role” section of the form

$('#title').on('change', function () {
    let $elm = $(this).children('option:selected');

    if ($elm.attr('value') === 'other') {
        $('#title').after(other);
    }
    if ($elm.attr('value') !== 'other') {
        $('#other').remove();
    }
});

//  Only show available shirt colors

$("#design").on("change", function () {
    let $elm = $(this).children('option:selected');

    $('#colors-js-puns').removeClass('hide')

    if ($elm.attr("value") === 'js puns') {
        $('.punsShirt').attr('disabled', false).attr('selected', "selected");
        $('.heartShirt').attr('disabled', true).removeAttr('selected');
    }
    if ($elm.attr("value") === 'heart js') {
        $('.punsShirt').attr('disabled', true).removeAttr('selected');
        $('.heartShirt').attr('disabled', false).attr('selected', "selected");
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
        if ($elm.attr('id') === "mainConf") {
            money -= 200;
        } else {
            money -= 100;
        }
    }

    if($elm.prop("checked")) {
        $(elmArr).attr("disabled", true);
        $elm.attr("disabled", false);
        if ($elm.attr('id') === "mainConf") {
            money += 200;
        } else {
            money += 100;
        }
    }
    $("#cost").remove();
    $(".activities").append("<p id='cost'>Total cost: $" + money + "</p>");

});

// Payment Info section of the form

$('#payment').on("change", function () {
    let $elm = $(this).children('option:selected');

    if($elm.attr('value') === 'paypal'){
        $('#credit-card').addClass('hide').after(paypal);
        $('#bitcoin').remove();
        $('#credit-card').attr('disabled', true);
    } if($elm.attr('value') === 'bitcoin'){
        $('#credit-card').addClass('hide').after(bitcoin);
        $('#paypal').remove();
        $('#credit-card').attr('disabled', true);
    } if($elm.attr('value') === 'credit card'){
        $('#credit-card').attr('disabled', false);
        $('#credit-card').removeClass('hide');
        $('#paypal').remove();
        $('#bitcoin').remove();
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
        valName = false;
    }
    if ($elm.val().length >= 2) {
        $elm.removeClass('error');
        $('#nameError').remove();
        valName = true;
        fullFormValidation()
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
        valEMail = false;
    }
    if (isEmail($elm.val())) {
        $elm.removeClass('error');
        $('#mailError').remove();
        valEMail = true;
        fullFormValidation()
    }


});

//  At Least one Checkbox

$(".activities").change(function () {
    let boxArray = $(".activities input:checked");
    if (boxArray.length === 0) {
        $('#submitButton').addClass('hide');
        $('#checkBoxRequired').removeClass('hide');
        valCourse = false;
    }
    if ($(".activities input:checked").length > 0) {
        $('#checkBoxRequired').addClass('hide')
        valCourse = true;
        fullFormValidation();
    }
});

//  Credit card needs 13-16 digits

$('#cc-num').on('focusout', function () {
    let $elm = $(this);
    let text = $elm.val();

    if (!isValidCC(text)) {
        $('#ccError').remove();
        $elm.addClass('error');
        $elm.after('<p id="ccError" class="textError">Invalid Credit Card</p>');
        console.log('in the if');
        valCCN = false
    }
    if (isValidCC($elm.val())) {
        $elm.removeClass('error');
        $('#ccError').remove();
        valCCN = true;
        fullFormValidation();
    }
});

//  Zip code 5 digits

$('#zip').on('focusout', function () {
    let $elm = $(this);
    let text = $elm.val();

    if (!isValidUSZip(text)) {
        $('#zipError').remove();
        $elm.addClass('error');
        $elm.after('<p id="zipError" class="textError">Invalid ZipCode</p>');
        console.log('in the if')
        valZip = false;
    }
    if (isValidUSZip($elm.val())) {
        $elm.removeClass('error');
        $('#zipError').remove();
        valZip = true;
        fullFormValidation();
    }
});

//  CVV 3 digits

$('#cvv').on('focusout', function () {
    let $elm = $(this);
    let text = $elm.val();

    if (!isValidCVV(text)) {
        $('#cvvError').remove();
        $elm.addClass('error');
        $elm.after('<p id="cvvError" class="textError">Invalid CVV</p>');
        valCVV = false;
    }
    if (isValidCVV($elm.val())) {
        $elm.removeClass('error');
        $('#cvvError').remove();
        valCVV = true;
        fullFormValidation();
    }
});



