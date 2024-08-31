import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findAllUsers, selectUser } from "../redux/features/users/userSlice";
import { changePage } from "../redux/features/users/homeSlice";
import { Error } from "./Error";

export const SelectBar = () => {
  const dispatch = useDispatch();
  const { users, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(findAllUsers());
  }, [dispatch]);

  const handleSelect = (e) => {
    const id = e.target.value;
    dispatch(changePage(1));
    dispatch(selectUser(id));
  };

  return (
    <nav className="flex justify-center items-center bg-gray-200 px-2 py-2">
      {error && <Error>{error}</Error>}
      <div className="flex w-full max-w-[900px] justify-end">
        <label>
          Select User:
          <select onChange={handleSelect} className="ml-2 p-1 w-28 rounded-md">
            <option value="">None</option>
            {users.map((u) => (
              <option key={u.user_id} value={u.user_id}>
                {u.username}
              </option>
            ))}
          </select>
        </label>
      </div>
    </nav>
  );
};
