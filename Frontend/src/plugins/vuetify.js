import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import { colors } from 'vuetify/lib';


Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: colors.red.darken1, //Where u change colours
                secondary: colors.red.lighten4,
                accent: colors.indigo.base,
            }
        }
    },

    icons: {

    }
});
