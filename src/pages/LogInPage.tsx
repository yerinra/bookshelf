import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle, logInWithEmailAndPassword } from "../service/auth";
import { useRecoilState } from "recoil";
import { userState } from "../store/userState";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../service/firebase";
import H1 from "../components/atoms/H1";
import LoginButtons from "../components/molecules/LoginForm/LoginButtons";
import LoginFormField from "../components/molecules/LoginForm/LoginFormField";

const LogInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [currentUser, setCurrentUser] = useRecoilState(userState);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) navigate("/");
  }, [currentUser, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const data = await logInWithEmailAndPassword(email, password);
      if (data?.user) {
        setCurrentUser(data?.user?.displayName || data.user.uid);
        navigate("/bookshelf");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const data = await signInWithGoogle();
      if (data?.user.uid) {
        setCurrentUser(data?.user?.displayName || data.user.uid);
        await setDoc(doc(db, "users", data?.user?.uid), {
          userName: data?.user?.displayName || data?.user?.uid,
          uid: data?.user?.uid,
        });
      }
      navigate("/bookshelf");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="flex flex-col gap-2 w-full h-full items-center font-medium">
      <H1>Log In</H1>
      <LoginFormField
        email={email}
        password={password}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
      />
      <LoginButtons handleClick={handleGoogleLogin} />
    </section>
  );
};

export default LogInPage;
