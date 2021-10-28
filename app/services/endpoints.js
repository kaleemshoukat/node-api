const host = process.env.ENV==='DEV' ? process.env.BC_IP_DEV : process.env.BC_IP_PROD
const port = process.env.BC_PORT

const BC_API_URL = `http://${host}:${port}/`
const CLINICAL = 'api/clinical/'
const INSURANCE = 'api/insurance/'
const PHARMA = 'api/pharma/'
const TRIAL = 'api/trial/'
const SUBJECT = 'api/subject/'
  
module.exports = EndPoints = {
  CLINICAL_USER_BY_ID: BC_API_URL + CLINICAL + 'verifyUser/',
  INSURANCE_USER_BY_ID: BC_API_URL + INSURANCE + 'verifyUser/',
  PHARMA_USER_BY_ID: BC_API_URL + PHARMA + 'verifyUser/',
  CLINICAL_TRIAL_BY_ID: BC_API_URL + TRIAL + 'getTrial/',
  CLINICAL_TRIALS_BY_QUERY: BC_API_URL + TRIAL + 'getTrialsByQuery',
  CLINICAL_TRIALS_BY_STATUS: BC_API_URL + TRIAL + 'getTrialsByStatus/',
  CLINICAL_TRIALS: BC_API_URL + TRIAL + 'getAllTrials/',
  ADD_CLINICAL_USER: BC_API_URL + CLINICAL + 'createUser',
  ADD_INSURANCEL_USER: BC_API_URL + INSURANCE + 'createUser',
  ADD_PHARMA_USER: BC_API_URL + PHARMA + 'createUser',
  ADD_CLINICAL_TRIAL: BC_API_URL + TRIAL + 'createTrial',
  UPDATE_CLINICAL_TRIAL_BY_ID: BC_API_URL + TRIAL + 'updateTrial',
  UPDATE_CLINICAL_TRIAL_BY_STATUS: BC_API_URL + TRIAL + 'updateTrialByStatus',

  SUBJECTS_BY_QUERY: BC_API_URL + SUBJECT + 'getSubjectsByQuery',
  SUBJECTS_BY_ID: BC_API_URL + SUBJECT + 'getSubject',
}