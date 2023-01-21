import ProductsFromDatabase from "../components/FetchFromDB/AllProductsFromDatabase";
import HeroTextInterval from "../components/HeroTextInterval";
import SubmitRating from "../components/Rating/SubmitRating";
import AllUsersFromDatabase from "../components/FetchFromDB/AllUsersFromDatabase";

const Main = () => {
  return (
    <div className="flex flex-col justify-center max-w-full gap-12 px-4 mx-auto my-auto mt-12 rounded-lg">
      <div className="inset-0 flex flex-col items-center justify-center">
        <HeroTextInterval
          title={"GuideGo is your place for"}
          strings={["Unique Tours", "Rare Events", "Personal Guides"]}
        />
      </div>
      <div className="w-full mt-5">
        <h1 className="text-5xl font-semibold text-center text-black dark:text-white">
          Check out these new events!
        </h1>
      </div>
      <div>
        <ProductsFromDatabase />
      </div>

      <div className="mx-auto mt-5 w-[62%] shadow-lg text-center">
        <h4 className="ml-6 text-5xl font-semibold text-black dark:text-white">
          Our Tourguides & Hosts
        </h4>
        <AllUsersFromDatabase />
      </div>
    </div>
  );
};

export default Main;
