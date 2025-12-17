"use client";

import { useTheme } from "next-themes";
import { ToastContainer } from "react-toastify";

const ContainerToast = () => {
  const { resolvedTheme } = useTheme();

  return <ToastContainer theme={resolvedTheme} />;
};

export default ContainerToast;
