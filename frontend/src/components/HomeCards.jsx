import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./Button";
import {
  findByUser,
  changePage,
  selectHome,
} from "../redux/features/users/homeSlice";
import { Loading } from "./Loading";
import { Empty } from "./Empty";
import { Error } from "./Error";

export const HomeCards = () => {
  const dispatch = useDispatch();
  const { homes, page, nextPage, prevPage, isLoading, error } = useSelector(
    (state) => state.homes
  );
  const { selectedUser } = useSelector((state) => state.users);

  useEffect(() => {
    if (!selectedUser) return;
    dispatch(findByUser({ userId: selectedUser, page }));
  }, [dispatch, selectedUser, page]);

  if (!selectedUser) return <Empty />;

  if (isLoading) return <Loading />;

  if (error) return <Error>{error}</Error>;

  const handlePrev = () => {
    if (!prevPage) return;
    dispatch(changePage(prevPage));
  };

  const handleNext = () => {
    if (!nextPage) return;
    dispatch(changePage(nextPage));
  };

  return (
    <div className="px-3 w-full max-w-[900px] self-center">
      <div className="flex">
        {prevPage && (
          <Button onClick={handlePrev} variant="pagination">
            Prev
          </Button>
        )}
        <div className="flex-1" />
        {nextPage && (
          <Button onClick={handleNext} variant="pagination">
            Next
          </Button>
        )}
      </div>
      <div className="grid dev-grid-repeat gap-4">
        {homes.map((home) => (
          <Card key={home.home_id} home={home} />
        ))}
      </div>
    </div>
  );
};

const Card = ({ home }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    const id = home.home_id;
    const address = home.street_address;
    dispatch(selectHome({ id, address }));
  };

  return (
    <div className="shadow-md rounded-lg border border-gray-300 p-2 text-sm flex flex-col">
      <h2 className="font-semibold text-[1rem]">{home.street_address}</h2>
      <p>List Price: ${home.list_price}</p>
      <p>State: {home.state}</p>
      <p>Zip: {home.zip}</p>
      <p>Sqft: {home.sqft}</p>
      <p>Beds: {home.beds}</p>
      <p>Baths: {home.baths}</p>
      <div className="mt-auto">
        <Button onClick={handleClick}>Edit Users</Button>
      </div>
    </div>
  );
};
