import React, { useEffect } from "react";
import { useDateCheck } from "./../hooks/useDateCheck";

export default function Main() {
  const { checkDate } = useDateCheck();

  useEffect(() => {
    checkDate();
  }, []);

  return <div>Main</div>;
}
