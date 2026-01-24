import Footer from "@/components/footer/Footer";
import Heading from "./components/Heading";
import SecondSection from "./components/SecondSection";
import ThirdSection from "./components/ThirdSection";
import StartButton from "./components/StartButton";
import useScrollToTop from "@/hooks/domEvents/useScrollToTop";


const Home = () => {  
  useScrollToTop();

  return(
    <div className="home-container">
      <Heading />
      <SecondSection />
      <ThirdSection />
      <Footer />
      <StartButton />
    </div>
  )
}

export default Home;
