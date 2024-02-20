import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../store/userState";
import { useNavigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
};
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/", { replace: true });
    }
  }, [navigate, user]);

  return children;
}
