import React from "react";
import Image from "next/image";
const Layout = async ({ children }: { children: React.ReactNode }) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");

  const data = await response.json();
  //console.log("Fetched Data:", data);
  const photosResponse = await fetch(
    "https://jsonplaceholder.typicode.com/albums/1/photos"
  );
  const photosData = await photosResponse.json();
  console.log("Fetched Photos Data:", photosData[0].url);
  //jsonplaceholder.typicode.com/photos
  https: return (
    <>
      <h1> Root navbar</h1>
      <div>About Layout</div>
      {data.map((post: any) => (
        <div
          className=" p-2 border-solid border-white border rounded-xl m-2"
          key={post.id}
        >
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
      <ul>
        <li>Post ID: {data.id}</li>
        <li>Title: {data.title}</li>
        <li>Body: {data.body}</li>
        <li> </li>
      </ul>
    </>
  );
};

export default Layout;
