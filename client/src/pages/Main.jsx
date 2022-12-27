import HeroTextInterval from "../components/HeroTextInterval";

const Main = () => {
  return (
    <div className="px-4 mt-12 max-w-2xl mx-auto my-auto flex flex-col justify-center gap-12 divide-y divide-gray-200 rounded-lg">
      <div className="flex flex-col items-center justify-center inset-0">
        <HeroTextInterval
          title={"Explore the city in the App & get on"}
          strings={["Unique Tours", "Rare Events", "Personal Guides"]}
        />
      </div>
    </div>
  );
};

export default Main;
