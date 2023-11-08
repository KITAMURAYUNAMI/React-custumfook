//全ユーザー一覧を取得するカスタムフック
import axios from "axios";
import { useState } from "react";
import { UserProfile } from "../types/useProfile";
import { User } from "../types/api/userapi";
//カスタムフックとはuseStateなどを使った一連の処理をまとめてコンポーネント化すること
export const useAllUsers = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [userInfo, setUserInfo] = useState<Array<UserProfile>>([]);

  const getUsers = () => {
    setLoading(true);
    setError(false);

    axios
      .get<Array<User>>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const data = res.data.map((user) => ({
          id: user.id,
          name: `${user.name}(${user.username})`,
          email: user.email,
          address: `${user.address.city}${user.address.suite}${user.address.street}`
        }));
        setUserInfo(data);
      })
      .catch(() => {
        //例外処理的役割
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      }); //finallyでなにがあろうと絶対最後に来る処理を書ける
  };

  return { getUsers, userInfo, loading, error };
};
