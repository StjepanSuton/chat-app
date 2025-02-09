import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSignup } from "src/services";

const signupSchema = z
  .object({
    fullName: z.string().min(1, { message: "Full Name is required" }),
    username: z.string().min(1, { message: "Username is required" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Confirm Password must be at least 6 characters" }),
    gender: z.enum(["male", "female"], { message: "Gender is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = {
  fullName: string;
  username: string;
  password: string;
  confirmPassword: string;
  gender: string;
};

const SignUp = () => {
  const {
    mutateAsync: signup,
    isPending: loading,
    error: signUpError,
  } = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: FormData) => {
    signup(data);
  };

  return (
    <div className="flex flex-col border-2 rounded-lg items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up <span className="text-green-500"> ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className={`w-full input input-bordered h-10 ${
                errors.fullName ? "border-red-500" : ""
              }`}
              {...register("fullName")}
            />
            {errors.fullName && (
              <p className="text-xs text-red-500">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <label className="label p-2 ">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="johndoe"
              className={`w-full input input-bordered h-10 ${
                errors.username ? "border-red-500" : ""
              }`}
              {...register("username")}
            />
            {errors.username && (
              <p className="text-xs text-red-500">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className={`w-full input input-bordered h-10 ${
                errors.password ? "border-red-500" : ""
              }`}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className={`w-full input input-bordered h-10 ${
                errors.confirmPassword ? "border-red-500" : ""
              }`}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* New Gender Checkboxes in the same row */}
          <div className="flex items-center space-x-4 mt-4">
            <div>
              <label
                htmlFor="male"
                className="cursor-pointer text-base label-text"
              >
                <input
                  type="radio"
                  id="male"
                  value="male"
                  className="mr-2"
                  {...register("gender")}
                />
                Male
              </label>
            </div>
            <div>
              <label
                htmlFor="female"
                className="cursor-pointer text-base label-text"
              >
                <input
                  type="radio"
                  id="female"
                  value="female"
                  className="mr-2"
                  {...register("gender")}
                />
                Female
              </label>
            </div>
          </div>
          {errors.gender && (
            <p className="text-xs text-red-500">{errors.gender.message}</p>
          )}

          <Link
            to={"/login"}
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-white"
          >
            Already have an account?
          </Link>

          <div>
            <button
              className="btn btn-block btn-sm mt-2 border border-slate-700"
              disabled={loading}
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </div>
          {signUpError && (
            <p className="text-xs text-red-500">{signUpError.message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
