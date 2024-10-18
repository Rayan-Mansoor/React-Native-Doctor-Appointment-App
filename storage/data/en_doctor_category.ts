interface Category {
  title: string;
  image: any; // You can define a more specific type for images if needed
}


const doctorCategories : Category[] = [
    { title: 'Orthodontics', image: require('../../assets/images/category/Orthodontics.png') },
    { title: 'Prosthodontics', image: require('../../assets/images/category/Prosthodontics.png') },
    { title: 'Endodontics', image: require('../../assets/images/category/Endodontics.png') },
    { title: 'Periodontics', image: require('../../assets/images/category/Periodontics.png') },
    { title: 'Pedodontics', image: require('../../assets/images/category/Pedodontics.png') },
    { title: 'Oral Surgery', image: require('../../assets/images/category/Oral Surgery.png') }
  ];

export default doctorCategories;
