import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Header from "../Components/Header";
import HeroSection from "../Components/HeroSection";
import { sanityClient, urlFor } from "../sanity";
import { Post } from "../typings";

interface Props {
  posts: [Post];
}

export default function Home({ posts }: Props) {
  // console.log(posts); 
  return (
    <div className="max-w-sm sm:max-w-[700px] lg:max-w-6xl mx-auto">
      <Head>
        <title>Next.Js blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      {/* hero section */}
      <HeroSection />
      {/* ================= */}

      {/* posts */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6 mb-20">
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`} >
            <div className="group border rounded-lg cursor-pointer overflow-hidden hover:shadow-md transition-shadow duration-200 ease-in-out">
              <img src={urlFor(post.mainImage).url()!} alt="" className="object-cover w-full h-64  group-hover:opacity-80 group-hover:scale-110 transition-all duration-200 ease-in-out transform-gpu" />
              <div className="flex justify-between p-5 bg-zinc-50">
                <div>
                  <p className="text-lg font-bold">{post.title}</p>
                  <p>{post.description} by {post.author.name}</p>
                </div>
                <img src={urlFor(post.author.image).url()!} alt="" className="h-12 w-12 rounded-full" />
              </div>
            </div>
          </Link>

        ))}
      </div>

      {/* =========== */}
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
    title,
    slug,
    body,
    description,
    mainImage,
    author->
    {
    name, image
    }
  }`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};

