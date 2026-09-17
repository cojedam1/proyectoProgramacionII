export interface TheoryModule {
  topic: string;
  title: string;
  sectionTitle: string;
  summary: string;
  codeExample: string;
  tips: string[];
}

export const theoryBank: Record<string, TheoryModule> = {
  // --- SECCIÓN 1: FUNDAMENTOS DE TYPESCRIPT ---
  tipos_primitivos: {
    topic: `tipos_primitivos`,
    title: `Tipos Primitivos`,
    sectionTitle: `1. Fundamentos de TypeScript`,
    summary: `Imagina que TypeScript es como poner etiquetas en cajas para saber exactamente qué cabe dentro. Los "tipos primitivos" son las etiquetas más básicas: number para números (1, 3.14), string para texto ("Hola"), boolean para verdadero/falso, null y undefined para "sin valor", void para funciones que no devuelven nada, never para código que nunca termina normalmente, y unknown para valores de los que todavía no sabemos el tipo. Con estas etiquetas, TypeScript te avisa si intentas meter algo equivocado en una caja.`,
    codeExample: `// Ejemplos de Tipos Primitivos
const edad: number = 25;
const nombre: string = "TypeScript";
const esActivo: boolean = true;

// Función que no retorna valor
function saludar(): void {
  console.log("¡Hola mundo!");
}

// Tipo unknown vs any
let valorDesconocido: unknown = "Mensaje";
if (typeof valorDesconocido === "string") {
  console.log(valorDesconocido.toUpperCase()); // Seguro
}

// Tipo never (nunca retorna)
function lanzarError(mensaje: string): never {
  throw new Error(mensaje);
}`,
    tips: [
      `💡 Usa unknown en lugar de any cuando recibas datos externos de una API para obligarte a validar el tipo.`,
      `⚠️ Recuerda que typeof null devuelve "object" por un comportamiento histórico de JavaScript.`,
    ],
  },

  variables_constantes: {
    topic: `variables_constantes`,
    title: `Variables y Constantes`,
    sectionTitle: `1. Fundamentos de TypeScript`,
    summary: `En TypeScript usas let para guardar un valor que puede cambiar (como el puntaje de un juego) y const para valores que NO cambian (como el nombre de tu app). Lo especial de TypeScript es que casi siempre puede adivinar el tipo de dato solo con ver el valor que le asignas, sin que tengas que escribirlo tú — a esto se le llama inferencia de tipos. Si quieres ser explícito, puedes escribir el tipo con dos puntos: let edad: number = 25.`,
    codeExample: `// Inferencia de tipos
let puntaje = 100; // TypeScript infiere tipo 'number'
puntaje = 150; // Válido

// Tipo literal inferido por const
const appName = "Antigravity"; // Tipo inferido: "Antigravity"

// Declaración explícita
let limiteIntentos: number = 5;
const PI: number = 3.14159;`,
    tips: [
      `💡 Prefiere const por defecto. Cambia a let únicamente si necesitas reasignar la variable.`,
      `⚠️ Evita redeclarar variables con var ya que posee alcance de función en lugar de alcance de bloque.`,
    ],
  },

  arrays_tuplas: {
    topic: `arrays_tuplas`,
    title: `Arrays y Tuplas`,
    sectionTitle: `1. Fundamentos de TypeScript`,
    summary: `Un Array es como una lista de compras donde todos los artículos son del mismo tipo, por ejemplo una lista de números o de nombres. En TypeScript la escribes como number[] o string[]. Una Tupla es diferente: es una lista donde cada posición tiene un tipo fijo y distinto. Por ejemplo [number, string] significa "el primero es un número, el segundo es texto" y no puedes cambiar eso. Las tuplas son perfectas cuando quieres devolver varios valores de una función sabiendo exactamente qué es cada uno.`,
    codeExample: `// Arrays
const numeros: number[] = [1, 2, 3, 4, 5];
const nombres: Array<string> = ["Ana", "Carlos", "Sofia"];

// Tuplas (Longitud y tipos estrictos por posición)
let usuario: [number, string, boolean];
usuario = [1, "Carlos", true]; // Correcto

// Destructuración de tupla
const [id, username] = usuario;
console.log(username.toLowerCase());

// Tupla de solo lectura
const punto: readonly [number, number] = [10, 20];
// punto[0] = 15; // ❌ Error de compilación`,
    tips: [
      `💡 Las tuplas son excelentes para retornar múltiples valores estructurados desde una función (como useState en React).`,
      `⚠️ Los métodos como .push() en tuplas estándar pueden romper la longitud fija a menos que uses readonly.`,
    ],
  },

  // --- SECCIÓN 2: TIPOS COMPUESTOS ---
  interfaces: {
    topic: `interfaces`,
    title: `Interfaces`,
    sectionTitle: `2. Tipos Compuestos`,
    summary: `Una interfaz es como un formulario en blanco que define exactamente qué campos debe tener un objeto. Si tienes una interfaz Producto con nombre, precio e id, TypeScript te obliga a que cualquier objeto de tipo Producto tenga esos tres campos. Si te falta uno o escribes uno de más, recibirás un error. Puedes marcar campos como opcionales con ? (pueden no estar) o como readonly (no se pueden modificar). Las interfaces también se pueden extender entre sí para heredar campos de otras.`,
    codeExample: `interface Producto {
  readonly id: string;
  nombre: string;
  precio: number;
  descripcion?: string; // Opcional
}

const laptop: Producto = {
  id: "prod_01",
  nombre: "Laptop Gaming",
  precio: 1200,
};

// Extensión de interfaces
interface Vehiculo {
  marca: string;
  modelo: string;
}

interface Auto extends Vehiculo {
  numeroPuertas: number;
}

const miAuto: Auto = {
  marca: "Toyota",
  modelo: "Corolla",
  numeroPuertas: 4,
};`,
    tips: [
      `💡 Usa interface para definir la forma de objetos y modelos de dominio en POO.`,
      `💡 Las interfaces permiten "declaration merging" (fusionar la misma interfaz definida en múltiples lugares).`,
    ],
  },

  type_aliases: {
    topic: `type_aliases`,
    title: `Type Aliases y Uniones`,
    sectionTitle: `2. Tipos Compuestos`,
    summary: `Un Type Alias es simplemente darle un nombre a un tipo para reutilizarlo. Con type RolUsuario = "admin" | "editor" estás diciendo "un RolUsuario solo puede ser uno de estos dos textos exactos". El símbolo | (unión) significa que el valor puede ser A O B. El símbolo & (intersección) significa que debe ser A Y además B al mismo tiempo. Los tipos literales como "admin" restringen los valores a opciones específicas, evitando errores como escribir "admon" por accidente.`,
    codeExample: `// Alias con Unión de Literales
type RolUsuario = "admin" | "editor" | "invitado";

let rolActual: RolUsuario = "admin";
// rolActual = "superman"; // ❌ Error de compilación

// Intersección de tipos
type ConContacto = { email: string; telefono: string };
type ConDireccion = { ciudad: string; pais: string };

type PerfilCompleto = ConContacto & ConDireccion;

const usuarioFinal: PerfilCompleto = {
  email: "contacto@empresa.com",
  telefono: "+52 555 1234",
  ciudad: "Ciudad de México",
  pais: "México",
};`,
    tips: [
      `💡 Usa type cuando necesites uniones (|), intersecciones (&) o tipos primitivos renombrados.`,
      `⚠️ A diferencia de las interfaces, un type no admite declaration merging.`,
    ],
  },

  enums: {
    topic: `enums`,
    title: `Enums`,
    sectionTitle: `2. Tipos Compuestos`,
    summary: `Un Enum (enumeración) es un conjunto de constantes con nombre. Imagina que tienes un semáforo: en lugar de usar los números 1, 2, 3 o los textos "rojo", "amarillo", "verde" sueltos por el código, creas un Enum ColorSemaforo con esos tres valores. Así tu código queda más legible y seguro, porque TypeScript solo permite usar los valores definidos en el Enum. Los String Enums son los más recomendados porque son fáciles de leer en logs y herramientas de depuración.`,
    codeExample: `// Enum de cadenas (Recomendado)
enum EstadoPedido {
  Pendiente = "PENDIENTE",
  Enviado = "ENVIADO",
  Entregado = "ENTREGADO",
  Cancelado = "CANCELADO"
}

const estado: EstadoPedido = EstadoPedido.Enviado;
console.log(estado); // "ENVIADO"

// Const Enum optimizado
const enum DíasSemana {
  Lunes = 1,
  Martes,
  Miercoles
}

const hoy = DíasSemana.Lunes; // Se transpila a: const hoy = 1;`,
    tips: [
      `💡 Prefiere String Enums o const enum ya que facilitan el rastreo en logs y optimizan el tamaño del bundle en JS.`,
    ],
  },

  // --- SECCIÓN 3: FUNCIONES ---
  tipado_funciones: {
    topic: `tipado_funciones`,
    title: `Tipado de Funciones`,
    sectionTitle: `3. Funciones`,
    summary: `Cuando escribes una función en TypeScript puedes decirle exactamente qué tipo de datos acepta y qué tipo de datos devuelve. Esto es muy útil porque si alguien llama tu función con un texto donde esperas un número, TypeScript te avisa antes de que el programa se ejecute. También puedes tener parámetros opcionales (poniendo ? al final del nombre) y parámetros con valor por defecto (poniendo = valor). Así tus funciones son más claras y resistentes a errores.`,
    codeExample: `// Función con tipos de entrada y retorno explícitos
function calcularTotal(precio: number, impuesto: number = 0.16): number {
  return precio + (precio * impuesto);
}

// Parámetros opcionales
function formatearNombre(primerNombre: string, apellido?: string): string {
  if (apellido) {
    return \`\${primerNombre} \${apellido}\`;
  }
  return primerNombre;
}

console.log(formatearNombre("Carlos")); // "Carlos"
console.log(formatearNombre("Carlos", "Gómez")); // "Carlos Gómez"`,
    tips: [
      `💡 Siempre declara el tipo de retorno explícitamente en funciones públicas para evitar cambios involuntarios en la API de tu código.`,
    ],
  },

  funciones_flecha: {
    topic: `funciones_flecha`,
    title: `Funciones Flecha y Callbacks`,
    sectionTitle: `3. Funciones`,
    summary: `Las funciones flecha son una forma más corta de escribir funciones. En vez de function sumar(a, b) { return a + b; } puedes escribir const sumar = (a, b) => a + b. En TypeScript puedes tiparlas igual que las funciones normales. Un callback es simplemente una función que le pasas a otra función para que la llame en algún momento — por ejemplo el código que se ejecuta en cada elemento de un .map(). TypeScript es inteligente y deduce los tipos del callback por el contexto en que se usa, sin que tengas que anotarlos manualmente.`,
    codeExample: `// Definición de tipo para un Callback
type OperacionMatematica = (x: number, y: number) => number;

const multiplicar: OperacionMatematica = (a, b) => a * b;

// Inferencia contextual en callbacks de arrays
const frutas = ["Manzana", "Banana", "Cereza"];

// 'f' se infiere automáticamente como string
const enMayusculas = frutas.map((f) => f.toUpperCase());
console.log(enMayusculas);`,
    tips: [
      `💡 Aprovecha la inferencia contextual en callbacks de arreglos como .reduce() y .map() para no sobre-anotar los tipos.`,
    ],
  },

  sobrecarga_funciones: {
    topic: `sobrecarga_funciones`,
    title: `Sobrecarga de Funciones`,
    sectionTitle: `3. Funciones`,
    summary: `La sobrecarga de funciones te permite tener una sola función con el mismo nombre que se comporta distinto dependiendo del tipo de dato que le pases. Por ejemplo, parseInput("hola") devuelve string[] y parseInput(42) devuelve number[]. Para lograrlo, primero escribes todas las "firmas" posibles sin cuerpo de función, y luego escribes la implementación real que maneja todos los casos. TypeScript usa las firmas para darte autocompletado y verificación de tipos correctos al llamar la función.`,
    codeExample: `// Firmas de sobrecarga
function parseInput(input: string): string[];
function parseInput(input: number): number[];

// Firma de implementación (no expuesta directamente a los consumidores)
function parseInput(input: string | number): any {
  if (typeof input === "string") {
    return input.split("");
  } else {
    return [input];
  }
}

const r1 = parseInput("Hola"); // Retorna string[]
const r2 = parseInput(100);    // Retorna number[]`,
    tips: [
      `💡 Las firmas de sobrecarga deben ser más específicas arriba y más generales abajo.`,
      `⚠️ La firma de implementación final NO forma parte de la interfaz pública de llamada.`,
    ],
  },

  // --- SECCIÓN 4: PROGRAMACIÓN ORIENTADA A OBJETOS ---
  clases_constructores: {
    topic: `clases_constructores`,
    title: `Clases y Constructores`,
    sectionTitle: `4. Programación Orientada a Objetos`,
    summary: `Una clase es como un molde para crear objetos. Defines una vez cómo son los objetos — qué datos tienen y qué pueden hacer — y luego puedes crear muchos a partir de ese molde con new. El constructor es el código que se ejecuta automáticamente cada vez que creas un nuevo objeto. Puedes marcar propiedades como readonly (solo lectura tras crearse), static (pertenecen a la clase, no al objeto) y crear getters/setters para controlar cómo se leen o modifican los valores.`,
    codeExample: `class CuentaBancaria {
  readonly titular: string;
  private _balance: number;
  static tasaInteres: number = 0.05;

  constructor(titular: string, balanceInicial: number) {
    this.titular = titular;
    this._balance = balanceInicial;
  }

  get balance(): number {
    return this._balance;
  }

  set balance(monto: number) {
    if (monto < 0) throw new Error("Balance no puede ser negativo");
    this._balance = monto;
  }

  depositar(monto: number): void {
    this._balance += monto;
  }
}

const miCuenta = new CuentaBancaria("Carlos", 1000);
miCuenta.depositar(500);
console.log(miCuenta.balance);          // 1500
console.log(CuentaBancaria.tasaInteres); // 0.05`,
    tips: [
      `💡 Asegúrate de inicializar todas las propiedades en el constructor o declarar valores iniciales por defecto.`,
      `💡 Usa readonly en propiedades que no deben cambiar tras la construcción del objeto.`,
    ],
  },

  herencia_polimorfismo: {
    topic: `herencia_polimorfismo`,
    title: `Herencia y Polimorfismo`,
    sectionTitle: `4. Programación Orientada a Objetos`,
    summary: `La herencia te permite crear una clase nueva basándote en una existente sin repetir el código común. Con extends, la clase hija hereda todo lo que tiene la clase padre y puede añadir o cambiar comportamientos. El polimorfismo es la capacidad de tratar objetos distintos de forma uniforme: si Perro y Gato extienden Animal, puedes poner ambos en un array de Animal[] y llamar hacerSonido() en cada uno, y cada animal hará su sonido propio. Las clases abstract son plantillas que no se pueden instanciar directamente y obligan a las clases hijas a implementar ciertos métodos.`,
    codeExample: `abstract class Animal {
  constructor(public nombre: string) {}
  abstract hacerSonido(): void;
}

class Perro extends Animal {
  hacerSonido(): void {
    console.log(\`\${this.nombre} dice: ¡Guau!\`);
  }
}

class Gato extends Animal {
  hacerSonido(): void {
    console.log(\`\${this.nombre} dice: ¡Miau!\`);
  }
}

const mascotas: Animal[] = [new Perro("Fido"), new Gato("Michi")];
mascotas.forEach((m) => m.hacerSonido()); // Polimorfismo`,
    tips: [
      `💡 Usa clases abstractas cuando desees compartir código común entre subclases pero forzar la implementación de métodos específicos.`,
    ],
  },

  modificadores_acceso: {
    topic: `modificadores_acceso`,
    title: `Modificadores de Acceso`,
    sectionTitle: `4. Programación Orientada a Objetos`,
    summary: `Los modificadores de acceso son como permisos de seguridad en una clase. public significa que cualquiera puede usar ese miembro (es el valor predeterminado). private significa que solo puede usarse dentro de la misma clase — ni siquiera las clases hijas pueden tocarlo. protected es un punto medio: la clase y sus hijas pueden usarlo, pero nadie más desde afuera. Un atajo muy útil es poner el modificador directamente en los parámetros del constructor: constructor(public id: number, private clave: string) — TypeScript automáticamente crea las propiedades y las asigna.`,
    codeExample: `class Usuario {
  constructor(
    public id: number,
    private claveSecreta: string,
    protected email: string
  ) {}

  public verificarClave(intento: string): boolean {
    return this.claveSecreta === intento;
  }
}

const u = new Usuario(1, "pass123", "usr@test.com");
console.log(u.id); // 1 (public)
// console.log(u.claveSecreta); // ❌ Error: private`,
    tips: [
      `💡 Utiliza el atajo de propiedades en el constructor (private id: string) para mantener un código limpio y reducir líneas repetitivas.`,
    ],
  },

  // --- SECCIÓN 5: TIPOS AVANZADOS ---
  genericos: {
    topic: `genericos`,
    title: `Genéricos`,
    sectionTitle: `5. Tipos Avanzados`,
    summary: `Los genéricos son como variables, pero para tipos. En vez de escribir una función que solo funciona con number o solo con string, la escribes una sola vez con <T> y TypeScript reemplaza T por el tipo real cuando la llamas. Por ejemplo, function obtenerPrimero<T>(lista: T[]): T funciona con cualquier tipo de lista y siempre devuelve un elemento del mismo tipo que la lista. Puedes poner restricciones con extends para que T solo acepte ciertos tipos. También puedes crear interfaces y clases genéricas para componentes completamente reutilizables.`,
    codeExample: `// Función genérica
function obtenerPrimero<T>(lista: T[]): T | undefined {
  return lista[0];
}

const num = obtenerPrimero<number>([10, 20, 30]); // number
const str = obtenerPrimero(["a", "b", "c"]);      // infiere string

// Clase genérica
class Pila<T> {
  private elementos: T[] = [];
  push(item: T): void { this.elementos.push(item); }
  pop(): T | undefined { return this.elementos.pop(); }
}

const pila = new Pila<number>();
pila.push(1);
pila.push(2);

// keyof + genérico para acceso seguro a propiedades
function obtenerPropiedad<T, K extends keyof T>(obj: T, clave: K): T[K] {
  return obj[clave];
}

const usuario = { nombre: "Ana", edad: 30 };
console.log(obtenerPropiedad(usuario, "nombre")); // "Ana"`,
    tips: [
      `💡 Piensa en los genéricos como variables pero para tipos en lugar de valores.`,
      `💡 Usa keyof T junto con genéricos para crear funciones de acceso a propiedades completamente type-safe.`,
    ],
  },

  utility_types: {
    topic: `utility_types`,
    title: `Utility Types`,
    sectionTitle: `5. Tipos Avanzados`,
    summary: `TypeScript incluye una caja de herramientas con tipos ya listos para transformar otros tipos sin reescribirlos. Partial<T> hace que todos los campos sean opcionales — ideal para actualizaciones parciales. Readonly<T> hace que nada se pueda modificar. Pick<T, K> se queda solo con los campos que eliges, y Omit<T, K> elimina los que no quieres. Record<K, T> construye un diccionario tipado. Exclude y Extract filtran tipos de unión. ReturnType<T> extrae el tipo de retorno de una función y Awaited<T> desenvuelve el tipo dentro de una Promise.`,
    codeExample: `interface Tarea {
  id: string;
  titulo: string;
  descripcion: string;
  completada: boolean;
}

// Partial para actualizaciones parciales
type ActualizarTareaDto = Partial<Tarea>;

// Pick para vista resumida
type ResumenTarea = Pick<Tarea, "id" | "titulo">;

// Omit para crear sin ID
type CrearTareaDto = Omit<Tarea, "id">;

const nuevaTarea: CrearTareaDto = {
  titulo: "Aprender TypeScript",
  descripcion: "Dominar Utility Types",
  completada: false,
};

// Exclude / Extract sobre uniones
type Estado = "activo" | "inactivo" | "suspendido";
type SoloActivos = Exclude<Estado, "inactivo" | "suspendido">; // "activo"

// ReturnType y Awaited
async function fetchData(): Promise<number[]> { return []; }
type Resultado = Awaited<ReturnType<typeof fetchData>>; // number[]`,
    tips: [
      `💡 Combina Omit y Pick para construir DTOs precisos sin duplicar definiciones de interfaces.`,
      `💡 Los Utility Types estándar son superficiales (shallow) — solo afectan al primer nivel de propiedades.`,
    ],
  },

  tipos_condicionales: {
    topic: `tipos_condicionales`,
    title: `Tipos Condicionales y Mapped Types`,
    sectionTitle: `5. Tipos Avanzados`,
    summary: `Los Tipos Condicionales son como el operador ternario (? :) pero para tipos: T extends string ? "es texto" : "no es texto". Esto permite crear tipos que cambian dependiendo de otro tipo. Con infer puedes extraer partes internas de un tipo, como el tipo de dato que devuelve una promesa. Los Mapped Types transforman todas las propiedades de un objeto a la vez — son la base de utilidades como Partial o Readonly. Con Key Remapping (as) puedes renombrar las propiedades durante la transformación y con -? o -readonly puedes eliminar modificadores.`,
    codeExample: `// Tipo condicional básico
type EsString<T> = T extends string ? true : false;
type T1 = EsString<string>; // true
type T2 = EsString<number>; // false

// infer — extraer tipo interno
type DesenvuelvePromesa<T> = T extends Promise<infer R> ? R : T;
type Valor = DesenvuelvePromesa<Promise<number>>; // number

// Mapped Type con modificadores
type Mutable<T> = { -readonly [K in keyof T]: T[K] };
type Requerido<T> = { [K in keyof T]-?: T[K] };

// Key remapping con as
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};
interface Usuario { nombre: string; edad: number; }
type GettersUsuario = Getters<Usuario>;
// { getNombre: () => string; getEdad: () => number; }`,
    tips: [
      `💡 Los Mapped Types son la base bajo la cual funcionan utilidades como Partial y Readonly internamente.`,
      `💡 Usa [T] extends [U] ? X : Y (con corchetes) para evitar la distribución automática sobre tipos de unión.`,
    ],
  },

  // --- SECCIÓN 6: MÓDULOS Y ECOSISTEMA ---
  modulos_importaciones: {
    topic: `modulos_importaciones`,
    title: `Módulos e Importaciones`,
    sectionTitle: `6. Módulos y Ecosistema`,
    summary: `En TypeScript cada archivo puede ser un módulo independiente, lo que significa que su código no interfiere con el de otros archivos. Para compartir código entre archivos usas export (para enviar) e import (para recibir). Hay exportaciones con nombre (export const ...) y exportación por defecto (export default). Una práctica común es crear un archivo index.ts que re-exporte todo lo de una carpeta para simplificar las importaciones. También puedes cargar módulos de forma asíncrona con import() dinámico para no cargar todo el código al inicio.`,
    codeExample: `// mathUtils.ts — exportaciones nombradas
export const sumar = (a: number, b: number): number => a + b;
export const restar = (a: number, b: number): number => a - b;
export interface CalculadoraConfig { precision: number; }

// app.ts — importar valores y tipos por separado
import { sumar } from "./mathUtils";
import type { CalculadoraConfig } from "./mathUtils";

const config: CalculadoraConfig = { precision: 2 };
console.log(sumar(5, 10)); // 15

// Barrel file — index.ts
export * from "./mathUtils";
export * from "./userUtils";

// Importación dinámica (lazy loading)
async function cargarModulo(): Promise<void> {
  const { sumar } = await import("./mathUtils");
  console.log(sumar(1, 2));
}`,
    tips: [
      `💡 Utiliza import type para importar exclusivamente interfaces o tipos — mejora el tree shaking y evita importaciones circulares de runtime.`,
      `💡 Los Barrel files (index.ts) simplifican las rutas de importación, pero úsalos con cuidado en proyectos grandes.`,
    ],
  },

  decoradores: {
    topic: `decoradores`,
    title: `Decoradores`,
    sectionTitle: `6. Módulos y Ecosistema`,
    summary: `Los decoradores son como "stickers" que pegas sobre clases, métodos o propiedades para añadirles comportamiento extra sin modificar el código original. Se escriben con @ antes del nombre. Por ejemplo, @LogAcceso podría registrar automáticamente cada vez que se llama a un método. Para crear un decorador que acepte parámetros usas una fábrica — una función que devuelve el decorador real. TypeScript 5.0 introdujo el estándar moderno (Stage 3), mientras que versiones anteriores usaban experimentalDecorators: true. Los decoradores se aplican de abajo hacia arriba cuando hay varios apilados.`,
    codeExample: `// Decorador de método (estilo legacy)
function LogAcceso(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(\`[LOG] Invocando \${key} con:\`, args);
    return original.apply(this, args);
  };
}

class ServicioUsuarios {
  @LogAcceso
  obtenerUsuario(id: number) {
    return { id, nombre: "Carlos" };
  }
}

// Fábrica de decoradores — acepta parámetros
function Rol(rol: string) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    console.log(\`Método \${key} requiere rol: \${rol}\`);
  };
}

class AdminController {
  @Rol("admin")
  eliminarUsuario(id: number) { /* ... */ }
}`,
    tips: [
      `💡 Los decoradores se utilizan ampliamente en frameworks como NestJS o Angular para inyección de dependencias y validación.`,
      `⚠️ TypeScript 5.0+ implementa la especificación Stage 3 de decoradores — incompatible con el modo experimentalDecorators clásico.`,
    ],
  },

  // --- SECCIÓN 7: ASINCRONÍA ---
  async_await: {
    topic: `async_await`,
    title: `Async / Await y Promesas`,
    sectionTitle: `7. Asincronía`,
    summary: `Cuando tu código necesita esperar algo — como descargar datos de internet — en lugar de bloquear todo el programa usamos código asíncrono. Una Promise representa un valor que llegará en el futuro. Con async marcas una función como asíncrona y con await le dices "espera aquí a que esto termine". TypeScript tipa todo esto automáticamente: sabe que si haces await de una Promise<number>, obtienes un number. Para manejar errores usas try/catch igual que con código normal. También existen Promise.all (espera todas a la vez), Promise.race (la que llegue primero) y Promise.allSettled (espera todas sin fallar si alguna falla).`,
    codeExample: `// Función async tipada
async function obtenerUsuario(id: number): Promise<{ nombre: string; email: string }> {
  const res = await fetch(\`/api/users/\${id}\`);
  if (!res.ok) throw new Error("Error de red");
  return res.json();
}

// Manejo de errores tipado
async function cargarDatos(): Promise<void> {
  try {
    const usuario = await obtenerUsuario(1);
    console.log(usuario.nombre);
  } catch (error) {
    // Con strict:true, error es unknown
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}

// Paralelismo con Promise.all
async function cargarTodo(): Promise<void> {
  const [usuario, productos] = await Promise.all([
    obtenerUsuario(1),
    fetch("/api/products").then(r => r.json()),
  ]);
  console.log(usuario, productos);
}`,
    tips: [
      `💡 Anota siempre el tipo de retorno de funciones async: Promise<T> documenta claramente el contrato de la función.`,
      `⚠️ Con strict: true, la variable en catch (error) es de tipo unknown. Verifica con instanceof Error antes de acceder a .message.`,
      `💡 Prefiere Promise.allSettled cuando necesites procesar resultados parciales aunque alguna Promesa falle.`,
    ],
  },

  // --- SECCIÓN 8: ESTRECHAMIENTO DE TIPOS ---
  type_narrowing: {
    topic: `type_narrowing`,
    title: `Type Narrowing y Type Guards`,
    sectionTitle: `8. Estrechamiento de Tipos`,
    summary: `El Type Narrowing es como cuando TypeScript "adelgaza" un tipo amplio a uno más específico dentro de un if. Si tienes una variable x que puede ser string | number y escribes if (typeof x === "string"), dentro del if TypeScript ya sabe que x es exactamente string y te deja usar métodos de string. Puedes lograr esto con typeof, instanceof, el operador in, o creando tus propias funciones guardián. Las uniones discriminadas son un patrón muy poderoso: agregas un campo común a cada variante para que TypeScript pueda distinguirlas automáticamente en un switch.`,
    codeExample: `// typeof narrowing
function formatear(valor: string | number): string {
  if (typeof valor === "string") {
    return valor.toUpperCase(); // valor: string aquí
  }
  return valor.toFixed(2); // valor: number aquí
}

// Unión Discriminada
type Forma =
  | { tipo: "circulo"; radio: number }
  | { tipo: "cuadrado"; lado: number };

function calcularArea(f: Forma): number {
  switch (f.tipo) {
    case "circulo":
      return Math.PI * f.radio ** 2;
    case "cuadrado":
      return f.lado ** 2;
    default:
      const _exhaustivo: never = f; // Error si falta un caso
      return 0;
  }
}

// Type Predicate personalizado
function esError(x: unknown): x is Error {
  return x instanceof Error;
}`,
    tips: [
      `💡 Usa Uniones Discriminadas con switch para modelar estados de la aplicación — TypeScript garantizará que manejas todos los casos.`,
      `⚠️ El operador ! (non-null assertion) no verifica nada en runtime. Si el valor puede ser null, usa un if real.`,
      `💡 La comprobación exhaustiva con never en el default del switch es la forma más segura de detectar casos olvidados.`,
    ],
  },

  // --- SECCIÓN 9: ARCHIVOS DE DECLARACIÓN ---
  declaration_files: {
    topic: `declaration_files`,
    title: `Archivos de Declaración (.d.ts)`,
    sectionTitle: `9. Archivos de Declaración`,
    summary: `Los archivos .d.ts son como manuales de instrucciones para TypeScript: describen la forma de código JavaScript externo — qué funciones existen, qué parámetros reciben, qué devuelven — sin contener código ejecutable. Esto permite usar librerías JavaScript con seguridad de tipos. Los paquetes @types/ (como @types/react) son colecciones de estos archivos creadas por la comunidad para las librerías más populares. Con declare le dices a TypeScript "este valor existe en el entorno aunque no lo veas aquí". Con Module Augmentation puedes añadir propiedades a tipos de librerías externas sin tocar su código.`,
    codeExample: `// === globals.d.ts === (script global, sin imports)
interface Window {
  myApp: { version: string; env: string };
}

// === express.d.ts === (module augmentation)
import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    usuario?: { id: number; rol: string };
  }
}

// === legacy-lib.d.ts === (módulo sin tipos)
declare module "legacy-lib" {
  export function procesar(datos: unknown): string;
  export const VERSION: string;
}

// Variables globales del entorno
declare const __APP_VERSION__: string;
declare const __DEV__: boolean;`,
    tips: [
      `💡 Instala @types/node, @types/react, etc. como devDependencies para obtener los tipos de las librerías más populares.`,
      `💡 Activa "declaration": true y "declarationMap": true en tsconfig.json al publicar una librería.`,
      `⚠️ Un archivo .d.ts sin import/export modifica el scope global; con import/export es un módulo aislado.`,
    ],
  },

  tsconfig: {
    topic: `tsconfig`,
    title: `Configuración tsconfig`,
    sectionTitle: `6. Módulos y Ecosistema`,
    summary: `El archivo tsconfig.json es el panel de control de TypeScript para tu proyecto. Le dice al compilador cómo debe trabajar: a qué versión de JavaScript traducir el código (target), qué formato de módulos usar (module), qué carpetas incluir o ignorar, y qué tan estricto ser con los errores. La opción más importante para principiantes es "strict": true, que activa todas las verificaciones de seguridad de tipos al mismo tiempo. Otras opciones útiles: noEmit para solo verificar tipos sin generar archivos, paths para crear atajos de importación, y sourceMap para depurar el código TypeScript original directamente en el navegador.`,
    codeExample: `// tsconfig.json — configuración recomendada para apps modernas
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["DOM", "ES2022"],
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noEmit": true,
    "declaration": true,
    "sourceMap": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}`,
    tips: [
      `💡 Mantén siempre "strict": true en tus proyectos de TypeScript para aprovechar la máxima seguridad del sistema de tipos.`,
      `💡 Usa "noEmit": true cuando el bundler (Vite, Next.js, esbuild) ya compila — así tsc solo actúa como checker de tipos.`,
    ],
  },
};
