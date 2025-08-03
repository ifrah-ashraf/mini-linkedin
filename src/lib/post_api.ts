import axiosInstance from './axios'; 

// Create a new post
export const createPost = async (content: string) => {
  const res = await axiosInstance.post('/posts/create', { content });
  return res.data;
};

// Get all posts
export const getAllPosts = async () => {
  const res = await axiosInstance.get('/posts');
  return res.data;
};

export const getMyPosts = async () => {
    const res = await axiosInstance.get("/posts/my");
    return res.data
}