<template>
  <v-app>
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
          max-width="400"
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
                >
                  View
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </template>

          </v-virtual-scroll>
        </v-card>

      </div>
  </v-app>    
</template>

<script>
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
      ]
    }
  },

  methods: {
    printCategories(array) {
      let out = "";
      for (let catergory in array) {
        console.log(catergory);
        out += catergory + " ";
      }
      return out;
    }
  }
}
</script>

<style scoped>
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