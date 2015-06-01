// Create a G$ person
var person = G$('John','Doe');

// Test the functionality
person.greet();
person.greet('formal');

// Try chaining...
person.greet('formal').setLang('es').greet();

// Testing jQuery support
$('#login').click(function() {
    var loginGreetr = person;
    $('logindiv').hide();
    loginGreetr.setLang($('#lang').val()).jQGreet('#Greeting','formal').log();
});