import { Question } from '@/engine/AntigravityEngine';

export const questionBank: Record<string, Question[]> = {
  "tipos_primitivos": [
    {
      "id": "tipos_primitivos_0",
      "topic": "tipos_primitivos",
      "conceptIntro": "En TypeScript, podemos declarar explícitamente que una variable es de tipo texto usando la anotación de tipo `: string`.",
      "prompt": "¿Cuál es el tipo de dato correcto para completar la declaración de la variable \"nombre\"?",
      "codeSnippet": "let nombre: _____ = \"Ana\";\nconsole.log(nombre);",
      "isCodeOptions": true,
      "options": [
        "String",
        "char",
        "string",
        "text"
      ],
      "correctOptionIndex": 2,
      "explanation": "El tipo primitivo para texto en TypeScript es \"string\" en minúscula.",
      "difficulty": "easy"
    },
    {
      "id": "tipos_primitivos_1",
      "topic": "tipos_primitivos",
      "conceptIntro": "Para números muy grandes que superan el límite seguro de JavaScript (2^53 - 1), TypeScript provee el tipo primitivo \"bigint\" añadiendo el sufijo \"n\".",
      "prompt": "¿Qué sufijo se debe agregar al final del número para definir correctamente un literal de tipo \"bigint\"?",
      "codeSnippet": "const numeroGigante: bigint = 9007199254740991_____;",
      "isCodeOptions": true,
      "options": [
        "L",
        "big",
        "n",
        "g"
      ],
      "correctOptionIndex": 2,
      "explanation": "El sufijo \"n\" convierte un entero numérico en un valor nativo de tipo bigint.",
      "difficulty": "easy"
    },
    {
      "id": "tipos_primitivos_2",
      "topic": "tipos_primitivos",
      "conceptIntro": "Si no especificamos el tipo, TypeScript infiere automáticamente el tipo primitivo basándose en el valor asignado.",
      "prompt": "¿Qué tipo de dato infiere TypeScript para la variable \"edad\" en este código?",
      "codeSnippet": "let edad = 25;\n// edad = \"veinticinco\"; // Error de tipo",
      "isCodeOptions": true,
      "options": [
        "float",
        "any",
        "number",
        "int"
      ],
      "correctOptionIndex": 2,
      "explanation": "TypeScript agrupa tanto enteros como decimales bajo el tipo primitivo unificado \"number\".",
      "difficulty": "easy"
    },
    {
      "id": "tipos_primitivos_3",
      "topic": "tipos_primitivos",
      "conceptIntro": "El tipo boolean solo admite dos valores literales posibles: true o false.",
      "prompt": "¿Cuál es el valor correcto para inicializar la variable booleana?",
      "codeSnippet": "const estaRegistrado: boolean = _____;",
      "isCodeOptions": true,
      "options": [
        "1",
        "\"true\"",
        "true",
        "yes"
      ],
      "correctOptionIndex": 2,
      "explanation": "El tipo boolean solo acepta los valores booleanos nativos \"true\" o \"false\".",
      "difficulty": "easy"
    },
    {
      "id": "tipos_primitivos_4",
      "topic": "tipos_primitivos",
      "conceptIntro": "null representa la ausencia intencional de un valor de objeto, mientras que undefined es el valor por defecto de variables no inicializadas.",
      "prompt": "¿Qué imprime el siguiente código en la consola?",
      "codeSnippet": "let puntuacion: number | undefined;\nconsole.log(puntuacion);",
      "isCodeOptions": true,
      "options": [
        "0",
        "null",
        "undefined",
        "NaN"
      ],
      "correctOptionIndex": 2,
      "explanation": "Una variable declarada pero sin asignar tiene el valor \"undefined\" en tiempo de ejecución.",
      "difficulty": "easy"
    },
    {
      "id": "tipos_primitivos_5",
      "topic": "tipos_primitivos",
      "conceptIntro": "El tipo void se utiliza como tipo de retorno en funciones que no devuelven ningún valor.",
      "prompt": "¿Qué tipo de retorno debe tener una función que solo imprime en consola?",
      "codeSnippet": "function notificar(msg: string): _____ {\n  console.log(msg);\n}",
      "isCodeOptions": true,
      "options": [
        "null",
        "never",
        "void",
        "undefined"
      ],
      "correctOptionIndex": 2,
      "explanation": "\"void\" indica explícitamente que la función no retorna ningún valor.",
      "difficulty": "easy"
    },
    {
      "id": "tipos_primitivos_6",
      "topic": "tipos_primitivos",
      "conceptIntro": "El tipo never representa el tipo de valores que nunca pueden ocurrir, como funciones que siempre lanzan errores o bucles infinitos.",
      "prompt": "¿Cuál es el tipo de retorno apropiado para una función que siempre lanza una excepción?",
      "codeSnippet": "function fallar(mensaje: string): _____ {\n  throw new Error(mensaje);\n}",
      "isCodeOptions": true,
      "options": [
        "void",
        "Error",
        "never",
        "unknown"
      ],
      "correctOptionIndex": 2,
      "explanation": "\"never\" representa un flujo de ejecución que nunca retorna normalmente.",
      "difficulty": "medium"
    },
    {
      "id": "tipos_primitivos_7",
      "topic": "tipos_primitivos",
      "conceptIntro": "unknown es un tipo seguro: no permite llamar a ningún método hasta que se compruebe su tipo real.",
      "prompt": "¿Qué operador de JavaScript se usa en el if para poder llamar a toUpperCase() sobre una variable unknown?",
      "codeSnippet": "let dato: unknown = \"hola\";\nif (_____ dato === \"string\") {\n  console.log(dato.toUpperCase());\n}",
      "isCodeOptions": true,
      "options": [
        "instanceof",
        "typeof",
        "is",
        "type"
      ],
      "correctOptionIndex": 1,
      "explanation": "\"typeof dato === 'string'\" realiza type narrowing en runtime permitiendo acceder a métodos de string.",
      "difficulty": "medium"
    },
    {
      "id": "tipos_primitivos_8",
      "topic": "tipos_primitivos",
      "conceptIntro": "El tipo symbol crea identificadores únicos e inmutables mediante la función global Symbol().",
      "prompt": "¿Cómo se crea un valor de tipo symbol en TypeScript?",
      "codeSnippet": "const claveUnica: symbol = _____(\"id\");",
      "isCodeOptions": true,
      "options": [
        "new Symbol",
        "Symbol",
        "createSymbol",
        "symbolOf"
      ],
      "correctOptionIndex": 1,
      "explanation": "Los símbolos se crean invocando \"Symbol()\" sin la palabra clave new.",
      "difficulty": "medium"
    }
  ],
  "variables_constantes": [
    {
      "id": "variables_constantes_0",
      "topic": "variables_constantes",
      "conceptIntro": "Las constantes declaradas con const no pueden ser reasignadas una vez inicializadas.",
      "prompt": "¿Qué ocurrirá al compilar este código?",
      "codeSnippet": "const version = \"1.0.0\";\nversion = \"2.0.0\";",
      "isCodeOptions": true,
      "options": [
        "Imprime \"2.0.0\"",
        "Error: Cannot assign to \"version\" because it is a constant",
        "version pasa a ser \"1.0.0\"",
        "Se crea una nueva variable global"
      ],
      "correctOptionIndex": 1,
      "explanation": "TypeScript emite un error de compilación impidiendo la reasignación de constantes declaradas con const.",
      "difficulty": "easy"
    },
    {
      "id": "variables_constantes_1",
      "topic": "variables_constantes",
      "conceptIntro": "Al declarar una constante con un valor primitivo, TypeScript infiere un tipo literal exacto en lugar de un tipo amplio.",
      "prompt": "¿Qué tipo exacto infiere TypeScript para la constante \"estado\"?",
      "codeSnippet": "const estado = \"ACTIVO\";",
      "isCodeOptions": true,
      "options": [
        "string",
        "\"ACTIVO\"",
        "any",
        "const string"
      ],
      "correctOptionIndex": 1,
      "explanation": "Al usar const, TypeScript infiere el tipo literal exacto \"ACTIVO\" en lugar del tipo general string.",
      "difficulty": "easy"
    },
    {
      "id": "variables_constantes_2",
      "topic": "variables_constantes",
      "conceptIntro": "let permite reasignar valores siempre y cuando coincidan con el tipo inferido o declarado originalmente.",
      "prompt": "¿Qué línea provocará un error de tipo en TypeScript?",
      "codeSnippet": "let intentos = 3;\nintentos = 4;        // Línea A\nintentos = \"cinco\";  // Línea B",
      "isCodeOptions": true,
      "options": [
        "Línea A",
        "Línea B",
        "Ambas líneas",
        "Ninguna línea"
      ],
      "correctOptionIndex": 1,
      "explanation": "\"intentos\" fue inferido como number. Asignar un string en la Línea B genera un error de asignación de tipo.",
      "difficulty": "easy"
    },
    {
      "id": "variables_constantes_3",
      "topic": "variables_constantes",
      "conceptIntro": "Las variables let y const tienen alcance de bloque {}, mientras que var tiene alcance de función.",
      "prompt": "¿Qué valor se imprimirá al final?",
      "codeSnippet": "let x = 10;\nif (true) {\n  let x = 20;\n}\nconsole.log(x);",
      "isCodeOptions": true,
      "options": [
        "20",
        "10",
        "undefined",
        "ReferenceError"
      ],
      "correctOptionIndex": 1,
      "explanation": "La variable interior solo existe dentro del bloque if. El console.log exterior imprime el valor 10.",
      "difficulty": "easy"
    },
    {
      "id": "variables_constantes_4",
      "topic": "variables_constantes",
      "conceptIntro": "La aserción \"as const\" convierte un objeto o array en una estructura inmutable de solo lectura con tipos literales.",
      "prompt": "¿Qué modificador aplica \"as const\" a todas las propiedades del objeto?",
      "codeSnippet": "const CONFIG = {\n  puerto: 3000,\n  host: \"localhost\"\n} as const;\n// CONFIG.puerto = 8080; // Error de compilación",
      "isCodeOptions": true,
      "options": [
        "static",
        "readonly",
        "private",
        "final"
      ],
      "correctOptionIndex": 1,
      "explanation": "\"as const\" marca todas las propiedades anidadas como readonly e infiere tipos literales exactos.",
      "difficulty": "medium"
    },
    {
      "id": "variables_constantes_5",
      "topic": "variables_constantes",
      "conceptIntro": "TypeScript detecta variables que se usan antes de ser asignadas para prevenir errores en tiempo de ejecución.",
      "prompt": "¿Qué error emite TypeScript al compilar este código?",
      "codeSnippet": "let resultado: string;\nconsole.log(resultado);",
      "isCodeOptions": true,
      "options": [
        "Error: Variable \"resultado\" is used before being assigned",
        "Imprime null",
        "Imprime 0",
        "Se compila sin avisos"
      ],
      "correctOptionIndex": 0,
      "explanation": "TypeScript emite un error de comprobación de asignación definitiva si se lee una variable antes de inicializarla.",
      "difficulty": "medium"
    },
    {
      "id": "variables_constantes_6",
      "topic": "variables_constantes",
      "conceptIntro": "La inferencia de tipo amplio (widening) ocurre al inicializar una variable con let en lugar de const.",
      "prompt": "¿Qué tipo infiere TypeScript para la variable \"tema\" declarada con let?",
      "codeSnippet": "let tema = \"oscuro\";",
      "isCodeOptions": true,
      "options": [
        "\"oscuro\"",
        "string",
        "any",
        "const string"
      ],
      "correctOptionIndex": 1,
      "explanation": "Al usar let, TypeScript infiere el tipo amplio \"string\" permitiendo reasignar otros textos en el futuro.",
      "difficulty": "easy"
    }
  ],
  "arrays_tuplas": [
    {
      "id": "arrays_tuplas_0",
      "topic": "arrays_tuplas",
      "conceptIntro": "Un arreglo homogéneo se tipa colocando corchetes `[]` después del tipo de dato de sus elementos.",
      "prompt": "¿Cuál es la forma correcta de tipar un arreglo de números?",
      "codeSnippet": "const notas: _____ = [10, 8, 9, 7];",
      "isCodeOptions": true,
      "options": [
        "number[]",
        "[number]",
        "Array(number)",
        "numbers"
      ],
      "correctOptionIndex": 0,
      "explanation": "\"number[]\" indica una lista dinámica donde cada elemento debe ser de tipo number.",
      "difficulty": "easy"
    },
    {
      "id": "arrays_tuplas_1",
      "topic": "arrays_tuplas",
      "conceptIntro": "Una Tupla define un arreglo de longitud fija donde cada posición tiene un tipo específico.",
      "prompt": "¿Qué tipo define una tupla para almacenar un ID numérico seguido de un nombre en texto?",
      "codeSnippet": "let registro: _____ = [101, \"Carlos\"];",
      "isCodeOptions": true,
      "options": [
        "(number | string)[]",
        "[number, string]",
        "{ id: number, name: string }",
        "Array<number, string>"
      ],
      "correctOptionIndex": 1,
      "explanation": "La notación \"[number, string]\" impone exactamente dos elementos con esos tipos en ese orden.",
      "difficulty": "easy"
    },
    {
      "id": "arrays_tuplas_2",
      "topic": "arrays_tuplas",
      "conceptIntro": "Al destructurar una tupla, cada variable conserva el tipo específico correspondiente a su posición.",
      "prompt": "¿Qué tipo infiere TypeScript para la variable \"ciudad\"?",
      "codeSnippet": "const ubicacion: [string, number] = [\"Madrid\", 28001];\nconst [ciudad, codigoPostal] = ubicacion;",
      "isCodeOptions": true,
      "options": [
        "string | number",
        "string",
        "any",
        "number"
      ],
      "correctOptionIndex": 1,
      "explanation": "TypeScript sabe que el elemento en el índice 0 de la tupla es de tipo string.",
      "difficulty": "easy"
    },
    {
      "id": "arrays_tuplas_3",
      "topic": "arrays_tuplas",
      "conceptIntro": "El modificador readonly en un array o tupla previene operaciones de mutación como push(), pop() o reasignación de índices.",
      "prompt": "¿Qué error ocurrirá en la línea comentada?",
      "codeSnippet": "const coords: readonly [number, number] = [40.41, -3.70];\n// coords[0] = 50.0; // ???",
      "isCodeOptions": true,
      "options": [
        "Funciona correctamente",
        "Error: Cannot assign to \"0\" because it is a read-only property",
        "coords pasa a ser undefined",
        "coords[0] pasa a ser 0"
      ],
      "correctOptionIndex": 1,
      "explanation": "El modificador readonly bloquea la mutación de cualquier índice de la tupla.",
      "difficulty": "medium"
    },
    {
      "id": "arrays_tuplas_4",
      "topic": "arrays_tuplas",
      "conceptIntro": "Podemos crear un array que acepte múltiples tipos de datos usando una unión dentro del tipo de arreglo.",
      "prompt": "¿Cómo se declara un arreglo que admita tanto números como textos?",
      "codeSnippet": "const mixto: _____ = [1, \"dos\", 3, \"cuatro\"];",
      "isCodeOptions": true,
      "options": [
        "[number, string]",
        "(number | string)[]",
        "number & string[]",
        "Array<mixed>"
      ],
      "correctOptionIndex": 1,
      "explanation": "\"(number | string)[]\" permite un arreglo de cualquier longitud con elementos de tipo number o string.",
      "difficulty": "easy"
    },
    {
      "id": "arrays_tuplas_5",
      "topic": "arrays_tuplas",
      "conceptIntro": "Las tuplas admiten elementos opcionales colocando un signo `?` después del tipo de dato en las últimas posiciones.",
      "prompt": "¿Cómo se define una tupla con un número obligatorio y un texto opcional?",
      "codeSnippet": "type ParOpcional = [number, string_____];",
      "isCodeOptions": true,
      "options": [
        "?",
        "!",
        " | null",
        ": optional"
      ],
      "correctOptionIndex": 0,
      "explanation": "El sufijo \"?\" dentro de corchetes de tupla (\"[number, string?]\") marca el elemento como opcional.",
      "difficulty": "medium"
    },
    {
      "id": "arrays_tuplas_6",
      "topic": "arrays_tuplas",
      "conceptIntro": "El operador rest `...` dentro de una tupla permite capturar un número variable de elementos restantes.",
      "prompt": "¿Qué tipo tiene \"resto\" al destructurar esta tupla?",
      "codeSnippet": "type ListaConId = [string, ...number[]];\nconst item: ListaConId = [\"puntuaciones\", 10, 20, 30];\nconst [etiqueta, ...resto] = item;",
      "isCodeOptions": true,
      "options": [
        "number",
        "number[]",
        "string[]",
        "any"
      ],
      "correctOptionIndex": 1,
      "explanation": "El operador rest \"...resto\" captura todos los números restantes en un arreglo de tipo number[].",
      "difficulty": "medium"
    }
  ],
  "interfaces": [
    {
      "id": "interfaces_0",
      "topic": "interfaces",
      "conceptIntro": "La palabra reservada interface define la forma y contrato que un objeto debe satisfacer.",
      "prompt": "¿Cuál es la palabra clave para declarar una interfaz de TypeScript?",
      "codeSnippet": "_____ Usuario {\n  id: number;\n  nombre: string;\n}",
      "isCodeOptions": true,
      "options": [
        "class",
        "interface",
        "struct",
        "schema"
      ],
      "correctOptionIndex": 1,
      "explanation": "\"interface\" es la palabra clave para declarar contratos de estructura de objetos en TypeScript.",
      "difficulty": "easy"
    },
    {
      "id": "interfaces_1",
      "topic": "interfaces",
      "conceptIntro": "Las propiedades opcionales se indican con el signo de interrogación `?` antes de los dos puntos.",
      "prompt": "¿Cómo marcamos la propiedad \"telefono\" como opcional?",
      "codeSnippet": "interface Contacto {\n  email: string;\n  telefono_____: string;\n}",
      "isCodeOptions": true,
      "options": [
        "?",
        "!",
        ": optional",
        "| undefined"
      ],
      "correctOptionIndex": 0,
      "explanation": "El signo \"?\" después del nombre de la propiedad la convierte en opcional.",
      "difficulty": "easy"
    },
    {
      "id": "interfaces_2",
      "topic": "interfaces",
      "conceptIntro": "Las propiedades readonly solo pueden asignarse durante la creación del objeto y no pueden modificarse después.",
      "prompt": "¿Qué modificador protege la propiedad \"apiKey\" contra reasignaciones?",
      "codeSnippet": "interface Config {\n  _____ apiKey: string;\n  url: string;\n}",
      "isCodeOptions": true,
      "options": [
        "const",
        "static",
        "readonly",
        "final"
      ],
      "correctOptionIndex": 2,
      "explanation": "\"readonly\" impide la reasignación de la propiedad tras la instanciación inicial del objeto.",
      "difficulty": "easy"
    },
    {
      "id": "interfaces_3",
      "topic": "interfaces",
      "conceptIntro": "Una interfaz puede heredar las propiedades de otra mediante la palabra reservada \"extends\".",
      "prompt": "¿Qué palabra clave permite que \"Admin\" herede todos los campos de \"Usuario\"?",
      "codeSnippet": "interface Usuario { id: number; }\ninterface Admin _____ Usuario {\n  nivelAcceso: number;\n}",
      "isCodeOptions": true,
      "options": [
        "implements",
        "extends",
        "inherits",
        "with"
      ],
      "correctOptionIndex": 1,
      "explanation": "\"extends\" permite que una interfaz herede y agregue propiedades sobre otra interfaz existente.",
      "difficulty": "easy"
    },
    {
      "id": "interfaces_4",
      "topic": "interfaces",
      "conceptIntro": "TypeScript permite fusionar automáticamente interfaces con el mismo nombre en el mismo scope (Declaration Merging).",
      "prompt": "¿Qué propiedades tendrá un objeto que implemente \"Caja\"?",
      "codeSnippet": "interface Caja { ancho: number; }\ninterface Caja { alto: number; }",
      "isCodeOptions": true,
      "options": [
        "Solo \"alto\"",
        "Solo \"ancho\"",
        "Ambas: \"ancho\" y \"alto\"",
        "Error de identificador duplicado"
      ],
      "correctOptionIndex": 2,
      "explanation": "Las interfaces con nombres idénticos se fusionan automáticamente combinando todas sus propiedades.",
      "difficulty": "medium"
    },
    {
      "id": "interfaces_5",
      "topic": "interfaces",
      "conceptIntro": "Un Index Signature permite que un objeto acepte propiedades adicionales dinámicas de un tipo determinado.",
      "prompt": "¿Cómo se define una firma de índice para que el objeto acepte cualquier clave string con valor numérico?",
      "codeSnippet": "interface DiccionarioPuntos {\n  [jugador: string]: _____;\n}",
      "isCodeOptions": true,
      "options": [
        "number",
        "string",
        "any[]",
        "void"
      ],
      "correctOptionIndex": 0,
      "explanation": "\"[jugador: string]: number\" declara que cualquier propiedad adicional con clave string tendrá valor number.",
      "difficulty": "medium"
    }
  ],
  "type_aliases": [
    {
      "id": "type_aliases_0",
      "topic": "type_aliases",
      "conceptIntro": "El operador de unión `|` permite que una variable acepte uno entre múltiples tipos posibles.",
      "prompt": "¿Qué operador se utiliza para permitir que el código sea de tipo number O string?",
      "codeSnippet": "type Codigo = number _____ string;",
      "isCodeOptions": true,
      "options": [
        "&",
        "|",
        "||",
        "or"
      ],
      "correctOptionIndex": 1,
      "explanation": "La barra vertical \"|\" define un tipo de unión entre los tipos especificados.",
      "difficulty": "easy"
    },
    {
      "id": "type_aliases_1",
      "topic": "type_aliases",
      "conceptIntro": "Las uniones de tipos literales limitan los valores permitidos a un conjunto específico de constantes exactas.",
      "prompt": "¿Cuál de las siguientes asignaciones producirá un error de compilación?",
      "codeSnippet": "type Modo = \"oscuro\" | \"claro\";\nlet m1: Modo = \"oscuro\";\nlet m2: Modo = \"azul\";",
      "isCodeOptions": true,
      "options": [
        "m1 es inválido",
        "m2 es inválido (\"azul\" no forma parte del tipo Modo)",
        "Ambas son válidas",
        "Ambas son inválidas"
      ],
      "correctOptionIndex": 1,
      "explanation": "\"azul\" no pertenece a la unión de literales \"oscuro\" | \"claro\", por lo que TypeScript emite un error.",
      "difficulty": "easy"
    },
    {
      "id": "type_aliases_2",
      "topic": "type_aliases",
      "conceptIntro": "El operador de intersección `&` combina múltiples tipos exigiendo que el objeto contenga todas las propiedades de cada uno.",
      "prompt": "¿Qué operador combina las propiedades de \"ConNombre\" y \"ConEmail\"?",
      "codeSnippet": "type ConNombre = { nombre: string };\ntype ConEmail = { email: string };\ntype Perfil = ConNombre _____ ConEmail;",
      "isCodeOptions": true,
      "options": [
        "|",
        "&",
        "&&",
        "+"
      ],
      "correctOptionIndex": 1,
      "explanation": "El operador \"&\" (intersección) une ambos tipos en uno que requiere todas sus propiedades.",
      "difficulty": "easy"
    },
    {
      "id": "type_aliases_3",
      "topic": "type_aliases",
      "conceptIntro": "A diferencia de las interfaces, los Type Aliases NO pueden redeclararse con el mismo nombre.",
      "prompt": "¿Qué ocurrirá al declarar dos veces el mismo type con el mismo nombre?",
      "codeSnippet": "type Punto = { x: number };\ntype Punto = { y: number };",
      "isCodeOptions": true,
      "options": [
        "Se combinan en { x: number, y: number }",
        "Error: Duplicate identifier \"Punto\"",
        "Se sobreescribe con y: number",
        "Pasa a ser tipo any"
      ],
      "correctOptionIndex": 1,
      "explanation": "Los Type Aliases no admiten declaration merging y arrojan un error de identificador duplicado.",
      "difficulty": "medium"
    },
    {
      "id": "type_aliases_4",
      "topic": "type_aliases",
      "conceptIntro": "Una Unión Discriminada utiliza una propiedad literal común (discriminante) para que TypeScript distinga cada variante en un switch.",
      "prompt": "¿Qué propiedad actúa como discriminante común en esta unión?",
      "codeSnippet": "type Circulo = { kind: \"circulo\"; radio: number };\ntype Cuadrado = { kind: \"cuadrado\"; lado: number };\ntype Forma = Circulo | Cuadrado;",
      "isCodeOptions": true,
      "options": [
        "radio",
        "lado",
        "kind",
        "Forma"
      ],
      "correctOptionIndex": 2,
      "explanation": "La propiedad \"kind\" posee valores literales únicos que permiten discriminar la variante exacta.",
      "difficulty": "medium"
    }
  ],
  "enums": [
    {
      "id": "enums_0",
      "topic": "enums",
      "conceptIntro": "Los Enums permiten definir un conjunto estructurado de constantes con nombre accesible mediante notación de punto.",
      "prompt": "¿Cómo se asigna el valor \"Admin\" del enum Rol?",
      "codeSnippet": "enum Rol {\n  Admin = \"ADMIN\",\n  User = \"USER\"\n}\nconst r: Rol = _____;",
      "isCodeOptions": true,
      "options": [
        "Rol[\"ADMIN\"]",
        "Rol.Admin",
        "Rol->Admin",
        "new Rol.Admin()"
      ],
      "correctOptionIndex": 1,
      "explanation": "Se accede al miembro del enum con \"Rol.Admin\".",
      "difficulty": "easy"
    },
    {
      "id": "enums_1",
      "topic": "enums",
      "conceptIntro": "En un Numeric Enum, los miembros sin valor asignado se incrementan automáticamente comenzando desde 0 o el valor inicial.",
      "prompt": "¿Qué valor numérico tiene el miembro \"Verde\" en este enum?",
      "codeSnippet": "enum Semaforo {\n  Rojo = 1,\n  Amarillo,\n  Verde\n}\nconsole.log(Semaforo.Verde);",
      "isCodeOptions": true,
      "options": [
        "1",
        "2",
        "3",
        "0"
      ],
      "correctOptionIndex": 2,
      "explanation": "Rojo es 1, Amarillo se auto-incrementa a 2, y Verde a 3.",
      "difficulty": "easy"
    },
    {
      "id": "enums_2",
      "topic": "enums",
      "conceptIntro": "Los const enum se reemplazan directamente por sus valores literales en tiempo de compilación eliminando código sobrante.",
      "prompt": "¿Qué palabra reservada optimiza el enum eliminando el objeto en tiempo de ejecución?",
      "codeSnippet": "_____ enum Direccion {\n  Norte = \"N\",\n  Sur = \"S\"\n}",
      "isCodeOptions": true,
      "options": [
        "inline",
        "static",
        "const",
        "declare"
      ],
      "correctOptionIndex": 2,
      "explanation": "\"const enum\" inyecta los valores literales directamente en el código JS generado sin crear un objeto en memoria.",
      "difficulty": "medium"
    },
    {
      "id": "enums_3",
      "topic": "enums",
      "conceptIntro": "Los String Enums no admiten mapeo inverso automático por valor como los Numeric Enums.",
      "prompt": "¿Qué imprime acceder por valor en un String Enum?",
      "codeSnippet": "enum Estado {\n  Activo = \"ACTIVO\"\n}\n// Estado[\"ACTIVO\"] en tiempo de ejecución",
      "isCodeOptions": true,
      "options": [
        "\"Activo\"",
        "undefined",
        "null",
        "Error de sintaxis"
      ],
      "correctOptionIndex": 1,
      "explanation": "Los String Enums no generan mapeo inverso de valor a clave, por lo que Estado[\"ACTIVO\"] es undefined.",
      "difficulty": "medium"
    }
  ],
  "tipado_funciones": [
    {
      "id": "tipado_funciones_0",
      "topic": "tipado_funciones",
      "conceptIntro": "Podemos especificar los tipos de los argumentos y el tipo de retorno tras los paréntesis de la función.",
      "prompt": "Completa la función para que reciba dos números y retorne su suma como número:",
      "codeSnippet": "function sumar(a: number, b: number): _____ {\n  return a + b;\n}",
      "isCodeOptions": true,
      "options": [
        "void",
        "number",
        "string",
        "any"
      ],
      "correctOptionIndex": 1,
      "explanation": "La suma de dos números produce un número, por lo que el tipo de retorno es \"number\".",
      "difficulty": "easy"
    },
    {
      "id": "tipado_funciones_1",
      "topic": "tipado_funciones",
      "conceptIntro": "Los parámetros con valores por defecto hacen que el argumento sea opcional para el invocador.",
      "prompt": "¿Qué imprime el siguiente código al llamarlo con un solo argumento?",
      "codeSnippet": "function saludar(nombre: string, prefijo: string = \"Sr.\"): string {\n  return `${prefijo} ${nombre}`;\n}\nconsole.log(saludar(\"Gómez\"));",
      "isCodeOptions": true,
      "options": [
        "\"undefined Gómez\"",
        "\"Sr. Gómez\"",
        "Error: faltan argumentos",
        "\"null Gómez\""
      ],
      "correctOptionIndex": 1,
      "explanation": "Al omitir el segundo parámetro, se utiliza el valor por defecto \"Sr.\", produciendo \"Sr. Gómez\".",
      "difficulty": "easy"
    },
    {
      "id": "tipado_funciones_2",
      "topic": "tipado_funciones",
      "conceptIntro": "Los parámetros Rest agrupan múltiples argumentos en un arreglo tipado usando la sintaxis `...`.",
      "prompt": "¿Cómo se tipan los parámetros rest de valores numéricos?",
      "codeSnippet": "function calcularMedia(...valores: _____): number {\n  return valores.reduce((a, b) => a + b) / valores.length;\n}",
      "isCodeOptions": true,
      "options": [
        "number",
        "number[]",
        "...number",
        "Array"
      ],
      "correctOptionIndex": 1,
      "explanation": "Los parámetros rest se tipan siempre como un arreglo: \"number[]\".",
      "difficulty": "easy"
    },
    {
      "id": "tipado_funciones_3",
      "topic": "tipado_funciones",
      "conceptIntro": "Un parámetro opcional se indica con `?` y debe colocarse después de todos los parámetros obligatorios.",
      "prompt": "¿Dónde debe ubicarse un parámetro opcional en la lista de parámetros?",
      "codeSnippet": "function crearUsuario(id: number, nombre: string, edad?: number): void {}",
      "isCodeOptions": true,
      "options": [
        "Al principio de la lista",
        "Al final, después de los obligatorios",
        "En cualquier posición",
        "Solo en el retorno"
      ],
      "correctOptionIndex": 1,
      "explanation": "Los parámetros opcionales deben declararse obligatoriamente después de los parámetros requeridos.",
      "difficulty": "easy"
    }
  ],
  "funciones_flecha": [
    {
      "id": "funciones_flecha_0",
      "topic": "funciones_flecha",
      "conceptIntro": "Podemos definir un tipo para funciones flecha indicando sus parámetros y retorno con el operador flecha `=>`.",
      "prompt": "¿Cuál es la sintaxis correcta para tipar una función que recibe un número y devuelve un boolean?",
      "codeSnippet": "type Comprobador = (x: number) _____ boolean;\nconst esPar: Comprobador = (n) => n % 2 === 0;",
      "isCodeOptions": true,
      "options": [
        ":",
        "=>",
        "->",
        "returns"
      ],
      "correctOptionIndex": 1,
      "explanation": "En tipos de función de TypeScript se usa la flecha \"=>\" para separar parámetros del tipo de retorno.",
      "difficulty": "easy"
    },
    {
      "id": "funciones_flecha_1",
      "topic": "funciones_flecha",
      "conceptIntro": "TypeScript deduce automáticamente el tipo de los argumentos del callback gracias a la inferencia contextual.",
      "prompt": "¿Qué tipo infiere TypeScript para el parámetro \"item\" en el método .filter()?",
      "codeSnippet": "const numeros: number[] = [1, 2, 3, 4, 5];\nconst pares = numeros.filter((item) => item % 2 === 0);",
      "isCodeOptions": true,
      "options": [
        "any",
        "number",
        "string",
        "unknown"
      ],
      "correctOptionIndex": 1,
      "explanation": "Dado que el arreglo es number[], TypeScript deduce contextualmente que \"item\" es de tipo number.",
      "difficulty": "easy"
    },
    {
      "id": "funciones_flecha_2",
      "topic": "funciones_flecha",
      "conceptIntro": "Al escribir funciones flecha con retorno implícito de un objeto, debemos envolver las llaves en paréntesis `({})`.",
      "prompt": "¿Cómo se retorna implícitamente un objeto desde una función flecha?",
      "codeSnippet": "const crearPunto = (x: number, y: number) => _____;",
      "isCodeOptions": true,
      "options": [
        "{ x, y }",
        "({ x, y })",
        "return { x, y }",
        "[ x, y ]"
      ],
      "correctOptionIndex": 1,
      "explanation": "Los paréntesis \"({ x, y })\" evitan que el compilador interprete las llaves como el cuerpo de la función.",
      "difficulty": "easy"
    },
    {
      "id": "funciones_flecha_3",
      "topic": "funciones_flecha",
      "conceptIntro": "Podemos tipar el valor de \"this\" en funciones declarando un pseudoparámetro llamado \"this\" en la primera posición.",
      "prompt": "¿Cómo se anota el tipo de \"this\" dentro de una función regular?",
      "codeSnippet": "function clickHandler(_____ this: HTMLButtonElement, e: MouseEvent): void {\n  this.disabled = true;\n}",
      "isCodeOptions": true,
      "options": [
        "let",
        "var",
        "/* no keyword */",
        "const"
      ],
      "correctOptionIndex": 2,
      "explanation": "El parámetro \"this: Tipo\" se declara al inicio sin palabras clave y se elimina automáticamente al compilar a JS.",
      "difficulty": "medium"
    }
  ],
  "sobrecarga_funciones": [
    {
      "id": "sobrecarga_funciones_0",
      "topic": "sobrecarga_funciones",
      "conceptIntro": "La sobrecarga de funciones permite declarar múltiples firmas de tipos para una sola función.",
      "prompt": "¿Cuál es la firma de implementación que cubre las sobrecargas de string y number?",
      "codeSnippet": "function procesar(x: string): string[];\nfunction procesar(x: number): number[];\nfunction procesar(x: _____): any {\n  return [x];\n}",
      "isCodeOptions": true,
      "options": [
        "string & number",
        "string | number",
        "any[]",
        "unknown"
      ],
      "correctOptionIndex": 1,
      "explanation": "La firma de implementación debe ser compatible con la unión de todas las firmas de sobrecarga.",
      "difficulty": "medium"
    },
    {
      "id": "sobrecarga_funciones_1",
      "topic": "sobrecarga_funciones",
      "conceptIntro": "Las firmas de sobrecarga deben ser más específicas arriba y la implementación final no es accesible directamente.",
      "prompt": "¿Qué ocurre al llamar a una función sobrecargada con un argumento que no coincide con ninguna firma pública?",
      "codeSnippet": "function test(x: boolean): boolean;\nfunction test(x: string): string;\nfunction test(x: any): any { return x; }\n// test(123); // ???",
      "isCodeOptions": true,
      "options": [
        "Retorna 123",
        "Error de compilación: No overload matches this call",
        "Retorna null",
        "Retorna false"
      ],
      "correctOptionIndex": 1,
      "explanation": "TypeScript solo permite llamadas que coincidan con alguna de las firmas de sobrecarga declaradas.",
      "difficulty": "medium"
    }
  ],
  "clases_constructores": [
    {
      "id": "clases_constructores_0",
      "topic": "clases_constructores",
      "conceptIntro": "Las Parameter Properties permiten declarar e inicializar miembros de clase directamente en la firma del constructor.",
      "prompt": "¿Qué modificador en el constructor crea y asigna automáticamente la propiedad pública \"nombre\"?",
      "codeSnippet": "class Persona {\n  constructor(_____ nombre: string) {}\n}",
      "isCodeOptions": true,
      "options": [
        "var",
        "let",
        "public",
        "this."
      ],
      "correctOptionIndex": 2,
      "explanation": "\"public\", \"private\" o \"protected\" en el constructor crean e inicializan automáticamente la propiedad.",
      "difficulty": "easy"
    },
    {
      "id": "clases_constructores_1",
      "topic": "clases_constructores",
      "conceptIntro": "Los miembros estáticos pertenecen a la propia clase y no a las instancias individuales creadas con new.",
      "prompt": "¿Cómo se accede a la propiedad estática \"maxIntentos\"?",
      "codeSnippet": "class Validador {\n  static maxIntentos: number = 3;\n}\nconsole.log(_____.maxIntentos);",
      "isCodeOptions": true,
      "options": [
        "new Validador()",
        "Validador",
        "this",
        "Validador.prototype"
      ],
      "correctOptionIndex": 1,
      "explanation": "Las propiedades estáticas se acceden directamente mediante el nombre de la clase: \"Validador.maxIntentos\".",
      "difficulty": "easy"
    },
    {
      "id": "clases_constructores_2",
      "topic": "clases_constructores",
      "conceptIntro": "La palabra clave get define un método lector (getter) que se accede con sintaxis de propiedad.",
      "prompt": "¿Qué palabra clave define el getter para leer el área computada?",
      "codeSnippet": "class Cuadrado {\n  constructor(public lado: number) {}\n  _____ area(): number {\n    return this.lado * this.lado;\n  }\n}",
      "isCodeOptions": true,
      "options": [
        "readonly",
        "get",
        "function",
        "property"
      ],
      "correctOptionIndex": 1,
      "explanation": "\"get\" define un accessor que se lee como una propiedad normal (cuadrado.area).",
      "difficulty": "easy"
    },
    {
      "id": "clases_constructores_3",
      "topic": "clases_constructores",
      "conceptIntro": "El modificador readonly en una propiedad de clase impide su reasignación fuera del constructor.",
      "prompt": "¿Qué error ocurre al intentar modificar una propiedad readonly fuera del constructor?",
      "codeSnippet": "class Usuario {\n  readonly id: number;\n  constructor(id: number) { this.id = id; }\n}\nconst u = new Usuario(1);\n// u.id = 2; // ???",
      "isCodeOptions": true,
      "options": [
        "Funciona correctamente",
        "Error: Cannot assign to \"id\" because it is a read-only property",
        "u.id pasa a ser undefined",
        "Se clona el usuario"
      ],
      "correctOptionIndex": 1,
      "explanation": "Las propiedades readonly de una clase solo pueden asignarse en su declaración o dentro del constructor.",
      "difficulty": "easy"
    }
  ],
  "herencia_polimorfismo": [
    {
      "id": "herencia_polimorfismo_0",
      "topic": "herencia_polimorfismo",
      "conceptIntro": "En una subclase, la llamada a super() en el constructor debe ejecutarse antes de acceder a la palabra clave \"this\".",
      "prompt": "¿Qué llamada es obligatoria en el constructor de la clase hija antes de usar \"this\"?",
      "codeSnippet": "class Base {\n  constructor(public id: number) {}\n}\nclass Derivada extends Base {\n  constructor(id: number, public extra: string) {\n    _____(id);\n  }\n}",
      "isCodeOptions": true,
      "options": [
        "parent",
        "super",
        "this.parent",
        "Base.call"
      ],
      "correctOptionIndex": 1,
      "explanation": "\"super(id)\" invoca el constructor de la clase base y es obligatorio antes de acceder a \"this\".",
      "difficulty": "easy"
    },
    {
      "id": "herencia_polimorfismo_1",
      "topic": "herencia_polimorfismo",
      "conceptIntro": "Una clase marcada como abstract no puede ser instanciada directamente y sirve como plantilla para subclases.",
      "prompt": "¿Qué palabra clave impide crear instancias directamente con new?",
      "codeSnippet": "_____ class ComponenteBase {\n  abstract render(): void;\n}\n// const c = new ComponenteBase(); // Error",
      "isCodeOptions": true,
      "options": [
        "static",
        "interface",
        "abstract",
        "virtual"
      ],
      "correctOptionIndex": 2,
      "explanation": "Las clases \"abstract\" solo pueden ser extendidas por clases hijas que implementen sus métodos abstractos.",
      "difficulty": "easy"
    },
    {
      "id": "herencia_polimorfismo_2",
      "topic": "herencia_polimorfismo",
      "conceptIntro": "La palabra clave \"override\" (TS 4.3+) asegura que el método sobreescrito realmente exista en la clase base.",
      "prompt": "¿Qué palabra clave explícita previene errores al sobreescribir un método de la superclase?",
      "codeSnippet": "class Perro extends Animal {\n  _____ hacerSonido(): void {\n    console.log(\"Guau\");\n  }\n}",
      "isCodeOptions": true,
      "options": [
        "virtual",
        "override",
        "overwrite",
        "redefine"
      ],
      "correctOptionIndex": 1,
      "explanation": "\"override\" verifica que el método coincida exactamente con un método existente en la clase base.",
      "difficulty": "medium"
    }
  ],
  "modificadores_acceso": [
    {
      "id": "modificadores_acceso_0",
      "topic": "modificadores_acceso",
      "conceptIntro": "El modificador private oculta el miembro restringiendo su acceso exclusivamente al cuerpo de la misma clase.",
      "prompt": "¿Qué modificador bloquea el acceso a \"token\" desde fuera de la clase y desde sus clases hijas?",
      "codeSnippet": "class Sesion {\n  _____ token: string = \"xyz\";\n}\nconst s = new Sesion();\n// s.token; // Error",
      "isCodeOptions": true,
      "options": [
        "protected",
        "private",
        "hidden",
        "internal"
      ],
      "correctOptionIndex": 1,
      "explanation": "\"private\" restringe la visibilidad del miembro exclusivamente a la clase donde fue declarado.",
      "difficulty": "easy"
    },
    {
      "id": "modificadores_acceso_1",
      "topic": "modificadores_acceso",
      "conceptIntro": "El modificador protected permite el acceso al miembro dentro de la clase y en cualquier subclase que la herede.",
      "prompt": "¿Qué modificador permite que la subclase \"Admin\" lea \"nivel\" pero oculta la propiedad del exterior?",
      "codeSnippet": "class Usuario {\n  _____ nivel: number = 1;\n}\nclass Admin extends Usuario {\n  subir() { this.nivel++; }\n}",
      "isCodeOptions": true,
      "options": [
        "public",
        "private",
        "protected",
        "readonly"
      ],
      "correctOptionIndex": 2,
      "explanation": "\"protected\" hace que el miembro sea accesible en la jerarquía de herencia pero privado hacia el exterior.",
      "difficulty": "easy"
    },
    {
      "id": "modificadores_acceso_2",
      "topic": "modificadores_acceso",
      "conceptIntro": "TypeScript soporta los campos privados nativos de JavaScript usando el prefijo `#`.",
      "prompt": "¿Qué prefijo crea un campo privado real garantizado a nivel de runtime en JavaScript moderno?",
      "codeSnippet": "class Banco {\n  _____saldo: number = 0;\n  getSaldo() { return this._____saldo; }\n}",
      "isCodeOptions": true,
      "options": [
        "_",
        "#",
        "$",
        "private."
      ],
      "correctOptionIndex": 1,
      "explanation": "El prefijo \"#\" (ej. \"#saldo\") crea un campo privado nativo de ECMAScript con aislamiento estricto en runtime.",
      "difficulty": "medium"
    }
  ],
  "genericos": [
    {
      "id": "genericos_0",
      "topic": "genericos",
      "conceptIntro": "Los Genéricos permiten crear componentes reutilizables que trabajan sobre una variedad de tipos mediante parámetros como `<T>`.",
      "prompt": "Completa la función genérica para que retorne el mismo tipo de dato que recibe:",
      "codeSnippet": "function identidad<T>(valor: T): _____ {\n  return valor;\n}\nconst num = identidad<number>(42);",
      "isCodeOptions": true,
      "options": [
        "any",
        "T",
        "unknown",
        "void"
      ],
      "correctOptionIndex": 1,
      "explanation": "Al retornar \"T\", TypeScript preserva la información del tipo original que fue pasado como argumento.",
      "difficulty": "easy"
    },
    {
      "id": "genericos_1",
      "topic": "genericos",
      "conceptIntro": "Podemos restringir un genérico usando la cláusula \"extends\" para asegurar que cumpla con una estructura determinada.",
      "prompt": "¿Qué palabra clave restringe que T deba poseer una propiedad \"length: number\"?",
      "codeSnippet": "interface ConLongitud { length: number; }\nfunction imprimirLongitud<T _____ ConLongitud>(elem: T): number {\n  return elem.length;\n}",
      "isCodeOptions": true,
      "options": [
        "implements",
        "extends",
        "instanceof",
        ":"
      ],
      "correctOptionIndex": 1,
      "explanation": "\"T extends ConLongitud\" limita el tipo T únicamente a tipos que tengan la propiedad length.",
      "difficulty": "medium"
    },
    {
      "id": "genericos_2",
      "topic": "genericos",
      "conceptIntro": "El operador keyof extrae los nombres de las propiedades de un tipo como una unión de literales.",
      "prompt": "¿Qué tipo de unión produce \"keyof Usuario\"?",
      "codeSnippet": "interface Usuario {\n  id: number;\n  email: string;\n}\ntype Claves = keyof Usuario;",
      "isCodeOptions": true,
      "options": [
        "string[]",
        "\"id\" | \"email\"",
        "[number, string]",
        "any"
      ],
      "correctOptionIndex": 1,
      "explanation": "\"keyof Usuario\" genera la unión literal de las propiedades: \"id\" | \"email\".",
      "difficulty": "medium"
    },
    {
      "id": "genericos_3",
      "topic": "genericos",
      "conceptIntro": "Podemos asignar tipos por defecto a los parámetros genéricos usando `= TipoPorDefecto`.",
      "prompt": "¿Cómo definimos que el tipo genérico T sea \"string\" por defecto si no se proporciona uno?",
      "codeSnippet": "interface Contenedor<T _____ string> {\n  valor: T;\n}",
      "isCodeOptions": true,
      "options": [
        ":",
        "extends",
        "=",
        "is"
      ],
      "correctOptionIndex": 2,
      "explanation": "\"<T = string>\" asigna string como el tipo por defecto para el parámetro genérico.",
      "difficulty": "medium"
    }
  ],
  "utility_types": [
    {
      "id": "utility_types_0",
      "topic": "utility_types",
      "conceptIntro": "El Utility Type Partial<T> crea un nuevo tipo con todas las propiedades de T marcadas como opcionales.",
      "prompt": "¿Qué Utility Type convierte todos los campos de \"Usuario\" en opcionales para una actualización?",
      "codeSnippet": "interface Usuario { nombre: string; email: string; }\ntype ActualizarUsuario = _____<Usuario>;",
      "isCodeOptions": true,
      "options": [
        "Optional",
        "Partial",
        "Pick",
        "Readonly"
      ],
      "correctOptionIndex": 1,
      "explanation": "\"Partial<Usuario>\" hace que todas las propiedades ({ nombre?: string, email?: string }) sean opcionales.",
      "difficulty": "easy"
    },
    {
      "id": "utility_types_1",
      "topic": "utility_types",
      "conceptIntro": "Pick<T, K> construye un nuevo tipo seleccionando exclusivamente el subconjunto de claves K del tipo T.",
      "prompt": "¿Qué Utility Type extrae únicamente las propiedades \"id\" y \"titulo\"?",
      "codeSnippet": "interface Tarea { id: string; titulo: string; completada: boolean; }\ntype TareaResumen = _____<Tarea, \"id\" | \"titulo\">;",
      "isCodeOptions": true,
      "options": [
        "Extract",
        "Select",
        "Pick",
        "Omit"
      ],
      "correctOptionIndex": 2,
      "explanation": "\"Pick<Tarea, \"id\" | \"titulo\">\" crea un tipo que contiene solo las dos propiedades seleccionadas.",
      "difficulty": "easy"
    },
    {
      "id": "utility_types_2",
      "topic": "utility_types",
      "conceptIntro": "Omit<T, K> crea un nuevo tipo eliminando las claves especificadas K del tipo T.",
      "prompt": "¿Qué Utility Type elimina el campo \"id\" para un DTO de creación?",
      "codeSnippet": "interface Tarea { id: string; titulo: string; }\ntype CrearTareaDTO = _____<Tarea, \"id\">;",
      "isCodeOptions": true,
      "options": [
        "Exclude",
        "Omit",
        "Remove",
        "Without"
      ],
      "correctOptionIndex": 1,
      "explanation": "\"Omit<Tarea, \"id\">\" crea un tipo idéntico a Tarea pero sin la propiedad \"id\".",
      "difficulty": "easy"
    },
    {
      "id": "utility_types_3",
      "topic": "utility_types",
      "conceptIntro": "Record<K, T> define un tipo de objeto cuyas claves pertenecen al tipo K y sus valores al tipo T.",
      "prompt": "¿Cómo se tipa un diccionario de páginas donde las claves son rutas string y los valores son títulos string?",
      "codeSnippet": "const titulosPaginas: _____<string, string> = {\n  \"/home\": \"Inicio\",\n  \"/about\": \"Acerca de\"\n};",
      "isCodeOptions": true,
      "options": [
        "Map",
        "Dictionary",
        "Record",
        "Object"
      ],
      "correctOptionIndex": 2,
      "explanation": "\"Record<string, string>\" define un mapa indexado por claves string con valores string.",
      "difficulty": "easy"
    },
    {
      "id": "utility_types_4",
      "topic": "utility_types",
      "conceptIntro": "ReturnType<T> extrae el tipo de retorno producido por una función.",
      "prompt": "¿Qué tipo extrae \"ReturnType<typeof crearUsuario>\"?",
      "codeSnippet": "function crearUsuario() {\n  return { id: 1, activo: true };\n}\ntype InfoUsuario = _____<typeof crearUsuario>;",
      "isCodeOptions": true,
      "options": [
        "ValueOf",
        "ReturnType",
        "TypeOf",
        "PromiseType"
      ],
      "correctOptionIndex": 1,
      "explanation": "\"ReturnType<T>\" extrae el tipo de retorno devuelto por la función ({ id: number; activo: boolean }).",
      "difficulty": "medium"
    }
  ],
  "tipos_condicionales": [
    {
      "id": "tipos_condicionales_0",
      "topic": "tipos_condicionales",
      "conceptIntro": "Los tipos condicionales evalúan una condición de tipo con la sintaxis `T extends U ? X : Y`.",
      "prompt": "¿Qué tipo evaluará \"Resultado\" en este código?",
      "codeSnippet": "type EsTexto<T> = T extends string ? \"si\" : \"no\";\ntype Resultado = EsTexto<number>;",
      "isCodeOptions": true,
      "options": [
        "\"si\"",
        "\"no\"",
        "boolean",
        "never"
      ],
      "correctOptionIndex": 1,
      "explanation": "Dado que number no extiende de string, la rama falsa se evalúa y produce el tipo literal \"no\".",
      "difficulty": "medium"
    },
    {
      "id": "tipos_condicionales_1",
      "topic": "tipos_condicionales",
      "conceptIntro": "La palabra clave \"infer\" dentro de un tipo condicional permite extraer y deducir un tipo interno dinámicamente.",
      "prompt": "¿Qué palabra clave se usa para deducir el tipo R dentro de la Promise?",
      "codeSnippet": "type DesempaquetarPromesa<T> = T extends Promise<_____ R> ? R : T;",
      "isCodeOptions": true,
      "options": [
        "typeof",
        "infer",
        "extract",
        "keyof"
      ],
      "correctOptionIndex": 1,
      "explanation": "\"infer\" declara una variable de tipo deducida automáticamente a partir del patrón de tipo coincidente.",
      "difficulty": "hard"
    },
    {
      "id": "tipos_condicionales_2",
      "topic": "tipos_condicionales",
      "conceptIntro": "Los Mapped Types transforman las propiedades de un tipo iterando sobre sus claves con `[K in keyof T]`.",
      "prompt": "¿Qué operador delante de readonly elimina el modificador de solo lectura en un Mapped Type?",
      "codeSnippet": "type Escribible<T> = {\n  _____readonly [K in keyof T]: T[K];\n};",
      "isCodeOptions": true,
      "options": [
        "!",
        "-",
        "remove",
        "delete"
      ],
      "correctOptionIndex": 1,
      "explanation": "El prefijo \"-readonly\" remueve el modificador de solo lectura de todas las propiedades mapeadas.",
      "difficulty": "hard"
    }
  ],
  "modulos_importaciones": [
    {
      "id": "modulos_importaciones_0",
      "topic": "modulos_importaciones",
      "conceptIntro": "En TypeScript podemos usar \"import type\" para indicar que una importación es exclusivamente de tipo y se eliminará en runtime.",
      "prompt": "¿Qué palabra clave tras \"import\" asegura que solo se importe para el sistema de tipos sin emitir código en JavaScript?",
      "codeSnippet": "import _____ { Usuario } from \"./modelos\";",
      "isCodeOptions": true,
      "options": [
        "interface",
        "type",
        "static",
        "declare"
      ],
      "correctOptionIndex": 1,
      "explanation": "\"import type\" le indica al transpilador que la importación no tiene impacto en tiempo de ejecución.",
      "difficulty": "easy"
    },
    {
      "id": "modulos_importaciones_1",
      "topic": "modulos_importaciones",
      "conceptIntro": "Las exportaciones nombradas se importan entre llaves `{}`, mientras que las exportaciones por defecto no requieren llaves.",
      "prompt": "Si un archivo contiene \"export default class App {}\", ¿cómo se importa?",
      "codeSnippet": "import _____ from \"./App\";",
      "isCodeOptions": true,
      "options": [
        "{ App }",
        "App",
        "* as { App }",
        "default as App"
      ],
      "correctOptionIndex": 1,
      "explanation": "Las exportaciones por defecto se importan directamente con el identificador deseado sin llaves.",
      "difficulty": "easy"
    },
    {
      "id": "modulos_importaciones_2",
      "topic": "modulos_importaciones",
      "conceptIntro": "Un archivo barrel (index.ts) re-exporta múltiples módulos desde una única carpeta para centralizar las importaciones.",
      "prompt": "¿Qué sintaxis re-exporta todo el contenido del módulo mathUtils?",
      "codeSnippet": "export _____ from \"./mathUtils\";",
      "isCodeOptions": true,
      "options": [
        "default",
        "*",
        "{ all }",
        "everything"
      ],
      "correctOptionIndex": 1,
      "explanation": "\"export * from './mathUtils'\" re-exporta todas las exportaciones nombradas desde un archivo index.ts.",
      "difficulty": "easy"
    }
  ],
  "decoradores": [
    {
      "id": "decoradores_0",
      "topic": "decoradores",
      "conceptIntro": "Los decoradores son funciones especiales anotadas con el símbolo `@` que modifican o inspeccionan clases y métodos.",
      "prompt": "¿Qué símbolo prefija la aplicación de un decorador en TypeScript?",
      "codeSnippet": "_____RegistrarAcceso\nclass ServicioAPI {}",
      "isCodeOptions": true,
      "options": [
        "#",
        "$",
        "@",
        "&"
      ],
      "correctOptionIndex": 2,
      "explanation": "El símbolo \"@\" (arroba) se coloca delante del nombre de la función decoradora.",
      "difficulty": "easy"
    },
    {
      "id": "decoradores_1",
      "topic": "decoradores",
      "conceptIntro": "Una Fábrica de Decoradores (Decorator Factory) es una función que retorna la función decoradora real para aceptar parámetros.",
      "prompt": "¿Cómo se invoca un decorador que recibe un rol como parámetro?",
      "codeSnippet": "@_____\nclass AdminController {}",
      "isCodeOptions": true,
      "options": [
        "Rol(\"admin\")",
        "Rol<\"admin\">",
        "new Rol(\"admin\")",
        "Rol: \"admin\""
      ],
      "correctOptionIndex": 0,
      "explanation": "Una fábrica de decoradores se invoca como una llamada de función regular: \"@Rol('admin')\".",
      "difficulty": "medium"
    }
  ],
  "tsconfig": [
    {
      "id": "tsconfig_0",
      "topic": "tsconfig",
      "conceptIntro": "La opción \"strict: true\" en tsconfig.json activa simultáneamente todas las reglas estrictas de verificación de tipos.",
      "prompt": "¿Qué propiedad de compilerOptions activa todas las validaciones estrictas del compilador?",
      "codeSnippet": "{\n  \"compilerOptions\": {\n    \"_____\": true\n  }\n}",
      "isCodeOptions": true,
      "options": [
        "strict",
        "allRules",
        "typeSafe",
        "noErrors"
      ],
      "correctOptionIndex": 0,
      "explanation": "\"strict\": true activa comprobaciones estrictas como strictNullChecks y noImplicitAny.",
      "difficulty": "easy"
    },
    {
      "id": "tsconfig_1",
      "topic": "tsconfig",
      "conceptIntro": "La opción \"noEmit: true\" le indica a tsc que solo valide los tipos sin generar archivos .js.",
      "prompt": "¿Qué opción se usa en tsconfig para que tsc solo actúe como verificador de tipos en un pipeline?",
      "codeSnippet": "{\n  \"compilerOptions\": {\n    \"_____\": true\n  }\n}",
      "isCodeOptions": true,
      "options": [
        "checkOnly",
        "noEmit",
        "dryRun",
        "skipBuild"
      ],
      "correctOptionIndex": 1,
      "explanation": "\"noEmit\": true impide la emisión de archivos JavaScript compilados.",
      "difficulty": "easy"
    },
    {
      "id": "tsconfig_2",
      "topic": "tsconfig",
      "conceptIntro": "La opción \"paths\" en compilerOptions permite configurar alias de rutas (como `@/*`) para importaciones más limpias.",
      "prompt": "¿Qué opción de tsconfig.json define alias de importación de módulos?",
      "codeSnippet": "{\n  \"compilerOptions\": {\n    \"baseUrl\": \".\",\n    \"_____\": { \"@/*\": [\"src/*\"] }\n  }\n}",
      "isCodeOptions": true,
      "options": [
        "aliases",
        "paths",
        "routes",
        "modules"
      ],
      "correctOptionIndex": 1,
      "explanation": "\"paths\" permite asignar alias de importación a rutas del proyecto.",
      "difficulty": "easy"
    }
  ],
  "async_await": [
    {
      "id": "async_await_0",
      "topic": "async_await",
      "conceptIntro": "Toda función marcada con async devuelve automáticamente una Promesa envuelta en el tipo del valor retornado.",
      "prompt": "¿Cuál es el tipo de retorno correcto para una función asíncrona que retorna un número?",
      "codeSnippet": "async function obtenerPuntaje(): _____<number> {\n  return 100;\n}",
      "isCodeOptions": true,
      "options": [
        "Async",
        "Future",
        "Promise",
        "Task"
      ],
      "correctOptionIndex": 2,
      "explanation": "Las funciones asíncronas siempre retornan una \"Promise<T>\".",
      "difficulty": "easy"
    },
    {
      "id": "async_await_1",
      "topic": "async_await",
      "conceptIntro": "Con strict: true, la variable de error en el bloque catch es inferida como unknown.",
      "prompt": "¿Qué operador se usa para comprobar si el error capturado es una instancia de Error antes de leer .message?",
      "codeSnippet": "try {\n  ejecutar();\n} catch (error) {\n  if (error _____ Error) {\n    console.log(error.message);\n  }\n}",
      "isCodeOptions": true,
      "options": [
        "typeof",
        "instanceof",
        "is",
        "has"
      ],
      "correctOptionIndex": 1,
      "explanation": "\"error instanceof Error\" realiza type narrowing seguro de unknown a Error en runtime.",
      "difficulty": "medium"
    },
    {
      "id": "async_await_2",
      "topic": "async_await",
      "conceptIntro": "Promise.all ejecuta múltiples promesas en paralelo y falla de inmediato si alguna de ellas es rechazada.",
      "prompt": "¿Qué método de Promise resuelve un arreglo con los resultados de todas las promesas una vez completadas?",
      "codeSnippet": "const [usuarios, productos] = await Promise._____([\n  fetchUsuarios(),\n  fetchProductos()\n]);",
      "isCodeOptions": true,
      "options": [
        "all",
        "race",
        "any",
        "allSettled"
      ],
      "correctOptionIndex": 0,
      "explanation": "\"Promise.all\" espera a que todas las promesas del arreglo se resuelvan exitosamente.",
      "difficulty": "easy"
    }
  ],
  "type_narrowing": [
    {
      "id": "type_narrowing_0",
      "topic": "type_narrowing",
      "conceptIntro": "El operador typeof permite estrechar tipos primitivos dentro de un bloque condicional if.",
      "prompt": "¿Qué método de String puede llamarse con total seguridad dentro del bloque if?",
      "codeSnippet": "function procesar(valor: string | number) {\n  if (typeof valor === \"string\") {\n    console.log(valor._____);\n  }\n}",
      "isCodeOptions": true,
      "options": [
        "toFixed(2)",
        "toUpperCase()",
        "Math.abs()",
        "push()"
      ],
      "correctOptionIndex": 1,
      "explanation": "Dentro del bloque if, TypeScript sabe que valor es de tipo string y permite invocar toUpperCase().",
      "difficulty": "easy"
    },
    {
      "id": "type_narrowing_1",
      "topic": "type_narrowing",
      "conceptIntro": "Un Custom Type Predicate usa la sintaxis `param is Tipo` como tipo de retorno de una función comprobatoria.",
      "prompt": "¿Cuál es la firma de retorno para crear un Type Guard que compruebe si x es string?",
      "codeSnippet": "function esString(x: unknown): x _____ string {\n  return typeof x === \"string\";\n}",
      "isCodeOptions": true,
      "options": [
        "===",
        "is",
        "as",
        "instanceof"
      ],
      "correctOptionIndex": 1,
      "explanation": "\"x is string\" le dice a TypeScript que si la función devuelve true, la variable x es de tipo string.",
      "difficulty": "medium"
    },
    {
      "id": "type_narrowing_2",
      "topic": "type_narrowing",
      "conceptIntro": "El operador `in` verifica si una propiedad existe en un objeto, permitiendo estrechar tipos de unión de interfaces.",
      "prompt": "¿Qué operador se utiliza dentro del if para comprobar si la propiedad \"nadar\" existe en la criatura?",
      "codeSnippet": "type Pez = { nadar: () => void };\ntype Pajaro = { volar: () => void };\nfunction mover(animal: Pez | Pajaro) {\n  if (\"nadar\" _____ animal) {\n    animal.nadar();\n  }\n}",
      "isCodeOptions": true,
      "options": [
        "in",
        "has",
        "instanceof",
        "typeof"
      ],
      "correctOptionIndex": 0,
      "explanation": "El operador `\"nadar\" in animal` estrecha el tipo de animal a Pez.",
      "difficulty": "medium"
    }
  ],
  "declaration_files": [
    {
      "id": "declaration_files_0",
      "topic": "declaration_files",
      "conceptIntro": "La palabra clave declare permite definir variables o módulos globales que existen en tiempo de ejecución sin incluir código JS.",
      "prompt": "¿Qué palabra clave define una constante global ambiental como \"__DEV__\"?",
      "codeSnippet": "_____ const __DEV__: boolean;",
      "isCodeOptions": true,
      "options": [
        "export",
        "global",
        "declare",
        "ambient"
      ],
      "correctOptionIndex": 2,
      "explanation": "\"declare const\" le comunica al compilador de TypeScript que la variable existe en el entorno global.",
      "difficulty": "easy"
    },
    {
      "id": "declaration_files_1",
      "topic": "declaration_files",
      "conceptIntro": "Module Augmentation permite extender interfaces o tipos definidos en librerías externas.",
      "prompt": "¿Qué sintaxis se utiliza en un archivo .d.ts para ampliar el módulo \"express\"?",
      "codeSnippet": "_____ module \"express\" {\n  interface Request { usuarioId?: string; }\n}",
      "isCodeOptions": true,
      "options": [
        "extend",
        "declare",
        "augment",
        "import"
      ],
      "correctOptionIndex": 1,
      "explanation": "\"declare module 'nombre-modulo'\" amplía las declaraciones de tipo de un paquete externo.",
      "difficulty": "medium"
    }
  ]
};
