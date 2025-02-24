import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./AppRouting";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster richColors />
    </>

  );
}

export default App;