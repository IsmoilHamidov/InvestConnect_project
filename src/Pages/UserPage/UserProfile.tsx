import React from "react";
import { Button } from "@/components/ui/button";
import { useGetUserProfileQuery } from "@/store/slice/products";

const UserProfile: React.FC = () => {
  const { data, error, isLoading, refetch } = useGetUserProfileQuery();

  return (
    <div className="p-4 mb-10">
      <h1 className="text-2xl font-bold mb-4">Profile Details</h1>
      <Button onClick={() => refetch()} className="mb-4">
        Refresh 2
      </Button>

      {error ? (
        <>Oh no, there was an error {JSON.stringify(error)}</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <div className="space-y-2">
          
          <p>
            <strong>Firstname:</strong> {data.firstname}
          </p>
          <p>
            <strong>Lastname:</strong> {data.lastname}
          </p>
          <p>
            <strong>Phone:</strong> {data.phone}
          </p>
          <p>
            <strong>Email:</strong> {data.email}
          </p>
          <p>
            <strong>Role:</strong> {data.role}
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default UserProfile;
