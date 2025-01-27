import PromoCard from "./PromoCard";

const promocodesData = [
  {
    code: "EX1234SS5",
    discount: "10% DISCOUNT",
    validFor: ["All Sewa", "Sewaverse"],
    dateRange: "Starts on 25-26 Jan | Expires on 25-26 Jan",
    status: "Collect",
  },
  {
    code: "EX1234SS5",
    discount: "10% DISCOUNT",
    validFor: ["All Sewa", "Sewaverse"],
    dateRange: "Starts on 25-26 Jan | Expires on 25-26 Jan",
    status: "new",
  },
  {
    code: "EX5678SS9",
    discount: "15% DISCOUNT",
    validFor: ["All Sewa", "SewaProvider"],
    dateRange: "Starts on 01-02 Feb | Expires on 01-02 Feb",
    status: "Expired",
  },
  {
    code: "EX5678SS9",
    discount: "15% DISCOUNT",
    validFor: ["All Sewa", "SewaProvider"],
    dateRange: "Starts on 01-02 Feb | Expires on 01-02 Feb",
    status: "Expired",
  },
  {
    code: "EX5678SS9",
    discount: "15% DISCOUNT",
    validFor: ["All Sewa", "SewaProvider"],
    dateRange: "Starts on 01-02 Feb | Expires on 01-02 Feb",
    status: "Expired",
  },
  {
    code: "EX5678SS9",
    discount: "15% DISCOUNT",
    validFor: ["All Sewa", "SewaProvider"],
    dateRange: "Starts on 01-02 Feb | Expires on 01-02 Feb",
    status: "Collect",
  },
  {
    code: "EX5678SS9",
    discount: "15% DISCOUNT",
    validFor: ["All Sewa", "SewaProvider"],
    dateRange: "Starts on 01-02 Feb | Expires on 01-02 Feb",
    status: "recently",
  },
  {
    code: "EX5678SS9",
    discount: "15% DISCOUNT",
    validFor: ["All Sewa", "SewaProvider"],
    dateRange: "Starts on 01-02 Feb | Expires on 01-02 Feb",
    status: "recently",
  },
  {
    code: "EX5678SS9",
    discount: "15% DISCOUNT",
    validFor: ["All Sewa", "SewaProvider"],
    dateRange: "Starts on 01-02 Feb | Expires on 01-02 Feb",
    status: "recently",
  },
  {
    code: "EX5678SS9",
    discount: "15% DISCOUNT",
    validFor: ["All Sewa", "SewaProvider"],
    dateRange: "Starts on 01-02 Feb | Expires on 01-02 Feb",
    status: "recently",
  },
];

interface PromoListProp {
  filterStatus?: "Collect" | "Expired" | "recently";
}

const PromoList = ({ filterStatus }: PromoListProp) => {
  const filteredPromocodes = filterStatus
    ? promocodesData.filter((promo) => promo.status === filterStatus)
    : promocodesData;

  return (
    <div>
      <PromoCard promoData={filteredPromocodes} />
    </div>
  );
};

export default PromoList;
