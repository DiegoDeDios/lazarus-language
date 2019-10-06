%lex
%%
(\s+) /*Whitespaces*/
("declara")\b  	 return 'INTDCL' 
("dibuja")\b	return 'DRAW'
("circulo"|"cuadrado"|"estrella"|"triangulo")\b	return 'FIGURE'
("imprime"|"escribe")\b   return 'PRINT' 
[a-e]|[g-h]|[j-o]|[q-z]\b 	  return 'ID' 
("=")  return 'ASSIGN'  
("+") 	 return 'PLUS' 
("-") 	 return 'MINUS' 
("*")    return 'TIMES'
("^")    return 'POWER' 
("/")    return 'DIVIDE'
("!")    return 'FACTORIAL'
("(")    return 'OPPARENTHESIS'
(")")    return 'CLPARENTHESIS'
("PI")   return 'PI'
(";")	 return 'ENDOFSTMT' 
[0-9]+ return 'INUM' 
.	return 'INVALID'
(\n)	return 'LINE'
/lex

%left PLUS MINUS
%left TIMES DIVIDE
%left POWER
%right FACTORIAL
%left UMINUS

%start prog

%%

prog: dcls stmts
	;
dcls: dcl dcls
	|
	;
dcl: INTDCL ID ENDOFSTMT  { symtable[$2] = 0; } 
	;
stmts: stmt ENDOFSTMT stmts 
        |
        ;
stmt: ID ASSIGN expr { symtable[$1] = $3; }
        | PRINT ID {console.log(symtable[$2]);}
	| DRAW FIGURE {console.log("Placeholder, hacer dibujacion de:", $2, "aqui");}
        ;
expr:   expr PLUS expr { $$=$1+$3; }
        | expr MINUS expr { $$=$1-$3; }
        | MINUS e %prec UMINUS {$$ = -$2;}
        | expr TIMES expr { $$=$1*$3; }
        | expr DIVIDE expr { $$ =$1/$3; }
        | expr POWER expr { $$ = Math.pow($1, $3);}
        | expr FACTORIAL {{
          $$ = (function fact (n) { return n==0 ? 1 : fact(n-1) * n })($1);
        }}
        | OPPARENTHESIS expr CLPARENTHESIS {$$ = $2;}
        | PI {$$=Math.PI;}
        | ID { $$ = symtable[$1]; } 
        | INUM { $$ = Number(yytext); } 
        ;

%%

symtable = []
