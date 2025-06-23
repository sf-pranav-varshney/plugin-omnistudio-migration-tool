import { getNewportUrl } from "c/salesforceUtils";
let ndsPromise;
function getCustomNewportUrl() {
  if (ndsPromise) {
    return ndsPromise;
  }
  ndsPromise = new Promise(resolve => {
    getNewportUrl().then(url => {
      resolve(url);
    });
  });
  return ndsPromise;
}

export default getCustomNewportUrl;