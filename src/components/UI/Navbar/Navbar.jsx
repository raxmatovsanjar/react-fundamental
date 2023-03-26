import { Link } from "react-router-dom";
import MyButton from "../button/MyButton";
import { useDispatch } from "react-redux";
import { setIsAuth } from "../../../store/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(setIsAuth(false));
    localStorage.removeItem("auth");
  };

  return (
    <div className="navbar">
      <MyButton onClick={logout}>Выйти</MyButton>
      <div className="navbar__links">
        <Link to="/posts">Посты</Link>
      </div>
    </div>
  );
};

export default Navbar;
