import { createStore } from 'redux';

// 초기 상태
const initialState = {
  posts: [],
  loading: false,
  error: null,
};

// 액션 타입
const SET_POSTS = 'SET_POSTS';
const SET_LOADING = 'SET_LOADING';
const SET_ERROR = 'SET_ERROR';

// 액션 생성자
export const setPosts = (posts) => ({ type: SET_POSTS, payload: posts });
export const setLoading = (loading) => ({ type: SET_LOADING, payload: loading});
export const setError = (error) => ({ type: SET_ERROR, payload: error });

// 리듀서
const reducer = (state = initialState, action) => {
  console.log(action.type, state)
  switch (action.type) {
    case SET_POSTS:
      return { ...state, posts: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

// 스토어 생성
const store = createStore(reducer);

export default store;