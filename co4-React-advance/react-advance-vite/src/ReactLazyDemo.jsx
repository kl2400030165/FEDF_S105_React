import React, { Suspense } from "react";

 //Lazy load Profile component
const Profile = React.lazy(() => import("./Profile"));

export default function Lazy() {
  return (
    <div>
      <h1>Home Page</h1>
      
      <Suspense fallback={<p>Loading Profile...</p>}>
        <Profile />
      </Suspense>
    </div>
  );
}