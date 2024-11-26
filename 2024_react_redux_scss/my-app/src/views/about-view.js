import React, { useEffect } from "react";

import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts, setLoading, setError } from '../redux/store';
import { fetchData } from '../api';

function AboutView() {
  const dispatch = useDispatch();

  // React-Query를 사용하여 API 호출
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['posts'], // queryKey는 배열로 넘겨줍니다.
    queryFn: fetchData,   // queryFn은 API 호출 함수입니다.
  });


  // Redux 상태
  const posts = useSelector((state) => state.posts);
  const loading = useSelector((state) => state.loading);
  const errorMessage = useSelector((state) => state.error);

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }

    if (isError) {
      dispatch(setError(error.message));
    } else if (data) {
      dispatch(setPosts(data));
    }
  }, [isLoading, isError, data, error, dispatch]);

  return (
    <>
      <div>
        <h1>Posts</h1>
        {loading && <p>Loading...</p>}
        {errorMessage && <p>Error: {errorMessage}</p>}
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default AboutView;