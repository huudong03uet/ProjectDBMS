import React from "react";
import Header from "./../components/Header";
import ShopSectionFilter from "./../components/homeComponents/ShopSectionFilter";
import ContactInfo from "./../components/homeComponents/ContactInfo";
import CalltoActionSection from "./../components/homeComponents/CalltoActionSection";
import Footer from "./../components/Footer";
import FilterBar from "../components/homeComponents/FilterBar";

const HomeScreenFilter = ({ match }) => {
  window.scrollTo(0, 0);

  const keyword = match.params;
  const pagenumber = match.params.pagenumber;
  
  return (
    <div>
      <Header />
      <FilterBar />
      <ShopSectionFilter keyword={keyword} pagenumber={pagenumber} />
      <CalltoActionSection />
      <ContactInfo />
      <Footer />
    </div>
  );
};

export default HomeScreenFilter;
