import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import { useDispatch } from "react-redux";
import { setIsAuth } from "../store/authSlice";

const Login = () => {
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();
    dispatch(setIsAuth(true));
    localStorage.setItem("auth", "true");
  };

  return (
    <div>
      <h1>Страница для логина</h1>
      <form onSubmit={login}>
        <MyInput type="text" placeholder="Введите логин" />
        <MyInput type="password" placeholder="Введите пароль" />
        <MyButton>Войти</MyButton>
      </form>
    </div>
  );
};

export default Login;
