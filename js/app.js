// Create a G$ person
var person = G$('John','Doe');

// Test the functionality
person.greet();
person.greet('formal');

// Try chaining...
person.greet('formal').setLang('es').greet();

// Testing jQuery support
$('#login').click(function() {
    // Take the entered first and last names and create a new GreetrJS object
    var fname = $('#fname').val();
    var lname = $('#lname').val();
    var loginGreetr = G$(fname,lname);
    // Check for formality radios
    var formal = $('#formality input:checked').val();
    formal = Boolean(formal);
    
    // Produce the output using the jQuery support
    loginGreetr.setLang($('#lang').val()).jQGreet('#Greeting',formal).log();
    $('#logindiv').fadeOut();
});