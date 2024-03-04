export interface LandingPageData {
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
  export interface HospitalResponse {
    name: string;
    contact: string;
    address: string;
    emergencyServices?: boolean;
    city: string;
    state: string;
    avatar?: string;
    email: string;
    more?: string;
  }