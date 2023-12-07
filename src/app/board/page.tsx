"use client";
import React, { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import BoardMain from "../components/board/BoardMain";

export default function BoardPage() {
  return (
    <>
      <BoardMain></BoardMain>
    </>
  );
}
