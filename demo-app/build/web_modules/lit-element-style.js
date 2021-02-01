import './common/lit-html-7f1eac0d.js';
import './common/lit-element-61c2e4f9.js';
import './common/render-fe2ef6e3.js';

function litStyle(myStyles) {

    return superclass => class extends superclass {

        static getStyles() {

            const styles = super.getStyles();

            if (!styles) {
                return myStyles;
            } else if (Array.isArray(styles)) {
                return [myStyles, ...styles];
            } else {
                return [myStyles, styles];
            }

        }

    }

    

}

export { litStyle };
