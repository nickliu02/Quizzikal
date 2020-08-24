<template>
    <v-app>
        <div id="header">
            <v-card width="700" class="mx-auto"> 
                
                <v-card-text class="font-weight-normal">    
                    <h1 style="font-weight: normal">{{ `Question ${numQuestion} of 6` }}</h1>
                </v-card-text>

                <v-card-text id="time" v-if="ongoing">
                    <h2>{{ Math.ceil(remainingTime / 1000) + "s" }}</h2>
                </v-card-text>

                <v-icon id="icon">{{ icons[category] }}</v-icon>

                <v-progress-linear
                    v-if="ongoing"
                    color="green"
                    v-bind:value="remainingTime / maxTime * 100"
                    max="100"
                    striped
                ></v-progress-linear>
                
            </v-card>
         </div>

        <div id="quiz" v-if="ongoing">
            <v-card width="700" class="mx-auto" v-bind:color="colors[category]"> 
                <div id="question">
                    <v-card-text class="font-weight-bold">
                        <h3 style="font-weight: normal">{{ question }}</h3>
                    </v-card-text>
                </div>
                

                <v-card-actions>
                    <div id="card">
                        <ul>
                            <li v-for="(choice, i) in choices" v-bind:key="i"
                                @click="selectOption(choice)"
                            >
                                <v-btn width="320" height="100" v-bind:color="btnColors[getColor(choice)]">
                                    <h4>{{ choice }}</h4>
                                </v-btn>
                            </li>
                        </ul>
                    </div>
                
                </v-card-actions>
            </v-card>
        </div>

        <div id="results" v-if="!ongoing">
            <v-card width="700" class="mx-auto" v-bind:color="colors[category]"> 
                <v-card-text class="font-weight-bold">
                    <h1 style="font-weight: normal; text-align: center;">Results</h1>
                </v-card-text>

                <v-card-text class="font-weight-bold">
                    <h1 style="font-weight: normal; font-size:70px; text-align:center;">{{ `${this.correctAnswers}/6` }}</h1>
                </v-card-text>

                <v-card-actions>
                    <div id="home">   
                        <v-btn x-large class="text-xs-center"
                        :to="'/play'"
                        >
                            Home
                        </v-btn>
                    </div>
                    
                
                </v-card-actions>
            </v-card>
        </div>
        
        
    </v-app>
</template>

<script>
import { mdiDna, mdiFlask, mdiMathIntegralBox, mdiBookOpenBlankVariant, mdiAtom, mdiPillar, mdiBook  } from '@mdi/js';


export default {
    name: "Quiz",
    data() {
        return {
            numQuestion: 1,
            question: "",
            choices: [],
            category: "history",

            icons: {
                'BIOLOGY': mdiDna,
                'CHEMISTRY': mdiFlask,
                'PHYSICS': mdiAtom,
                'MATH': mdiMathIntegralBox,
                'ENGLISH': mdiBookOpenBlankVariant,
                'HISTORY': mdiPillar

            },

            colors: {
                'BIOLOGY': '#26890c',
                'CHEMISTRY': '#1368ce',
                'PHYSICS': '#46178f',
                'MATH': '#25076b',
                'ENGLISH': '#eea500',
                'HISTORY': '#572817',
                '' : '#fff'
            },

            btnColors: {
                'normal': '#fff',
                'red': 'red',
                'green': 'green'
            },

            correct: "",
            selected: "",
            ongoing: true,
            correctAnswers: 0,
            remainingTime: 150000,
            maxTime: 150000,
            timer: null,
            id: -1,
        }
        
    },

    methods: {
        async getQuestion() {
            console.log("requesting questions")
            console.log(localStorage.getItem('jwt'))
            this.$axios.post(this.$API_URL+"/quiz/next",

                {
                    username: localStorage.getItem('username'),
                    quiz_id: this.id
                      
                },
                {
                    headers: {'x-access-token': localStorage.getItem('jwt') }

                },
                
            )
            .then((result) => {
                this.question = result.data.text;
                this.choices = result.data.choices;
                this.category = result.data.catagory;
            }).catch(error => console.log(error));
        },

        async getAnswer() {
            
        },

        
        async selectOption(choice) {
            if (this.selected==="") {
                this.selected = choice;

                this.$axios.post(this.$API_URL+"/quiz/submit", 
                {
                    quiz_id: this.id, 
                    username: localStorage.getItem('username'),
                    answer: this.selected
                },
                {
                    headers: {
                    'x-access-token': localStorage.getItem('jwt')
                }},
            )
            .then((result) => {
                console.log("gtethoiethoith"+result.data.answer)
                 this.correct = result.data.answer;
                    console.log(result.data.answer+"daniel")
        
                    clearInterval(this.timer);
                    this.remainingTime = this.maxTime;

                    setTimeout(() => { 
                        this.selected = ""; 
                        if (this.numQuestion < 6) {
                            this.numQuestion++;
                            this.startTimer();
                        }
                        else {
                            this.goToResultsScreen();
                        }
                    }, 2000)
            }).catch(error => console.log(error));
            
              
                
                
                /*setTimeout(() => { 
                        this.selected = ""; 
                        if (this.numQuestion < 6) {
                            this.numQuestion++;
                            this.startTimer();
                        }
                        else {
                            this.goToResultsScreen();
                            this.category = '';
                            
                        }
                    }, 1000   
                )*/
                
            }
            
        },

        goToResultsScreen() {
            this.ongoing = false;
        },

        getColor(choice) {
            //console.log(choice, this.correct, this.selected)
            if (choice===this.correct && this.selected.length > 0) {
                return 'green';
            }
            else if (choice===this.selected || this.selected==='out of time') {
                return 'red';
            }
            return 'normal';
        },

        startTimer() {
            this.remainingTime = this.maxTime;
            
            this.timer = setInterval(() => this.decrementTime(), 100);
        },

        decrementTime() {
            
            if (this.remainingTime >= 100) {
                this.remainingTime -= 100;
                
            }
            else {
                this.selectOption('out of time');
            }
        },
    },

    created() {
        this.id = this.$route.params.id;
        this.numQuestion = this.$route.params.numAnswered-(-1);
    },

    mounted() {
        
        this.startTimer();
        this.getQuestion();
    }
    
}
</script>

<style scoped>
#card ul {
    list-style-type: none;
    padding: 0;
    text-align: center;
}

#card li {
    display: inline-block;
    margin: 10px;
}

#header {
    margin: 20px;
}

h1 {
    color: black
}

h3 {
    color: white
}

#icon {
    position: absolute;
    right: 0;
    top: 0;
    margin-top: 14px;
    color: black;
    width: 50px;

    
}

#time {
    position: absolute;
    right: 0;
    top: 0;
    text-align: right;
    margin-right: 30px;
}

#home {
    text-align: center;
    margin: 10px auto;
}

#question {
    height: 130px
}

</style>