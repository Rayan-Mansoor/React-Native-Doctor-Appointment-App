export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  location: string;
  image: any; 
  rating: number;
  yearsExperience: number;
  patients: number;
  about: string;
}

const doctors: Doctor[] = [
  { id: 1, name: "John Doe", specialty: "Oral Surgery", location: "London", image: require('../../assets/images/doctors/doctor1.png'), rating: 4.5, yearsExperience: 10, patients: 500, about: "Highly skilled oral surgeon specializing in complex tooth extractions and jaw surgeries."},
  { id: 2, name: "Jane Smith", specialty: "Oral Surgery", location: "London", image: require('../../assets/images/doctors/doctor2.png'), rating: 4.0, yearsExperience: 8, patients: 450, about: "Experienced oral surgeon focusing on dental implants and reconstructive procedures."},
  { id: 3, name: "Samantha John", specialty: "Oral Surgery", location: "London", image: require('../../assets/images/doctors/doctor3.png'), rating: 4.8, yearsExperience: 12, patients: 600, about: "Renowned oral surgeon with expertise in corrective jaw surgery and facial trauma."},
  { id: 4, name: "Michael Brown", specialty: "Oral Surgery", location: "New York", image: require('../../assets/images/doctors/doctor4.png'), rating: 4.7, yearsExperience: 15, patients: 700, about: "Skilled oral surgeon specializing in wisdom teeth removal and oral pathology."},
  { id: 5, name: "Emily Davis", specialty: "Pedodontics", location: "Chicago", image: require('../../assets/images/doctors/doctor5.png'), rating: 4.3, yearsExperience: 9, patients: 480, about: "Caring pediatric dentist specializing in child-friendly treatments and preventative care."},
  { id: 6, name: "William Wilson", specialty: "Pedodontics", location: "Los Angeles", image: require('../../assets/images/doctors/doctor6.png'), rating: 4.6, yearsExperience: 11, patients: 550, about: "Skilled pediatric dentist focused on early childhood dental health and cavity prevention."},
  { id: 7, name: "Olivia Martinez", specialty: "Pedodontics", location: "Miami", image: require('../../assets/images/doctors/doctor7.png'), rating: 4.4, yearsExperience: 13, patients: 620, about: "Experienced pediatric dentist providing gentle care for children and teens, with a focus on dental growth and development."},   { id: 8, name: "Robert Garcia", specialty: "Endodontics", location: "San Francisco", image: require('../../assets/images/doctors/doctor8.png'), rating: 4.9, yearsExperience: 18, patients: 800, about: "Renowned endodontist specializing in complex root canal treatments and microsurgery."},
  { id: 9, name: "Sophia Robinson", specialty: "Endodontics", location: "Houston", image: require('../../assets/images/doctors/doctor9.png'), rating: 4.2, yearsExperience: 7, patients: 400, about: "Skilled endodontist focusing on pain management and tooth preservation techniques."},
  { id: 10, name: "James Martinez", specialty: "Endodontics", location: "Dallas", image: require('../../assets/images/doctors/doctor10.png'), rating: 4.1, yearsExperience: 14, patients: 670, about: "Experienced endodontist with expertise in retreatment cases and apicoectomy procedures."},
  { id: 11, name: "Mia Lewis", specialty: "Endodontics", location: "San Antonio", image: require('../../assets/images/doctors/doctor20.png'), rating: 4.8, yearsExperience: 11, patients: 600, about: "Skilled endodontist with a passion for patient education and preventive care."},
  { id: 12, name: "Christopher Young", specialty: "Prosthodontics", location: "San Diego", image: require('../../assets/images/doctors/doctor14.png'), rating: 4.3, yearsExperience: 12, patients: 680, about: "Experienced prosthodontist specializing in full mouth rehabilitation and cosmetic dentistry."},
  { id: 13, name: "Charlotte Allen", specialty: "Prosthodontics", location: "Austin", image: require('../../assets/images/doctors/doctor15.png'), rating: 4.6, yearsExperience: 9, patients: 480, about: "Skilled prosthodontist focusing on implant-supported prostheses and smile makeovers."},
  { id: 14, name: "Daniel King", specialty: "Prosthodontics", location: "Jacksonville", image: require('../../assets/images/doctors/doctor16.png'), rating: 4.4, yearsExperience: 14, patients: 690, about: "Dedicated prosthodontist with expertise in CAD/CAM technology for precise dental restorations."},
  { id: 15, name: "Amelia Wright", specialty: "Orthodontics", location: "Columbus", image: require('../../assets/images/doctors/doctor17.png'), rating: 4.9, yearsExperience: 17, patients: 780, about: "Renowned orthodontist specializing in complex cases and innovative bracing techniques."},
  { id: 16, name: "Ethan Scott", specialty: "Orthodontics", location: "Fort Worth", image: require('../../assets/images/doctors/doctor18.png'), rating: 4.2, yearsExperience: 8, patients: 450, about: "Skilled orthodontist focusing on early intervention and interceptive orthodontics."},
  { id: 17, name: "Abigail Green", specialty: "Orthodontics", location: "Indianapolis", image: require('../../assets/images/doctors/doctor19.png'), rating: 4.1, yearsExperience: 13, patients: 640, about: "Experienced orthodontist with expertise in clear aligner therapy and lingual braces."},
  { id: 18, name: "Aiden Baker", specialty: "Periodontics", location: "Charlotte", image: require('../../assets/images/doctors/doctor13.png'), rating: 4.5, yearsExperience: 11, patients: 600, about: "Dedicated periodontist specializing in gum disease treatment and periodontal plastic surgery."},
  { id: 19, name: "Isabella Hernandez", specialty: "Periodontics", location: "Phoenix", image: require('../../assets/images/doctors/doctor11.png'), rating: 4.5, yearsExperience: 10, patients: 550, about: "Dedicated periodontist specializing in the prevention and treatment of gum diseases."},
  { id: 20, name: "David Clark", specialty: "Periodontics", location: "Philadelphia", image: require('../../assets/images/doctors/doctor12.png'), rating: 4.7, yearsExperience: 16, patients: 720, about: "Expert periodontist focusing on dental implants, gum grafts, and advanced periodontal therapies."}
];

export default doctors;