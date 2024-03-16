import {
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalFooter,
} from "@nextui-org/react";
import { AppBar } from "@/components";
import { BiUser } from "react-icons/bi";
import { HiOutlineEye } from "react-icons/hi";
import { HiOutlineEyeSlash } from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";
import { Link as LinkRoute, useNavigate } from "react-router-dom";
import LoginInterface from "@/interfaces/LoginInterface";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { Log } from "@/utils/lib/Log";
import { API_URI } from "@/handlers/api";
import ButtonLoader from "@/components/loader/button/buttonloader.component";
import { getTokensCookie, setTokensCookie } from "@/utils/storage";
import { UserStore } from "@/stores/UserStore";
import { observer } from "mobx-react";
import { validateInputColor } from "@/utils/form";

interface LoginProps {}

export const LoginComp: React.FC<LoginProps> = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const loginUser = async (data: LoginInterface) => {
    setLoading(true);
    await fetch(`${API_URI}/accounts/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(async (res) => {
      const resData = await res.json();

      if (res.ok) {
        const { accessToken, refreshToken } = resData.user;
        console.log(resData);

        setTokensCookie(accessToken, refreshToken);
        UserStore.setUser({
          ...resData.user,
          tokens: { accessToken, refreshToken },
        });

        setLoading(false);
        navigate("/home");
      } else {
        setLoading(false);
        toast.error(resData.error);
      }
    });
  };

  const fpUser = (data: any) => {
    setLoading(true);
    fetch(
      `${API_URI}/accounts/${data.fpEmail}/pswd/verify?newPass=${data.fpPassword}`
    )
      .then((res) => res.json())
      .then((body) => {
        setLoading(false);
        setFPVisible(false);
        toast.success(
          "An e-mail has been sent to your account for further verification."
        );
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const {
    register: registerFP,
    handleSubmit: handleSubmitFP,
    formState: { errors: errorsFP },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data: LoginInterface | any) => {
    loginUser(data);
  };

  const onSubmitFP = (data: any) => {
    console.log("hello");
    fpUser(data);
  };

  const [FPVisible, setFPVisible] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

  useEffect(() => {
    const cookies = getTokensCookie();

    if (cookies)
      if (cookies.accessToken || cookies.refreshToken) {
        navigate("/home");
      }
  }, []);

  return (
    <div>
      <AppBar />
      <motion.div exit={{ opacity: 0 }}>
        <div>
          <div className="login flex text-white flex-col h-screen items-center justify-center">
            <div
              className="login__box bg-secondary rounded-md shadow-xl"
              style={{ width: "26rem" }}
            >
              <section className="account__strip traking-normal flex items-center justify-center bg-tertiary rounded-t-md">
                <BiUser size={28} />
                <h2 className="font-montserrat text-2xl font-bold ml-2 mt-2">
                  Login
                </h2>
              </section>
              <section className="login__content flex flex-col ml-5 mr-5">
                <h2 className="text-lg font-semibold mt-5">
                  We're glad to have you back!
                </h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="login__username/password mt-5">
                    <div className="login__username">
                      <h3 className="text-base font-semibold ml-1">Username</h3>
                      <Input
                        placeholder="User123"
                        size="md"
                        aria-label="Username"
                        color={validateInputColor(errors, "username", true)}
                        fullWidth
                        variant="bordered"
                        {...register("username", {
                          required: "You must enter a username.",
                        })}
                      />
                    </div>
                    <div className="login__password mt-5">
                      <h3 className="text-base font-semibold ml-1">Password</h3>
                      <Input
                        placeholder="12345"
                        type="password"
                        size="md"
                        fullWidth
                        variant="bordered"
                        color={validateInputColor(errors, "password", true)}
                        aria-label="Password"
                        endContent={
                          <button
                            className="focus:outline-none"
                            type="button"
                            onClick={togglePasswordVisibility}
                          >
                            {isPasswordVisible ? (
                              <HiOutlineEye className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                              <HiOutlineEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                            )}
                          </button>
                        }
                        {...register("password", {
                          required: "You must enter a password.",
                          minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters.",
                          },
                        })}
                      />
                    </div>
                  </div>
                  <ButtonLoader
                    className="my-5 mx-14"
                    size="lg"
                    button={
                      <Button
                        type="submit"
                        color="primary"
                        className="my-5 mx-14"
                        size="lg"
                      >
                        Login
                      </Button>
                    }
                    loading={loading}
                  />
                </form>
                <div className="flex items-center justify-between mb-5">
                  <p className="text-base text-center font-medium">
                    No account?{" "}
                    <LinkRoute to="/register">Create one!</LinkRoute>
                  </p>
                  <Button
                    onPress={() => setFPVisible(true)}
                    className="normal-case w-auto"
                    variant="light"
                    size="sm"
                  >
                    Forgot Password?
                  </Button>
                </div>
              </section>
            </div>
            <div className="login__divider inline-flex items-center justify-center w-full">
              <hr
                className="h-1 my-8 bg-tertiary rounded"
                style={{ width: "26rem" }}
              />
              <span className="absolute px-3 font-medium -translate-x-1/2 bg-primary text-tertiary">
                OR
              </span>
            </div>
            <div className="login__google">
              <Button
                startContent={<FcGoogle size={30} />}
                size="lg"
                className="bg-tertiary"
                disabled
              >
                <b className="ml-9">Continue with Google</b>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
      <Modal
        closeButton
        backdrop="blur"
        aria-labelledby="modal-title"
        className="pt-0"
        isOpen={FPVisible}
        onClose={() => setFPVisible(false)}
      >
        <form onSubmit={handleSubmitFP(onSubmitFP)}>
          <ModalHeader className="bg-secondary mb-5">
            <p className="text-xl ">Reset Password</p>{" "}
          </ModalHeader>
          <p>Happens to the best of us</p>
          <p className="text-sm opacity-70 mb-2">
            This can take a few moments.
          </p>
          <ModalBody>
            <Input
              isClearable
              variant="bordered"
              fullWidth
              color="primary"
              size="lg"
              placeholder="E-mail"
              {...registerFP("fpEmail")}
            />
            <Input
              variant="bordered"
              fullWidth
              type="password"
              color="primary"
              size="lg"
              placeholder="New Password"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  {isPasswordVisible ? (
                    <HiOutlineEye className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <HiOutlineEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              {...registerFP("fpPassword")}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              className="w-auto"
              variant="flat"
              color="danger"
              onPress={() => setFPVisible(false)}
            >
              Close
            </Button>
            <ButtonLoader
              button={
                <Button type="submit" className="w-auto">
                  Submit
                </Button>
              }
              loading={loading}
              className="w-auto"
            />
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
};

export const Login = observer(LoginComp);
