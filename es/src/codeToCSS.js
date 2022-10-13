import jf from 'jscodeshift';
function codeToCSS(str) {
    let root;
    try {
        root = jf(str);
    }
    catch (error) {
        return false;
    }
    root.find(jf.ImportDeclaration).forEach((path) => {
        var _a, _b;
        const value = (_b = (_a = path.node) === null || _a === void 0 ? void 0 : _a.source) === null || _b === void 0 ? void 0 : _b.value;
        const regex = /(less)('|"|`)?$/i;
        if (value && regex.test(value.toString())) {
            path.node.source.value = value.toString().replace(regex, (_res, _$1, $2) => ($2 ? `css${$2}` : 'css'));
        }
    });
    return root.toSource();
}
export { codeToCSS };
