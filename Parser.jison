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
("/")    return 'DIVIDE'
(";")	 return 'ENDOFSTMT' 
[0-9]+ return 'INUM' 
.	return 'INVALID'
(\n)	return 'LINE'
/lex

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
expr: val PLUS expr { $$+=$3; }
        | val MINUS expr { $$-=$3; }
        | val TIMES expr { $$*=$3; }
        | val DIVIDE expr { $$ /=$3; }
        | val { $$=Number(yytext); }
        ;
val:      ID { $$ = symtable[$1]; } 
        | INUM { $$ = Number(yytext); } 
        ;

%%

symtable = []
