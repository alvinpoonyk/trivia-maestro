import axios from 'axios';
import { decode } from 'html-entities';

// const axios = require('axios');
// const decode = require('html-entities').decode;

export const fetchTriviaCategories = async () => {
    return await axios.get('https://opentdb.com/api_category.php', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    }).then((res) => {
        return res.data.trivia_categories;
    }).catch((error) => {
        console.error('getTriviaCategories: An error has occurred.');
        console.error(error.message);
    });
};

export const fetchTrivias = async (numberOfQuestions, id) => {
    return await axios.get(`https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    }).then((res) => {
        let response_code = res.data.response_code;
        if (response_code === 0) {
            let results = res.data.results;
            return removeHTMLEntities(results);
        }
    }).catch((error) => {
        console.error('getTriviaQuestions: An error has occurred.');
        console.error(error.message);
    });
}

const removeHTMLEntities = (results) => results.map((result) => {
    return {
        ...result,
        question: decode(result.question),
        correct_answer: decode(result.correct_answer),
        incorrect_answers: result.incorrect_answers.map((incorrect_answer) => decode(incorrect_answer))
    }
});
