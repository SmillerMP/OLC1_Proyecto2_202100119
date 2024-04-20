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








<<EOF>>             return 'EOF';

.                   {console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);}
/lex
/* Asociación de operadores y precedencia */

%{

    const {TipoDato} = require("../Interprete/expresion")

    // Expresiones
    const Aritmetica = require("../Interprete/Expresiones/aritmetica")
    const Relacional = require("../Interprete/Expresiones/relacional")
    const Dato = require("../Interprete/Expresiones/dato")
    const Negativo = require("../Interprete/Expresiones/negativo")
    const opLogico = require("../Interprete/Expresiones/opLogicos")
    const Negacion = require("../Interprete/Expresiones/negacion")
    const FuncionCout = require("../Interprete/Expresiones/funcioncout")
    const Variable = require("../Interprete/Expresiones/variable")

    // Instrucciones
    const Cout = require("../Interprete/Instrucciones/cout")
    const If = require("../Interprete/Instrucciones/if")
    const ElseIf = require("../Interprete/Instrucciones/elseif")
    const Else = require("../Interprete/Instrucciones/else")
    const While = require("../Interprete/Instrucciones/while")
    const DoWhile = require("../Interprete/Instrucciones/doWhile")
    const For = require("../Interprete/Instrucciones/for")
    const Break = require("../Interprete/Instrucciones/break")
    const Continue = require("../Interprete/Instrucciones/continue")
    const Declaracion = require("../Interprete/Instrucciones/declaracion")
    const Ternario = require("../Interprete/Instrucciones/ternario")
    const ActualizacionFor = require("../Interprete/Instrucciones/actualizacionFor")
    const ModificarVar = require("../Interprete/Instrucciones/modificarVar")
    const Case = require("../Interprete/Instrucciones/case")
    const Switch = require("../Interprete/Instrucciones/switch")
    const DeclaracionVec = require("../Interprete/Instrucciones/declaracionVector")
    const DeclaracionMatriz = require("../Interprete/Instrucciones/declaracionMatriz")

    // Operaciones Mayores
    const SentenciaIf = require("../Interprete/OperacionesMayores/sentenciaIf")
    
%}      

%left OR
%left AND
%left NOT
%left IGUALES DIFERENTE MENOR_QUE MENOR_IGUAL MAYOR_QUE MAYOR_IGUAL
%left MAS MENOS
%left POR DIVIDIDO MODULO
%right UNOT
%right UMENOS 



%start inicio

%% /* Definición de la gramática */

inicio
	: entornos EOF      {$$ = $1; return $$; }
;

entornos
    : entornos entorno      {$$ = $1; $$.push($2);}
    | entorno               {$$ = []; $$.push($1);}
    | error { console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); }
;

entorno
    : declaracionVariables      {$$ = $1;}
    | funcionExecute
    | funciones
    | comentarios 
    | impresionCout             {$$ = $1;} //console.log($1)}
    | sentenciaIfCompleta       {$$ = $1;}
    | ciclosWhile               {$$ = $1;}
    | cicloFor                  {$$ = $1;}
    | switchCase                {$$ = $1;}
;

 

instrucciones
	: instrucciones instruccion     {$$ = $1; $$.push($2);}
	| instruccion                   {$$ = []; $$.push($1);}
;

instruccion
    : declaracionVariables          {$$ = $1;}
    | llamarFunciones
    | sentenciaIfCompleta           {$$ = $1;}
    | ciclosWhile                   {$$ = $1;}
    | cicloFor                      {$$ = $1;}
    | funcionExecute
    | impresionCout                 {$$ = $1;} 
    | switchCase                    {$$ = $1;}
    | INTERROGACION ternario PTCOMA {$$ = $2;}
    | sentenciaReturn
    | PR_BREAK PTCOMA               {$$ = new Break($1, @1.first_line, @1.first_column+1);}
    | PR_CONTINUE PTCOMA            {$$ = new Continue($1, @1.first_line, @1.first_column+1);}
    | comentarios 
;

comentarios 
    : COM_MULT
    | COM_SIMPLE
;

identificadores
    : identificadores COMA ID       {$$ = $1; $$.push($3);}
    | ID                            {$$ = []; $$.push($1);}
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
    : PR_INT                                    {$$ = "ENTERO";}
    | PR_DOUBLE                                 {$$ = "DECIMAL";}
    | PR_BOOL                                   {$$ = "BOOL";}
    | PR_CHAR                                   {$$ = "CHAR";}
    | PR_STD DOSPUNTOS DOSPUNTOS PR_STRING      {$$ = "STRING";}
;

