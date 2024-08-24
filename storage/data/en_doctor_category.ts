interface Category {
  title: string;
  image: any; // You can define a more specific type for images if needed
}


const doctorCategories : Category[] = [
    { title: 'Cardiology', image: require('../../assets/images/category/Cardiology.png') },
    { title: 'Nephrology', image: require('../../assets/images/category/Nephrology.png') },
    { title: 'Neurology', image: require('../../assets/images/category/Neurology.png') },
    { title: 'Dermatology', image: require('../../assets/images/category/Dermatology.png') },
    { title: 'Orthopedics', image: require('../../assets/images/category/Orthopedics.png') },
    { title: 'Gastroenterology', image: require('../../assets/images/category/Gastroenterology.png') },
    { title: 'Pulmonology', image: require('../../assets/images/category/Pulmonology.png') },
    { title: 'Ophthalmology', image: require('../../assets/images/category/Ophthalmology.png') },
  ];

export default doctorCategories;
