import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import { colors } from 'vuetify/lib';


Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: colors.red.darken1, //Where u change colours
                secondary: colors.red.lighten2,
                accent: colors.indigo.base,
                error: colors.red.accent3,
                success: colors.blue.base
            }
        }
    },

    icons: {

    }
});
