<template>
  
  <v-app class="accent">
    <h1 id="title">Quizzikal</h1>

        <div id="buttons">
          <div>
            <v-btn depressed x-large color="white" @click.stop="isNewChallengeModalOpen = true, selectedSubjects=[false, false, false, false, false, false]">New Challenge</v-btn>
          </div>

          <div>
            <v-btn depressed x-large color="white" @click.stop="isSoloModalOpen = true">Solo Play</v-btn>
          </div>
          
        </div>

        <v-divider color="white" width="830" class="mx-auto my-5"></v-divider>

        <div id="scrollers">
          <ul>
            <li>
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
            </li>

            <li>
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
                          <v-list-item-title>{{ item.player + ` ${item.numAnswered}/6` }}</v-list-item-title>
                          
                        </v-list-item-content>

                        <v-list-item-action>
                          <v-btn
                            depressed
                            small
                            @click.stop="openOngoingChallengeModal(item)"
                          >
                            Continue  
                          </v-btn>
                        </v-list-item-action>
                      </v-list-item>
                    </template>

                    </v-virtual-scroll>
                  </v-card>
              </div>
            </li>

            <li>
              <div id="completedChallenges">
                <v-card
                  class="mx-auto"
                  width="250"
                >
                  <v-card-title class="white--text black">
                    Completed Challenges

                    <v-spacer></v-spacer>
                  </v-card-title>

                  <v-virtual-scroll
                    :items="completedChallenges"
                    :item-height="50"
                    height="300"
                    width="250"
                    
                  > 
                  <template v-slot="{ item }">
                    <v-list-item>

                      <v-list-item-content v-bind:class="{
                          green: item.pc > item.oc,
                          yellow: item.pc === item.oc,
                          red: item.pc < item.oc
                        }">
                        <v-list-item-title>{{ `(${item.pc}/6) vs ${item.player} (${item.oc}/6)` }}</v-list-item-title>
                        
                      </v-list-item-content>


                    </v-list-item>
                  </template>

                  </v-virtual-scroll>
                </v-card>
                
              </div>
            </li>
          </ul>
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
                  :to="'/quiz'"
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
                @click="isNewChallengeModalOpen = false; resetTextField()"
              >
                  Cancel
              </v-btn>

              <v-btn
                color="green darken-1"
                text
                @click="isNewChallengeModalOpen = false; resetTextField(); createGame(opponentUsername);"
                
              >
                  Send!
              </v-btn>
            </v-card-actions>
          </v-card>

        </v-dialog>

        <v-dialog
          v-model="isOngoingChallengeModalOpen"
          max-width="350"
        >

          <v-card id="modal">
            <v-card-title class="headline justify-center">Continue Challenge ({{ongoingModalInfo.numAnswered}}/6)
            </v-card-title>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="red darken-1"
                text
                @click="isOngoingChallengeModalOpen = false"
              >
                  Cancel
              </v-btn>

              <v-btn
                color="green darken-1"
                text
                @click="isOngoingChallengeModalOpen = false"
                :to="'/quiz'"
              >
                  Continue
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog
          v-model="isSoloModalOpen"
          max-width="300"
        >

          <v-card id="soloModal">
            <div style="text-align: center">
              <v-btn
                text
                @click="isSoloModalOpen = false"
                :to="'/quiz'"
                width="300"
                x-large
              >
                  New Game
              </v-btn>
            </div>
              
          

            <div style="text-align: center">
              <v-btn
                text
                @click="isSoloModalOpen = false"
                :to="'/quiz'"
                width="300"
                x-large
              >
                  Practice Missed Questions
              </v-btn>
            </div>
              
            
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
        { player: "awgeew", numAnswered: "5" },
        { player: "wgher", numAnswered: "2" },
        { player: "srhdsrd", numAnswered: "1" },
        { player: "rhxeh", numAnswered: "4" },
        { player: "zhdrhwh", numAnswered: "3" },
        { player: "12345", numAnswered: "3" },
      ],

      completedChallenges: [
        { player: "6558", pc: "3", oc: "2" },
        { player: "wgrher", pc: "5", oc: "2" },
        { player: "sr5ysrd", pc: "3", oc: "6" },
        { player: "rhx567h4eh", pc: "2", oc: "2" },
        { player: "z854hwh", pc: "3", oc: "2" },
        { player: "12g645", pc: "3", oc: "2" },
        { player: "z854hwh", pc: "3", oc: "2" },
        { player: "12g645", pc: "3", oc: "2" },
      ],

      subjects: [
        { name: "Biology", icon: mdiDna},
        { name: "Chemistry", icon: mdiFlask},
        { name: "Physics", icon: mdiAtom},
        { name: "Math", icon: mdiMathIntegralBox},
        { name: "English", icon: mdiBook},
        { name: "History", icon: mdiPillar},
      ],

      subjectIndex: [
        "BIOLOGY", "CHEMISTRY", "PHYSICS", "MATH", "ENGLISH", "HISTORY"
      ],

      isChallengeModalOpen: false,
      modalInfo: { player: "", categories: [] },

      isOngoingChallengeModalOpen: false,
      ongoingModalInfo: { player: "", categories: [] },

      isNewChallengeModalOpen: false,
      selectedSubjects: [false, false, false, false, false, false],

      isSoloModalOpen: false,
      

      opponentUsername: "",
    }
  },

  methods: {
    openChallengeModal(info) {
      this.isChallengeModalOpen = true;
      this.modalInfo = info;
    },

    openOngoingChallengeModal(info) {
      this.isOngoingChallengeModalOpen = true;
      this.ongoingModalInfo = info;
    },

    resetTextField() {
      this.opponentUsername = ""
    },

    async getChallenges() {
      const profile = this.$axios.get(this.$API_URL+"/user/profile/", {
        headers: {'x-access-token': localStorage.getItem('jwt') },
        body: {
          username: localStorage.getItem("username"),
        }
      }).then((profile) => {
        this.challenges = profile.data.incoming_matches,
        this.ongoingChallenges = profile.data.pending_matches,
        this.completedChallenges = profile.data.past_matches
      }).catch((error) => {
        console.log(error);
      });
    },

    async createGame(opponentUsername) {
      let categories = [];
      for (let i = 0; i < this.subjectIndex.length; i++) {
        if (this.selectedSubjects[i]) {
          categories.push(this.subjectIndex[i]);
        }
      }
      
      this.$axios.post(this.$API_URL+"/quiz/create/", {
        headers:  {'x-access-token': localStorage.getItem('jwt') },
        body: {
          challenger_username: "poo",
          challengee_username: "feces",
          categories: categories
        }
      }).then((id) => {
        console.log(id);
        this.getChallenges();
      }).catch((error) => {
        console.log(error);
      })
    }

  },

  mounted() {
    this.getChallenges();
  }
}
</script>

<style scoped>
#wrapper {
  width: 100%;
  height: 100%;
  background-color: #3f51b5;
}

#title {
  font-size: 60px;
  text-align: center;
  color: white;
}

#buttons {
  margin: 0 auto;
}

#buttons .v-btn {
  width: 250px;
  margin: 10px 0;
}

#challenges, #ongoingChallenges, #completedChallenges {
  text-align: left;
  margin: 20px;
}

#challenges {
  margin-left: 0
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

#scrollers {
  text-align: center;
  margin: 0 auto;
  float: left;
}

#scrollers ul {
  list-style-type: none;
}

#scrollers li {
  float: left;
}

.green {
  background-color: springgreen;
  text-align: center;
}

.red {
  background-color: lightcoral;
  text-align: center;
}

.yellow {
  background-color: lightyellow;
  text-align: center;
}

#soloModal v-btn {
  text-align: center;
  margin: 10px auto;
}

</style>