import BookingList from "./_components/BookingList";

const OnGoing = () => {
  return (
    <div>
      <BookingList filterStatus="Ongoing" />
    </div>
  );
};

export default OnGoing;
