export const tipsBank: Record<string, string[]> = {
  tipos_primitivos: [
    '💡 Tip: Preferir `unknown` antes que `any`. `unknown` te obliga a verificar el tipo antes de usarlo, evitando errores inesperados en runtime.',
    '💡 Tip: El tipo `never` representa valores que jamás ocurren. Es ideal para garantizar exhaustividad en estructuras `switch`.'
  ],
  variables_constantes: [
    '💡 Tip: Usa `const` por defecto para todas tus variables. Solo usa `let` si realmente planeas reasignar su valor.',
    '💡 Tip: El operador `??` (Nullish Coalescing) solo evalúa `null` o `undefined`, a diferencia de `||` que también evalúa `0`, `""` o `false`.'
  ],
  arrays_tuplas: [
    '💡 Tip: Las tuplas permiten fijar la longitud exacta y el tipo de cada posición, como `[number, string]` para representar coordenadas o pares clave-valor.',
    '💡 Tip: Usa `readonly Array<T>` para evitar mutaciones accidentales como `push()` o `pop()` en arreglos importantes.'
  ],
  interfaces: [
    '💡 Tip: Las interfaces en TypeScript permiten "Declaration Merging". Si declaras dos veces la misma interfaz, TypeScript las fusiona automáticamente.',
    '💡 Tip: Usa el modificador `readonly` dentro de interfaces para proteger propiedades y evitar que sean modificadas tras su inicialización.'
  ],
  type_aliases: [
    '💡 Tip: Los Type Aliases (`type`) son ideales para definir uniones discriminadas como `type Estado = "loading" | "success" | "error"`.',
    '💡 Tip: A diferencia de las interfaces, los `type` pueden representar tipos primitivos, uniones y tuplas directamente.'
  ],
  enums: [
    '💡 Tip: Los `const enum` no generan código JavaScript adicional en compilación; TypeScript reemplaza sus valores directamente en el código.',
    '💡 Tip: Es recomendable usar Enums de cadena (`enum Role { Admin = "ADMIN" }`) en lugar de numéricos para facilitar la depuración de logs.'
  ],
  tipado_funciones: [
    '💡 Tip: Define el tipo de retorno explícito en tus funciones públicas para mejorar el autocompletado y evitar retornos involuntarios.',
    '💡 Tip: Puedes marcar parámetros como opcionales usando `?` (ej: `options?: Config`), pero siempre colócalos al final de la lista.'
  ],
  funciones_flecha: [
    '💡 Tip: Las funciones flecha conservan el contexto de `this` de su ámbito léxico superior, evitando perder referencias en callbacks.',
    '💡 Tip: Si retornas un objeto directamente en una función flecha de una sola línea, envuélvelo en paréntesis: `() => ({ key: value })`.'
  ],
  sobrecarga_funciones: [
    '💡 Tip: La sobrecarga de funciones te permite definir múltiples firmas para la misma función según los tipos de parámetros pasados.',
    '💡 Tip: Recuerda que la firma de implementación final no es visible externamente; solo se pueden invocar las firmas sobrecargadas superiores.'
  ],
  clases_constructores: [
    '💡 Tip: Puedes declarar y asignar propiedades en una clase en una sola línea dentro del constructor usando modificadores como `constructor(public name: string)`.',
    '💡 Tip: Las clases abstractas no se pueden instanciar directamente; sirven como plantillas obligatorias para clases hijas.'
  ],
  herencia_polimorfismo: [
    '💡 Tip: Usa `super()` dentro del constructor hijo antes de acceder a `this` al heredar de una clase padre.',
    '💡 Tip: El polimorfismo te permite tratar instancias de subclases mediante la interfaz de su clase base uniforme.'
  ],
  modificadores_acceso: [
    '💡 Tip: El modificador `private` es solo a nivel de compilador en TS; para privacidad real en JS a nivel runtime usa el prefijo `#` (ej: `#campo`).',
    '💡 Tip: `protected` permite que las subclases hijas accedan a la propiedad, pero bloquea el acceso desde el exterior de la clase.'
  ],
  genericos: [
    '💡 Tip: Los genéricos `<T>` permiten escribir funciones y clases reutilizables que conservan la seguridad de tipos sin usar `any`.',
    '💡 Tip: Usa restricciones con `extends` (ej: `<T extends { id: string }>`) para limitar qué tipos son aceptados por el genérico.'
  ],
  utility_types: [
    '💡 Tip: `Pick<T, K>` extrae solo las propiedades que necesitas de un objeto, mientras que `Omit<T, K>` elimina las que no quieres.',
    '💡 Tip: `Partial<T>` vuelve opcionales todas las propiedades de un tipo, ideal para objetos de actualización o borrador.'
  ],
  tipos_condicionales: [
    '💡 Tip: Los tipos condicionales usan la sintaxis `T extends U ? X : Y` para evaluar tipos dinámicamente en tiempo de compilación.',
    '💡 Tip: La palabra clave `infer` dentro de un tipo condicional permite extraer tipos internos como el tipo devuelto por una Promise.'
  ],
  modulos_importaciones: [
    '💡 Tip: Usa `import type { User } from "./user"` para importar solo tipos; el empaquetador lo eliminará por completo en JS final.',
    '💡 Tip: Organizar código con exportaciones nombradas (`export const`) facilita la refactorización y el tree-shaking en producción.'
  ],
  decoradores: [
    '💡 Tip: Los decoradores son funciones especiales anotadas con `@` que pueden modificar clases, métodos o propiedades antes de ejecutar el código.',
    '💡 Tip: Asegúrate de tener habilitada la opción `"experimentalDecorators": true` en tu archivo `tsconfig.json` para usar la sintaxis legacy.'
  ],
  tsconfig: [
    '💡 Tip: Mantener `"strict": true` en `tsconfig.json` activa todas las comprobaciones estrictas recomendadas por TypeScript.',
    '💡 Tip: `"noImplicitAny": true` evita que variables sin tipo asignado se conviertan silenciosamente en `any`.'
  ]
};

/**
 * Retorna un tip aleatorio de los 2 disponibles para un tema específico.
 */
export function getRandomTipForTopic(topic: string): string {
  const tips = tipsBank[topic];
  if (!tips || tips.length === 0) {
    return '💡 Tip: TypeScript ayuda a detectar errores de tipos en tiempo de compilación antes de llegar a producción.';
  }
  const randomIndex = Math.floor(Math.random() * tips.length);
  return tips[randomIndex];
}
