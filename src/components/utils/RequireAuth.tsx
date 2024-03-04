import React, { useEffect } from "react";
import { auth } from "../../../firebase";
import { Navigate } from "react-router-dom";
import { User } from "firebase/auth";

export function RequireAuth({ children }: { children: JSX.Element }) {
  const [user, setUser] = React.useState<User | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log(user, "u");
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  if (user === undefined) {
    return <div>Loading...</div>;
  } else if (user) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" replace />;
  }
}
