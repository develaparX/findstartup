import { auth } from "@/auth";
import SearchForm from "@/components/SearchForm";
import StartupCard,{ StartupTypeCard }  from "@/components/StartupCard";

import { sanityFetch ,SanityLive} from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  // const posts = await client.fetch(STARTUPS_QUERY)
  const params = {search:query||null}

  const session= await auth()

  console.log(session?.id)

  const {data:posts} =await sanityFetch({query:STARTUPS_QUERY,params})


  // const posts = [
  //   {
  //     _createdAt: new Date(),
  //     views: 55,
  //     author: { _id: 1, name: "Arfian" },
  //     _id: 1,
  //     description: "This is a description",
  //     image:
  //       "https://m.media-amazon.com/images/M/MV5BMGI0MjU5OTUtZmYwNS00NzdiLThhMzQtMTgzYTJlOTY5N2U2XkEyXkFqcGc@._V1_.jpg",
  //     category: "Anime",
  //     title: "Ishura Season 2",
  //   },
  // ];

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup, <br /> Connect With Enterpreneur
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
        </p>

        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results form "${query}"` : "All Startups"}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard, index: number) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>

      <SanityLive/>
    </>
  );
}
