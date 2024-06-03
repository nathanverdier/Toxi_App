import { Dispatch } from 'redux';
import { setToken, clearToken } from '../actions/TokenAction';

let _urlToken : string = "https://dev-3ja73wpfp1j6uzed.us.auth0.com/oauth/token"

export const fetchToken = () => async (dispatch: Dispatch) => {
  try {
    const credentials = {
      client_id: "eAf8z4vS3B47LGatTn34q38IRdJrNNvc",
      client_secret: "n_oChtKZlpXG60n-N1V4LwXkaFYbvRGoWT-4Lsk8nwPo3aXIEONevoHUa8uMEN4g",
      audience: "https://toxiapi/",
      grant_type: "client_credentials"
    };

    const response = await fetch(_urlToken, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    dispatch(setToken(data.token));
  } catch (error) {
    console.error('Failed to fetch token:', error);
  }
};

export const logout = () => (dispatch: Dispatch) => {
  dispatch(clearToken());
};