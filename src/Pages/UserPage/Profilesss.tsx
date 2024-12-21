import React from "react";
import { useGetUserProfileQuery } from "./apiSlice";
import { Button } from "@/components/ui/button";

const UserProfile: React.FC = () => {
  const { data, error, isLoading, refetch } = useGetUserProfileQuery();

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
            <p>
              <strong>ID:</strong> {data.id}
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
      </div>
    </div>
  );
};

export default UserProfile;
