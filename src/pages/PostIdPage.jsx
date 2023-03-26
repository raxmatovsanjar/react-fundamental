import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchPostComments, fetchPostSingle } from "../store/postsSlice";
import Loader from "../components/UI/Loader/Loader";

const PostIdPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.posts.postSingle);
  const comments = useSelector((state) => state.posts.postComments);
  const isLoading = useSelector((state) => state.posts.isLoading);

  useEffect(() => {
    dispatch(fetchPostComments({ id: params?.id }));
    dispatch(fetchPostSingle({ id: params?.id }));
  }, [dispatch, params?.id]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <h1>Вы открыли страницу поста c ID = {params?.id}</h1>
      <div>
        {post?.id}. {post?.title}
      </div>
      <h1>Комментарии</h1>
      <div>
        {comments?.map((comment) => (
          <div key={comment?.id} style={{ marginTop: 15 }}>
            <h5>{comment?.email}</h5>
            <div>{comment?.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostIdPage;
