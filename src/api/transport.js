import axios from "axios";
import { baseUrl } from "../../src/baseUrl/baseUrl";

const token = "YOUR_ACCESS_TOKEN";

const Transport = {
  HTTP: {
    // User routes
    registerUser: (data) => {
      return axios({
        url: baseUrl + "auth/register",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data,
      });
    },
    loginUser: (data) => {
        return axios({
          url: baseUrl + "auth/login",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data,
        });
      },
    getAllUsers: () => {
      return axios({
        url: baseUrl + "api/users",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    getUserById: (id) => {
      return axios({
        url: baseUrl + `api/users/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    updateUser: (id, data) => {
      return axios({
        url: baseUrl + `api/users/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        data,
      });
    },
    deleteUser: (id) => {
      return axios({
        url: baseUrl + `api/users/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    getSingleUser: () => {
      return axios({
        url: baseUrl + "api/users/getSingleUser",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    },

    // YouthEnterprise routes
    addYouthEnterprise: (data) => {
      return axios({
        url: baseUrl + "api/youth-enterprises",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data,
      });
    },
    getAllYouthEnterprises: () => {
      return axios({
        url: baseUrl + "api/youth-enterprises",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    getYouthEnterpriseById: (id) => {
      return axios({
        url: baseUrl + `api/youth-enterprises/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    updateYouthEnterprise: (id, data) => {
      return axios({
        url: baseUrl + `api/youth-enterprises/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        data,
      });
    },
    deleteYouthEnterprise: (id) => {
      return axios({
        url: baseUrl + `api/youth-enterprises/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    // Request routes
    addRequest: (data) => {
      return axios({
        url: baseUrl + "api/requests",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data,
      });
    },
    getAllRequests: () => {
      return axios({
        url: baseUrl + "api/requests",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    getRequestById: (id) => {
      return axios({
        url: baseUrl + `api/requests/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    updateRequest: (id, data) => {
      return axios({
        url: baseUrl + `api/requests/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        data,
      });
    },
    deleteRequest: (id) => {
      return axios({
        url: baseUrl + `api/requests/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    // Chat routes
    addChat: (data) => {
      return axios({
        url: baseUrl + "api/chats",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data,
      });
    },
    getChatsByRequestId: (requestId) => {
      return axios({
        url: baseUrl + `api/chats/request/${requestId}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    getChatById: (id) => {
      return axios({
        url: baseUrl + `api/chats/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    updateChat: (id, data) => {
      return axios({
        url: baseUrl + `api/chats/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        data,
      });
    },
    deleteChat: (id) => {
      return axios({
        url: baseUrl + `api/chats/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    // Offer routes
    addOffer: (data) => {
      return axios({
        url: baseUrl + "api/offers",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data,
      });
    },
    getOffersByChatId: (chatId) => {
      return axios({
        url: baseUrl + `api/offers/chat/${chatId}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    getOfferById: (id) => {
      return axios({
        url: baseUrl + `api/offers/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    updateOffer: (id, data) => {
      return axios({
        url: baseUrl + `api/offers/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        data,
      });
    },
    deleteOffer: (id) => {
      return axios({
        url: baseUrl + `api/offers/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
  },
};

export default Transport;
