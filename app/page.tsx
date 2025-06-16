// app/page.tsx
import SectionTwo from "./components/SectionTwo";
import SectionOne from "./components/SectionOne";
import { collections, posts, guilds } from "./data/posts"; // Import data
import CollectionCard from "./components/collectionCard";
import GuildCard from "./components/guildCard"; // <--- Import the new component
import { BsCollectionFill } from "react-icons/bs";


export default function Home() {
  return (
    <div className="max-w-screen-xl flex flex-col mx-auto px-3 min-h-screen">
      <SectionOne />
      <div className="flex lg:flex-row flex-col-reverse w-full justify-between  ">
        <SectionTwo />
        <div className="lg:w-2/6 w-full  py-12 relative ">
          {/* Existing Collections Section */}
          <section className="mb-16">
            {/* ... collections code ... */}
             <h5 className="font-rajdhani flex items-center gap-2 w-full justify-end max-sm:justify-center font-semibold mb-6">
              <BsCollectionFill /> Featured Collections
            </h5>
            <div className="grid gap-6 ">
              {collections.map((collection,index) => (
                <CollectionCard
                    key={index}
                  index={index}
                  collection={collection}
                  allPosts={posts}
                />
              ))}
            </div>
          </section>



          <div className="bg-[#1FA886] w-[80%] h-[200px] relative mx-auto ">
          </div>
        </div>
      </div>
      {/* --- UPDATED GUILDS SECTION --- */}
      <section className="mb-16 ">
          <div className="mb-6 col-span-3">
            <h3 className="font-rajdhani flex items-center gap-2 w-full  max-sm:justify-center font-black mb-6">
               Top Guilds
            </h3>
            {/* Use a grid for the cards */}
            <div className="grid grid-cols-3 gap-6 ">
              {guilds.map((guild,index) => (
                // Use the GuildCard component here
                <GuildCard
                    index={index}
                  key={index}
                  guild={guild}
                  allPosts={posts} // Pass all posts to the card
                />
              ))}
            </div>
            <div className="flex flex-col items-center">

            </div>
          </div>
        </section>
        {/* --- END UPDATED GUILDS SECTION --- */}
    </div>
  );
}
