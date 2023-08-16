const request = require('supertest')
const app = require('../app')

const URL_BASE = "/api/v1/categories"
const URL_BASE_USERS = "/api/v1/users"

let TOKEN
let categoriId


beforeAll(async () => {
    const user = {
        email: "mario@mail.com",
        password: "123"
    }

    const res = await request(app)
        .post(`${URL_BASE_USERS}/login`)
        .send(user)

    TOKEN = res.body.token
})

test("POST -> 'URL_BASE', should return status code 201 an res.body.name === category.name", async () => {
    const category = {
        name: "Tecno"
    }
    const res = await request(app)
        .post(URL_BASE)
        .send(category)
        .set("Authorization", `Bearer ${TOKEN}`)

    categoriId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(category.name)
})
test("GET -> 'URL_BASE', should return status code 200 an res.body.length === 1", async () => {
    const res = await request(app)
        .get(URL_BASE)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})
test("DELETE -> 'URL_BASE/:id', should return status code 204", async () => {
    const res = await request(app)
        .delete(`${URL_BASE}/${categoriId}`)
        .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status).toBe(204)

})