import http from './http-common';

const ProvincesService = {
  get: () => new Promise((resolve, reject) => {
    http
      .get('/support/provinces')
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => (error.response ? reject(error.response.data) : reject(Error('Unexpected error on api'))));
  }),
};

const AreasService = {
  get: () => new Promise((resolve, reject) => {
    http
      .get('/support/areas')
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => (error.response ? reject(error.response.data) : reject(Error('Unexpected error on api'))));
  }),
};

const ProvidersService = {
  get: () => new Promise((resolve, reject) => {
    http
      .get('/support/providers')
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => (error.response ? reject(error.response.data) : reject(Error('Unexpected error on api'))));
  }),
};

const SuppliesService = {
  get: () => new Promise((resolve, reject) => {
    http
      .get('/support/supplies')
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => (error.response ? reject(error.response.data) : reject(Error('Unexpected error on api'))));
  }),
};

const InstitutionsService = {
  get: () => new Promise((resolve, reject) => {
    http
      .get('/support/institutions')
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => (error.response ? reject(error.response.data) : reject(Error('Unexpected error on api'))));
  }),
};

const TownsService = {
  get: (provinceId) => new Promise((resolve, reject) => {
    http
      .get(`/support/provinces/${provinceId}/towns`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => (error.response ? reject(error.response.data) : reject(Error('Unexpected error on api'))));
  }),
};

const SuppliesRequestService = {
  get: (token) => new Promise((resolve, reject) => {
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
      .catch((error) => (error.response ? reject(error.response.data) : reject(Error('Unexpected error on api'))));
  }),

  post: (supplyRequest, token) => new Promise((resolve, reject) => {
    const customConfig = http.interceptors.request.use((config) => {
      const updatedConfgi = config;
      updatedConfgi.headers.post.Authorization = `Bearer ${token}`;
      return updatedConfgi;
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
      .catch((error) => (error.response ? reject(error.response.data) : reject(Error('Unexpected error on api'))));
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
      .catch((error) => (error.response ? reject(error.response.data) : reject(Error('Unexpected error on api'))));
  }),
};

const AdminSuppliesRequestService = {
  get: (token) => new Promise((resolve, reject) => {
    const customConfig = http.interceptors.request.use((config) => {
      const updatedConfig = config;
      updatedConfig.headers.get.Authorization = `Bearer ${token}`;
      return updatedConfig;
    });

    http
      .get('/admin/request-supplies', customConfig)
      .then((response) => resolve(response.data))
      .catch((error) => (error.response ? reject(error.response.data) : reject(Error('Unexpected error on api'))));
  }),

  reject: (id, reason, token) => new Promise((resolve, reject) => {
    const customConfig = http.interceptors.request.use((config) => {
      const updatedConfig = config;
      updatedConfig.put.Authorization = `Bearer ${token}`;
      return updatedConfig;
    });
    http
      .put(`/admin/request-supplies/${id}/reject`, { reason }, customConfig)
      .then((response) => resolve(response.data))
      .catch((error) => (error.response ? reject(error.response.data) : reject(Error('Unexpected error on api'))));
  }),

  approve: (id, providerId, token) => new Promise((resolve, reject) => {
    const customConfig = http.interceptors.request.use((config) => {
      const updatedConfig = config;
      updatedConfig.headers.put.Authorization = `Bearer ${token}`;
      return updatedConfig;
    });
    http
      .put(`/admin/request-supplies/${id}/approve`, { providerId }, customConfig)
      .then((response) => resolve(response.data))
      .catch((error) => (error.response ? reject(error.response.data) : reject(Error('Unexpected error on api'))));
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
