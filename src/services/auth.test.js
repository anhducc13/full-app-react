import { authService } from '../services';
import mockAxios from 'jest-mock-axios';

describe('Register axios test', () => {
  it('call register and pass valid params', () => {
    const thenFn = jest.fn();
    const catchFn = jest.fn();
    const payload = {
      'username': 'anhducc13',
      'email': 'trantienduc10@gmail.com',
      'password': 'ANhducc13'
    }
    authService.register(payload)
      .then(thenFn)
      .catch(catchFn)
    expect(mockAxios.post).toHaveBeenCalled();
    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(mockAxios.post).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/auth/register`, payload);
  });
});