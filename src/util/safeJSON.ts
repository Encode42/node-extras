

/**
 * Safely converts an object to its JSON equivalent.
 *
 * @param value Object to convert
 * @return Either the input object or JSON-parsed equivalent.
 */
export function safeJSON<T,>(value: T): any | T {
    let result: any;

    try {
        // @ts-ignore // TODO
        result = JSON.parse(value);
    } catch {
        return value;
    }

    return result;
}
