import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Learn from "./pages/Learn/Learn";
import Practice from "./pages/Practice/Practice";
import Restaurant from "./pages/Restaurant/Restaurant";
import History from "./pages/History/History";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/restaurant" element={<Restaurant />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
