import type { NextPage } from "next";
import React from "react";
import Card from "../../components/Card/card";
import Link from "next/link";
interface CardData {
  title: string;
  id: number;
  body: string;
  userId: number;
}

const News: NextPage = ({ news }: [NextPage]) => {
  console.log(news);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "20px",
      }}
    >
      {news.map((data: CardData, i: number) => {
        return <Card {...data} key={i} />;
      })}
    </div>
  );
};

export default News;

export async function getStaticProps() {
  console.log(process.env.SERVER_URL);
  const res = await fetch(`${process.env.SERVER_URL}/posts`);
  const data = await res.json();
  console.log(data);
  return {
    props: {
      news: data,
    },
  };
}
