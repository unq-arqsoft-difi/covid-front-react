import http from "./http-common";

const ProvincesService = {
  get: () => {
    return new Promise((resolve, reject) => {
      http
        .get("/support/provinces")
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          if (error.response) {
            return reject(error.response.data);
          }
        });
    });
  },
};

const AreasService = {
  get: () => {
    return new Promise((resolve, reject) => {
      http
        .get("/support/areas")
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          if (error.response) {
            return reject(error.response.data);
          }
        });
    });
  },
};

const ProvidersService = {
  get: () => {
    return new Promise((resolve, reject) => {
      http
        .get("/support/providers")
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          if (error.response) {
            return reject(error.response.data);
          }
        });
    });
  },
};

const SuppliesService = {
  get: () => {
    return new Promise((resolve, reject) => {
      http
        .get("/support/supplies")
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          if (error.response) {
            return reject(error.response.data);
          }
        });
    });
  },
};

const InstitutionsService = {
  get: () => {
    return new Promise((resolve, reject) => {
      http
        .get("/support/institutions")
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          if (error.response) {
            return reject(error.response.data);
          }
        });
    });
  },
};

const TownsService = {
  get: (provinceId) => {
    return new Promise((resolve, reject) => {
      http
        .get(`/support/provinces/${provinceId}/towns`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          if (error.response) {
            return reject(error.response.data);
          }
        });
    });
  },
};

const SuppliesRequestService = {
  get: (token) => {
    return new Promise((resolve, reject) => {
      const config = http.interceptors.request.use((config) => {
        config.headers.get["Authorization"] = `Bearer ${token}`;
        return config;
      });

      http
        .get("/request-supplies", config)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          if (error.response) {
            reject(error.response.data);
          }
        });
    });
  },

  post: (supplyRequest, token) => {
    return new Promise((resolve, reject) => {
      const config = http.interceptors.request.use((config) => {
        config.headers.post["Authorization"] = `Bearer ${token}`;
        return config;
      });

      http
        .post(
          "/request-supplies",
          {
            areaId: supplyRequest.area.id,
            supplyId: supplyRequest.supply.id,
            amount: supplyRequest.amount,
          },
          config
        )
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          if (error.response) {
            return reject(error.response.data);
          }
        });
    });
  },

  delete: (supplyRequestId, token) => {
    return new Promise((resolve, reject) => {
      const config = http.interceptors.request.use((config) => {
        config.headers.delete["Authorization"] = `Bearer ${token}`;
        return config;
      });

      http
        .delete(`/request-supplies/${supplyRequestId}`, config)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          if (error.response) {
            return reject(error.response.data);
          }
        });
    });
  },
};

const AdminSuppliesRequestService = {
  get: (token) => {
    return new Promise((resolve, reject) => {
      const config = http.interceptors.request.use((config) => {
        config.headers.get["Authorization"] = `Bearer ${token}`;
        return config;
      });

      http
        .get("/admin/request-supplies", config)
        .then((response) => {
          return resolve(response.data);
        })
        .catch((error) => {
          if (error.response) {
            return reject(error.response.data);
          }
        });
    });
  },

  reject: (id, reason, token) => {
    return new Promise((resolve, reject) => {
      const config = http.interceptors.request.use((config) => {
        config.headers.put["Authorization"] = `Bearer ${token}`;
        return config;
      });
      http
        .put(`/admin/request-supplies/${id}/reject`, {reason: reason}, config)
        .then((response) => {
          return resolve(response.data);
        })
        .catch((error) => {
          if (error.response) {
            return reject(error.response.data);
          }
        });
    });
  },

  approve: (id, providerId, token) => {
    return new Promise((resolve, reject) => {
      const config = http.interceptors.request.use((config) => {
        config.headers.put["Authorization"] = `Bearer ${token}`;
        return config;
      });
      http
        .put(
          `/admin/request-supplies/${id}/approve`,
          { providerId: providerId },
          config
        )
        .then((response) => {
          return resolve(response.data);
        })
        .catch((error) => {
          if (error.response) {
            return reject(error.response.data);
          }
        });
    });
  },
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
