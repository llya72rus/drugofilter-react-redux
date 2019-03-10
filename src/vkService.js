const VK = window.VK;
const auth = () => {
  return new Promise((resolve, reject) => {
    VK.Auth.login((data) => {
      if (data.session) {
        resolve();
      } else {
        reject(new Error('Не удалось авторизоваться'));
      }
    }, 2);
  });
};

const getFriendsFromVK = () => {
  VK.init({
    apiId: 6762284
  });

  const callAPI = (method, params) => {
    params.v = '5.76';

    return new Promise((resolve, reject) => {
      VK.api(method, params, (data) => {
        if (data.error) {
          reject(data.error);
        } else {
          resolve(data.response);
        }
      });
    });
  };

  return auth()
    .then(() => {
      return callAPI('friends.get', {
        fields: 'photo_50'
      });
    })
    .then((friends) => {
      return friends.items;
    });
};

export default getFriendsFromVK;
