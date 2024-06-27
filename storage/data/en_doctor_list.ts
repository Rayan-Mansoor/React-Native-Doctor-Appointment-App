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
  { id: 1, name: "Dr. John Doe", specialty: "Cardiology", location: "London", image: require('../../assets/doctor1.png'), rating: 4.5, yearsExperience: 10, patients: 500, about: "Experienced cardiologist with a passion for patient care."},
  { id: 2, name: "Dr. Jane Smith", specialty: "Dermatology", location: "London", image: require('../../assets/doctor2.png'), rating: 4.0, yearsExperience: 8, patients: 450, about: "Skilled dermatologist specializing in skin care and cosmetic procedures."},
  { id: 3, name: "Dr. Samantha John", specialty: "Neurology", location: "London", image: require('../../assets/doctor3.png'), rating: 4.8, yearsExperience: 12, patients: 600, about: "Neurologist with a focus on treating neurological disorders."},
  { id: 4, name: "Dr. Michael Brown", specialty: "Orthopedics", location: "New York", image: require('../../assets/doctor4.png'), rating: 4.7, yearsExperience: 15, patients: 700, about: "Orthopedic surgeon specializing in joint replacements and sports injuries."},
  { id: 5, name: "Dr. Emily Davis", specialty: "Gastroenterology", location: "Chicago", image: require('../../assets/doctor5.png'), rating: 4.3, yearsExperience: 9, patients: 480, about: "Gastroenterologist focusing on digestive health and diseases."},
  { id: 6, name: "Dr. William Wilson", specialty: "Nephrology", location: "Los Angeles", image: require('../../assets/doctor6.png'), rating: 4.6, yearsExperience: 11, patients: 550, about: "Nephrologist treating kidney disorders and renal diseases."},
  { id: 7, name: "Dr. Olivia Martinez", specialty: "Pulmonology", location: "Miami", image: require('../../assets/doctor7.png'), rating: 4.4, yearsExperience: 13, patients: 620, about: "Pulmonologist specializing in respiratory conditions and lung diseases."},
  { id: 8, name: "Dr. Robert Garcia", specialty: "Ophthalmology", location: "San Francisco", image: require('../../assets/doctor8.png'), rating: 4.9, yearsExperience: 18, patients: 800, about: "Ophthalmologist with expertise in eye care and vision correction."},
  { id: 9, name: "Dr. Sophia Robinson", specialty: "Pulmonology", location: "Houston", image: require('../../assets/doctor9.png'), rating: 4.2, yearsExperience: 7, patients: 400, about: "Dedicated pulmonologist providing comprehensive care for respiratory issues."},
  { id: 10, name: "Dr. James Martinez", specialty: "Nephrology", location: "Dallas", image: require('../../assets/doctor10.png'), rating: 4.1, yearsExperience: 14, patients: 670, about: "Experienced nephrologist specializing in kidney care and dialysis."},
  { id: 11, name: "Dr. Isabella Hernandez", specialty: "Dermatology", location: "Phoenix", image: require('../../assets/doctor11.png'), rating: 4.5, yearsExperience: 10, patients: 550, about: "Dermatologist focusing on skin health and cosmetic dermatology."},
  { id: 12, name: "Dr. David Clark", specialty: "Gastroenterology", location: "Philadelphia", image: require('../../assets/doctor12.png'), rating: 4.7, yearsExperience: 16, patients: 720, about: "Gastroenterologist specializing in digestive disorders and endoscopic procedures."},
  { id: 13, name: "Dr. Mia Lewis", specialty: "Neurology", location: "San Antonio", image: require('../../assets/doctor20.png'), rating: 4.8, yearsExperience: 11, patients: 600, about: "Neurologist with expertise in neurological conditions and treatments."},
  { id: 14, name: "Dr. Christopher Young", specialty: "Orthopedics", location: "San Diego", image: require('../../assets/doctor14.png'), rating: 4.3, yearsExperience: 12, patients: 680, about: "Orthopedic surgeon specializing in sports medicine and joint surgeries."},
  { id: 15, name: "Dr. Charlotte Allen", specialty: "Cardiology", location: "Austin", image: require('../../assets/doctor15.png'), rating: 4.6, yearsExperience: 9, patients: 480, about: "Cardiologist focusing on heart health and cardiovascular diseases."},
  { id: 16, name: "Dr. Daniel King", specialty: "Cardiology", location: "Jacksonville", image: require('../../assets/doctor16.png'), rating: 4.4, yearsExperience: 14, patients: 690, about: "Cardiologist specializing in preventive cardiology and heart care."},
  { id: 17, name: "Dr. Amelia Wright", specialty: "Ophthalmology", location: "Columbus", image: require('../../assets/doctor17.png'), rating: 4.9, yearsExperience: 17, patients: 780, about: "Ophthalmologist providing comprehensive eye care services and treatments."},
  { id: 18, name: "Dr. Ethan Scott", specialty: "Pulmonology", location: "Fort Worth", image: require('../../assets/doctor18.png'), rating: 4.2, yearsExperience: 8, patients: 450, about: "Pulmonologist specializing in respiratory care and lung diseases."},
  { id: 19, name: "Dr. Abigail Green", specialty: "Gastroenterology", location: "Indianapolis", image: require('../../assets/doctor19.png'), rating: 4.1, yearsExperience: 13, patients: 640, about: "Gastroenterologist with expertise in gastrointestinal disorders and treatments."},
  { id: 20, name: "Dr. Aiden Baker", specialty: "Ophthalmology", location: "Charlotte", image: require('../../assets/doctor13.png'), rating: 4.5, yearsExperience: 11, patients: 600, about: "Ophthalmologist specializing in advanced eye surgeries and vision correction techniques."},
];

export default doctors;
