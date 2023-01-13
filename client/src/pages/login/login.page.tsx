import { Button, Input, Link } from "@nextui-org/react";
import { AppBar } from "@/components";
import { BiUser } from "react-icons/bi";
import { HiOutlineEye } from "react-icons/hi";
import { HiOutlineEyeSlash } from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";

export const Login: React.FC = () => {
  return (
    <div>
      <AppBar />
      <div className="login flex text-white flex-col h-screen items-center justify-center">
        <div
          className="login__box bg-secondary rounded-md shadow-xl"
          style={{ width: "26rem" }}
        >
          <section className="account__strip traking-normal flex items-center justify-center bg-tertiary rounded-t-md">
            <BiUser size={28} />
            <h2 className="font-montserrat text-2xl font-bold ml-2 mt-2">
              Account
            </h2>
          </section>
          <section className="login__content flex flex-col ml-5 mr-5">
            <h2 className="text-lg font-semibold mt-5">
              We are so glad to have you!
            </h2>
            <div className="login__username/password mt-5">
              <div className="login__username">
                <h3 className="text-base font-semibold ml-1">
                  Username / Email
                </h3>
                <Input
                  placeholder="User123"
                  size="md"
                  color="primary"
                  fullWidth
                  bordered
                />
              </div>
              <div className="login__password mt-5">
                <h3 className="text-base font-semibold ml-1">Password</h3>
                <Input.Password
                  placeholder="12345"
                  size="md"
                  fullWidth
                  bordered
                  color="primary"
                  visibleIcon={<HiOutlineEyeSlash />}
                  hiddenIcon={<HiOutlineEye />}
                />
              </div>
            </div>
            <Button color="primary" className="my-5 mx-14" size="lg">
              Login
            </Button>
            <p className="text-base text-center font-medium mb-5">
              No account? <Link>Create one!</Link>
            </p>
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
            icon={<FcGoogle size={30} />}
            size="lg"
            className="bg-tertiary"
          >
            <b className="ml-9">Continue with Google</b>
          </Button>
        </div>
      </div>
    </div>
  );
};
