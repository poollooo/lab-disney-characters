/**
 *  Your code ⬇️
 */
const express = require('express')
const disneyCharacters = require('./disney')
// import { disneyCharacters } from './disney'
const port = 3000

const app = express()

app.use(express.json())

app.get('/', (request, response) => {
    response.send('Hello there !')
})

app.get('/characters', (request, response) => {
    const name = request.query.name
    const film = request.query.films
    if (name && film) {
        console.log(name, film)
        const result = disneyCharacters.filter((oneCharacterAndMovie) => {
            return oneCharacterAndMovie.name.includes(name) && oneCharacterAndMovie.films.includes(film)
        })
        return response.json({
            message: `Found ${result.length} movies with ${name} and ${film}`,
            result,
        })
    } else if (name) {
        const result = disneyCharacters.filter((oneCharacter) => {
            return oneCharacter.name.includes(name)
        })
        return response.json({
            message: `Found ${result.length} character(s)`,
            result,
        })
    } else if (film) {
        const result = disneyCharacters.filter((oneMovie) => {
            return oneMovie.films.includes(film)
        })
        return response.json({
            message: `Found ${result.length} film(s)`,
            result,
        })
    }

    response.json(disneyCharacters)
})

app.get('/characters/:_id', (req, res) => {
    const { _id } = req.params
    const myUniqueCharacter = disneyCharacters.find((character) => {
        return character._id === Number(_id)
    })
    console.log(myUniqueCharacter)
    return res.json(myUniqueCharacter)
})

app.listen(port, () => {
    console.log(`Server is rocking @ http://localhost:${port}`)
})

app.post('/characters', (req, res) => {
    const { name, films } = req.body
    console.log(req.body)
    const _id = disneyCharacters.at(-1)._id + 1
    console.log('disneyCharacters.at(-1))._id is :', _id)
    const characterToCreate = {
        name,
        films,
        _id,
    }
    disneyCharacters.push(characterToCreate)
    res.json({
        "message": `${name} has been created`,
        "createdCharacter": characterToCreate,
    })
})