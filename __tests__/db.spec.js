const db = require('../db')

describe('db', () => {
  it('can read', () => {
    expect(db.read instanceof Function).toBeTruthy()
  })
  it('can write', () => {
    expect(db.write instanceof Function).toBeTruthy()
  })
})
