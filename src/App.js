import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./page/Deshbord";
import {
  action as roomAction,
  loader as interestsLoader,
} from "./components/Form/AddToRoomForm";
import ChatRoom from "./page/Room/ChatRoom";
import Error from "./page/error/Error";
import Wraper from "./components/Ui/Wraper";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Wraper />} errorElement={<Error />}>
      <Route index element={<Navigate to="/dashbord" />} />
      <Route
        path="/dashbord"
        element={<Dashboard />}
        action={roomAction}
        loader={interestsLoader}
      />
      <Route path="/chat" element={<ChatRoom />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
