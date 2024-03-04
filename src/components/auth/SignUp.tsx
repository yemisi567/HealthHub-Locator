import React from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Card from "../Card/Card";
import { auth } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { toast } from "sonner";

interface SignUpProps {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const SiginUpPage: React.FC = () => {
  const navigate = useNavigate();

  const handleErrorMessageToShow = (errorCode: string) => {
    console.log(errorCode, "code");
    if (errorCode === "auth/wrong-password") {
      return "Your email or password is incorrect.";
    }
    if (errorCode === "auth/user-not-found") {
      return "We couldn't find an account with that email. Please check your email.";
    }
    if (
      errorCode ===
      "Firebase: Password should be at least 6 characters (auth/weak-password)"
    ) {
      return "Password should be at least 6 characters";
    }
    return "Could not log you in at this time, please try again later";
  };

  // React hook form values
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignUpProps>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data: SignUpProps) => {
    try {
      const response = await createUserWithEmailAndPassword(
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

  return (
    <div>
      <div className="auth-wrapper">
        <Card type="dashboard" className="card_wrapper">
          <form id="signup" name="signup" onSubmit={handleSubmit(onSubmit)}>
            <div className="input-text">Sign Up</div>
            {/* Email Field */}
            <div style={{ marginBottom: 10 }}>
              <Input
                {...register("email")}
                label="Email"
                placeholder="Enter email address"
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
            {/* Sign Up Button */}
            <button
              aria-label="submit btn"
              type="submit"
              form="signup"
              className="btn-custom"
              style={{ marginBottom: 6, width: "100%" }}
            >
              Sign up
            </button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SiginUpPage;
