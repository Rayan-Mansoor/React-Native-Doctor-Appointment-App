interface Category {
  title: string;
  image: any; // You can define a more specific type for images if needed
}


const doctorCategories : Category[] = [
    { title: 'Cardiology', image: require('../../assets/Cardiology.png') },
    { title: 'Nephrology', image: require('../../assets/Nephrology.png') },
    { title: 'Neurology', image: require('../../assets/Neurology.png') },
    { title: 'Dermatology', image: require('../../assets/Dermatology.png') },
    { title: 'Orthopedics', image: require('../../assets/Orthopedics.png') },
    { title: 'Gastroenterology', image: require('../../assets/Gastroenterology.png') },
    { title: 'Pulmonology ', image: require('../../assets/Pulmonology.png') },
    { title: 'Ophthalmology', image: require('../../assets/Ophthalmology.png') },
  ];

export default doctorCategories;
