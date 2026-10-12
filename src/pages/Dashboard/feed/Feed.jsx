import PostCard from "./components/PostCard";
import Story from "./components/Story";

function Feed() {
  return (
    <section className="space-y-5 border-r border-[#E5E7EB] bg-[#F8FAFC] p-5">
      <div className=" b p-4 transition duration-300 hover:-translate-y-1 hover:shadow-lg ">
        <Story />
      </div>
       <PostCard/>
    </section>
  );
}

export default Feed;
