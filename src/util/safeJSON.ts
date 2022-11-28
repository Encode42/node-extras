

/**
 * Safely converts an object to its JSON equivalent.
 *
 * @param value Object to convert
 * @return Either the input object or JSON-parsed equivalent.
 */
export function safeJSON<T,>(value: T): any | T {
    let result: any;

    try {
        result = JSON.parse(JSON.stringify(value));
    } catch {
        return value;
    }

    return result;
}
