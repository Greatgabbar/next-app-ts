import type { NextPage } from "next";
import React from "react";
import Card from "../../components/Card/card";
import Link from "next/link";
import { Typography } from "@mui/material";

interface CardData {
  title: string;
  id: number;
  body: string;
  userId: number;
}

const NewsPage: NextPage = ({ news }) => {
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
        Title: {news.title}
      </Typography>
      <Typography variant="body1" align="center">
        Body : {news.body}
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
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  console.log(process.env.SERVER_URL);
  const res = await fetch(`${process.env.SERVER_URL}/posts/${params.id}`);
  const data = await res.json();
  console.log(data);
  return {
    props: {
      news: data,
    },
  };
}
