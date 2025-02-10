import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SignupInputs, UserType } from "src/types";

export const signupUser = async (inputs: SignupInputs): Promise<UserType> => {
  try {
    const { data } = await axios.post("/api/auth/signup", inputs);
    return data;
  } catch (error: any) {
    console.error("Signup error:", error);
    throw new Error(error.response?.data?.error || "Signup failed");
  }
};

export const useSignup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signupUser,
    onSuccess: (data) => {
      queryClient.setQueryData(["authUser"], data);
    },
    onError: (error: any) => {
      console.error(error.message);
      return error;
    },
  });
};
