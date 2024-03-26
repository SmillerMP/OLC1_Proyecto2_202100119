/**
 * Ejemplo mi primer proyecto con Jison utilizando Nodejs en Ubuntu
 */

/* Definición Léxica */
%lex

%options case-insensitive


exp_comentario_multilinea 	    \/\*[\s\S]*?\*\/
exp_comentario_simple 		    \/\/.*


%%
/* Espacios en blanco */
[ \r\t]+                {}
\n                      {}
{COM_MULT} 	            {} /* No hacer nada */
{COM_SIMPLE} 		    {} /* No hacer nada */

/* Expresiones Regulares */
{exp_comentario_multilinea}		 return 'COMENTARIO_MULTILINEA'; 
{exp_comentario_simple}			 return 'COMENTARIO_SIMPLE'; 


// Palabras reservadas
// Variables
'int'				return 'PR_INT';
'double'			return 'PR_DOUBLE';
'bool'				return 'PR_BOOL';
'char'				return 'PR_CHAR';
'std::string'	    return 'PR_STRING';

// Secuencias de Escape
'\\n'				return 'SALTO_LINEA';
'\\'                return 'BARRA_INVERTIDA';
'\"'				return 'COMILLA_DOBLE';
'\\t'				return 'TABULACION';
'\''                return 'COMILLA_SIMPLE';


// Operadores
'+'                return 'MAS';
'-'                return 'MENOS';
'*'                return 'POR';
'/'                return 'DIVIDIDO';
'pow'              return 'POTENCIA';
'%'                return 'MODULO';
'-exp'             return 'UMENOS';

// Operadores relacionales
'=='               return 'IGUALES';
'!='               return 'DIFERENTE';
'<'                return 'MENOR_QUE';
'<='               return 'MENOR_IGUAL';
'>'                return 'MAYOR_QUE';
'>='               return 'MAYOR_IGUAL';

// Operadores lógicos
'||'               return 'OR';
'&&'               return 'AND';
'!'                return 'NOT';

// Simbolos
'('                 return 'PARIZQ';
')'                 return 'PARDER';
"{"                 return 'LLAVIZQ';
"}"                 return 'LLAVDER';






<<EOF>>                 return 'EOF';

.                  {console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);}
/lex
/* Asociación de operadores y precedencia */

%left 'OR'
%left 'AND'
%left 'NOT'
%left 'IGUALES' 'DIFERENTE' 'MENOR_QUE' 'MENOR_IGUAL' 'MAYOR_QUE' 'MAYOR_IGUAL'
%left 'MAS' 'MENOS'
%left 'POR' 'DIVIDIDO'
%left UMENOS 0-

%start ini

%% /* Definición de la gramática */

ini
	: instrucciones EOF
;

instrucciones
	: instruccion instrucciones
	| instruccion
;




