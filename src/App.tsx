import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import LandingPage from "./pages/LandingPage/LandingPage";
import BeritaPages from "./pages/Berita/BeritaPages";
import PemesananPages from "./pages/OrderLIst/PemesananPages";
import ListBarangPages from "./pages/ItemList/ListBarangPages";
import HasilUjiPages from "./pages/HasilUji/HasilUjiPages";
import TestimoniPages from "./pages/Testimoni/TestimoniPages";
import ListMemberPages from "./pages/ListMember/ListMemberPages";
import LandingLayout from "./layout/LandingLayout";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import HasilUji from "./landing/components/TestResult/HasilUji";
import Berita from "./landing/components/Berita/Berita";
import BeritaDetail from "./landing/components/Berita/BeritaDetail";
import Order from "./landing/components/Pemesanan/Order/page";
import OrderDetail from "./landing/components/Pemesanan/OrderDetail/page";
import CartPage from "./landing/components/Pemesanan/Cart/page";

export default function App() {
   useEffect(() => {
      AOS.init({ offset: 100, duration: 600, easing: "ease-in-sine", delay: 100 });
    }, []);
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />

            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />

            {/* Order List */}
            <Route path="/pemesanan" element={<PemesananPages />} />
            {/* Berita */}
            <Route path="/berita" element={<BeritaPages />} />
            {/* List Barang */}
            <Route path="/listbarang" element={<ListBarangPages />} />
            {/* Hasil Uji */}
            <Route path="/hasiluji" element={<HasilUjiPages />} />
            {/* Testimoni */}
            <Route path="/testimoni" element={<TestimoniPages />} />
            {/* List Member */}
            <Route path="/listmember" element={<ListMemberPages />} />

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          <Route element={<LandingLayout />}>
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/beritaland" element={<Berita />} />
            <Route path="/beritaland/:id" element={<BeritaDetail />} />
            <Route path="/hasilujiland" element={<HasilUji />} />
            <Route path="/orderland" element={<Order />} />
            <Route path="/orderland/:id" element={<OrderDetail />} />
            <Route path="/cart/:id" element={<CartPage />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
