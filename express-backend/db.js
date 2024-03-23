import postgres from 'postgres'

export const sql = postgres({
    host: 'localhost',
    port: 5433,
    db: 'test',
    username: 'postgres',
    password: '1234'
})
