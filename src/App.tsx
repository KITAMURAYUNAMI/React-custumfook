import "./styles.css";

import { useAllUsers } from "./hooks/useAllUsers";
import { UserCade } from "./components/UserCard";

export default function App() {
  const { getUsers, userInfo, loading, error } = useAllUsers();
  const onClickuser = () => getUsers();

  return (
    <div className="App">
      <button onClick={onClickuser}>データの取得</button>
      <br />
      {error ? (
        <p>データの取得に失敗しました</p>
      ) : loading ? (
        <p>lodaing...</p>
      ) : (
        <>
          {userInfo.map((user) => (
            <UserCade key={user.id} user={user} />
          ))}
        </>
      )}
    </div>
  );
}
