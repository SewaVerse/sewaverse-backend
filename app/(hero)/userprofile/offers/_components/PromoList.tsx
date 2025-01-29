import PromoCard from "./PromoCard";

const promocodesData = [
  {
    code: "EX1234SS5",
    discount: "10% DISCOUNT",
    service: "All sewa",
    providedBy: "SewaVerse",
    dateRange: "Starts on 25-26 Jan | Expires on 25-26 Jan",
    status: "Collect",
  },
  {
    code: "EX5678SS9",
    discount: "15% DISCOUNT",
    service: "Sewa 1,2",
    providedBy: "Bishal Shrstha",
    dateRange: "Starts on 01-02 Feb | Expires on 01-02 Feb",
    status: "recently",
  },
  {
    code: "EX5678SS9",
    discount: "15% DISCOUNT",
    service: "All sewa",
    providedBy: "sewaverse",
    dateRange: "Starts on 01-02 Feb | Expires on 01-02 Feb",
    status: "Collect",
  },
  {
    code: "EX5678SS9",
    discount: "15% DISCOUNT",
    service: "All sewa",
    providedBy: "sewaverse",
    dateRange: "Starts on 01-02 Feb | Expires on 01-02 Feb",
    status: "Collect",
  },
  {
    code: "EX5678SS9",
    discount: "15% DISCOUNT",
    service: "All sewa",
    providedBy: "sewaverse",
    dateRange: "Starts on 01-02 Feb | Expires on 01-02 Feb",
    status: "Collect",
  },
  {
    code: "EX5678SS9",
    discount: "15% DISCOUNT",
    service: "Sewa 1,2",
    providedBy: "Bishal Shrstha",
    dateRange: "Starts on 01-02 Feb | Expires on 01-02 Feb",
    status: "recently",
  },
  {
    code: "EX5678SS9",
    discount: "15% DISCOUNT",
    service: "Sewa 1,2",
    providedBy: "Bishal Shrstha",
    dateRange: "Starts on 01-02 Feb | Expires on 01-02 Feb",
    status: "recently",
  },
  {
    code: "EX5678SS9",
    discount: "15% DISCOUNT",
    service: "Sewa 1,2",
    providedBy: "Bishal Shrstha",
    dateRange: "Starts on 01-02 Feb | Expires on 01-02 Feb",
    status: "recently",
  },
  {
    code: "EX5678SS9",
    discount: "15% DISCOUNT",
    service: "Sewa 1,2",
    providedBy: "Bishal Shrstha",
    dateRange: "Starts on 01-02 Feb | Expires on 01-02 Feb",
    status: "recently",
  },
  {
    code: "EX5678SS9",
    discount: "15% DISCOUNT",
    service: "Sewa 1,2",
    providedBy: "Bishal Shrstha",
    dateRange: "Starts on 01-02 Feb | Expires on 01-02 Feb",
    status: "recently",
  },
];

interface PromoListProp {
  filterStatus?: "Collect" | "Expired" | "recently";
}

const PromoList = ({ filterStatus }: PromoListProp) => {
  // Filter promocodes based on the filterStatus prop
  const filteredPromocodes = filterStatus
    ? promocodesData.filter((promo) => promo.status === filterStatus)
    : promocodesData; // If no filterStatus is provided, show all promocodes

  return (
    <div>
      <PromoCard promoData={filteredPromocodes} />
    </div>
  );
};

export default PromoList;
