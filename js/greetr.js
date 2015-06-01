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
    
    // All available Greetr methods will be placed in our custom prototype
    Greetr.prototype = {};
    
    // Function Constructor for Greetr Object
    Greetr.init = function (firstName, lastName, language){
        // Set up default values for the input arguments
        
        var self = this;
        
        self.firstName = firstName || 'Default';
        self.lastName = lastName || 'Default';
        self.language = language || 'en';
        
    };
    
    // Ensure that the prototype chain connects to our Greetr.prototype and not the 
    // default created when Greetr init is invoked
    Greetr.init.prototype = Greetr.prototype;
    
    // We have to then attach the newly created object to the global environment
    // Greetr is also given an alias for ease of use (in line with the specs in README.md)
    global.Greetr = global.G$ = Greetr;
    
}(this,jQuery));