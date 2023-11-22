"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
export default function Blog() {
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
      setBlog(res.data);
    });
  }, []);
  // console.log(blog,"gott");

  const filteredTitle = blog.filter((x: any) => x.title);
  const [showHead, setShowHead] = useState(false);
  const [showBody, setShowBody] = useState(false);

  if (!blog) return null;
  return (
    <div className="w-full  ">
      <div className="w-full  bg-gradient-to-r from-lime-50 to-indigo-100 flex flex-col justify-center items-center">
        <div className="w-full h-screen flex flex-col justify-center items-center">
          <h1 className="text-6xl pt-16 font-bold font-serif text-slate-500">
            Just A look to Here.....!
          </h1>
          <div className="w-full h-full flex justify-evenly items-center">
            <div className="w-[400px] h-[500px] bg-gradient-to-r from-cyan-100 to-purple-400 rounded-lg">
              <div className="w-full h-full flex justify-center items-center">
                <button
                  onClick={() => setShowHead(true)}
                  className="w-[200px] h-[50px] text-2xl font-semibold text-white bg-gray-300 rounded-lg shadow-xl shadow-[#ffffff9d] hover:bg-slate-400"
                >
                  Over View...!
                </button>
              </div>
            </div>
            <div className="w-[400px] h-[500px] bg-gradient-to-r from-lime-100 to-cyan-400 rounded-lg">
              <div className="w-full h-full flex justify-center items-center">
                <button
                  onClick={() => setShowBody(true)}
                  className="w-[200px] h-[50px] text-2xl font-semibold text-white bg-gray-300 rounded-lg shadow-xl shadow-[#ffffff9d] hover:bg-slate-400"
                >
                  Read Here....!
                </button>
              </div>
            </div>
          </div>
        </div>

        {showHead && !showBody && (
          <div className="w-full  bg-gradient-to-r from-sky-50 to-red-100">
            <Heads data={filteredTitle} show={showHead} />
          </div>
        )}

        {showBody && !showHead && (
          <div className="w-full justify-center items-center">
            <Body data={blog} body={showBody} />
          </div>
        )}
      </div>
    </div>
  );
}

const Heads = ({ data, show }: { data: any; show: boolean }) => {
  const title = data;
  const passed = show;
  const [shows, notShow] = useState(passed);

  console.log(title, "title maathram");
  return (
    <div className="w-full">
      {shows && (
        <div className="w-full flex  flex-col p-3">
          <div className="w-full  flex flex-row">
            <div className="w-full  flex flex-col">
              <p className="text-3xl font-bold text-center text-slate-600">
                This is A small Blog.....!
              </p>
              <p className="text-center text-slate-500 mt-8">
                you can Keep eye on This contents.....!
              </p>
            </div>
            <div className="w-[150px] h-[50px] bg-gray-500 flex justify-center items-center text-white rounded-lg shadow-2xl hover:bg-slate-200">
              <Link href={"/blog"}>
                <button onClick={() => notShow(false)}>Back</button>
              </Link>
            </div>
          </div>
          <div className="w-full  justify-center items-center grid grid-cols-4 gap-10 pt-5 p-2">
            {title.map((x: any) => (
              <div key={x.id} className=" w-[300px] h-[150px]  bg-gradient-to-r from-sky-50 to-cyan-300 flex items-center justify-center">
                <p className="text-xl font-semibold text-center text-gray-600">
                  {x.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Body = ({ data, body }: { data: any; body: boolean }) => {
  const blog = data;
  const [show, setShow] = useState(body);

  return (
    <>
      {show && (
        <div className="w-full p-5">
          <div className="w-full flex justify-center items-center p-7">
            <p className="text-5xl font-bold font-serif">
              Here You can Read.....!
            </p>
          </div>
          <div className="w-full h-full justify-center items-center grid grid-cols-4 flex-row gap-10 p-3">
            {blog.map((x: any, index: any) => (
              <div
                key={x.id}
                className="w-[300px] h-[200px] p-2  bg-gradient-to-r from-gray-50 to-indigo-300 text-center shadow-xl flex flex-col justify-center items-center rounded-xl gap-3"
              >
                <h1 className="font-bold text-center p-1 mt-2">{x.title}</h1>
                <p className="text-sm text-center p-1">{x.body}</p>
              </div>
            ))}
          </div>
          <div className="w-full h-[50px] flex justify-center">
            <div className="w-[200px] h-[50px] flex justify-center items-center bg-red-300 rounded-xl shadow-xl hover:bg-red-800">
              <button onClick={() =>setShow(false)}>Back</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
