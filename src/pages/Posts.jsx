import React, { useEffect, useState } from "react";
import { usePosts } from "../hooks/usePosts";
import MyButton from "../components/UI/button/MyButton";
import PostForm from "../components/PostForm";
import MyModal from "../components/UI/MyModal/MyModal";
import PostFilter from "../components/PostFilter";
import PostList from "../components/PostList";
import Loader from "../components/UI/Loader/Loader";
import Pagination from "../components/Pagination";
import MySelect from "../components/UI/select/MySelect";
import { useSelector, useDispatch } from "react-redux";
import { addPost, removePost, fetchPosts } from "../store/postsSlice";

function Posts() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const isLoading = useSelector((state) => state.posts.isLoading);
  const error = useSelector((state) => state.posts.error);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  useEffect(() => {
    dispatch(fetchPosts({ limit, page }));
  }, [page, limit, dispatch]);

  const createPost = (newPost) => {
    dispatch(addPost(newPost));
    setModal(false);
  };

  return (
    <div className="App">
      <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
        Создать пользователя
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: "15px 0" }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      <MySelect
        value={limit}
        onChange={(value) => setLimit(value)}
        defaultValue="Кол-во элементов на странице"
        options={[
          { value: 5, name: "5" },
          { value: 10, name: "10" },
          { value: 25, name: "25" },
          { value: -1, name: "Показать все" },
        ]}
      />

      {error && <h1>Произошла ошибка ${error}</h1>}

      {isLoading ? (
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
        >
          <Loader />
        </div>
      ) : (
        <div>
          <PostList
            remove={(post) => dispatch(removePost(post.id))}
            posts={sortedAndSearchedPosts}
            title="Посты про JS"
          />
          <Pagination
            page={page}
            changePage={(page) => setPage(page)}
            totalPages={100 / limit}
          />
        </div>
      )}
    </div>
  );
}

export default Posts;
