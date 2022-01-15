const db = require('../db')
const fs = require('fs')
jest.mock('fs')


describe('db', () => {
  it('can read', async () => {
    const testList = [{title: 'xxx', done: true}]
    fs.setReadMock('/xxx', null, JSON.stringify(testList))
    const list = await db.read('/xxx')
    expect(list).toStrictEqual(testList)
  })

  it('can write', async () => {
    let fakeFile
    fs.setWriteFileMock('/yyy', (path, data, callback) => {
      fakeFile = data
      callback(null)
    })
    const testList2 = [{title: 'yyy', done: false}]
    await db.write(testList2, '/yyy')
    expect(fakeFile).toBe(JSON.stringify(testList2) + '\n')
  });
})
