import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findByHome } from "../redux/features/users/userSlice";
import { Button } from "./Button";
import { selectHome, updateUsers } from "../redux/features/users/homeSlice";
import { Loading } from "./Loading";
import { Error } from "./Error";

export const Popup = () => {
  const dispatch = useDispatch();

  const { users, usersByHome, isLoading, error } = useSelector(
    (state) => state.users
  );

  const { selectedHome } = useSelector((state) => state.homes);
  const homeId = selectedHome?.id;
  const address = selectedHome?.address;

  const [currentUsers, setCurrentUsers] = useState([]);

  useEffect(() => {
    if (!homeId) return;
    dispatch(findByHome(homeId));
  }, [dispatch, homeId]);

  useEffect(() => {
    setCurrentUsers(usersByHome);
  }, [usersByHome, selectedHome]);

  if (!selectedHome) return;

  if (isLoading) {
    return (
      <div className="fixed bg-gray-600/50 z-50 inset-0 flex items-center justify-center p-2">
        <div className="bg-white p-5 rounded-lg">
          <Loading />
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const id = parseInt(e.target.id);
    if (currentUsers.includes(id)) {
      setCurrentUsers(currentUsers.filter((item) => item !== id));
    } else {
      setCurrentUsers([...currentUsers, id]);
    }
  };

  const handleClose = () => {
    dispatch(selectHome(null));
  };

  if (error) return <Error>{error}</Error>;

  const handleSave = () => {
    if (!currentUsers.length) return;
    dispatch(updateUsers({ homeId, userIds: currentUsers }));

    handleClose();
  };

  return (
    <div className="fixed bg-gray-600/50 z-50 inset-0 flex items-center justify-center p-2">
      <div className="bg-white p-5 rounded-lg w-full max-w-[400px]">
        <h2 className="font-bold mb-4">Modify Users for: {address}</h2>
        <div className="flex flex-col">
          {users.map((u) => (
            <label key={u.user_id}>
              <input
                type="checkbox"
                value={u.user_id}
                checked={currentUsers.includes(u.user_id)}
                id={u.user_id}
                onChange={handleChange}
                className="mr-2"
              />
              {u.username}
            </label>
          ))}
        </div>
        {!currentUsers.length && (
          <span className="text-xs text-red-400 font-bold italic">
            At least one user is required
          </span>
        )}
        <div className="flex gap-2 ml-auto w-fit">
          <Button onClick={handleClose} variant="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!currentUsers.length}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};
