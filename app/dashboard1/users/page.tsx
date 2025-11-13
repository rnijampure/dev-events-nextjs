import Link from "next/link";
import React from "react";

const UsersPage = () => {
  return (
    <>
      <div>
        <h1> User List</h1>
        <ul>
          <li className="mt-4">
            <Link href="/dashboard/users/1">User 1</Link>
          </li>
          <li className="mt-4">
            <Link href="/dashboard/users/2">User 2</Link>
          </li>
          <li className="mt-4">
            <Link href="/dashboard/users/3">User 3</Link>
          </li>
        </ul>
        UsersPage
      </div>
    </>
  );
};

export default UsersPage;
