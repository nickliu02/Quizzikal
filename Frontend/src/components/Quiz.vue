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
            question: "The 25 integers from -10 to 14, inclusive, can be arranged to form a 5-by-5 square in which the sum of the numbers in each row, the sum of the numbers in each column, and the sum of the numbers along each of the main diagonals are all the same. What is the value of this common sum?",
            choices: ["2", "5", "10", "25"],
            category: "history",

            icons: {
                'biology': mdiDna,
                'chemistry': mdiFlask,
                'physics': mdiAtom,
                'math': mdiMathIntegralBox,
                'english': mdiBookOpenBlankVariant,
                'history': mdiPillar

            },

            colors: {
                'biology': '#26890c',
                'chemistry': '#1368ce',
                'physics': '#46178f',
                'math': '#25076b',
                'english': '#eea500',
                'history': '#572817',
                '' : '#fff'
            },

            btnColors: {
                'normal': '#fff',
                'red': 'red',
                'green': 'green'
            },

            correct: "10",
            selected: "",
            ongoing: true,
            correctAnswers: 0,
            remainingTime: 5000,
            maxTime: 5000,
            timer: null
        }
        
    },

    methods: {
        async getQuestion() {
            this.$axios.post(this.$API_URL+"/question", {
                headers: {
                    "x-access-token" : "",
                }
            })
            .then((result) => {
                this.question = result.question;
                this.choices = result.choices;
                this.category = result.category;
            }).catch(error => console.log(error));
        },

        async getAnswer() {
            this.$axios.post(this.$API_URL+"/answer", {
                headers: {
                    "x-access-token" : "",
                }
            })
            .then((result) => {
                result.answer;
            }).catch(error => console.log(error));
        },

        async selectOption(choice) {
            if (this.selected==="") {
                this.selected = choice;

                /*this.correct = await this.getAnswer()
                .then((answer) => {
                    this.correct = answer;
                }).catch(error => console.log(error))
                .finally(
                    setTimeout(() => { 
                        this.selected = ""; 
                        if (this.numQuestion < 6) {
                            this.numQuestion++;
                            this.startTimer();
                        }
                        else {
                            this.goToResultsScreen();
                        }

                    }, 2000));*/

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
                            this.category = '';
                            
                        }
                    }, 1000   
                )
                
            }
            
        },

        goToResultsScreen() {
            this.ongoing = false;
        },

        getColor(choice) {
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

    mounted() {
        this.startTimer();
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

</style>