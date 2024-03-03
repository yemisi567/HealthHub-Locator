import { useEffect, useState } from "react";
import JsonData from "../data/data.json";
import { Navigation } from "./navigation";
import { Header } from "./header";
import { About } from "./about";
import { Services } from "./services";
import { Testimonials } from "./testimonials";
import { Footer } from "./footer";

export const Home = () => {
    const [landingPageData, setLandingPageData] = useState<LandingPageData>(
        {} as LandingPageData
    );
    useEffect(() => {
        setLandingPageData(JsonData);
    }, []);
    return (
        <div>
            <Navigation />
            <Header data={landingPageData.Header} />
            <About data={landingPageData.About} />
            <Services data={landingPageData.Services} />
            <Testimonials data={landingPageData.Testimonials} />
            <Footer />
        </div>
    );
};
