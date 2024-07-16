import axios from "axios";
import { baseUrl } from "../../src/baseUrl/baseUrl";
import Cookies from 'js-cookie';

const token = Cookies.get('token');

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
        url: baseUrl + "users",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    getUserById: (id) => {
      return axios({
        url: baseUrl + `users/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    updateUser: (id, data) => {
      return axios({
        url: baseUrl + `users/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        data,
      });
    },
    deleteUser: (id) => {
      return axios({
        url: baseUrl + `users/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    getSingleUser: () => {
      return axios({
        url: baseUrl + "users/getSingleUser",
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
        url: baseUrl + "youth-enterprises",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data,
      });
    },
    getAllYouthEnterprises: () => {
      return axios({
        url: baseUrl + "youth-enterprises",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    getYouthEnterpriseById: (id) => {
      return axios({
        url: baseUrl + `youth-enterprises/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    updateYouthEnterprise: (id, data) => {
      return axios({
        url: baseUrl + `youth-enterprises/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        data,
      });
    },
    deleteYouthEnterprise: (id) => {
      return axios({
        url: baseUrl + `youth-enterprises/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    // Request routes
    addRequest: (data) => {
      const token = Cookies.get('token');
      return axios({
        url: baseUrl + "requests",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
           "Authorization": `${token}`
        },
        data,
      });
    },
    getAllRequests: () => {
      return axios({
        url: baseUrl + "requests",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    getRequestById: (id) => {
      return axios({
        url: baseUrl + `requests/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    updateRequest: (id, data) => {
      const token = Cookies.get('token');
      return axios({
        url: baseUrl + `requests/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
            "Authorization": `${token}`
        },
        data,
      });
    },
    deleteRequest: (id) => {
      return axios({
        url: baseUrl + `requests/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    // Chat routes
    addChat: (data) => {
      return axios({
        url: baseUrl + "chats",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data,
      });
    },
    getChatsByRequestId: (requestId) => {
      return axios({
        url: baseUrl + `chats/request/${requestId}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    getChatById: (id) => {
      return axios({
        url: baseUrl + `chats/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    updateChat: (id, data) => {
      return axios({
        url: baseUrl + `chats/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        data,
      });
    },
    deleteChat: (id) => {
      return axios({
        url: baseUrl + `chats/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    // Offer routes
    addOffer: (data) => {
      return axios({
        url: baseUrl + "offers",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data,
      });
    },
    getOffersByChatId: (chatId) => {
      return axios({
        url: baseUrl + `offers/chat/${chatId}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    getOfferById: (id) => {
      return axios({
        url: baseUrl + `offers/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    updateOffer: (id, data) => {
      return axios({
        url: baseUrl + `offers/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        data,
      });
    },
    deleteOffer: (id) => {
      return axios({
        url: baseUrl + `offers/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
  },
};

export default Transport;
