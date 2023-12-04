import axios from "axios";
import fileDownload from "js-file-download";

const BASE_URL = "https://deposito-digrutt-express-production.up.railway.app/api";

export const sendFile = (token, url, nameFile) => {
  axios({
    url: `${BASE_URL}${url}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "GET",
    responseType: "blob",
  }).then((res) => {
    fileDownload(res.data, nameFile);
  });
};
