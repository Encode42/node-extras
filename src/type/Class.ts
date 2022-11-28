/**
 * Generic class type.
 */
export type Class<Clazz, Args> = new (args: Args) => Clazz;
