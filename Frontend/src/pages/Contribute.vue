<template>
  <v-app class="my-5">
    <v-card width="700" class="mx-auto">   
        <v-card-text class="font-weight-normal">    
            <h1 style="font-weight: normal; color: black; text-align: center">Submit a question!</h1>
        </v-card-text>

        
        <v-form>
            <v-text-field
                v-model="form.text"
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
                        v-model="form.correct"
                    ></v-text-field>
                </v-col>

                <v-col cols="24" sm="12" md="6">
                    <v-text-field
                        color="success"
                        label="Option 2"
                        :counter="60"
                        required
                        v-model="form.wrong[0]"
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
                        v-model="form.wrong[1]"
                    ></v-text-field>
                </v-col>

                <v-col cols="24" sm="12" md="6">
                    <v-text-field
                        color="success"
                        label="Option 4"
                        :counter="60"
                        required
                        v-model="form.wrong[2]"
                    ></v-text-field>
                </v-col>
            </v-row>
            
            <v-overflow-btn
                class="my-2"
                :items="dropdown_font"
                label="Select a category"
                v-model="form.catagory"
            ></v-overflow-btn>
                
                
        

            <v-btn
                class="mr-8"
                @click="onSubmit"
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
                text: '',
                correct: '',
                wrong: ['','',''],
                catagory: ''
            },
            dropdown_font: ['BIOLOGY', 'CHEMISTRY', 'MATH', 'PHYSICS', 'HISTORY','ENGLISH'],
        }
    },
    methods: {
        onSubmit(e){
            const form = this.form;
            console.log(form)
            this.$axios.post(this.$API_URL+"/contrib/create", {
                ...form
            },
            {
            headers:  {'x-access-token': localStorage.getItem('jwt') }
            })
            .then(response => {
                if (response.data.message === "Success"){
                    this.form.text = "";
                    this.form.correct = '';
                    this.form.wrong = ['','','']
                    this.form.catagory = '';
                }
            })
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