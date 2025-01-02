import { useGetUserProductsListQuery } from "@/store/slice/products";

const Sample = () => {
  const { data, error, isLoading } = useGetUserProductsListQuery(undefined);

  return <div>{isLoading ? <p>Loading</p> : data ?  <p>data {console.log(data)}</p> : null}</div>;
};

export default Sample;

// import { useGetUsersQuery } from "@/store/slice/products";
// import React, { useEffect } from "react";

// const Sample = () => {
//   // Pass an empty object or undefined to the hook as it expects an argument
//   const { data, error, isLoading, isSuccess } = useGetUsersQuery(undefined);

//   // Log the response when data is available
//   useEffect(() => {
//     if (isSuccess) {
//       console.log("User data:", data); // Logs the fetched user data
//     } else if (error) {
//       console.error("Error fetching data:", error);
//     }
//   }, [isSuccess, data, error]);

//   return (
//     <div>
//       {isLoading && <p>Loading...</p>}
//       {isSuccess && <pre>{JSON.stringify(data, null, 2)}</pre>}
//       {error && <p>Error occurred: </p>}
//     </div>
//   );
// };

// export default Sample;
