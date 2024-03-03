interface LandingPageData {
    Header: {
      title: string;
      img: string;
      paragraph: string;
    };
    About: {
      paragraph: string;
      Why: string[];
      Why2: string[];
    };
    Services: {
      icon: string;
      name: string;
      text: string;
    }[];
    Testimonials: {
      img: string;
      text: string;
      name: string;
    }[];
  }