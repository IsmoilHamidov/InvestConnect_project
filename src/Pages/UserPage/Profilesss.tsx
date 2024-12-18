import React, { useEffect, useState } from "react";
import { useGetUserProfileQuery } from "./apiSlice";
import { Button } from "@/components/ui/button";

const UserProfile: React.FC = () => {
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setUserId(Number(storedUserId));
    }
  }, []);

  const { data, error, isLoading, refetch } = useGetUserProfileQuery(userId!, {
    skip: userId === null, // Пропускаем запрос, если userId не установлен
  });

  return (
    <div>
      <h1>User Profile</h1>
      <Button onClick={() => refetch()}>Refresh</Button>
      <div className="flex gap-5">
        {isLoading ? (
          <>Loading...</>
        ) : error ? (
          <>Oh no, there was an error. Error: {JSON.stringify(error)}</>
        ) : data ? (
          <div>
            {console.log(data)}
            <p>
              <strong>ID:</strong> {userId}
            </p>
            <p>
              <strong>Firstname:</strong> {data.firstname}
            </p>
            <p>
              <strong>Lastname:</strong> {data.lastname}
            </p>
            <p>
              <strong>Email:</strong> {data.email}
            </p>
            <p>
              <strong>Phone:</strong> {data.phone}
            </p>
            <p>
              <strong>Role:</strong> {data.role}
            </p>
          </div>
        ) : (
          <p>No data available</p>
        )}
        <div>
          <span>Show another user</span>
          <input
            className="border-2 p-1"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
export default UserProfile;
