import http from './http-common';

const ProvincesService = {
  get: () => new Promise((resolve, reject) => {
    http
      .get('/support/provinces')
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => (error.response ? reject(error.response.data) : reject({})));
  }),
};

const AreasService = {
  get: () => new Promise((resolve, reject) => {
    http
      .get('/support/areas')
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => (error.response ? reject(error.response.data) : reject({})));
  }),
};

const ProvidersService = {
  get: () => new Promise((resolve, reject) => {
    http
      .get('/support/providers')
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => (error.response ? reject(error.response.data) : reject({})));
  }),
};

const SuppliesService = {
  get: () => new Promise((resolve, reject) => {
    http
      .get('/support/supplies')
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => (error.response ? reject(error.response.data) : reject({})));
  }),
};

const InstitutionsService = {
  get: () => new Promise((resolve, reject) => {
    http
      .get('/support/institutions')
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => (error.response ? reject(error.response.data) : reject({})));
  }),
};

const TownsService = {
  get: (provinceId) => new Promise((resolve, reject) => {
    http
      .get(`/support/provinces/${provinceId}/towns`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => (error.response ? reject(error.response.data) : reject({})));
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
      .catch((error) => (error.response ? reject(error.response.data) : reject({})));
  }),

  post: (supplyRequest, token) => new Promise((resolve, reject) => {
    const customConfig = http.interceptors.request.use((config) => {
      config.headers.post.Authorization = `Bearer ${token}`;
      return config;
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
      .catch((error) => (error.response ? reject(error.response.data) : reject({})));
  }),

  delete: (supplyRequestId, token) => new Promise((resolve, reject) => {
    const customConfig = http.interceptors.request.use((config) => {
      config.headers.delete.Authorization = `Bearer ${token}`;
      return config;
    });

    http
      .delete(`/request-supplies/${supplyRequestId}`, customConfig)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => (error.response ? reject(error.response.data) : reject({})));
  }),
};

const AdminSuppliesRequestService = {
  get: (token) => new Promise((resolve, reject) => {
    const customConfig = http.interceptors.request.use((config) => {
      config.headers.get.Authorization = `Bearer ${token}`;
      return config;
    });

    http
      .get('/admin/request-supplies', customConfig)
      .then((response) => resolve(response.data))
      .catch((error) => (error.response ? reject(error.response.data) : reject({})));
  }),

  reject: (id, reason, token) => new Promise((resolve, reject) => {
    const customConfig = http.interceptors.request.use((config) => {
      config.headers.put.Authorization = `Bearer ${token}`;
      return config;
    });
    http
      .put(`/admin/request-supplies/${id}/reject`, { reason }, customConfig)
      .then((response) => resolve(response.data))
      .catch((error) => (error.response ? reject(error.response.data) : reject({})));
  }),

  approve: (id, providerId, token) => new Promise((resolve, reject) => {
    const customConfig = http.interceptors.request.use((config) => {
      config.headers.put.Authorization = `Bearer ${token}`;
      return config;
    });
    http
      .put(`/admin/request-supplies/${id}/approve`, { providerId }, customConfig)
      .then((response) => resolve(response.data))
      .catch((error) => (error.response ? reject(error.response.data) : reject({})));
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
