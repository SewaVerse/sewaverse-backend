import BookingList from "./_components/BookingList";

const CanceledTab = () => {
  return (
    <div>
      <BookingList filterStatus="CANCELED" />
    </div>
  );
};

export default CanceledTab;
