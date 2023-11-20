import { Magic } from 'magic-sdk';
const magic = new Magic("pk_live_3EF0745F6C618962");

export const checkUser = async (cb) => {
  const isLoggedIn = await magic.user.isLoggedIn();
  if (isLoggedIn) {
    const user = await magic.user.getMetadata();
    console.log('loggedIN')
    return cb({ isLoggedIn: true, email: user.email, phoneNumber: user.phoneNumber });
  }
  return cb({ isLoggedIn: false });
};

export const loginUser = async (email) => {
  return await magic.auth.loginWithEmailOTP({ email });
};

export const loginUserPhone = async (phoneNumber) => {
  return await magic.auth.loginWithSMS({phoneNumber})//.then(async (res)=>{console.log(await res);return "Hello"}).catch((e)=>{console.log(e);return e;});
}

export const logoutUser = async () => {
  return await magic.user.logout();
};