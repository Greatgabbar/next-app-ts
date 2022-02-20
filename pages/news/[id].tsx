import React from "react";
import { Typography } from "@mui/material";

interface CardData {
  title: string;
  id: number;
  body: string;
  userId: number;
}

const NewsPage: React.FC<{ news: CardData }> = ({ news }) => {
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
      <Typography variant="h2" align="center">
        Title: {news?.title}
      </Typography>
      <Typography variant="body1" align="center">
        Body : {news?.body}
      </Typography>
    </div>
  );
};

export default NewsPage;

export async function getStaticPaths() {
  const res = await fetch(`${process.env.SERVER_URL}/posts`);
  const news = await res.json();
  const paths = news.map((ne: any) => {
    return {
      params: {
        id: ne.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${process.env.SERVER_URL}/posts/${params.id}`);
  const data = await res.json();
  return {
    props: {
      news: data,
    },
  };
}
