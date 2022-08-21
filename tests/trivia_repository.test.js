import {jest} from '@jest/globals';
import axios from "axios";
import {getTriviaCategories} from "../trivia_repository";

jest.mock("axios");

describe('getTriviaCategories Tests', () => {

    describe('getTriviaCategories Success Tests', () => {

        const fixture  = {"trivia_categories" : [{"id": 9,"name": "General Knowledge"}, {"id": 10,"name": "Entertainment: Books"}]}


        it('should return a success status', async () => {
            axios.get.mockResolvedValue({"data": fixture})
            const results = await getTriviaCategories()
            expect(results.status).toEqual('success')
        })

        it('should return the correct number of trivia categories', async () => {
            axios.get.mockResolvedValue({"data": fixture})
            const results = await getTriviaCategories()
            expect(results.categories.length).toEqual(fixture.trivia_categories.length)
        })

        it('should return the correct id and name of category', async () => {
            axios.get.mockResolvedValue({"data": fixture})
            const results = await getTriviaCategories()
            fixture.trivia_categories.forEach((category) => {
                expect(category.id).toEqual(results.categories.find((resultsCategory) => resultsCategory.id === category.id).id)
                expect(category.name).toEqual(results.categories.find((resultsCategory) => resultsCategory.name === category.name).name)
            })
        })

    })

    describe('getTriviaCategories Failure Tests', () => {
        it('should return a success status', async () => {
            axios.get.mockResolvedValue(() => undefined)
            const results = await getTriviaCategories()
            expect(results.status).toEqual('failure')
        })
    })

})
