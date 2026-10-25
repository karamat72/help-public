export interface CountryData {
  code: string;
  name: string;
  flag: string;
  phoneCode: string;
  lat: number;
  lng: number;
  regionLabel: string; // "Province", "State", "Territory", "Region"
  districtLabel: string; // "District", "County", "Department", "Arrondissement"
  regions: {
    name: string;
    districts: {
      name: string;
      cities: {
        name: string;
        neighborhoods: string[];
      }[];
    }[];
  }[];
}

export const COUNTRIES_DATA: CountryData[] = [
  {
    code: 'PK',
    name: 'Pakistan',
    flag: '🇵🇰',
    phoneCode: '+92',
    lat: 30.3753,
    lng: 69.3451,
    regionLabel: 'Province / Territory',
    districtLabel: 'District',
    regions: [
      {
        name: 'Punjab',
        districts: [
          {
            name: 'Lahore',
            cities: [
              {
                name: 'Lahore',
                neighborhoods: ['Gulberg', 'Model Town', 'DHA Phase 5', 'Johar Town', 'Anarkali', 'Shadman', 'Faisal Town']
              }
            ]
          },
          {
            name: 'Rawalpindi',
            cities: [
              {
                name: 'Rawalpindi',
                neighborhoods: ['Saddar', 'Bahria Town', 'Satellite Town', 'Westridge', 'Chaklala']
              }
            ]
          },
          {
            name: 'Faisalabad',
            cities: [
              {
                name: 'Faisalabad',
                neighborhoods: ['Madina Town', 'D Ground', 'Jinnah Colony', 'Peoples Colony']
              }
            ]
          }
        ]
      },
      {
        name: 'Sindh',
        districts: [
          {
            name: 'Karachi South',
            cities: [
              {
                name: 'Karachi',
                neighborhoods: ['Clifton', 'Saddar', 'DHA Phase 6', 'Burns Road', 'Civil Lines']
              }
            ]
          },
          {
            name: 'Karachi East',
            cities: [
              {
                name: 'Karachi',
                neighborhoods: ['Gulshan-e-Iqbal', 'PECHS', 'Bahadurabad', 'University Road']
              }
            ]
          },
          {
            name: 'Hyderabad',
            cities: [
              {
                name: 'Hyderabad',
                neighborhoods: ['Latifabad', 'Qasimabad', 'Auto Bhan', 'Saddar']
              }
            ]
          }
        ]
      },
      {
        name: 'Khyber Pakhtunkhwa',
        districts: [
          {
            name: 'Peshawar',
            cities: [
              {
                name: 'Peshawar',
                neighborhoods: ['Hayatabad', 'University Town', 'City Saddar', 'Gulbahar']
              }
            ]
          }
        ]
      },
      {
        name: 'Islamabad Capital Territory',
        districts: [
          {
            name: 'Islamabad',
            cities: [
              {
                name: 'Islamabad',
                neighborhoods: ['F-6 Super Market', 'F-7 Jinnah Super', 'G-9 Markaz', 'I-8 Sector', 'Blue Area', 'E-11']
              }
            ]
          }
        ]
      }
    ]
  },
  {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    phoneCode: '+1',
    lat: 37.0902,
    lng: -95.7129,
    regionLabel: 'State',
    districtLabel: 'County',
    regions: [
      {
        name: 'California',
        districts: [
          {
            name: 'Los Angeles County',
            cities: [
              {
                name: 'Los Angeles',
                neighborhoods: ['Downtown LA', 'Hollywood', 'Silver Lake', 'Venice', 'Koreatown', 'Echo Park']
              },
              {
                name: 'Long Beach',
                neighborhoods: ['Belmont Shore', 'Downtown Long Beach', 'Bixby Knolls']
              }
            ]
          },
          {
            name: 'San Francisco County',
            cities: [
              {
                name: 'San Francisco',
                neighborhoods: ['Mission District', 'SoMa', 'Richmond', 'Castro', 'Pacific Heights']
              }
            ]
          }
        ]
      },
      {
        name: 'New York',
        districts: [
          {
            name: 'New York County (Manhattan)',
            cities: [
              {
                name: 'New York',
                neighborhoods: ['Harlem', 'Lower East Side', 'Upper West Side', 'Chelsea', 'East Village', 'Midtown']
              }
            ]
          },
          {
            name: 'Kings County (Brooklyn)',
            cities: [
              {
                name: 'New York',
                neighborhoods: ['Williamsburg', 'Crown Heights', 'Bushwick', 'Park Slope', 'Bedford-Stuyvesant']
              }
            ]
          }
        ]
      },
      {
        name: 'Texas',
        districts: [
          {
            name: 'Harris County',
            cities: [
              {
                name: 'Houston',
                neighborhoods: ['Montrose', 'The Heights', 'Downtown', 'Midtown', 'East End']
              }
            ]
          },
          {
            name: 'Travis County',
            cities: [
              {
                name: 'Austin',
                neighborhoods: ['Downtown Austin', 'South Congress', 'East Austin', 'Zilker']
              }
            ]
          }
        ]
      }
    ]
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    flag: '🇬🇧',
    phoneCode: '+44',
    lat: 55.3781,
    lng: -3.4360,
    regionLabel: 'Constituent Country / Region',
    districtLabel: 'Borough / Council',
    regions: [
      {
        name: 'England - Greater London',
        districts: [
          {
            name: 'Camden',
            cities: [
              {
                name: 'London',
                neighborhoods: ['Camden Town', 'Hampstead', 'Kentish Town', 'Bloomsbury']
              }
            ]
          },
          {
            name: 'Hackney',
            cities: [
              {
                name: 'London',
                neighborhoods: ['Shoreditch', 'Dalston', 'Stoke Newington', 'London Fields']
              }
            ]
          },
          {
            name: 'Westminster',
            cities: [
              {
                name: 'London',
                neighborhoods: ['Soho', 'Marylebone', 'Paddington', 'Mayfair']
              }
            ]
          }
        ]
      },
      {
        name: 'England - West Midlands',
        districts: [
          {
            name: 'Birmingham Council',
            cities: [
              {
                name: 'Birmingham',
                neighborhoods: ['Digbeth', 'Jewellery Quarter', 'Edgbaston', 'Moseley', 'Selly Oak']
              }
            ]
          }
        ]
      },
      {
        name: 'Scotland',
        districts: [
          {
            name: 'City of Edinburgh',
            cities: [
              {
                name: 'Edinburgh',
                neighborhoods: ['Old Town', 'New Town', 'Leith', 'Stockbridge', 'Haymarket']
              }
            ]
          }
        ]
      }
    ]
  },
  {
    code: 'FR',
    name: 'France',
    flag: '🇫🇷',
    phoneCode: '+33',
    lat: 46.2276,
    lng: 2.2137,
    regionLabel: 'Région',
    districtLabel: 'Département',
    regions: [
      {
        name: 'Île-de-France',
        districts: [
          {
            name: 'Paris (75)',
            cities: [
              {
                name: 'Paris',
                neighborhoods: ['11e Arrondissement', '18e Montmartre', '10e Canal St-Martin', '13e Tolbiac', '4e Le Marais']
              }
            ]
          }
        ]
      },
      {
        name: 'Auvergne-Rhône-Alpes',
        districts: [
          {
            name: 'Rhône (69)',
            cities: [
              {
                name: 'Lyon',
                neighborhoods: ['Presqu’île', 'Croix-Rousse', 'Vieux Lyon', 'Part-Dieu']
              }
            ]
          }
        ]
      }
    ]
  },
  {
    code: 'IN',
    name: 'India',
    flag: '🇮🇳',
    phoneCode: '+91',
    lat: 20.5937,
    lng: 78.9629,
    regionLabel: 'State / UT',
    districtLabel: 'District / Ward',
    regions: [
      {
        name: 'Maharashtra',
        districts: [
          {
            name: 'Mumbai Suburban',
            cities: [
              {
                name: 'Mumbai',
                neighborhoods: ['Bandra West', 'Andheri East', 'Juhu', 'Kurla', 'Powai']
              }
            ]
          }
        ]
      },
      {
        name: 'Delhi NCR',
        districts: [
          {
            name: 'New Delhi',
            cities: [
              {
                name: 'New Delhi',
                neighborhoods: ['Connaught Place', 'Lajpat Nagar', 'Hauz Khas', 'Rohini', 'Dwarka']
              }
            ]
          }
        ]
      },
      {
        name: 'Karnataka',
        districts: [
          {
            name: 'Bengaluru Urban',
            cities: [
              {
                name: 'Bengaluru',
                neighborhoods: ['Indiranagar', 'Koramangala', 'Whitefield', 'HSR Layout', 'Jayanagar']
              }
            ]
          }
        ]
      }
    ]
  },
  {
    code: 'KE',
    name: 'Kenya',
    flag: '🇰🇪',
    phoneCode: '+254',
    lat: -1.2921,
    lng: 36.8219,
    regionLabel: 'County',
    districtLabel: 'Sub-County',
    regions: [
      {
        name: 'Nairobi County',
        districts: [
          {
            name: 'Westlands Sub-County',
            cities: [
              {
                name: 'Nairobi',
                neighborhoods: ['Parklands', 'Kilimani', 'Kileleshwa', 'Lavington', 'Kibera']
              }
            ]
          }
        ]
      }
    ]
  },
  {
    code: 'BR',
    name: 'Brazil',
    flag: '🇧🇷',
    phoneCode: '+55',
    lat: -14.2350,
    lng: -51.9253,
    regionLabel: 'Estado',
    districtLabel: 'Município',
    regions: [
      {
        name: 'São Paulo',
        districts: [
          {
            name: 'Região Metropolitana de SP',
            cities: [
              {
                name: 'São Paulo',
                neighborhoods: ['Pinheiros', 'Vila Madalena', 'Paulista', 'Itaquera', 'Santo Amaro']
              }
            ]
          }
        ]
      }
    ]
  },
  {
    code: 'EG',
    name: 'Egypt',
    flag: '🇪🇬',
    phoneCode: '+20',
    lat: 26.8206,
    lng: 30.8025,
    regionLabel: 'Governorate (Muhafazah)',
    districtLabel: 'Markaz / Qism',
    regions: [
      {
        name: 'Cairo Governorate',
        districts: [
          {
            name: 'West Cairo',
            cities: [
              {
                name: 'Cairo',
                neighborhoods: ['Zamalek', 'Maadi', 'Nasr City', 'Heliopolis', 'Shubra']
              }
            ]
          }
        ]
      }
    ]
  }
];

export const DEFAULT_COUNTRY = COUNTRIES_DATA[1]; // US (matches screen mockup: New York, USA)
