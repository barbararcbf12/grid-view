import { GridItem } from "../../types/types";

type CardProps = {
  item: GridItem;
};

function Card({ item }: CardProps) {
  return (
    <div
      key={item.title}
      className="border border-grey-200 hover:border-grey-300 bg-grey-100 shadow-sm hover:shadow-lg transition-shadow max-w-96 md:min-w-[340px] lg:max-w-[310px] overflow-hidden"
      role="gridcell"
      tabIndex={0}
    >
      <span className="flex bg-gray-100 h-[240px] overflow-hidden">
        <img src={item.imagePath} alt={item.title} className="w-full" />
      </span>
      <span className="flex flex-col p-2 text-sm bg-gray-100">
        <h2 className="h5">{item.title}</h2>
        <p className="text-gray-600">{item.description}</p>
      </span>
    </div>
  );
}

export default Card;
