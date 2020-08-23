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

    <v-card-title>Cafe Badilico</v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ml-4">4.5 (413)</div>
      </v-row>

      <div class="my-4 subtitle-1">
        $ • Italian, Cafe
      </div>

      <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>Tonight's availability</v-card-title>

    <v-card-text>
      <v-chip-group
        v-model="selection"
        active-class="deep-purple accent-4 white--text"
        column
      >
        <v-chip>5:30PM</v-chip>

        <v-chip>7:30PM</v-chip>

        <v-chip>8:00PM</v-chip>

        <v-chip>9:00PM</v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="deep-purple lighten-2"
        text
        @click="reserve"
      >
        Reserve
      </v-btn>
    </v-card-actions>
  </v-card>
      <v-card class="mx-auto" max-width="374">
        <h1>{{profile.username}}</h1>
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