import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getPrayers = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/prayers`).then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// const getSinglePrayer = (id) => new Promise((resolve, reject) => {
//   fetch(`${dbUrl}/prayers/${id}`).then((response) => response.json())
//     .then((data) => {
//       resolve({
//         id: data.id,
//         userId: data.user_id,
//         content: data.content,
//         createdOn: data.pub_date,
//       });
//     }).catch((error) => reject(error));
// });

const getSinglePrayer = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/prayers/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createPrayer = (prayerObj, user) => new Promise((resolve, reject) => {
  const prayer = {
    content: prayerObj.content,
    pub_date: prayerObj.pub_date,
    uid: user.id,
  };
  fetch(`${dbUrl}/prayers`, {
    method: 'POST',
    body: JSON.stringify(prayer),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const deletePrayer = (prayerId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/prayers/${prayerId}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

const updatePrayer = (user, prayer, prayerId) => new Promise((resolve, reject) => {
  const prayerObj = {
    content: prayer.content,
    pub_date: prayer.pub_date,
    uid: user.id,
  };
  fetch(`${dbUrl}/prayers/${prayerId}`, {
    method: 'PUT',
    body: JSON.stringify(prayerObj),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  getPrayers, getSinglePrayer, createPrayer, deletePrayer, updatePrayer,
};
