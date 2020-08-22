<template>
  <v-app>
      <div id="wrapper">
        <h1 id="title">Quizzikal</h1>

        <div id="buttons">
          <div>
            <v-btn depressed x-large color="accent" @click.stop="isNewChallengeModalOpen = true, selectedSubjects=[false, false, false, false, false, false]">New Challenge</v-btn>
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
              Incoming Challenges

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
        </div>
      </div>

      <div id="ongoingChallenges">
          <v-card
            class="mx-auto"
            width="250"
          >
            <v-card-title class="white--text black">
              Ongoing Challenges

              <v-spacer></v-spacer>
            </v-card-title>

            <v-virtual-scroll
              :items="ongoingChallenges"
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
      </div>

      <v-dialog
            v-model="isChallengeModalOpen"
            max-width="350"
          >

            <v-card id="modal">
              <v-card-title class="headline justify-center">Challenge from {{ modalInfo.player }}

                <div id="icons">
                    <v-tooltip bottom v-for="(subject, i) in subjects" v-bind:key="i">
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon v-bind="attrs" v-on="on" x-large v-bind:class="{ active: modalInfo.categories[i], notActive: !modalInfo.categories[i] }">{{ subject.icon }}</v-icon>
                      </template>
                      <span>{{ subject.name }}</span>
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

        <v-dialog
          v-model="isNewChallengeModalOpen"
          max-width="350"
        >

          <v-card id="modal">
            <v-card-title class="headline justify-center">New Challenge
              <div id="selectIcons">
              
                  <v-text-field
                    label="Opponent Username"
                    single-line
                    color="blue"
                    v-model="opponentUsername"
                  ></v-text-field>
                

                <v-tooltip bottom v-for="(subject, i) in subjects" v-bind:key="i">
                  <template v-slot:activator="{ on, attrs }">
                      <v-icon v-bind="attrs" v-on="on" 
                        x-large v-bind:class="{ active: selectedSubjects[i], notActive: !selectedSubjects[i] }"
                        v-on:click="selectedSubjects[i] = !selectedSubjects[i]"
                      >{{ subject.icon }}</v-icon>
                  </template>
                  <span>{{ subject.name }}</span>
                </v-tooltip>
              </div>
            </v-card-title>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="red darken-1"
                text
                @click="isNewChallengeModalOpen = false"
              >
                  Cancel
              </v-btn>

              <v-btn
                color="green darken-1"
                text
                @click="isNewChallengeModalOpen = false"
              >
                  Send!
              </v-btn>
            </v-card-actions>
          </v-card>

        </v-dialog>
  </v-app>    
</template>

<script>
import { mdiDna, mdiFlask, mdiMathIntegralBox, mdiBookOpenBlankVariant, mdiAtom, mdiPillar, mdiBook  } from '@mdi/js';

export default {
  data() {
    return {
      // categories: [Biology, Chemistry, Physics, Math, English, History]
      challenges: [
        { player: "a", categories: [true, false, true, false, false, false] },
        { player: "wgher", categories: [false, false, true, false, false, true] },
        { player: "tehth", categories: [true, false, true, false, false, false] },
        { player: "rv4tw", categories: [false, false, true, false, false, true] },
        { player: "zhavt4", categories: [true, false, true, false, false, false] },
        { player: "12avt4345", categories: [false, false, true, false, false, true] },
      ],

      ongoingChallenges: [
        { player: "awgeew", categories: [true, false, true, false, false, false] },
        { player: "wgher", categories: [false, false, true, false, false, true] },
        { player: "srhdsrd", categories: [true, false, true, false, false, false] },
        { player: "rhxeh", categories: [false, false, true, false, false, true] },
        { player: "zhdrhwh", categories: [true, false, true, false, false, false] },
        { player: "12345", categories: [false, false, true, false, false, true] },
      ],

      subjects: [
        { name: "Biology", icon: mdiDna},
        { name: "Chemistry", icon: mdiFlask},
        { name: "Physics", icon: mdiAtom},
        { name: "Math", icon: mdiMathIntegralBox},
        { name: "English", icon: mdiBook},
        { name: "History", icon: mdiPillar},
      ],

      isChallengeModalOpen: false,
      modalInfo: { player: "", categories: [] },

      isOngoingChallengeModalOpen: false,
      modalInfo: { player: "", categories: [] },

      isNewChallengeModalOpen: false,
      selectedSubjects: [false, false, false, false, false],

      opponentUsername: "",
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
    },

    openOngoingChallengeModal(info) {
      this.isOngoingChallengeModalOpen = true;
      this.ongoingModalInfo = info;
    },

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
  text-align: left;
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

.clickIcon {
  width: 100%;
  height: 100%;
}

v-tooltip {
  cursor: normal;
}
</style>