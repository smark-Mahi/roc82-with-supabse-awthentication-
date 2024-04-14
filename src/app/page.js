"use client";
import Categories from "../component/Categories";
import Pagination from "../component/Pagination";
import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";

faker.seed(100);

export default function Home() {
  const perPageProducts = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [previousPage, setPreviousPage] = useState(0);

  const products = [...Array(100)].map(() => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    isSelected: faker.datatype.boolean(),
  }));
  const [data, setData] = useState([]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("data"))) {
      setData(JSON.parse(localStorage.getItem("data")));
      return;
    }
    localStorage.setItem("data", JSON.stringify(products));
    const getDate = JSON.parse(localStorage.getItem("data") || "[]");
    setData(getDate);
  }, []);

  return (
    <div className=" h-screen flex justify-center pt-24">
      <div className="w-[500px] h-[500px] flex flex-col  items-center gap-8 border border-solid border-[#c7c7c7] rounded-xl py-8">
        <div>
          <h1 className="text-2xl font-bold tracking-widest">
            Please mark your intrests!
          </h1>
          <p className="font-semibold text-xs text-center mt-4">
            we will keep you notified
          </p>
        </div>
        <div className="self-start ml-14">
          <h3 className="font-semibold text-sm">My saved intrests!</h3>
          {data
            .slice(
              previousPage * perPageProducts,
              currentPage * perPageProducts
            )
            .map((category, i) => (
              <ul
                className="flex flex-col gap-4 mt-6 text-[10px] font-semibold"
                key={i}
              >
                <Categories category={category} setData={setData} data={data} />
              </ul>
            ))}
          <Pagination
            totalPages={17}
            onPrevousPageChange={setPreviousPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
