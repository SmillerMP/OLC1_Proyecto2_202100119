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
'string'	        return 'PR_STRING';
'new'	            return 'PR_NEW';
'if'	            return 'PR_IF';
'else'	            return 'PR_ELSE';
'while'	            return 'PR_WHILE';
'for'	            return 'PR_FOR';
'do'	            return 'PR_DO';
'break'	            return 'PR_BREAK';
'continue'	        return 'PR_CONTINUE';
'return'	        return 'PR_RETURN';
'void'	            return 'PR_VOID';
'cout'	            return 'PR_COUT';
'endl'	            return 'PR_ENDL';
'toupper'	        return 'PR_TOUPPER';
'tolower'	        return 'PR_TOLOWER';
'round'	            return 'PR_ROUND';
'length'	        return 'PR_LENGTH';
'typeof'	        return 'PR_TYPEOF';
'tostring'	        return 'PR_TOSTRING';
'std'	            return 'PR_STD';
'c_str'	            return 'PR_C_STR';
'execute'	        return 'PR_EXECUTE';
'switch'	        return 'PR_SWITCH';
'case'	            return 'PR_CASE';
'default'	        return 'PR_DEFAULT';



{exp_bool}		    return 'BOOLEAN'; 
{exp_char}		    return 'CHAR'; 
{exp_string}	    return 'STRING'; 
{exp_id}		    return 'ID'; 
{exp_decimal}	    return 'DECIMAL'; 
{exp_entero}		return 'ENTERO'; 




// Secuencias de Escape
'\n'				return 'SALTO_LINEA';
'\\'                return 'BARRA_INVERTIDA';
'\"'				return 'COMILLA_DOBLE';
'\t'				return 'TABULACION';
'\''                return 'COMILLA_SIMPLE';

// Operadores
'+'                 return 'MAS';
'-'                 return 'MENOS';
'*'                 return 'POR';
'/'                 return 'DIVIDIDO';
'pow'               return 'POTENCIA';
'%'                 return 'MODULO';

// otras
'>>'                return 'ENTRADA';
'<<'                return 'SALIDA';

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
':'                 return 'DOSPUNTOS';
'.'                 return 'PUNTO';
'?'                 return 'INTERROGACION';








<<EOF>>                 return 'EOF';

.                  {console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);}
/lex
/* Asociación de operadores y precedencia */

%{
    const dic = require('./Almacenamiento');
%}      

%left 'OR'
%left 'AND'
%left 'NOT'
%left 'IGUALES' 'DIFERENTE' 'MENOR_QUE' 'MENOR_IGUAL' 'MAYOR_QUE' 'MAYOR_IGUAL'
%left 'MAS' 'MENOS'
%left 'POR' 'DIVIDIDO'
%right UNOT
%right UMENOS 



%start ini

%% /* Definición de la gramática */

ini
	: entornos EOF
;

entornos
    : entornos entorno
    | entorno
    //| error { console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); }
;

entorno
    : declaracionVariables
    | funcionExecute
    | funciones
    | comentarios 
;

 

instrucciones
	: instrucciones instruccion
	| instruccion
;

instruccion
    : declaracionVariables
    | llamarFunciones
    | sentenciaIfCompleta
    | ciclosWhile
    | cicloFor
    | funcionExecute
    | impresionCout
    | switchCase
    | sentenciaReturn
    | PR_BREAK PTCOMA
    | PR_CONTINUE PTCOMA
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

secuenciasEscape
    : secuenciasEscape SALTO_LINEA
    | secuenciasEscape BARRA_INVERTIDA
    | secuenciasEscape COMILLA_DOBLE
    | secuenciasEscape TABULACION
    | secuenciasEscape COMILLA_SIMPLE
    | SALTO_LINEA
    | BARRA_INVERTIDA
    | COMILLA_DOBLE
    | TABULACION
    | COMILLA_SIMPLE
;

tiposVar
    : PR_INT
    | PR_DOUBLE
    | PR_BOOL
    | PR_CHAR
    | PR_STD DOSPUNTOS DOSPUNTOS PR_STRING
;

valores
    : MENOS DECIMAL %prec UMENOS
    | MENOS ENTERO  %prec UMENOS
    | DECIMAL
    | ENTERO
    | BOOLEAN
    | STRING
    | CHAR

    // Valores extras
    | ID PUNTO PR_LENGTH PARIZQ PARDER
    | PR_TYPEOF PARIZQ ID PARDER
    | PR_ROUND PARIZQ DECIMAL PARDER
    | PR_ROUND PARIZQ ENTERO PARDER
    | PR_TOUPPER PARIZQ STRING PARDER
    | PR_TOLOWER PARIZQ STRING PARDER
    | PR_STD DOSPUNTOS DOSPUNTOS PR_TOSTRING PARIZQ valoresPlus PARDER
    | ID
;

valoresPlus
    : valoresPlus MAS valores
    | valoresPlus MENOS valores
    | valoresPlus POR valores
    | valoresPlus DIVIDIDO valores
    | valoresPlus POTENCIA valores
    | valoresPlus MODULO valores
    | valores
;


valoresArreglos
    : valoresArreglos COMA valoresPlus
    | valoresPlus
;

arregloDeclaraciones
    : arregloDeclaraciones COMA tiposVar ID 
    | arregloDeclaraciones COMA tiposVar ID CORIZQ CORDER
    | tiposVar ID CORIZQ CORDER
    | tiposVar ID 

