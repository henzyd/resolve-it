import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import UsersService from "~/services/users";
import { notifyError } from "~/lib/toast";

export function useGetMe() {
  return useQuery<User>({
    queryKey: ["current-user"],
    queryFn: UsersService.getMe,
    retry: 1,
  });
}

export function useUpdateMe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: UsersService.updateMe,
    onError: (error) => {
      if (isAxiosError(error)) {
        notifyError({ message: "Error occured" });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["current-user"],
      });
    },
  });
}
