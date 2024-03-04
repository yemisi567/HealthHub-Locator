import { faker } from "@faker-js/faker";

// Function to generate fake hospital data
const generateFakeHospitals = (count, state, city) => {
  const hospitals = [];
  for (let i = 0; i < count; i++) {
    const hospital = {
      name: faker.company.name(),
      avatar: faker.image.urlLoremFlickr({ category: "hospitals" }),
      location: `${city}, ${state}, Nigeria`,
      email: faker.internet.email(),
      address: faker.location.streetAddress(),
      contact: faker.phone.number(),
      specialties: faker.word,
      emergencyServices: faker.datatype.boolean(),
      city,
      state,
    };
    hospitals.push(hospital);
  }
  return hospitals;
};

export const statesAndCitiesNigeria = {
  Abia: [
    "Umuahia",
    "Aba",
    "Ohafia",
    "Arochukwu",
    "Osisioma",
    "Isiala Ngwa",
    "Bende",
    "Umunneochi",
    "Ikwuano",
    "Ukwa West",
  ],

  Anambra: [
    "Awka",
    "Onitsha",
    "Nnewi",
    "Aguata",
    "Oyi",
    "Njikoka",
    "Orumba South",
    "Orumba North",
    "Ogbaru",
    "Idemili North",
  ],

  Bayelsa: [
    "Yenagoa",
    "Sagbama",
    "Ekeremor",
    "Brass",
    "Nembe",
    "Kolokuma/Opokuma",
    "Southern Ijaw",
    "Membe",
  ],
  Delta: [
    "Asaba",
    "Warri",
    "Sapele",
    "Ughelli",
    "Ozoro",
    "Agbor",
    "Ogwashi-Uku",
    "Burutu",
  ],

  Edo: [
    "Benin City",
    "Auchi",
    "Uromi",
    "Ikpoba Okha",
    "Etsako Central",
    "Oredo",
    "Uhunmwonde",
    "Ovia North-East",
  ],
  Ekiti: [
    "Ado Ekiti",
    "Ikere Ekiti",
    "Ikole Ekiti",
    "Efon Alaaye",
    "Ode Ekiti",
    "Ise Ekiti",
    "Ido Osi",
    "Gbonyin",
  ],
  Enugu: [
    "Enugu",
    "Nsukka",
    "Awgu",
    "Udi",
    "Oji River",
    "Igbo Etiti",
    "Igbo Eze South",
    "Udenu",
  ],
  Gombe: [
    "Gombe",
    "Bajoga",
    "Kumo",
    "Dukku",
    "Funakaye",
    "Akko",
    "Gombe",
    "Kaltungo",
  ],

  Jigawa: [
    "Dutse",
    "Hadejia",
    "Gumel",
    "Kazaure",
    "Birnin Kudu",
    "Birnin Kebbi",
    "Kiyawa",
    "Malammadori",
  ],
  Kaduna: [
    "Kaduna",
    "Zaria",
    "Kafanchan",
    "Makarfi",
    "Kauru",
    "Kudan",
    "Kachia",
    "Giwa",
  ],
  Kano: [
    "Kano",
    "Katsina",
    "Daura",
    "Funtua",
    "Bichi",
    "Kura",
    "Dawakin Tofa",
    "Madobi",
  ],
  Kogi: [
    "Lokoja",
    "Okene",
    "Idah",
    "Kabba",
    "Ogidi",
    "Ankpa",
    "Olamaboro",
    "Ijumu",
  ],
  Kwara: [
    "Ilorin",
    "Offa",
    "Ilorin",
    "Omu Aran",
    "Jebba",
    "Osi",
    "Ilorin",
    "Patigi",
  ],
  Lagos: [
    "Lagos",
    "Ikeja",
    "Lekki",
    "Ajah",
    "Badagry",
    "Lagos Island",
    "Apapa",
    "Yaba",
  ],
  Nasarawa: [
    "Lafia",
    "Keffi",
    "Akwanga",
    "Nasarawa Egon",
    "Doma",
    "Nasarawa",
    "Karu",
    "Toto",
  ],

  Ogun: [
    "Abeokuta",
    "Sagamu",
    "Ijebu Ode",
    "Ilaro",
    "Owode",
    "Abeokuta North",
    "Abeokuta South",
    "Ijebu East",
  ],
  Ondo: [
    "Akure",
    "Ondo",
    "Owo",
    "Okitipupa",
    "Irele",
    "Ondo",
    "Idanre",
    "Ilaje",
  ],

  Oyo: [
    "Ibadan",
    "Oyo",
    "Ogbomosho",
    "Iseyin",
    "Igboho",
    "Eruwa",
    "Saki",
    "Ibadan",
  ],
  Plateau: [
    "Jos",
    "Bukuru",
    "Pankshin",
    "Shendam",
    "Barkin Ladi",
    "Langtang",
    "Mangu",
    "Jos",
  ],
  Rivers: [
    "Port Harcourt",
    "Bonny",
    "Degema",
    "Bori",
    "Eleme",
    "Ahoada",
    "Ikwerre",
    "Port Harcourt",
  ],
  Yobe: [
    "Damaturu",
    "Nguru",
    "Potiskum",
    "Gashua",
    "Buni Yadi",
    "Tarmuwa",
    "Geidam",
    "Gujba",
  ],
  Zamfara: [
    "Gusau",
    "Zurmi",
    "Anka",
    "Talata Mafara",
    "Maru",
    "Shinkafi",
    "Bakura",
    "Bungudu",
  ],
};
// Function to generate fake hospitals for all states and cities
export const generateAllHospitals = () => {
  const allHospitals = [];

  // Iterate over each state
  for (const state in statesAndCitiesNigeria) {
    // Iterate over each city in the state
    for (const city of statesAndCitiesNigeria[state]) {
      const hospitalsInCity = generateFakeHospitals(10, state, city);
      allHospitals.push(...hospitalsInCity);
    }
  }

  return allHospitals;
};

export const generateFilteredHospitals = (selectedState, selectedCity) => {
  const allHospitals = [];

  Object.keys(statesAndCitiesNigeria).forEach((state) => {
    Object.values(statesAndCitiesNigeria[state]).forEach((city) => {
      // Check if the current state and city match the selected state and city
      if (state === selectedState && city === selectedCity) {
        const hospitalsInCity = generateFakeHospitals(10, state, city);
        allHospitals.push(...hospitalsInCity);
      }
    });
  });

  return allHospitals;
};

export const addNewHospital = (newHospital) => {
  // Get existing hospitals from local storage
  const existingHospitals = JSON.parse(localStorage.getItem("hospitals")) || [];

  // Add the new hospital to the existing list
  existingHospitals.push(newHospital);

  // Save the updated list back to local storage
  localStorage.setItem("hospitals", JSON.stringify(existingHospitals));
};

export const getStoredHospitals = () => {
  // Retrieve hospitals from local storage
  return JSON.parse(localStorage.getItem("hospitals")) || [];
};
export const states = Object.keys(statesAndCitiesNigeria);
