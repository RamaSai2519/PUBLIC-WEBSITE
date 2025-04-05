/**
 * CustomCard component represents a custom card with a title, description, background color, and an optional image.
 *
 * @component
 * @example
 * const cardProps = {
 *   title: 'Card Title',
 *   description: 'Card Description',
 *   bgColor: 'goldLight',
 *   image: 'https://example.com/image.jpg'
 * };
 *
 * return (
 *   <CustomCard {...cardProps} />
 * )
 *
 * @param {CardProps} props - The props object containing the card properties.
 * @param {string} props.title - The title of the card.
 * @param {string} props.description - The description of the card.
 * @param {string} [props.bgColor='goldLight'] - The background color of the card.
 * @param {string} [props.image] - The URL of the image to be displayed on the card.
 * @returns {React.ReactElement} The rendered CustomCard component.
 */

import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import appTheme from "@/theme";
import Image from "next/legacy/image";
import { CardProps } from "./card.interface";

const CustomCard: React.FC<CardProps> = (props) => {
  const {
    title,
    description,
    bgColor = "goldLight",
    image,
    isCircle = true,
    textColor = "black",
  } = props;
  return (
    <div
      className="sm:w-1/4 rounded-lg shadow-sm sm:shadow-2xl justify-center self-center"
      style={{ backgroundColor: appTheme.colors[bgColor] }}
    >
      <CardContent className="flex flex-col justify-center items-center">
        {isCircle && (
          <div className="flex  rounded-full justify-center items-center w-16 h-16">
            {image && (
              <Image src={image} width={50} height={60} alt={`sukoon unlimited  ${title || ''}`} />
            )}
            {!image && (
              <Typography className="font-bold self-center">
                {title.split("")[0]}
              </Typography>
            )}
          </div>
        )}
        <h2
          className={`font-heavyFont  text-${textColor}  text-${
            !isCircle ? "3xl" : "lg"
          }`}
        >
          {title}
        </h2>
        <h2 className={`font-normal  text-${textColor}  mt-2 text-center`}>
          {description}
        </h2>
      </CardContent>
    </div>
  );
};

export default CustomCard;
