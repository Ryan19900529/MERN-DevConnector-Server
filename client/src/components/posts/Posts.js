import React, { useEffect } from "react";
import Spinner from "../layout/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/post";
import PostItem from "./PostItem";
import PostForm from "./PostForm";

const Posts = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(getPosts());
  }, [getPosts]);
  return loading ? (
    <Spinner />
  ) : (
    <>
      <h1 className='large text-primary'>Posts</h1>
      <p className='lead'>
        <i className='fas fa-user'></i>Welcome to the community
      </p>
      <PostForm />

      <div className='posts'>
        {posts.map((post) => {
          return <PostItem key={post._id} post={post} />;
        })}
      </div>
    </>
  );
};

export default Posts;
