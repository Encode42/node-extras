import { saveAs } from "file-saver";

/**
 * Save text to a file.
 *
 * @param contents Contents of the file
 * @param filename Name of the file
 */
export function saveText(contents: string, filename: string): void {
    save(contents, "text/plain", filename);
}

/**
 * Save contents to a file.
 *
 * @param contents Contents of the file
 * @param mime [MIME type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types) of the file
 * @param filename Name of the file
 */
export function save(contents: any, mime: string, filename: string): void {
    // eslint-disable-next-line no-undef
    const blob = new Blob([contents], {
        "type": mime
    });

    saveAs(blob, filename);
}
