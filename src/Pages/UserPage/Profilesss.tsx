import React from "react";
import { Button } from "@/components/ui/button";
import { useGetUsersQuery } from "@/store/slice/products";

const ProfileGetUser: React.FC = () => {
  const { data, error, isLoading, refetch } = useGetUsersQuery();

  return (
    <div>
      <h1>User get Profile</h1>
      <Button onClick={() => refetch()}>Refresh</Button>
      <div className="flex gap-5">
        {isLoading ? (
          <>Loading...</>
        ) : error ? (
          <>Oh no, there was an error. Error: {JSON.stringify(error)}</>
        ) : data ? (
          <div>
            <p>
              <strong>ID:</strong> {data.id}
            </p>
            <p>
              <strong>username:</strong> {data.username}
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
      </div>
    </div>
  );
};

export default ProfileGetUser;
