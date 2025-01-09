import React from "react";
import Image from "next/image";
import { Orbitron } from "next/font/google";

// import { BorderBeam } from "@/components/ui";
// import GraphComponent from "./_components";

import LoginButton from "./_components/login-button";

const orbitron = Orbitron({ subsets: ["latin"] });

const Graph = () => {
  return (
    <div className="w-full h-full matrixbg">
      <div className="flex flex-col items-center justify-center h-screen pt-16 pb-4">
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <Image
              src="/matrix.png"
              width={150}
              height={150}
              alt="TruthMatrix"
            />
            <h1
              className={`text-4xl font-bold text-white ${orbitron.className}`}
            >
              Meet The Matrix
            </h1>
            <p className="">
              A modular network of interoperable{" "}
              <span className="text-brand-500">DeFi agents</span>
            </p>
            <LoginButton />
          </div>

          {/* <div className="w-full flex-1 max-w-2xl rounded-md border border-neutral-200 dark:border-neutral-700 relative">
                        <GraphComponent />
                        <BorderBeam />
                    </div> */}
        </div>
        <div className="">
          <p>Follow us on X</p>
          <h2 className="text-brand-500">
            <a target="_blank" href="https://x.com/@Truthmatrixai">
              @Truthmatrixai
            </a>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Graph;
