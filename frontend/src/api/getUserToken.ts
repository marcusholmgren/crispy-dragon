import { Auth } from 'aws-amplify';

export async function getUserToken() {
  return (await Auth.currentSession()).getIdToken().getJwtToken();
}