valores
// Valores extras
    : ID PUNTO PR_LENGTH PARIZQ PARDER
    | PR_TYPEOF PARIZQ ID PARDER                        {}
    | PR_ROUND PARIZQ valoresPlus PARDER                {$$ = new FuncionCout($1, $3, @1.first_line, @1.first_column+1);}
    | PR_TOUPPER PARIZQ valoresPlus PARDER                  {$$ = new FuncionCout($1, $3, @1.first_line, @1.first_column+1);}
    | PR_TOLOWER PARIZQ valoresPlus PARDER                  {$$ = new FuncionCout($1, $3, @1.first_line, @1.first_column+1);}
    | PR_STD DOSPUNTOS DOSPUNTOS PR_TOSTRING PARIZQ valoresPlus PARDER      {$$ = new FuncionCout($4, $6, @1.first_line, @1.first_column+1);}
    
    | DECIMAL                       {$$ = new Dato($1, TipoDato.DECIMAL, @1.first_line, @1.first_column+1); }
    | ENTERO                        {$$ = new Dato($1, TipoDato.ENTERO, @1.first_line, @1.first_column+1); }
    | BOOLEAN                       {$$ = new Dato($1, TipoDato.BOOL, @1.first_line, @1.first_column+1); }
    | STRING                        {$$ = new Dato($1, TipoDato.STRING, @1.first_line, @1.first_column+1); }     
    | CHAR                          {$$ = new Dato($1, TipoDato.CHAR, @1.first_line, @1.first_column+1); } 
    | ID                            {$$ = new Variable($1, null, null, @1.first_line, @1.first_column+1); }
    | ID CORIZQ valoresPlus CORDER  {$$ = new Variable($1, $3, null, @1.first_line, @1.first_column+1); }    
    | ID CORIZQ valoresPlus CORDER CORIZQ valoresPlus CORDER  {$$ = new Variable($1, $3, $6, @1.first_line, @1.first_column+1); }       
;


valoresPlus
    : valoresPlus MAS valoresPlus                                   { $$ = new Aritmetica($1, $3, $2, @1.first_line, @1.first_column+1); }
    | valoresPlus MENOS valoresPlus                                 { $$ = new Aritmetica($1, $3, $2, @1.first_line, @1.first_column+1); }
    | MENOS valoresPlus  %prec UMENOS                               { $$ = new Negativo($2, @1.first_line, @1.first_column+1);           }
    | valoresPlus POR valoresPlus                                   { $$ = new Aritmetica($1, $3, $2, @1.first_line, @1.first_column+1); }
    | valoresPlus DIVIDIDO valoresPlus                              { $$ = new Aritmetica($1, $3, $2, @1.first_line, @1.first_column+1); }      
    | POTENCIA PARIZQ valoresPlus COMA valoresPlus PARDER           { $$ = new Aritmetica($3, $5, $2, @1.first_line, @1.first_column+1); }             
    | valoresPlus MODULO valoresPlus                                { $$ = new Aritmetica($1, $3, $2, @1.first_line, @1.first_column+1); }
    | valores                                                       { $$ = $1; }
    | PARIZQ valoresPlus PARDER                                     { $$ = $2; }
;


valoresArreglos
    : valoresArreglos COMA valoresPlus                              {$$ = $1; $$.push($3);}
    | valoresPlus                                                   {$$ = []; $$.push($1);}
;


valoresArregloMatrices
    : valoresArregloMatrices COMA CORIZQ valoresArreglos CORDER     {$$ = $1; $$.push($4);}
    | CORIZQ valoresArreglos CORDER                                 {$$ = []; $$.push($2);}
;                                          

arregloDeclaraciones
    : arregloDeclaraciones COMA tiposVar ID 
    //| arregloDeclaraciones COMA tiposVar ID CORIZQ CORDER
    //| tiposVar ID CORIZQ CORDER
    | tiposVar ID 

;

declaracionVariables
    : tiposVar identificadores PTCOMA                                           {$$ = new Declaracion($1, $2, null, @1.first_line, @1.first_column+1);}
    | tiposVar identificadores IGUAL sentenciaLogica PTCOMA                     {$$ = new Declaracion($1, $2, $4, @1.first_line, @1.first_column+1);}
    | tiposVar identificadores IGUAL ID PARIZQ valoresArreglos PARDER PTCOMA        
    | tiposVar identificadores IGUAL ID PARIZQ PARDER PTCOMA
    | tiposVar identificadores IGUAL ternario PTCOMA
    // Casteos
    | tiposVar identificadores IGUAL PARIZQ tiposVar PARDER valoresPlus PTCOMA

    // Modificacion de variables
    | modificarVariables PTCOMA                                     {$$ = $1;}

    | VectoresMatrices                                          {$$ = $1;}
;

