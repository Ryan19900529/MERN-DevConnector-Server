import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { setAlert } from "./alert";
import { v4 as uuidv4 } from "uuid";

const postSlice = createSlice({
  name: "post",
  initialState: {
    post: null,
    posts: [],
    loading: true,
    error: {},
  },
  reducers: {
    get_posts: (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    },
    get_post: (state, action) => {
      state.post = action.payload;
      state.loading = false;
    },
    add_post: (state, action) => {
      state.posts = [action.payload, ...state.posts];
      state.loading = false;
    },
    delete_post: (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
      state.loading = false;
    },
    post_error: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    update_likes: (state, action) => {
      state.posts = state.posts.map((post) =>
        post._id === action.payload.id
          ? { ...post, likes: action.payload.likes }
          : post
      );
      state.loading = false;
    },
    add_comment: (state, action) => {
      state.post.comments = action.payload;
      state.loading = false;
    },
    remove_comment: (state, action) => {
      state.post.comments = state.post.comments.filter(
        (comment) => comment._id !== action.payload
      );
      state.loading = false;
    },
  },
});

export const {
  get_posts,
  get_post,
  delete_post,
  add_post,
  post_error,
  update_likes,
  add_comment,
  remove_comment,
} = postSlice.actions;

// Get posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");
    dispatch(get_posts(res.data));
  } catch (err) {
    dispatch(
      post_error({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};

// Add like
export const addLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${id}`);
    dispatch(update_likes({ id, likes: res.data }));
  } catch (err) {
    dispatch(
      post_error({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};

// Remove like
export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${id}`);
    dispatch(update_likes({ id, likes: res.data }));
  } catch (err) {
    dispatch(
      post_error({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};

// Delete post
export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${id}`);
    dispatch(delete_post(id));
    const alertId = uuidv4();
    dispatch(
      setAlert({
        id: alertId,
        msg: "Post Removed",
        alertType: "success",
      })
    );
  } catch (err) {
    dispatch(
      post_error({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};

// Add post
export const addPost = (text) => async (dispatch) => {
  try {
    const res = await axios.post("/api/posts", { text });

    dispatch(add_post(res.data));
    const alertId = uuidv4();
    dispatch(
      setAlert({
        id: alertId,
        msg: "Post Created",
        alertType: "success",
      })
    );
  } catch (err) {
    dispatch(
      post_error({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};

// Get post
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${id}`);
    dispatch(get_post(res.data));
  } catch (err) {
    dispatch(
      post_error({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};

// Add comment
export const addComment = (postId, formData) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/posts/comment/${postId}`, formData);
    dispatch(add_comment(res.data));
    const alertId = uuidv4();
    dispatch(
      setAlert({
        id: alertId,
        msg: "Comment Added",
        alertType: "success",
      })
    );
  } catch (err) {
    dispatch(
      post_error({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};

// Delete comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

    dispatch(remove_comment(commentId));
    const alertId = uuidv4();
    dispatch(
      setAlert({
        id: alertId,
        msg: "Comment Removed",
        alertType: "success",
      })
    );
  } catch (err) {
    dispatch(
      post_error({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};

export default postSlice.reducer;
