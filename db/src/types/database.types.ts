
export interface User {
    id: number,
    username: string,
    password: string
}


export interface Question {
    id: number,
    question_statement: string,
    right_answer: string,
}

export interface Quiz {
    id: number,
    challenger_id: number,
    challengee_id: number,
    challenger_finished: number,
    challengee_finished: number,
    question_pool,
    catagories,
}
