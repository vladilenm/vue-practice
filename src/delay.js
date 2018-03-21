export function delay (ms = 1000, data = {}) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data)
    }, ms)
  })
}
