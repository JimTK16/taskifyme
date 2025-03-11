let apiRoot = ''

if (process.env.BUILD_MODE === 'dev') {
  apiRoot = 'http://localhost:8017'
}

if (process.env.BUILD_MODE === 'production') {
  apiRoot = 'http://localhost:8017'
}

export const API_ROOT = apiRoot
export const MAX_LABEL_NAME_LENGTH = 30
