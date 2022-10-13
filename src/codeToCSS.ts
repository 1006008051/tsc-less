import jf from 'jscodeshift';

/**
 * 将code中的less换成css
 * @param str File content string
 * @returns Quantity replaced
 */
function codeToCSS(str: string) {
    let root;
    try {
        root = jf(str);
    } catch (error) {
        return false;
    }

    root.find(jf.ImportDeclaration).forEach((path) => {
        const value = path.node?.source?.value;
        const regex = /(less)('|"|`)?$/i;
        if (value && regex.test(value.toString())) {
            path.node.source.value = value.toString().replace(regex, (_res, _$1, $2) => ($2 ? `css${$2}` : 'css'));
        }
    });

    return root.toSource();
}

export { codeToCSS };
