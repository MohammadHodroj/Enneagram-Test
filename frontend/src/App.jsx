import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import TestPage from "./components/TestPage";
import Layout from "./components/Layout";
import Landing from "./components/Landing";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/test" element={<TestPage />} />
      </Route>
    </Routes>
  );
};

export default App;
