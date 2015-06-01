var person = G$('John', 'Doe','en');

person.greet();
person.greet('formal');

person.greet('formal').setLang('es').greet();