;

declaracionVariables
    : tiposVar identificadores PTCOMA { dic.almacenar($2, null) }
    | tiposVar identificadores IGUAL sentenciaLogica PTCOMA { dic.almacenar($2, $4) }
    | tiposVar identificadores IGUAL ID PARIZQ valoresArreglos PARDER PTCOMA { console.log($2, $4, $6); }
    | tiposVar identificadores IGUAL ID PARIZQ PARDER PTCOMA
    | tiposVar identificadores IGUAL ternario PTCOMA
    // Casteos
    | tiposVar identificadores IGUAL PARIZQ tiposVar PARDER valoresPlus PTCOMA

    // Modificacion de variables
    | identificadores IGUAL valoresPlus PTCOMA
    | identificadores IGUAL ID CORIZQ valoresArreglos CORDER PTCOMA

    | VectoresMatrices
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
    | ID CORIZQ ENTERO CORDER IGUAL valoresPlus PTCOMA
    | ID CORIZQ ENTERO CORDER CORIZQ ENTERO CORDER IGUAL valoresPlus PTCOMA
    // fUNCION C_STR
    | tiposVar ID CORIZQ CORDER IGUAL ID PUNTO PR_C_STR PARIZQ PARDER PTCOMA

;


// Setentecia if 
sentenciaIf
    : PR_IF PARIZQ sentenciaLogica PARDER LLAVIZQ instrucciones LLAVDER
;

sentenciaIfElse
    : sentenciaIfElse PR_ELSE PR_IF PARIZQ sentenciaLogica PARDER LLAVIZQ instrucciones LLAVDER 
    | PR_ELSE PR_IF PARIZQ sentenciaLogica PARDER LLAVIZQ instrucciones LLAVDER
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


// Operador Ternario
ternario
    : sentenciaLogica INTERROGACION valoresPlus DOSPUNTOS valoresPlus 
;


// Sentencia Relacionales
sentenciaRelacional
    : valoresPlus IGUALES valoresPlus
    | valoresPlus DIFERENTE valoresPlus
    | valoresPlus MENOR_QUE valoresPlus
    | valoresPlus MENOR_IGUAL valoresPlus
    | valoresPlus MAYOR_QUE valoresPlus
    | valoresPlus MAYOR_IGUAL valoresPlus
    | valoresPlus
;

// Sentencia Logicas
sentenciaLogica
    : sentenciaLogica OR sentenciaRelacional 
    | sentenciaLogica AND sentenciaRelacional
    | NOT sentenciaLogica %prec UNOT  
    | sentenciaRelacional
;


// Ciclos
ciclosWhile
    // Ciclo While
    : PR_WHILE PARIZQ sentenciaLogica PARDER LLAVIZQ instrucciones LLAVDER

    // Ciclo Do While
    | PR_DO LLAVIZQ instrucciones LLAVDER PR_WHILE PARIZQ sentenciaLogica PARDER PTCOMA
;

// Ciclo For
cicloFor
    : PR_FOR PARIZQ tiposVar identificadores IGUAL valoresPlus PTCOMA sentenciaLogica PTCOMA IncrementoDecremento PARDER LLAVIZQ instrucciones LLAVDER
    | PR_FOR PARIZQ identificadores IGUAL valoresPlus PTCOMA sentenciaLogica PTCOMA IncrementoDecremento PARDER LLAVIZQ instrucciones LLAVDER
;


// Switch Case

recursividadCase
    : recursividadCase PR_CASE valoresPlus DOSPUNTOS instrucciones 
    | PR_CASE valoresPlus DOSPUNTOS instrucciones
;


switchCase
    : PR_SWITCH PARIZQ valoresPlus PARDER LLAVIZQ recursividadCase PR_DEFAULT DOSPUNTOS instrucciones LLAVDER
    | PR_SWITCH PARIZQ valoresPlus PARDER LLAVIZQ recursividadCase LLAVDER
;


// Funciones
funciones 
    : tiposVar ID PARIZQ arregloDeclaraciones PARDER LLAVIZQ instrucciones LLAVDER
    | tiposVar ID PARIZQ PARDER LLAVIZQ instrucciones LLAVDER
    
    //Void
    | PR_VOID ID PARIZQ arregloDeclaraciones PARDER LLAVIZQ instrucciones LLAVDER
    | PR_VOID ID PARIZQ PARDER LLAVIZQ instrucciones LLAVDER
    
;

llamarFunciones
    // llamados para metodos y funciones
    : ID PARIZQ valoresArreglos PARDER PTCOMA
    | ID PARIZQ PARDER PTCOMA
;

funcionExecute 
    : PR_EXECUTE ID PARIZQ valoresArreglos PARDER PTCOMA
    | PR_EXECUTE ID PARIZQ PARDER PTCOMA
;



posibilidadesCout
    : valoresPlus
    | NOT BOOLEAN %prec UNOT            { console.log($1, $2); }
    | PARIZQ sentenciaLogica PARDER
    | ID PARIZQ valoresArreglos PARDER
    | PR_ENDL
;

funcionCout
    : funcionCout SALIDA posibilidadesCout
    | posibilidadesCout 
;

impresionCout 
    : PR_COUT SALIDA funcionCout PTCOMA
;

sentenciaReturn
    : PR_RETURN valoresArreglos PTCOMA
    | PR_RETURN ID PARIZQ valoresArreglos PARDER PTCOMA
    | PR_RETURN PTCOMA
;