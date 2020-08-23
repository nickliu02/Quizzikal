export interface Quiz {
    quiz_id: number,
    challenger_username: string,
    challengee_username: string,
    challenger_results: string,
    challengee_results: string,
    question_ids: string,
    catagories: string
} 

export interface Question {
    question_id: number,
    text: string,
    correct: string,
    wrong: string,
    catagory: string
}