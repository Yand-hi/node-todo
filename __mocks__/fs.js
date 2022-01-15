const fs = jest.createMockFromModule('fs');
const _fs = jest.requireActual('fs')

Object.assign(fs, _fs)

const mocks = {}

fs.setMock = (path, error, data) => {
  mocks[path] = [error, data]
}

// 判断 path 是否为 在 mocks 里
// 如果是，拦截 _fs.readFile()
// 如果不是，使用 _fs.readFile()
fs.readFile = (path, options, callback) => {
  if (callback === undefined) {callback = options}
  if (path in mocks) {
    callback(...mocks[path])
  } else {
    _fs.readFile(path, options, callback)

  }
}

module.exports = fs;