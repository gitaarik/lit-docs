import './common/lit-element-7d33ee9a.js';

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
