/**
 * Generic class type.
 */
export type Class<Clazz, Args> = new (args: Args) => Clazz;

/**
 * Generic class type with spread operator for arguments.
 */
export type ClassSpread<Clazz, SpreadType> = new (...args: SpreadType[]) => Clazz;
