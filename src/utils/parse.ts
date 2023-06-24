export async function parse(textArray: string[]): Promise<T[]> {
    try {
        const parsedArray: T[] = [];

        for (const text of textArray) {
            console.log("TEXT PASSED TO FUNCTION", text);
            const json = text.includes("```")
                ? text.trim().split(/```(?:json)?/)[1]
                : text.trim();
            console.log("REAL JSON I ASSUME", json);
            // const parsedObj = JSON.parse(json);
            // console.log("Parsed object", typeof parsedObj);
            parsedArray.push(parsedObj);
            console.log("ARRRAAAAAYYY", parsedArray);
        }

        return parsedArray;
    } catch (e) {
        throw new Error(`Failed to parse. Texts: "${textArray}". Error: ${e}`);
    }
}

export function parseJsonArray(arr) {
    console.log(arr);
    const result = [];
    for (let str of arr) {
        // Remove leading and trailing whitespace
        str = str.trim();
        // Check if the string represents an array or an object
        if (str.startsWith("[")) {
            // Parse the string as an array and add all elements to the result
            result.push(...JSON.parse(str));
        } else {
            // Split the string into separate objects
            const objs = str.split("},\n{");
            for (let i = 0; i < objs.length; i++) {
                let obj = objs[i];
                // Make sure the object string is properly formatted
                if (!obj.startsWith("{")) {
                    obj = "{" + obj;
                }
                if (!obj.endsWith("}")) {
                    obj = obj + "}";
                }
                // Parse the object string and add the object to the result
                result.push(JSON.parse(obj));
            }
        }
    }
    console.log(result);
    return result;
}
