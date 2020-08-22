<template>
    <div id="page">
        <h1 id="question">{{ questions[currentQuestion].question }}</h1>

        <div id="answer_wrapper">
            <ul>
                <li v-for="answer in questions[currentQuestion].answers" v-bind:key="answer">
                    <button class="answer_button">{{ answer }}</button>
                </li>
            </ul>
            
        </div>
        
    </div>
</template>

<script>
export default {
    name: 'Quiz',
    data() {
        return {
            currentQuestion: 0,
            correct: 0,
            maxQuestions: 3,
            questions: [
                {
                    question: "What is 2+5?",
                    answers: [
                        "4", "5", "6", "7"
                    ],
                    correctAnswer: "7"
                },

                {
                    question: "What is ln(e)?",
                    answers: [
                        "0", "1", "e", "3"
                    ],
                    correctAnswer: "1"
                },

                {
                    question: "What is 30*5?",
                    answers: [
                        "140", "150", "160", "170"
                    ],
                    correctAnswer: "150"
                },

            ]
        }

    }
}
</script>

<style scoped>
#page {
    width: 75vw;
    background-color: #eee;
    margin: 30px auto;
    font-family: Helvetica, sans-serif;
}

#question {
    text-align: center;
    font-size: 40px;
}

#answer_wrapper ul {
    
}

.answer_button {
    width: 30vw;
    font-size: 20px;

}

</style>