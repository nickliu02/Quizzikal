<template>
  <v-app>
      <div id="wrapper">
        <h1 id="title">Quizzikal</h1>

        <div id="buttons">
          <div>
            <v-btn depressed x-large color="accent">New Challenge</v-btn>
          </div>

          <div>
            <v-btn depressed x-large color="accent">Solo Play</v-btn>
          </div>
          
        </div>


        <div id="challenges">
          <v-card
            class="mx-auto"
            width="200"
          >
            <v-card-title class="white--text black">
              Challenges

              <v-spacer></v-spacer>
            </v-card-title>

            <v-virtual-scroll
              :items="challenges"
              :item-height="50"
              height="300"
              width="200"
              
            > 

            <template v-slot="{ item }">
              <v-list-item>

                <v-list-item-content>
                  <v-list-item-title>{{ item.player }}</v-list-item-title>
                  
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn
                    depressed
                    small
                    @click.stop="openModal(item)"
                  >
                    View
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </template>

            </v-virtual-scroll>
          </v-card>

          <v-dialog
            v-model="isModalOpen"
            max-width="350"
          >
    
            <v-card id="modal">
              <v-card-title class="headline justify-center">Challenge from {{ modalInfo.player }}</v-card-title>
              
              <v-card-text class="text-center">
                Categories: {{ printCategories(modalInfo.categories) }}
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="red darken-1"
                  text
                  @click="isModalOpen = false"
                >
                    Decline
                </v-btn>

                <v-btn
                  color="green darken-1"
                  text
                  @click="isModalOpen = false"
                >
                    Accept
                </v-btn>
              </v-card-actions>
            </v-card>

             
          </v-dialog>

        </div>
      </div>
  </v-app>    
</template>

<script>
import { mdiDna, mdiFlask, mdiMathIntegralBox, mdiBookOpenBlankVariant, mdiAtom, mdiPillar  } from '@mdi/js';

export default {
  data() {
    return {
      challenges: [
        { player: "lolxd", categories: ["Biology", "Physics"] },
        { player: "ayylmao", categories: ["History", "Math"] },
        { player: "lolxd", categories: ["Biology", "Physics"] },
        { player: "ayylmao", categories: ["History", "Math"] },
        { player: "lolxd", categories: ["Biology", "Physics"] },
        { player: "lolxd", categories: ["Biology", "Physics"] },
        { player: "ayylmao", categories: ["History", "Math"] },
      ],

      isModalOpen: false,
      modalInfo: { player: "", categories: [] },
    }
  },

  methods: {
    printCategories(categories) {
      let out = "";
      for (let i = 0; i < categories.length; i++) {
        out += categories[i] + ", ";
      }
      return out.substring(0, out.length-2);
    },

    openModal(info) {
      this.isModalOpen = true;
      this.modalInfo = info;
    }
  }
}
</script>

<style scoped>
#wrapper {
  width: 100%;
  height: 100%;
  text-align: center;
}

#title {
  font-size: 60px;
  text-align: center;
}

#buttons {
  margin: 0 auto;
}

#buttons .v-btn {
  width: 200px;
  margin: 10px 0;
}

#challenges {
  margin: 35px auto;
}


</style>