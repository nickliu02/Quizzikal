<template>
    <v-app>
        <div id="header">
            <v-card width="700" class="mx-auto" v-bind:color="colors[category]"> 
                
                <v-card-text class="font-weight-normal">    
                    <h1 style="font-weight: normal">{{ `Question ${numQuestion} of 6` }}</h1>
                </v-card-text>

            </v-card>
         </div>

        <div>
            <v-card width="700" class="mx-auto" v-bind:color="colors[category]"> 
                <div id="question">
                    <v-card-text class="font-weight-bold">
                        <h3 style="font-weight: normal">{{ question }}</h3>
                    </v-card-text>
                </div>
                

                <v-card-actions>
                    <div id="card">
                        <ul>
                            <li v-for="choice in choices" v-bind:key="choice">
                                <v-btn width="320" height="100">
                                    <h4>{{ choice }}</h4>
                                </v-btn>
                            </li>
                        </ul>
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
                'history': '#572817'
            }
        }
        
    },
    
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

h1, h3 {
    color: white
}

</style>