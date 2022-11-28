import { safeJSON } from "./safeJSON";
import { SafeParseReturnType, SafeParseSuccess, ZodParsedType, ZodType } from "zod";

/**
 * Full return result for the {@link validateForm} function.
 */
export type validateFormResultFullReturn<T> = SafeParseReturnType<T, T> & {
    "formData": FormData
}

/**
 * @return The validated [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData)
 */
export async function validateForm(request: Request, schema: ZodType, fullReturn: false)

/**
 * @return The full [Zod](https://github.com/colinhacks/zod) object.
 */
export async function validateForm(request: Request, schema: ZodType, fullReturn: true)

/**
 * Validate a request's [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) with a [Zod](https://github.com/colinhacks/zod) schema.
 *
 * @remarks
 * [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) object passed into this function should have a `data` field which is stringified.
 *
 * @param request Request to validate
 * @param schema [Zod](https://github.com/colinhacks/zod) schema to validate with
 * @param fullReturn Whether to return the full result from Zod's validation.
 * @example
 * > `/app/routes/index.tsx`
 * ```ts
 * import { useSubmit } from "@remix-run/react";
 * import { json } from "@remix-run/node";
 * import { RouteRequest, validateForm } from "@encode42/remix-extras";
 * import { Button } from "@mantine/core";
 * import { z } from "zod";
 *
 * const IndexSubmission = z.object({
 *     "id": z.number().min(0).max(65535)
 * });
 *
 * export async function action({ request }: RouteRequest) {
 *     const validation = await validateForm(request, IndexSubmission, false);
 *
 *     console.log(validation.data.id);
 * }
 *
 * export default function IndexPage() {
 *     const submit = useSubmit();
 *
 *     return (
 *         <Button onClick={() => {
 *             submit({
 *                 "data": JSON.stringify({
 *                     "id": Math.floor(Math.random() * 65536)
 *                 } as z.infer<typeof IndexSubmission>)
 *             }, {
 *                 "method": "post"
 *             });
 *         }}>
 *             Send request
 *         </Button>
 *     );
 * }
 * ```
 */
export async function validateForm(request: Request, schema: ZodType, fullReturn = true) {
    const formData = await request.formData();
    const data = safeJSON(formData.get("data"));
    const parsed = schema.safeParse(data);

    if (fullReturn) {
        return {
            ...parsed,
            formData
        } as validateFormResultFullReturn<typeof data>;
    }

    return parsed.success ? parsed.data as SafeParseSuccess<typeof data>["data"] : undefined;
}
