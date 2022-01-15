const db = require('../db')
const fs = require('fs')
jest.mock('fs')


describe('db', () => {
  it('can read', async () => {
    const testList = [{title: 'xxx', done: true}]
    fs.setMock('/xxx', null, JSON.stringify(testList))
    const list = await db.read('/xxx')
    expect(list).toStrictEqual(testList)
  })
})
