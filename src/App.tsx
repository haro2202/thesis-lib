import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import TestRoute from "./pages/test-route";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<TestRoute />} path="/test-route" />
    </Routes>
  );
}

export default App;
