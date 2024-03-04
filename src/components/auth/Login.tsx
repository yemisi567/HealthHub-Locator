import React from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Card from "../Card/Card";
import styles from "./auth.module.scss";
import cn from "classnames";
import { FirebaseError } from "firebase/app";
import { GoogleIcon } from "../utils/Icons";
import { auth } from "../../../firebase";
import { toast } from "sonner";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

interface LoginProps {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  // React hook form values
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<LoginProps>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  // const { toast } = useToast();

  const handleErrorMessageToShow = (errorCode: string) => {
    console.log(errorCode, "code");
    if (errorCode === "Firebase: Error (auth/wrong-password).") {
      return "Your email or password is incorrect.";
    }
    if (errorCode === "Firebase: Error (auth/user-not-found).") {
      return "We couldn't find an account with that email. Please check your email.";
    }
    if (errorCode === "Firebase: Error (auth/invalid-credential).") {
      return "Your email or password is incorrect.";
    }
    return "Could not log you in at this time, please try again later";
  };

  const onSubmit = async (data: LoginProps) => {
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      if (response.user.email) {
        navigate("/hospital");
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(handleErrorMessageToShow(error.message));
      } else {
        toast.error(
          "Could not create user at this time, please try again later"
        );
      }
    }
  };

  async function signinWithGoogle() {
    try {
      const response = await signInWithPopup(auth, new GoogleAuthProvider());
      console.log(response);
      if (response.user.email) {
        navigate("/hospital");
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(handleErrorMessageToShow(error.message));
      } else {
        toast.error("Could login user at this time, please try again later");
      }
    }
  }

  return (
    <>
      <div className="auth-wrapper">
        <Card type="dashboard" className="card_wrapper">
          <form id="login" name="login" onSubmit={handleSubmit(onSubmit)}>
            <div className="input-text">Welcome back</div>
            {/* Username Field */}
            <div style={{ marginBottom: 10 }}>
              <Input
                {...register("email")}
                label="User Name"
                placeholder="Enter email"
                hasError={!!errors.email}
                errorText={errors.email?.message}
                isRequired
              />
            </div>

            {/* Password Field */}
            <div style={{ marginBottom: 50 }}>
              <Input
                {...register("password")}
                label="Password"
                placeholder="Enter password"
                hasError={!!errors.password}
                errorText={errors.password?.message}
                isRequired
              />
            </div>

            {/* Login Button */}
            <button
              aria-label="submit btn"
              type="submit"
              form="login"
              className="btn-custom"
              style={{ marginBottom: 6, width: "100%" }}
            >
              Login
            </button>
          </form>
        </Card>
        <div>
          <div className={styles.border}>OR</div>
          <div className={styles.button_wrapper}>
            <button
              onClick={() => signinWithGoogle()}
              type="button"
              className={cn(styles.button, styles.googlebtn)}
              disabled={isSubmitting}
            >
              Continue with Google
              <GoogleIcon />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
