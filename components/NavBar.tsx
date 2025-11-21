import Link from "next/link";
import React from "react";
import Image from "next/image";
const NavBar = () => {
  return (
    <header>
      <nav>
        <Link href="/">
          <Image src="/icons/logo.png" alt="Logo" width={30} height={30} />
          <p>DevLinks</p>
        </Link>
        {/* {" "}
        | <Link href="/">Home</Link> | <Link href="/dashboard">Dashboard</Link>{" "}
        | <Link href="/dashboard/users">Users</Link> */}
        <ul>
          <li>
            <Link href="/dashboard1">Home</Link>
          </li>
          <li>
            <Link href="/dashboard1">Evemts</Link>
          </li>
          <li>
            <Link href="/dashboard1">Create Evemt</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
