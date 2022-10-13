import * as less from "less";

/**
* 将code中的less换成css
* @param str File content string
* @returns Quantity replaced
*/
const lessToCSS = async (str: string): Promise<any> => {
    let count = 0;
    let content = "";
    try {
        const { css: content } = await less.render(str,
            {
                compress: true // Minify CSS output
            });
        count += 1;
    } catch (err) {

    }
    return {
        content,
        count,
    }
}


export { lessToCSS };