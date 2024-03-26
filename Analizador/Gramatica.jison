/**
 * Ejemplo mi primer proyecto con Jison utilizando Nodejs en Ubuntu
 */

/* Definición Léxica */
%lex

%options case-insensitive

exp_bool  					    "true"|"false"
exp_id 						    [a-zA-Z_][a-zA-Z0-9_]*
exp_decimal 				    [0-9]+\.[0-9]+\b
exp_entero  				    [0-9]+\b
exp_comentario_multilinea 	    \/\*[\s\S]*?\*\/
exp_comentario_simple 		    \/\/.*
exp_char 			            \'(([^\n\"\\]|\\.)*)\'
exp_string  			        [\"][^\"\n]+[\"]


%%
/* Espacios en blanco */
[ \r\t]+                {}
\n                      {}
{COM_MULT} 	            {} /* No hacer nada */
{COM_SIMPLE} 		    {} /* No hacer nada */

/* Expresiones Regulares */
{exp_comentario_multilinea}		 return 'COM_MULT'; 
{exp_comentario_simple}			 return 'COM_SIMPLE'; 


// Palabras reservadas
// Variables
'int'				return 'PR_INT';
'double'			return 'PR_DOUBLE';
'bool'				return 'PR_BOOL';
'char'				return 'PR_CHAR';
'std::string'	    return 'PR_STRING';
'new'	            return 'PR_NEW';
'if'	            return 'PR_IF';
'else'	            return 'PR_ELSE';
'while'	            return 'PR_WHILE';


{exp_bool}		    return 'BOOLEAN'; 
{exp_char}		    return 'CHAR'; 
{exp_string}	    return 'STRING'; 
{exp_id}		    return 'ID'; 
{exp_decimal}	    return 'DECIMAL'; 
{exp_entero}		return 'ENTERO'; 




// Secuencias de Escape
'\\n'				return 'SALTO_LINEA';
'\\'                return 'BARRA_INVERTIDA';
'\"'				return 'COMILLA_DOBLE';
'\\t'				return 'TABULACION';
'\''                return 'COMILLA_SIMPLE';

// Operadores
'+'                 return 'MAS';
'-'                 return 'MENOS';
'*'                 return 'POR';
'/'                 return 'DIVIDIDO';
'pow'               return 'POTENCIA';
'%'                 return 'MODULO';
'-exp'              return 'UMENOS';

// Operadores relacionales
'=='                return 'IGUALES';
'!='                return 'DIFERENTE';
'<='                return 'MENOR_IGUAL';
'>='                return 'MAYOR_IGUAL';
'>'                 return 'MAYOR_QUE';
'<'                 return 'MENOR_QUE';
'='                 return 'IGUAL';

// Operadores lógicos
'||'                return 'OR';
'&&'                return 'AND';
'!'                 return 'NOT';

// Simbolos
'('                 return 'PARIZQ';
')'                 return 'PARDER';
'{'                 return 'LLAVIZQ';
'}'                 return 'LLAVDER';
'['                 return 'CORIZQ';
']'                 return 'CORDER';
';'                 return 'PTCOMA';
','                 return 'COMA';







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

instruccion
    : declaracionVariables
    | VectoresMatrices
    | sentenciaIfCompleta
    | comentarios 
;

comentarios 
    : COM_MULT
    | COM_SIMPLE
;

identificadores
    : ID COMA identificadores
    | ID
;

tiposVar
    : PR_INT
    | PR_DOUBLE
    | PR_BOOL
    | PR_CHAR
    | PR_STRING
;

valores 
    : DECIMAL
    | ENTERO
    | BOOLEAN
    | STRING
    | CHAR
    | ID
;

valoresArreglos
    : valoresArreglos COMA valores
    | valores
;


declaracionVariables
    : tiposVar identificadores PTCOMA
    | tiposVar identificadores IGUAL valores PTCOMA
    // Casteos
    | tiposVar identificadores IGUAL PARIZQ tiposVar PARDER valores PTCOMA
;

//Incremento y Decremento de variables
IncrementoDecremento
    : ID MAS MAS
    | ID MENOS MENOS
;


// Estructura de Datos
// Vectores

VectoresMatrices
    // Tipo 1 de vectores y matrices declarados con tamaño
    : tiposVar ID CORIZQ CORDER IGUAL PR_NEW tiposVar CORIZQ ENTERO CORDER PTCOMA
    | tiposVar ID CORIZQ CORDER CORIZQ CORDER IGUAL PR_NEW tiposVar CORIZQ ENTERO CORDER CORIZQ ENTERO CORDER PTCOMA
    // Tipo 2 de vectores y matrices declarados directamente
    | tiposVar ID CORIZQ CORDER IGUAL CORIZQ valoresArreglos CORDER PTCOMA
    | tiposVar ID CORIZQ CORDER CORIZQ CORDER IGUAL CORIZQ CORIZQ valoresArreglos CORDER COMA CORIZQ valoresArreglos CORDER CORDER PTCOMA
    // Acceso a Vectores
    | tiposVar identificadores IGUAL ID CORIZQ ENTERO CORDER PTCOMA
    | tiposVar identificadores IGUAL ID CORIZQ ENTERO CORDER CORIZQ ENTERO CORDER PTCOMA
    // Modificacion de Vectores
    | ID CORIZQ ENTERO CORDER IGUAL valores PTCOMA
    | ID CORIZQ ENTERO CORDER CORIZQ ENTERO CORDER IGUAL valores PTCOMA

;


// Setentecia if 
sentenciaIf
    : PR_IF PARIZQ sentenciaLogica PARDER LLAVIZQ instrucciones LLAVDER
;

sentenciaIfElse
    : sentenciaIfElse PR_ELSE PARIZQ sentenciaLogica PARDER LLAVIZQ instrucciones LLAVDER 
    | PR_ELSE PARIZQ sentenciaLogica PARDER LLAVIZQ instrucciones LLAVDER
;

sentenciaElse
    : PR_ELSE LLAVIZQ instrucciones LLAVDER
;

sentenciaIfCompleta
    : sentenciaIf sentenciaIfElse sentenciaElse
    | sentenciaIf sentenciaIfElse
    | sentenciaIf sentenciaElse
    | sentenciaIf
;


// Sentencia Relacionales
sentenciaRelacional
    : valores IGUALES valores
    | valores DIFERENTE valores
    | valores MENOR_QUE valores
    | valores MENOR_IGUAL valores
    | valores MAYOR_QUE valores
    | valores MAYOR_IGUAL valores
    | valores
    | NOT valores
;

// Sentencia Logicas
sentenciaLogica
    : sentenciaLogica OR sentenciaRelacional 
    | sentenciaLogica AND sentenciaRelacional
    | sentenciaRelacional
;