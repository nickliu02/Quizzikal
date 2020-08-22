<template>
  <v-app>
    <v-navigation-drawer 
      permanent
      app
      color="primary"
      dark
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Quizzikal
          </v-list-item-title>
          <v-list-item-subtitle>
            subtext
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

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
        </v-list>

      </div>

      

    </v-navigation-drawer>
    

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mdiPlay, mdiPencilBoxMultiple, mdiAccountCircle,
     mdiLogoutVariant, mdiLoginVariant } from '@mdi/js';

export default {
  name: 'App',

  components: {
   
  },

  data: () => ({
    items: [
      { title: "Play", icon: mdiPlay, route: "/play" },
      { title: "Contribute", icon: mdiPencilBoxMultiple, route: "/contribute" },
      { title: "Profile", icon: mdiAccountCircle, route: "/profile" },
      { title: "Logout", icon: mdiLogoutVariant }
    ]
  }),
};
</script>
