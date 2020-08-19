import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: colors.amber.darken3,
            },
            dark: {
                primary: colors.yellow.darken2,
            },
        },
    },
});
