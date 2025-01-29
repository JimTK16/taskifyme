let apiRoot = ''

console.log('process.env.BUILD_MODE', process.env.BUILD_MODE)

if (process.env.BUILD_MODE === 'dev') {
  console.log('dev mode')
  apiRoot = 'http://localhost:8017'
}

if (process.env.BUILD_MODE === 'production') {
  apiRoot = 'http://localhost:8017'
}

export const API_ROOT = apiRoot
