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
        // Provides the full name of the Greetr object
        fullName : function() {
                return this.firstName + ' ' + this.lastName;
        },
        
        // Checks to ensure that the language selected is supported
        validate : function() {
                if (supportedLangs.indexOf(this.language) === -1){
                    throw "Unsupported Language: " + this.language;   
                }
        },
        
        // Provides an informal greeting based on the firstName and the selected language
        greeting: function() {
                return [greetings[this.language],this.firstName].join(' ') + '!';
        },
        
        // Provided a formal greeting form based on the full name and the language
        formalGreeting: function() {
                return [formalGreetings[this.language],this.fullName()].join(', ') + '.';
        },
        
        // Generic greet call. Provides the user selected form of greeting (formal/informal)
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
        
        // Produces a predefined message to the console based on the language and the current name
        log : function () {
                if (console) {
                    console.log(logMessages[this.language] + ': ' + this.fullName());
                }
                return this;
        },
        
        // Sets the language of the G$ object
        setLang : function(lang) {
            var oldLang = this.language;
            this.language = lang;
            this.validate();
            
            return this;
        },
        
        // Includes jQuery support
        jQGreet : function (selector, formal) {
            
            // Check that jQuery exists
            if (!$) {
                throw 'jQuery not loaded';
            }
            
            if (!selector) {
                throw 'No jQuery selector provided to jQGreet!'
            }
            
            var msg;
            
            if (formal){
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }
            
            // update the selector
            $(selector).html(msg).fadeIn(600);
            
            // make chainable
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
        
        // Check that the given language is supported
        self.validate();
        
    };
    
    // Ensure that the prototype chain connects to our Greetr.prototype and not the 
    // default created when Greetr init is invoked
    Greetr.init.prototype = Greetr.prototype;
    
    // We have to then attach the newly created object to the global environment
    // Greetr is also given an alias for ease of use (in line with the specs in README.md)
    global.Greetr = global.G$ = Greetr;
    
}(this,jQuery));