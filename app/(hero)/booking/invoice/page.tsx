

import InvoiceAndContactInfo from "./_components/InvoiceAndContactInfo";
import LeftInvoice from "./_components/LeftInvoice";


const LeftInvoiceData= {
  name:'Rohan Shrestha',
  phone:'981111111111',
  email:' bishalshrestha@gmail.com',
  address:'Balaju, Tarakeshwor-3, Kathmandu, Bagmati Province'


}

const ServicesData ={
  serviceName:'Exterior House Painting',
  serviceBy:'Bishal Shrestha',
  joined:'Jan, 2024',
  servicesDelivered:'100 Services Delivered',
  experience:'5 Yrs Experience',
  price: 30000,
  discount:30,
  date: "2024-01-01",
  time:"Morning",


}

const calcualteAfterDiscount = (price:number, discount:number) =>{
  return price - (price * discount /100)
}

const InvoiceDetails = () => {

  const updatedSercicesData = {
    ...ServicesData,
    afterDiscount : calcualteAfterDiscount(ServicesData.price, ServicesData.discount)
  }
  return (
    <div className=" md:flex md:px-12 md:py-5">
      <LeftInvoice  LeftInvoiceData ={LeftInvoiceData} servicesData = {updatedSercicesData} />
      <InvoiceAndContactInfo />
    </div>
  );
};

export default InvoiceDetails;
