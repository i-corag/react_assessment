import axios from 'axios';

const apiUrl = axios.create({
  baseURL: 'https://frontend-case-api.sbdev.nl/api',
});

const getCategories = async () => {
  const response = await apiUrl({
    method: 'get',
    url: 'categories',
    headers: {
      token: import.meta.env.VITE_APP_API_VALUE,
    },
  });
  return response.data;
};

const getPaginatedPosts = async (pageNumber, categoryId) => {
  const response = await apiUrl({
    method: 'get',
    url: 'posts?',
    params: {
      page: pageNumber,
      perPage: 8,
      sortBy: 'created_at',
      sortDirection: 'desc',
      categoryId: categoryId,
    },
    headers: {
      token: import.meta.env.VITE_APP_API_VALUE,
    },
  });
  return response.data;
};

const getInfinitePosts = async (page = 1, categoryId) => {
  const response = await apiUrl({
    method: 'get',
    url: 'posts?',
    params: {
      page: page,
      perPage: 4,
      sortBy: 'created_at',
      sortDirection: 'desc',
      categoryId: categoryId,
    },
    headers: {
      token: import.meta.env.VITE_APP_API_VALUE,
    },
  });
  return response.data;
};

const createPost = async ({ formData }) => {
  console.log('POST', formData);
  const response = await apiUrl({
    method: 'post',
    maxBodyLength: Infinity,
    url: 'posts',
    headers: {
      token: import.meta.env.VITE_APP_API_VALUE,
    },
    data: formData,
  });
  return response.data;
};

export { getCategories, getInfinitePosts, getPaginatedPosts, createPost };
