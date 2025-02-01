import BookingList from "./_components/BookingList";

const OnGoing = () => {
  return (
    <div>
      <BookingList filterStatus="PENDING" />
    </div>
  );
};

export default OnGoing;
