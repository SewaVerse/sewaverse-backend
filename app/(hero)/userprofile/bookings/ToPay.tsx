import BookingList from "./_components/BookingList";

const ToPay = () => {
  return (
    <div>
      <BookingList filterStatus="TOPAY" />
    </div>
  );
};

export default ToPay;
