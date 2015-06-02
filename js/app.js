// Create a G$ person
var person = G$('John','Doe');

// Test the functionality
person.greet();
person.greet('formal');

// Try chaining...
person.greet('formal').setLang('es').greet();

// Testing jQuery support
$('#login').click(function() {
    var fname = $('#fname').val();
    var lname = $('#lname').val();
    var loginGreetr = G$(fname,lname);
    var formal = $('#formality input:checked').val();
    formal = Boolean(formal);
    console.log(formal);
    $('logindiv').hide();
    loginGreetr.setLang($('#lang').val()).jQGreet('#Greeting',formal).log();
});