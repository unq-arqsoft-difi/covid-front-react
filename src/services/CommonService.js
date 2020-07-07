import http from './http-common';

class ProvincesService {
  get() {
    return new Promise((resolve, reject) => {
      http
        .get('/support/provinces')
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          if (error.response) {
            reject(error.response.data);
          }
        });
    });
  }
}

class AreasService {
  get() {
    return new Promise((resolve, reject) => {
      http
        .get('/support/areas')
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          if (error.response) {
            reject(error.response.data);
          }
        });
    });
  }
}

class SuppliesService {
  get() {
    return new Promise((resolve, reject) => {
      http
        .get('/support/supplies')
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          if (error.response) {
            reject(error.response.data);
          }
        });
    });
  }
  post(supplyRequest, token) {
    return new Promise((resolve, reject) => {

      const config = http.interceptors.request.use(config => {
        config.headers.post['Authorization'] = `Bearer ${token}`;
        return config;
      });
      
      http
        .post('/request-supplies', {
          areaId: supplyRequest.area.id,
          supplyId: supplyRequest.supply.id,
          amount: supplyRequest.amount,
        },config)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          if (error.response) {
            reject(error.response.data);
          }
        });
    });
  }
}

const provincesService = new ProvincesService();
const suppliesService = new SuppliesService();
const areasService = new AreasService()

export {
  provincesService as ProvincesService,
  suppliesService as SuppliesService,
  areasService as AreasService,
};
