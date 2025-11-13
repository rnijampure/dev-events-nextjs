import React from "react";

const UserDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  console.log("User ID:", id);
  return <div>UserDetailsPge #{id}</div>;
};

export default UserDetailsPage;
