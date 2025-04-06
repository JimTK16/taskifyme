let apiRoot = ''

if (process.env.BUILD_MODE === 'dev') {
  apiRoot = 'http://localhost:8017'
}

if (process.env.BUILD_MODE === 'production') {
  // apiRoot = 'https://taskify-backend-v89k.onrender.com'
  apiRoot = 'https://158.179.25.168:3000'
}

export const API_ROOT = apiRoot
export const MAX_LABEL_NAME_LENGTH = 30
