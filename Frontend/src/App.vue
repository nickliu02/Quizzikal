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
            Temp Name
          </v-list-item-title>
          <v-list-item-subtitle>
            subtext
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>


      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>


    <v-main>
      
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
      { title: "Play", icon: mdiPlay },
      { title: "Contribute", icon: mdiPencilBoxMultiple },
      { title: "Profile", icon: mdiAccountCircle },
      { title: "Logout", icon: mdiLogoutVariant }
    ]
  }),
};
</script>
