import React from "react";
import Card from "../../components/Card/card";
interface CardData {
  title: string;
  id: number;
  body: string;
  userId: number;
}

const News: React.FC<{ news: [CardData] }> = ({ news }) => {
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
  const res = await fetch(`${process.env.SERVER_URL}/posts`);
  const data = await res.json();
  return {
    props: {
      news: data,
    },
  };
}
