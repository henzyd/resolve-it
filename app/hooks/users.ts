import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import UsersService from "~/services/users";
import { notifyError } from "~/lib/toast";
import { QUERY_KEYS } from "~/lib/query-keys";

export const getUserQueryOptions = () => ({
  queryKey: QUERY_KEYS.users.me,
  queryFn: UsersService.getMe,
  retry: false,
});

export function useGetMe() {
  return useQuery(getUserQueryOptions());
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
        queryKey: QUERY_KEYS.users.me,
      });
    },
  });
}
