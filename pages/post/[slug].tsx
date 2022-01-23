import { GetStaticProps } from 'next';
import React from 'react';
import PortableText from 'react-portable-text';
import Header from '../../Components/Header';
import { sanityClient, urlFor } from '../../sanity';
import { Post } from '../../typings';
import { SubmitHandler, useForm } from "react-hook-form";

interface IFormInput {
    _id: string,
    name: string,
    email: string,
    comment: string
}

interface Props {
    post: Post;
}

function Post({ post }: Props) {

    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        fetch('/api/createComment', {
            method: 'post',
            body: JSON.stringify(data),
        }).then(() => [
            // console.log(data)
        ]).catch(err => console.log(err));
    };


    return <main className="max-w-sm sm:max-w-[700px] lg:max-w-6xl mx-auto">
        <Header />

        <img src={urlFor(post.mainImage).url()!} alt="" className='w-full h-72  object-cover' />

        <article className='mx-auto p-5 max-w-3xl'>
            <h1 className='text-4xl capitalize mt-10 mb-4'>{post.title}</h1>
            <h2 className='font-light text-xl text-gray-700 mb-5'>{post.description}</h2>

            <div className='flex items-center space-x-2'>
                <img src={urlFor(post.author.image).url()!} className='h-12 w-12 hover:opacity-80 rounded-full hover:shadow-sm hover:shadow-black ease-in-out transition-all' alt="" />
                <p className='font-extralight text-sm'>Blog post by {" "}<span className='text-orange-700 font-light'>{post.author.name}</span> - Published at {new Date(post._createdAt).toLocaleString()}</p>
            </div>

            <div className='mt-10'>
                <PortableText
                    className=""
                    content={post.body}
                    serializers={{
                        h1: (props: any) => (
                            <h1 className='text-2xl font-bold my-5' {...props} />
                        ),
                        h2: (props: any) => (
                            <h2 className='text-xl font-bold my-5' {...props} />
                        ),
                        li: ({ children }: any) => (
                            <li className='li list-disc'>{children}</li>
                        ),
                        link: ({ href, children }: any) => (
                            <a href={href} className='text-blue-500 hover: underline transition-all ease-in-out'>
                                {children}
                            </a>
                        ),
                    }}
                    projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
                    dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
                />

            </div>

        </article>

        <hr className='max-w-lg border-amber-500 mx-auto mt-12 mb-12' ></hr>

        <form className='flex flex-col p-5 max-w-2xl mx-auto mb-10' onSubmit={handleSubmit(onSubmit)} >

            <h4 className='text-3xl font-bold text-center'>Leave a comment below!</h4>
            <hr className='border-amber-500 mx-auto py-2 mt-5'></hr>

            <input
                {...register("_id")}
                type="hidden"
                name="_id"
                value={post._id}
            />

            <label className='block mb-5'>
                <span>Name</span>
                <input
                    {...register("name", { required: true })} className="shadow rounded border py-2 px-3 form-input mt-1 block w-full ring-yellow-400 bg-[#121212] focus:border-none font-mono focus:ring focus:outline-none" type="text" placeholder='Enter Name' />
            </label>

            <label className='block mb-5'>
                <span>Email</span>
                <input {...register("email", { required: true })} className="shadow rounded border py-2 px-3 form-input mt-1 block w-full ring-yellow-400 bg-[#121212] focus:border-none font-mono focus:ring focus:outline-none" type="email" placeholder='Enter Email' />
            </label>

            <label className='block mb-5'>
                <span>Name</span>
                <textarea {...register("comment", { required: true })} className="shadow rounded border py-2 px-3 form-input mt-1 block w-full ring-yellow-400 bg-[#121212] focus:border-none font-mono focus:ring focus:outline-none" rows={8} placeholder='Enter Message' />
            </label>
            {/* errors */}
            <div className='flex flex-col p-5'>
                {errors.name && (
                    <span className='text-red-600'>Name is required</span>
                )}
                {errors.email && (
                    <span className='text-red-600'>Email is required</span>
                )}
                {errors.comment && (
                    <span className='text-red-600'>Comment is required</span>
                )}
            </div>
            {/* ======= */}

            <input type="submit" className='shadow hovershadow-gray-200 border mx-auto border-[#d57eeb]text-black hover:bg-gradient-to-br hover:to-[#d57eeb] hover:from-[#fccb90] hover:text-white hover:font-semibold  hover:scale-125 hover:shadow-lg transition-all hover:border-none ease-linear outline-none w-36 rounded-lg cursor-pointer p-4' />
        </form>


    </main >;
}

export default Post;


export const getStaticPaths = async () => {
    const query = `*[_type == "post"]{
        _id,
        slug{
            current
        }
      }`;

    const posts = await sanityClient.fetch(query);

    const paths = posts.map((post: Post) => ({
        params: {
            slug: post.slug.current,
        }
    }))

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const query = `*[_type == "post" && slug.current==$slug][0]{
      _id,
      title,
      _createdAt,
      slug,
      description,
      mainImage,
      author->
      {
      name, image
      },
      body,
      'comments' : *[
          _type == "comment" && 
          post._ref == ^._id && 
          approved == true ],
    }`;

    const post = await sanityClient.fetch(query, { slug: params?.slug });

    if (!post) {
        return {
            notFound: true
        };
    };

    return {
        props: {
            post,
        },
        revalidate: 60
    };
}