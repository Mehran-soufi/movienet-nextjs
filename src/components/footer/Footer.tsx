import React from "react";
import HeaderLogo from "../header/HeaderLogo";
import Link from "next/link";
import { Copyright, HandHeart } from "lucide-react";

function Footer() {
  return (
    <footer
      className="w-full flex flex-col justify-center items-center bg-gray-900/60  shadow-inner shadow-gray-800"
      style={{ marginTop: "1rem" }}
    >
      <div className="w-11/12" style={{ padding: "1rem 0" }}>
        <div className="flex justify-start" style={{ margin: "1rem 0" }}>
          <HeaderLogo />
        </div>
        <div
          className="w-full flex lg:flex-row flex-col justify-between items-start"
          style={{ margin: ".5rem 1rem" }}
        >
          <div className="lg:w-1/3 w-full flex flex-col items-start">
            <p className="text-lg uppercase font-bold text-slate-200">
              links :
            </p>
            <Link
              href="/movie"
              className="uppercase text-slate-300 hover:text-white no-underline"
              style={{ margin: ".2rem 0" }}
            >
              movie
            </Link>
            <Link
              href="/series"
              className="uppercase text-slate-300 hover:text-white no-underline"
              style={{ margin: ".2rem 0" }}
            >
              series
            </Link>
            <Link
              href="/actors"
              className="uppercase text-slate-300 hover:text-white no-underline"
              style={{ margin: ".2rem 0" }}
            >
              actors
            </Link>
          </div>
          <div className="lg:w-1/3 w-full flex flex-col items-start">
            <p className="text-lg uppercase font-bold text-slate-200">user :</p>
            <Link
              href="/movie"
              className="uppercase text-slate-300 hover:text-white no-underline"
              style={{ margin: ".2rem 0" }}
            >
              bookmark
            </Link>
            <Link
              href="/series"
              className="uppercase text-slate-300 hover:text-white no-underline"
              style={{ margin: ".2rem 0" }}
            >
              like
            </Link>
          </div>
          <div className="lg:w-1/3 w-full flex flex-col items-start">
            <p className="text-lg uppercase font-bold text-slate-200">
              other :
            </p>
            <Link
              href="/movie"
              className="uppercase text-slate-300 hover:text-white no-underline"
              style={{ margin: ".2rem 0" }}
            >
              help
            </Link>
            <Link
              href="/series"
              className="uppercase text-slate-300 hover:text-white no-underline"
              style={{ margin: ".2rem 0" }}
            >
              jobs
            </Link>
            <Link
              href="/series"
              className="uppercase text-slate-300 hover:text-white no-underline"
              style={{ margin: ".2rem 0" }}
            >
              faq
            </Link>
          </div>
        </div>
      </div>
      <div
        className="w-full border-t border-gray-800 flex flex-col justify-center items-center"
        style={{ padding: "2rem" }}
      >
        <div className="w-full flex items-center justify-center flex-wrap gap-1.5">
          <p>Designed and developed by</p>
          <Link
            href="https://resume-soufi.vercel.app/"
            target="_blank"
            className="text-emerald-800 font-bold uppercase"
          >
            Mehran
          </Link>
          <p>
            <HandHeart size={20} className="text-rose-700" />
          </p>
        </div>
        <div className="w-full flex items-center justify-center flex-wrap" style={{ margin: ".5rem 0" }}>
            <p className="flex items-center justify-center gap-1.5">All rights reserved. <Copyright size={20} className="text-slate-300" /></p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
