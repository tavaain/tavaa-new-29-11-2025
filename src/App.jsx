import { RouterProvider } from "react-router-dom";
import { router } from "./Components/Router/Router";

function App() {
  return (
    <>
      {/* Full-screen layout */}
      <div className="w-full min-h-screen">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
