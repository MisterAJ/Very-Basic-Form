//  Set focus on the first text field

window.onload = function () {
    $('#name').focus();
    $('#other').addClass("hide");
};

//  TODO ”Job Role” section of the form

$('#title').on('change', function () {
    let $elm = $(this).children('option:selected');

    if ($elm.attr('value') === 'other') {
        $('#other').removeClass("hide");
    }
    if ($elm.attr('value') !== 'other') {
        $('#other').addClass("hide");
    }

});

//  TODO Only show available shirt colors

//  TODO Validate the required fields

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

// The "Credit Card" payment option should be selected by default, display the #credit-card div, and hide the "Paypal" and "Bitcoin information.
// When a user selects the "PayPal" payment option, the Paypal information should display, and the credit card and “Bitcoin” information should be hidden.

$('#payment').on("change", function () {
    let $elm = $(this).children('option:selected');

    if($elm.attr('value') === 'paypal'){
        $('#credit-card').addClass('hide');
        $('#bitcoin').addClass('hide')
        $('#paypal').removeClass('hide')
    } if($elm.attr('value') === 'bitcoin'){
        $('#credit-card').addClass('hide');
        $('#paypal').addClass('hide')
        $('#bitcoin').removeClass('hide')
    } if($elm.attr('value') === 'credit card'){
        $('#credit-card').removeClass('hide');
        $('#paypal').addClass('hide')
        $('#bitcoin').addClass('hide')
    }
});

// TODO Form validation:
/* If any of the following validation errors exist, prevent the user from submitting the form:
        Name field can't be blank
        Email field must be a validly formatted e-mail address (you don't have to check that it's a real e-mail address, just that it's formatted like one: dave@teamtreehouse.com for example.
*/
 function isEmail(email){
 return /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test( email );
 }
 /*
        Must select at least one checkbox under the "Register for Activities" section of the form.
        If the selected payment option is "Credit Card," make sure the user has supplied a credit card number, a zip code, and a 3 number CVV value before the form can be submitted.
        Credit card field should only accept a number between 13 and 16 digits
        The zipcode field should accept a 5-digit number
        The CVV should only accept a number that is exactly 3 digits long
*/

// TODO Form validation messages:
/* Provide some kind of indication when there’s a validation error. The field’s borders could turn red, for example, or a message could appear near the field or at the top of the form
There should be an error indication for the name field, email field, “Register for Activities” checkboxes, credit card number, zip code, and CVV
*/

// TODO Hide the "Color" label and select menu until a T-Shirt design is selected from the "Design" menu

/* TODO Program at least one of your error messages so that more information is provided depending on the error. For example, if the user hasn’t entered a credit card number and the field is completely blank, the error message reads “Please enter a credit card number.” If the field isn’t empty but contains only 10 numbers, the error message reads “Please enter a number that is at least 16 digits long.”*/

// TODO Program your form so that it provides a real-time validation error message for at least one text input field. Rather than providing an error message on submit, your form should check for errors and display messages as the user begins typing inside a text field. For example, if the user enters an invalid email address, the error appears as the user begins to type, and disappears as soon as the user has entered a complete and correctly formatted email address.