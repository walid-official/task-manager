import { Route, Routes } from "react-router";
import Root from "./Layouts/Root";
import Login from "./pages/Authentications/Login";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Root></Root>}>
          <Route index element={<Home></Home>}></Route>
          <Route path="login" element={<Login></Login>}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
