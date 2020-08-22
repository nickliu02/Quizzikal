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
            width="250"
          >
            <v-card-title class="white--text black">
              Challenges

              <v-spacer></v-spacer>
            </v-card-title>

            <v-virtual-scroll
              :items="challenges"
              :item-height="50"
              height="300"
              width="250"
              
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
                    @click.stop="openChallengeModal(item)"
                  >
                    View
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </template>

            </v-virtual-scroll>
          </v-card>

          <v-dialog
            v-model="isChallengeModalOpen"
            max-width="350"
          >

            <v-card id="modal">
              <v-card-title class="headline justify-center">Challenge from {{ modalInfo.player }}

                <div id="icons">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon v-bind="attrs" v-on="on" x-large v-bind:class="{ active: modalInfo.categories[0], notActive: !modalInfo.categories[0] }">{{ mdiDna }}</v-icon>
                    </template>
                    <span>Biology</span>
                  </v-tooltip>

                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon v-bind="attrs" v-on="on" x-large v-bind:class="{ active: modalInfo.categories[1], notActive: !modalInfo.categories[1] }">{{ mdiFlask }}</v-icon>
                    </template>
                    <span>Chemistry</span>
                  </v-tooltip>

                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon v-bind="attrs" v-on="on" x-large v-bind:class="{ active: modalInfo.categories[2], notActive: !modalInfo.categories[2] }">{{ mdiAtom }}</v-icon>
                    </template>
                    <span>Physics</span>
                  </v-tooltip>

                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon v-bind="attrs" v-on="on" x-large v-bind:class="{ active: modalInfo.categories[3], notActive: !modalInfo.categories[3] }">{{ mdiMathIntegralBox }}</v-icon>
                    </template>
                    <span>Math</span>
                  </v-tooltip>

                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon v-bind="attrs" v-on="on" x-large v-bind:class="{ active: modalInfo.categories[4], notActive: !modalInfo.categories[4] }">{{ mdiBookOpenBlankVariant }}</v-icon>
                    </template>
                    <span>English</span>
                  </v-tooltip>

                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon v-bind="attrs" v-on="on" x-large v-bind:class="{ active: modalInfo.categories[5], notActive: !modalInfo.categories[5] }">{{ mdiPillar }}</v-icon>
                    </template>
                    <span>History</span>
                  </v-tooltip>

                  

                  
          
                </div>
              </v-card-title>

              

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="red darken-1"
                  text
                  @click="isChallengeModalOpen = false"
                >
                    Decline
                </v-btn>

                <v-btn
                  color="green darken-1"
                  text
                  @click="isChallengeModalOpen = false"
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
      mdiDna: mdiDna,
      mdiFlask: mdiFlask,
      mdiMathIntegralBox: mdiMathIntegralBox,
      mdiBookOpenBlankVariant: mdiBookOpenBlankVariant,
      mdiAtom: mdiAtom,
      mdiPillar: mdiPillar,
      // categories: [Biology, Chemistry, Physics, Math, English, History]
      challenges: [
        { player: "lolxd", categories: [true, false, true, false, false, false] },
        { player: "ayylmao", categories: [false, false, true, false, false, true] },
        { player: "lolxd", categories: [true, false, true, false, false, false] },
        { player: "ayylmao", categories: [false, false, true, false, false, true] },
        { player: "lolxd", categories: [true, false, true, false, false, false] },
        { player: "ayylmao", categories: [false, false, true, false, false, true] },
      ],

      isChallengeModalOpen: false,
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

    openChallengeModal(info) {
      this.isChallengeModalOpen = true;
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
  width: 250px;
  margin: 10px 0;
}

#challenges {
  margin: 35px auto;
}

#icons {
  margin: 0 auto;
  margin-top: 10px;
}

.notActive {
  color: #ccc
}

.active {
  color: black
}

</style>