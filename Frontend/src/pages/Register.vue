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
                                        v-model="username"
                                    >
                                    </v-text-field>
                                    <v-text-field
                                        label="Name"
                                        name="name"
                                        prepend-icon="mdi-form-textbox"
                                        type="text"
                                        v-model="name"
                                    >
                                    </v-text-field>
                                    <v-text-field
                                        id="password"
                                        label="Password"
                                        name="password"
                                        
                                        prepend-icon="mdi-lock"
                                        v-model="password"
                                        type="password"
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
            username : "",
            name: "",
            password : ""
        }
    },
    methods : {
        onRegister(e){
            e.preventDefault()
            console.log("registered")
            localStorage.setItem('jwt',"placeholder token")
        }
    }
}
</script>