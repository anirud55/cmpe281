const axios = require("axios");

axios.interceptors.response.use(null, (error) => {
  console.log(error);
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    toast.error("Something went wrong");
  }
  return Promise.reject(error);
});

// function setJwt(jwt) {
//   axios.defaults.headers.common["x-auth-token"] = jwt;
// }

module.exports.get = axios.get;
module.exports.post = axios.post;
module.exports.put = axios.put;
module.exports.delete = axios.delete;
// export default {
//   get: axios.get,
//   post: axios.post,
//   put: axios.put,
//   delete: axios.delete,
//   setJwt,
// };
