import axios from "axios";
import fileDownload from "js-file-download";

export const sendFile = (url, nameFile) => {
    axios({
      url,
      method: "GET",
      responseType: "blob",
    }).then((res) => {
      //console.log(res);
      fileDownload(res.data, nameFile);
    });
  };