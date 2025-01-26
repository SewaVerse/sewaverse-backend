import Image from "next/image";

interface offerData {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
}

interface OfferProps {
  offers: offerData[];
}

const Offer = ({ offers }: OfferProps) => {
  return (
    <div>
      <h1 className="text-2xl font-medium py-2">Offers</h1>
      <div className="grid md:grid-cols-3 gap-8 shadow-md  ">
        {offers.map((offer) => (
          <div key={offer.id} className="md:w-[300px] md:h-auto mb-3 border shadow-md ">
            <div className="w-full h-[200px]">
              <Image
                src={offer.image}
                alt={offer.title}
                height={200}
                width={300}
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-2xl px-1">{offer.title}</h1>
            <div className="w-full p-2">
              <p className="text-muted-foreground text-sm line-clamp-3">
                {offer.description}
              </p>
            </div>
            <p className="py-2 px-1">{offer.date}</p>
          </div>
        ))}
        {offers.length === 0 && (
          <p className="text-center text-muted-foreground">
            No offers available at the moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default Offer;
