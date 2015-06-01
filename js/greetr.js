// Set up the IIFE to take in the window and jQuery. 
// This allows for safe coding (e.g. no collisions with existing namespaces) 
(function (global,$){
    /* Greetr function: We want to create a function that allows us to 
        avoid using the 'new' keyword everytime we need a Greetr object
        To do this, we create a function that returns a new Greeter init object
        (yet to be defined)
    */
    var Greetr = function (firstName, lastName, language){
        return new Greetr.init(firstName,lastName,language);
    };
    
    // Internal variables for use in resulting closure when this IIFE exits
    var supportedLangs = ['en', 'es'];
    
    // The next few variables will allow messages to be accessed by language
    var greetings = {
        en : 'Hi',
        es : 'Hola',
    };
    
    var formalGreetings = {
        en : 'Hello',
        es : 'Saludos'
    };
    
    var logMessages = {
        en : 'Logged in',
        es : 'Inicio sesion'
    };
    
    // All available Greetr methods will be placed in our custom prototype
    Greetr.prototype = {
        fullName : function() {
                return this.firstName + ' ' + this.lastName;
            },
        
        validate : function() {
                if (supportedLangs.indexOf(this.language) === -1){
                    throw "Unsupported Language: " + this.language;   
                }
            },
        greeting: function() {
                return [greetings[this.language],this.firstName].join(' ') + '!';
            },
        
        formalGreeting: function() {
                return [formalGreetings[this.language],this.fullName()].join(', ') + '.';
            },
        
        greet: function (formal) {
                var msg;
                if (formal) {
                    msg = this.formalGreeting();
                } else {
                    msg = this.greeting();
                }
            
                if (console) {
                    var logMsg = formal === 'formal' ? 'Formal greeting: ' + msg : 'Informal greeting: ' + msg;
                    console.log(logMsg);
                }
                // This ensures that calling this function is a chainable action
                return this;
            },
        
        log : function () {
                if (console) {
                    console.log(logMessages[this.language] = ': ' + this.fullName());
                }
                return this;
        },
        
        setLang : function(lang) {
            var oldLang = this.language;
            this.language = lang;
            this.validate();
            
            return this;
        }
                                
    };
    
    // Function Constructor for Greetr Object
    Greetr.init = function (firstName, lastName, language){
        // Set up default values for the input arguments
        
        var self = this;
        
        self.firstName = firstName || '';
        self.lastName = lastName || '';
        self.language = language || 'en';
        
    };
    
    // Ensure that the prototype chain connects to our Greetr.prototype and not the 
    // default created when Greetr init is invoked
    Greetr.init.prototype = Greetr.prototype;
    
    // We have to then attach the newly created object to the global environment
    // Greetr is also given an alias for ease of use (in line with the specs in README.md)
    global.Greetr = global.G$ = Greetr;
    
}(this,jQuery));