import less from "less";

/**
* 将code中的less换成css
* @param str File content string
* @returns Quantity replaced
*/
const lessToCSS = async (str: string): Promise<any> => {
    try {
        const { css } = await less.render(str,
            {
                compress: true // Minify CSS output
            });
        return css
    } catch (err) {

    }
}


export { lessToCSS };