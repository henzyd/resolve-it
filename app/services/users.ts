import { axiosPrivate } from "~/config/axios";

class UsersService {
  static getMe = async () => {
    const { data: response } = await axiosPrivate.get<User>(`/users/me`);
    return response;
  };

  static updateMe = async (data: Partial<User>) => {
    const { data: response } = await axiosPrivate.patch<User>(`/users/me`, data);
    return response;
  };
}

export default UsersService;
