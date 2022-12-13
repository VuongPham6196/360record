export const getAuthSuccess = (userData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        userData.email === 'phamnhuvuong96@gmail.com' &&
        userData.password === '12345678'
      ) {
        resolve(true);
      } else {
        reject(false);
      }
    }, 5000);
  });
};
