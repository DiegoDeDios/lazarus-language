%lex
%%

(\s+) /*Whitespaces*/
("declara")\b  	 return 'INTDCL' 
("imprime"|"escribe")\b   return 'PRINT' 
[a-e]|[g-h]|[j-o]|[q-z]\b 	  return 'ID' 
("=")  return 'ASSIGN'  
("+") 	 return 'PLUS' 
("-") 	 return 'MINUS' 
("*")    return 'TIMES' 
("/")    return 'DIVIDE' 
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
dcl: INTDCL ID  { symtable[$2] = 0; } 
	;
stmts: stmt stmts 
        |
        ;
stmt: ID ASSIGN expr { symtable[$1] = $3; }
        | PRINT ID {console.log(symtable[$2]);}
        ;
expr: val PLUS expr { $$+=$3; }
        | val MINUS expr { $$-=$3; }
        | val TIMES expr { $$*=$3; }
        | val DIVIDE denom { $$ /=$3; }
        | val { $$=Number(yytext); }
        ;
denom: val
        ;
val:      ID { $$ = symtable[$1]; } 
        | INUM { $$ = Number(yytext); } 
        ;

%%

symtable = []
