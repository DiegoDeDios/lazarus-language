/*
	Diego Alonso Martinez de Dios
	Etapas de Interpretador:
	1) Analizador Lexico ->  Lista de tokens 
	2) Analizador Sintactico -> AST
	3) Evaluacion de comandos -> Output


*/




/*
	Analizador Lexico
	Cada estado recibe un char c como argumento
	q0 = esOperador
	q1 = esOperando
	q2 = esEscape
	q3 = esId
*/
let lexer = function(stream){
	var tokens = [], c, i = 0;
	q0 = (c) => /[+\-*\/\^%=(),]/.test(c);
	q1 = (c) => /[0-9]/.test(c);
	q2 = (c) => /\s/.test(c);
	q3 = (c) => typeof c === "string" && !q0(c) && !q1(c) && !q2(c);
	next = () => c = stream[++i];
	var addToken = function (type, value) {
  		tokens.push({
   		 type: type,
   		 value: value
			 });
		};
	while(i < stream.length){
		c = stream[i];
		if(q2(c)) { next(); }
		if(q0(c)) { addToken(c); next();  }
		else if(q1(c)){
			var digit = c;
			while(q1(next())) digit +=c;
			if(c === "."){ //Si es punto flotante...
				do digit += c; while (q1(next()));
			}	
			digit = parseFloat(digit);
			addToken("Numero", digit);
		}
		else if(q3(c)){
			var idn = c;
			while(q3(next())) idn += c;
			addToken("Variable", idn);	
		}
		else throw "Syntax error";
	}
	addToken("eof") // Equivalente a EOF
	return tokens;
		
	};

var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', function(line){
   console.log(lexer(line));
})







