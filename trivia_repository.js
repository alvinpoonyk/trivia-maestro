import { fetchTriviaCategories, fetchTrivias } from "./api_handler.js";

export const getTriviaCategories = async () => {
    let triviaCategories = await fetchTriviaCategories();
    if (triviaCategories === undefined) {
        let errorMessage = 'Could not get any results from the remote server';
        console.error(`TriviaRepository(getTriviaCategories): ${errorMessage}`);
        return {status : 'failure', message: errorMessage}
    }
    return {status : 'success', categories: [...triviaCategories]}
};

export const getTrivias = async (numberOfQuestions, id) => {
    let trivias = await fetchTrivias(numberOfQuestions, id);
    if (trivias === undefined) {
        let errorMessage = 'Could not get any results from the remote server';
        console.error(`TriviaRepository(getTrivias): ${errorMessage}`);
        return {status : 'failure', message: errorMessage}
    }
    return {...trivias, status: 'success'};
}
