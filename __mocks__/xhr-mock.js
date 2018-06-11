const xhrMockClass = () => ({
  open: jest.fn(),
  send: jest.fn(),
  onreadystatechange: jest.fn(),
  setRequestHeader: jest.fn(),
  readyState: 4,
  status: 200
})

window.XMLHttpRequest = jest.fn().mockImplementation(xhrMockClass)
