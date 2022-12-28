import HeroTextInterval from "../components/HeroTextInterval";

const Main = () => {
  return (
    <div className="flex flex-col justify-center max-w-2xl gap-12 px-4 mx-auto my-auto mt-12 divide-y divide-gray-200 rounded-lg">
      <div className="inset-0 flex flex-col items-center justify-center">
        <HeroTextInterval
          title={"Explore the city in the App & get on"}
          strings={["Unique Tours", "Rare Events", "Personal Guides"]}
        />
      </div>
    </div>
  );
};

export default Main;
