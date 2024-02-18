"use client";

import React from "react";
import axios from "axios";

export default function App() {
  const res = axios.get("https://geolocation-db.com/json/").then((res) => {
    console.log("data : ", res);
  });
  React.useEffect(() => {});
  return <></>;
}
