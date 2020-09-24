import http from './http-common';

const ProvincesService = {
  get: () => new Promise((resolve, reject) => {
    http
      .get('/support/provinces')
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => (error.response ? reject(error.response.data) : reject(error)));
  }),
};

const AreasService = {
  get: () => new Promise((resolve, reject) => {
    http
      .get('/support/areas')
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => (error.response ? reject(error.response.data) : reject(error)));
  }),
};

const ProvidersService = {
  get: () => new Promise((resolve, reject) => {
    http
      .get('/support/providers')
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => (error.response ? reject(error.response.data) : reject(error)));
  }),
};

const SuppliesService = {
  get: () => new Promise((resolve, reject) => {
    http
      .get('/support/supplies')
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => (error.response ? reject(error.response.data) : reject(error)));
  }),
};

const InstitutionsService = {
  get: () => new Promise((resolve, reject) => {
    http
      .get('/support/institutions')
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => (error.response ? reject(error.response.data) : reject(error)));
  }),
};

const TownsService = {
  get: provinceId => new Promise((resolve, reject) => {
    http
      .get(`/support/provinces/${provinceId}?include=towns`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => (error.response ? reject(error.response.data) : reject(error)));
  }),
};

const SuppliesRequestService = {
  get: token => new Promise((resolve, reject) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    http
      .get('/request-supplies', config)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => (error.response ? reject(error.response.data) : reject(error)));
  }),

  post: (supplyRequest, token) => new Promise((resolve, reject) => {
    const customConfig = http.interceptors.request.use((config) => {
      const updatedConfig = config;
      updatedConfig.headers.post.Authorization = `Bearer ${token}`;
      return updatedConfig;
    });

    http
      .post(
        '/request-supplies',
        {
          areaId: supplyRequest.area.id,
          supplyId: supplyRequest.supply.id,
          amount: supplyRequest.amount,
        },
        customConfig,
      )
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => (error.response ? reject(error.response.data) : reject(error)));
  }),

  delete: (supplyRequestId, token) => new Promise((resolve, reject) => {
    const customConfig = http.interceptors.request.use((config) => {
      const updatedConfig = config;
      updatedConfig.headers.delete.Authorization = `Bearer ${token}`;
      return updatedConfig;
    });

    http
      .delete(`/request-supplies/${supplyRequestId}`, customConfig)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => (error.response ? reject(error.response.data) : reject(error)));
  }),
};

const AdminSuppliesRequestService = {
  get: token => new Promise((resolve, reject) => {
    const customConfig = http.interceptors.request.use((config) => {
      const updatedConfig = config;
      updatedConfig.headers.get.Authorization = `Bearer ${token}`;
      return updatedConfig;
    });

    http
      .get('/request-supplies', customConfig)
      .then(response => resolve(response.data))
      .catch(error => (error.response ? reject(error.response.data) : reject(error)));
  }),

  reject: (id, reason, token) => new Promise((resolve, reject) => {
    const customConfig = http.interceptors.request.use((config) => {
      const updatedConfig = config;
      updatedConfig.headers.put.Authorization = `Bearer ${token}`;
      return updatedConfig;
    });
    http
      .patch(`/request-supplies/${id}`, { reason, status: 'Rejected' }, customConfig)
      .then(response => resolve(response.data))
      .catch(error => (error.response ? reject(error.response.data) : reject(error)));
  }),

  approve: (id, providerId, token) => new Promise((resolve, reject) => {
    const customConfig = http.interceptors.request.use((config) => {
      const updatedConfig = config;
      updatedConfig.headers.put.Authorization = `Bearer ${token}`;
      return updatedConfig;
    });
    http
      .put(`/request-supplies/${id}`, { providerId, status: 'Approved' }, customConfig)
      .then(response => resolve(response.data))
      .catch(error => (error.response ? reject(error.response.data) : reject(error)));
  }),
};

export {
  AdminSuppliesRequestService,
  AreasService,
  InstitutionsService,
  ProvidersService,
  ProvincesService,
  SuppliesRequestService,
  SuppliesService,
  TownsService,
};
