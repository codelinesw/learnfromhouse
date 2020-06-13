const configureHearder = (data) => {
  return {
      method: 'post',
      // headers: {
      //   'Accept': 'application/json, text/plain, */*',
      //   'Content-Type': 'application/json'
      // },
      body: data,
  }
};

const configureHeardertoImage = (data) => {
    return {
      method: 'post',
      body: data,
    }
};

const services = {
	requestGet: (URL,data_) => {
		return fetch(URL,configureHearder(data_))
      .then(response => response.json())
	},

  requestSet: (URL,data_) => {
    return fetch(URL,configureHearder(data_))
      .then(response => response.text())
  },

  requestUpload: (URL,data_) => {
    return fetch(URL,configureHeardertoImage(data_))
      .then(response => response.text())
  },

};
export default services;
