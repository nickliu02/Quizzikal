import { Catagory } from "./catagories";

//quiz types
export interface QuizCreateRequest { 
    challenger_username: string, 
    challengee_username: string, 
    catagories: Catagory[] 
}
