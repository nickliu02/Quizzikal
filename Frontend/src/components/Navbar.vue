<template>
    <v-app>
        <v-navigation-drawer 
        permanent
        app
        color="primary"
        dark
        expand-on-hover
        >
        <v-list-item two-line>
            <v-list-item-content>
                <v-list-item-title class="title">
                    <v-list-item-avatar>
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/54/Q_magazine_logo.svg">
            </v-list-item-avatar> Quizzikal
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <div id="nav"> 
            <v-list
            dense
            nav
            >
                <v-list-item
                    v-for="item in items"
                    :key="item.title"
                    link
                    :to="item.route"
                >
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item 
                    @click="logOut()"
                >
                    <v-list-item-icon>
                        <v-icon>{{ mdiLogoutVariant }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>Logout</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

        </div>

        

        </v-navigation-drawer>
        <router-view></router-view>
    </v-app>
</template>

<script>
import { mdiPlay, mdiPencilBoxMultiple, mdiAccountCircle,
     mdiLogoutVariant, mdiLoginVariant } from '@mdi/js';

export default {
  name: 'Navbar',

  components: {
   
  },

  data: () => ({
    items: [
      { title: "Play", icon: mdiPlay, route: "/play" },
      { title: "Contribute", icon: mdiPencilBoxMultiple, route: "/contribute" },
      { title: "Profile", icon: mdiAccountCircle, route: "/profile" },
    ],

    mdiLogoutVariant: mdiLogoutVariant
    
  }),

  methods: {
      logOut() {
          localStorage.removeItem('jwt');
          this.$router.push('Login');
      }
  }
};
</script>