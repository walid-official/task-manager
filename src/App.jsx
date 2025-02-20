import { Route, Routes } from "react-router";
import Root from "./Layouts/Root";
import Login from "./pages/Authentications/Login";
import Home from "./pages/Home";
import Hero from "./components/Hero/Hero";
import AddTask from "./components/AddTask/AddTask";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Root></Root>}>
          <Route index element={<Home></Home>}></Route>
          <Route path="hero" element={<Hero></Hero>}></Route>
          <Route path="add-task" element={<AddTask></AddTask>}></Route>
          <Route path="login" element={<Login></Login>}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
