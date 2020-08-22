<template>
    <v-app>
        <v-main>
            <v-container>
                <v-row
                    align="center"
                    justify="center"
                >
                    <v-col
                        cols="12"
                        sm="8"
                        md="4"
                    >
                        <v-card>
                            <v-card-title>
                                Register
                            </v-card-title>

                            <v-card-text>
                                <v-form>
                                    <v-text-field
                                        label="Username"
                                        name="username"
                                        
                                        prepend-icon="mdi-account"
                                        hint="Dororo hentai"
                                        type="text"
                                        maxlength="25"
                                        counter
                                        v-model="form.username"
                                        :rules="[rules.required, rules.min, rules.max]"
                                    >
                                    </v-text-field>
                                    <v-text-field
                                        label="Name"
                                        name="name"
                                        
                                        prepend-icon="mdi-form-textbox"
                                        type="text"
                                        maxlength="25"
                                        counter
                                        v-model="form.name"
                                        :rules="[rules.required, rules.min]"
                                    >
                                    </v-text-field>
                                    <v-text-field
                                        id="password"
                                        label="Password"
                                        name="password"
                                        
                                        maxlength="25"
                                        counter
                                        prepend-icon="mdi-lock"
                                        v-model="form.password"
                                        type="password"
                                        :rules="[rules.required, rules.min]"
                                    ></v-text-field>
                                    <v-text-field
                                        id="passwordconfirm"
                                        label="Confirm Password"
                                        name="passwordconfirm"
                                        
                                        maxlength="12"
                                        counter
                                        prepend-icon="mdi-lock"
                                        v-model="form.otherpass"
                                        type="password"
                                        :rules="[rules.required, rules.min, (form.otherpass === form.password) || 'Password must match']"
                                    ></v-text-field>

                                    <v-btn color="secondary" @click="onRegister">Register</v-btn>

                                </v-form>
                            </v-card-text>
                        </v-card>

                    </v-col>
                </v-row>
            </v-container>
        </v-main>



    </v-app>
</template>

<script>

export default {
    name: "Register",
    data(){
        return {
            form : {
              username : "",
              name: "",
              password : "",
              otherpass: ""
            },
            rules: {
              required: value => !!value || 'Required.',
              min: val => val.length >= 8 || 'Min 8 characters'

              
            }
            
        }
    },
    
    methods : {
        onRegister(e){
            e.preventDefault()
            console.log("registering")
            const form = this.form;
            if (0<form.username.length && form.username.length<=12 && 0<form.password.length  && form.password.length<=12 && form.password===form.otherpass){
              this.$axios.post(this.$API_URL+"/register", {
                          ...form
                      })
              .then(response => {
                  localStorage.setItem('jwt',response.data.token)
                  if (localStorage.getItem('jwt') !=null){
                    
                    this.$router.push('Home')
                  
                }
              })
              .catch(e => console.log(e))
            }

            
            
        }
    }
}
</script>