//Incremento y Decremento de variables
modificarVariables
    : identificadores MAS MAS                                       {$$ = new ActualizacionFor($1, $2, @1.first_line, @1.first_column+1);}
    | identificadores MENOS MENOS                                   {$$ = new ActualizacionFor($1, $2, @1.first_line, @1.first_column+1);}
    | identificadores IGUAL sentenciaLogica                         {$$ = new ModificarVar($1, $2, $3, @1.first_line, @1.first_column+1);}
    | identificadores MAS IGUAL sentenciaLogica                     {$$ = new ModificarVar($1, $2, $4, @1.first_line, @1.first_column+1);} 
    | identificadores MENOS IGUAL valoresPlus                       {$$ = new ModificarVar($1, $2, $4, @1.first_line, @1.first_column+1);}     
    | identificadores POR IGUAL sentenciaLogica                     {$$ = new ModificarVar($1, $2, $4, @1.first_line, @1.first_column+1);} 
    | identificadores DIVIDIDO IGUAL sentenciaLogica                {$$ = new ModificarVar($1, $2, $4, @1.first_line, @1.first_column+1);} 
    | identificadores MODULO IGUAL sentenciaLogica                  {$$ = new ModificarVar($1, $2, $4, @1.first_line, @1.first_column+1);} 
    //| identificadores IGUAL ID CORIZQ valoresArreglos CORDER 
;


// Estructura de Datos
// Vectores

VectoresMatrices
    // Tipo 1 de vectores y matrices declarados con tamaño
    : tiposVar ID CORIZQ CORDER IGUAL PR_NEW tiposVar CORIZQ valoresPlus CORDER PTCOMA       {$$ = new DeclaracionVec($1, $2, $7, $9, @1.first_line, @1.first_column+1);}
    | tiposVar ID CORIZQ CORDER CORIZQ CORDER IGUAL PR_NEW tiposVar CORIZQ valoresPlus CORDER CORIZQ valoresPlus CORDER PTCOMA  {$$ = new DeclaracionMatriz($1, $2, $9, $11, $14, @1.first_line, @1.first_column+1);}

    // Tipo 2 de vectores y matrices declarados directamente
    | tiposVar ID CORIZQ CORDER IGUAL CORIZQ valoresArreglos CORDER PTCOMA                      {$$ = new DeclaracionVec($1, $2, null, $7, @1.first_line, @1.first_column+1);}
    | tiposVar ID CORIZQ CORDER CORIZQ CORDER IGUAL CORIZQ valoresArregloMatrices CORDER PTCOMA {$$ = new DeclaracionMatriz($1, $2, null, $9, null, @1.first_line, @1.first_column+1);}

    // Modificacion de Vectores
    | ID CORIZQ valoresPlus CORDER IGUAL valoresPlus PTCOMA                                     {$$ = new ModificarVar(new Variable($1, $3, null, @1.first_line, @1.first_column+1) , $5, $6, @1.first_line, @1.first_column+1);} 
    | ID CORIZQ valoresPlus CORDER CORIZQ valoresPlus CORDER IGUAL valoresPlus PTCOMA           {$$ = new ModificarVar(new Variable($1, $3, $6, @1.first_line, @1.first_column+1) , $8, $9, @1.first_line, @1.first_column+1);} 
    // fUNCION C_STR
    | tiposVar ID CORIZQ CORDER IGUAL ID PUNTO PR_C_STR PARIZQ PARDER PTCOMA

;


// Setentecia if 
sentenciaIf
    : PR_IF PARIZQ sentenciaLogica PARDER LLAVIZQ instrucciones LLAVDER     {$$ = new If($3, $6, @1.first_line, @1.first_column+1)}
;

sentenciaIfElse
    : sentenciaIfElse PR_ELSE PR_IF PARIZQ sentenciaLogica PARDER LLAVIZQ instrucciones LLAVDER     {$$ = $1; $$.push(new ElseIf($5, $8, @1.first_line, @1.first_column+1))}    
    | PR_ELSE PR_IF PARIZQ sentenciaLogica PARDER LLAVIZQ instrucciones LLAVDER                     {$$ = []; $$.push(new ElseIf($4, $7, @1.first_line, @1.first_column+1))}
;

sentenciaElse
    : PR_ELSE LLAVIZQ instrucciones LLAVDER             {$$ = new Else($3, @1.first_line, @1.first_column+1)}
;

sentenciaIfCompleta
    : sentenciaIf sentenciaIfElse sentenciaElse         {$$ = new SentenciaIf($1, $2, $3, @1.first_line, @1.first_column+1);}
    | sentenciaIf sentenciaIfElse                       {$$ = new SentenciaIf($1, $2, null, @1.first_line, @1.first_column+1);}
    | sentenciaIf sentenciaElse                         {$$ = new SentenciaIf($1, null, $2, @1.first_line, @1.first_column+1);}
    | sentenciaIf                                       {$$ = new SentenciaIf($1, null, null, @1.first_line, @1.first_column+1);}    
