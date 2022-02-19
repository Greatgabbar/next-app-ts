import { Typography } from "@mui/material";
import React from "react";
import classes from "./card.module.css";
import Link from "next/link";

interface CardData {
  title: string;
  id: number;
  body: string;
  userId: number;
}

const Card = ({ title, id, body, userId }: CardData) => {
  return (
    <div className={classes.Card}>
      <Link href={`/news/[id]`} as={`/news/${id}`}>
        <a
          style={{
            textDecoration: "none",
            cursor: "pointer",
            margin: "0px",
          }}
        >
          <Typography alignContent={"center"} noWrap={true}>
            Title : {title}
          </Typography>
        </a>
      </Link>
    </div>
  );
};

export default Card;
