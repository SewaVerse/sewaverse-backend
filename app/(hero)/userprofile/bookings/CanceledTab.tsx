import BookingList from "./_components/BookingList"


const CanceledTab = () => {
  return (
    <div>
      <BookingList filterStatus="Cancelled"/>
    </div>
  )
}

export default CanceledTab