;


// Operador Ternario
ternario
    :  sentenciaLogica INTERROGACION instrucciones DOSPUNTOS instrucciones    {$$ = new Ternario($1, $3, $5, @1.first_line, @1.first_column+1);}
;


// Sentencia Relacionales
sentenciaRelacional
    : sentenciaRelacional IGUALES sentenciaRelacional               { $$ = new Relacional($1, $3, $2, @1.first_line, @1.first_column+1); }
    | sentenciaRelacional DIFERENTE sentenciaRelacional             { $$ = new Relacional($1, $3, $2, @1.first_line, @1.first_column+1); }
    | sentenciaRelacional MENOR_QUE sentenciaRelacional             { $$ = new Relacional($1, $3, $2, @1.first_line, @1.first_column+1); }
    | sentenciaRelacional MENOR_IGUAL sentenciaRelacional           { $$ = new Relacional($1, $3, $2, @1.first_line, @1.first_column+1); }
    | sentenciaRelacional MAYOR_QUE sentenciaRelacional             { $$ = new Relacional($1, $3, $2, @1.first_line, @1.first_column+1); }
    | sentenciaRelacional MAYOR_IGUAL sentenciaRelacional           { $$ = new Relacional($1, $3, $2, @1.first_line, @1.first_column+1); }
    | valoresPlus                                                   { $$ = $1; }
    //| PARIZQ sentenciaRelacional PARDER                             { $$ = $2; }
;

// Sentencia Logicas
sentenciaLogica
    : sentenciaLogica OR sentenciaLogica            { $$ = new opLogicos($1, $3, $2, @1.first_line, @1.first_column+1); }
    | sentenciaLogica AND sentenciaLogica           { $$ = new opLogico($1, $3, $2, @1.first_line, @1.first_column+1); }
    | NOT sentenciaLogica %prec UNOT                { $$ = new Negacion($1, $2, @1.first_line, @1.first_column+1); }
    | sentenciaRelacional  
    //| PARIZQ sentenciaRelacional PARDER                         { $$ = $1; }
;


// Ciclos
ciclosWhile
    // Ciclo While
    : PR_WHILE PARIZQ sentenciaLogica PARDER LLAVIZQ instrucciones LLAVDER                  { $$ = new While($3, $6, @1.first_line, @1.first_column+1); }

    // Ciclo Do While
    | PR_DO LLAVIZQ instrucciones LLAVDER PR_WHILE PARIZQ sentenciaLogica PARDER PTCOMA     { $$ = new DoWhile($7, $3, @1.first_line, @1.first_column+1); }
;

// Ciclo For
cicloFor
    : PR_FOR PARIZQ declaracionVariables sentenciaLogica PTCOMA modificarVariables PARDER LLAVIZQ instrucciones LLAVDER      { $$ = new For($3, $4, $6, $9, @1.first_line, @1.first_column+1);}
;


// Switch Case

recursividadCase
    : recursividadCase PR_CASE valoresPlus DOSPUNTOS instrucciones      {$$ = $1; $$.push(new Case($3, $5, @1.first_line, @1.first_column+1));}
    | PR_CASE valoresPlus DOSPUNTOS instrucciones                       {$$ = []; $$.push(new Case($2, $4, @1.first_line, @1.first_column+1));}
;


switchCase
    : PR_SWITCH PARIZQ valoresPlus PARDER LLAVIZQ recursividadCase PR_DEFAULT DOSPUNTOS instrucciones LLAVDER   {$$ = new Switch($3, $6, $9, @1.first_line, @1.first_column+1);}
    | PR_SWITCH PARIZQ valoresPlus PARDER LLAVIZQ recursividadCase LLAVDER          {$$ = new Switch($3, $6, null, @1.first_line, @1.first_column+1);}
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
    : sentenciaRelacional                   { $$ = $1;}
    | NOT BOOLEAN %prec UNOT                { $$ = Negacion($1, $2, @1.first_line, @1.first_column+1); }
    | ID PARIZQ valoresArreglos PARDER
    | ID PARIZQ PARDER
    | PR_ENDL
;

funcionCout
    : funcionCout SALIDA posibilidadesCout  { $$ = $1; $$.push($3); }
    | posibilidadesCout                     { $$ = []; $$.push($1); }
;

impresionCout 
    : PR_COUT SALIDA funcionCout PTCOMA     { $$ = new Cout($3, @1.first_line, @1.first_column+1);}
;

sentenciaReturn
    : PR_RETURN valoresArreglos PTCOMA
    | PR_RETURN ID PARIZQ valoresArreglos PARDER PTCOMA
    | PR_RETURN PTCOMA
;