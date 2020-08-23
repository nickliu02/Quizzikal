<template>
  <v-main>
    <v-card
      
      class="mx-auto my-12"
      max-width="1000"
    >
      <v-img
        height="258"
        src="https://www.thebalancecareers.com/thmb/hKctLkuZxqFGd3XpQCUjQBjSPjQ=/3436x2577/smart/filters:no_upscale()/school-books-on-desk--education-concept-871454068-5b548900c9e77c005b04fc8c.jpg"
      ></v-img>

      <v-card-title>User: {{profile.username}}</v-card-title>

      <v-card-text>
        Name: {{profile.name}}
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-title>Statistics</v-card-title>
      <v-row>
        <v-col>
          <v-card-text>
            Winrate:
          </v-card-text>
          
        </v-col>
        <v-col>
          <v-progress-circular :value="profile.won/(profile.won+profile.lost)*100" size="100" width="20">{{ `${Math.floor(this.profile.won/(this.profile.won+this.profile.lost)*100)}%`}}</v-progress-circular>
        </v-col>

      </v-row>
      
      <v-card-text>
        <p class="text--primary">Win/Loss</p>
        
      </v-card-text>
      <v-progress-linear
      background-color="red"
      color="green"
      height="40"
      :value="profile.won"
    ><strong class="white--text">{{profile.won}}/{{profile.lost}}</strong></v-progress-linear>

      
    </v-card>
     
  </v-main>
</template>

<script>
export default {
    name: "Profile",
    data(){
        return {
            profile: {
              
                
            },
            
            registerR : "/register"
        }
    },
    mounted: function(){
      console.log("lmao")
      // this.$axios.post(this.$API_URL+"/profile", {
      //   headers: {
      //     'x-access-token': localStorage.getItem('jwt')
      //   },
      //   body: {
      //     username: localStorage.getItem('username')
      //   }
      //   })
      //   .then(response => {
      //       this.profile=response.data;
      //       console.log(this.profile)
      //   })

      this.profile = {
        username : "fairnightzz",
                name : "Zhehai",
                winrate: 0.69,
                won:69,
                lost:21,
                matches:[
                  { player: "6558", pc: "3", oc: "2" },
                  { player: "wgrher", pc: "5", oc: "2" },
                  { player: "sr5ysrd", pc: "3", oc: "6" },
                  { player: "rhx567h4eh", pc: "2", oc: "2" },
                  { player: "z854hwh", pc: "3", oc: "2" },
                  { player: "12g645", pc: "3", oc: "2" },
                  { player: "z854hwh", pc: "3", oc: "2" },
                  { player: "12g645", pc: "3", oc: "2" }] 
      }
    }
}
</script>

<style>

</style>