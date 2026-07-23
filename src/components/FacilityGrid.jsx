import FacilityCard from "./FacilityCard";

const FacilityGrid = ({ facilities = [] }) => {
  return (
    <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
      {facilities.map((facility) => (
        <FacilityCard key={facility.id} {...facility} />
      ))}
    </div>
  );
};

export default FacilityGrid;
