<template>
  <v-app class="my-5">
    <v-card width="700" class="mx-auto">   
        <v-card-text class="font-weight-normal">    
            <h1 style="font-weight: normal; color: black; text-align: center">Submit a question!</h1>
        </v-card-text>

        
        <v-form>
            <v-text-field
                v-model="form.question"
                :counter="120"
                label="Question"
                required
                color="success"
                
                
            ></v-text-field>

            <v-divider></v-divider>

            <v-row>
                <v-col cols="24" sm="12" md="6">
                    <v-text-field
                        color="success"
                        label="Option 1 (Correct answer)"
                        :counter="60"
                        required
                        v-model="form.choices[0]"
                    ></v-text-field>
                </v-col>

                <v-col cols="24" sm="12" md="6">
                    <v-text-field
                        color="success"
                        label="Option 2"
                        :counter="60"
                        required
                        v-model="form.choices[1]"
                    ></v-text-field>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="24" sm="12" md="6">
                    <v-text-field
                        color="success"
                        label="Option 3"
                        :counter="60"
                        required
                        v-model="form.choices[2]"
                    ></v-text-field>
                </v-col>

                <v-col cols="24" sm="12" md="6">
                    <v-text-field
                        color="success"
                        label="Option 4"
                        :counter="60"
                        required
                        v-model="form.choices[3]"
                    ></v-text-field>
                </v-col>
            </v-row>

            <v-btn
                class="mr-8"
            >Submit</v-btn>

        </v-form>

        
        

    </v-card>
      
  </v-app>
</template>

<script>
export default {
    name: "Contribute",
    data() {
        return {
            form : {
                question: '',
                choices: ['','','','']
            }
        }
    }
}
</script>

<style scoped>
.v-text-field {
   padding: 0 20px
}

.v-divider {
    margin: 10px 0;
}

.v-form {
    text-align: center;
}

.v-btn {
    text-align: center;
    margin: 10px auto;
}



</style>