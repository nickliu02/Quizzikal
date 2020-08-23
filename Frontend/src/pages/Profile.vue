<template>
  <v-main>
    <v-card
      :loading="loading"
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
          <v-progress-circular :value="60" size="100" width="20">60%</v-progress-circular>
        </v-col>

      </v-row>
      
      <v-card-text>
        Win/Loss
      </v-card-text>
      <v-progress-linear
      background-color="green"
      color="red"
      value="30"
    ></v-progress-linear>

      
    </v-card>
     
  </v-main>
</template>

<script>
export default {
    name: "Profile",
    data(){
        return {
            profile: {
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
      
                  
                
            },
            
            registerR : "/register"
        }
    },
}
</script>

<style>

</style>