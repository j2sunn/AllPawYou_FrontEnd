import { useEffect, useState } from "react";
import { fetchUser } from "../../service/UserAPI";

export default function TestPage() {
  const [user, setUser] = useState({});
  const ACCESS_TOKEN = localStorage.getItem("accessToken");

  useEffect(() => {
    if (ACCESS_TOKEN) {
      fetchUser()
        .then((response) => {
          setUser(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [ACCESS_TOKEN]);

  const handleLogout = async () => {
    localStorage.clear();
  };

  return (
    <div>
      {ACCESS_TOKEN ? (
        <ul title={user.username + "님 환영합니다"} id="collasible-nav-dropdown">
          <li>
            <a href="/my-page">MyPage</a>
          </li>
          <li>
            <a href="/" onClick={handleLogout}>
              로그아웃
            </a>
          </li>
        </ul>
      ) : (
        <ul title="Login/SignUp" id="collasible-nav-dropdown">
          <li>
            <a href="/user/signin">Login</a>
          </li>
          <li>
            <a href="/user/signup">SignUp</a>
          </li>
        </ul>
      )}
    </div>
  );
}
