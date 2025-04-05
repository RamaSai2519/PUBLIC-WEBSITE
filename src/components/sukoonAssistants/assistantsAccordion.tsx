"use client";

import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React, { useState } from "react";
import { AssistantsTypes } from "./interface";
import { AddRounded, RemoveRounded } from "@mui/icons-material";

/**
 * Functional component for an accordion element in React.
 * @param {AssistantsTypes} props - The props object containing description, icon, and title.
 * @returns JSX element representing the accordion component.
 */
const AssistantsAccordion: React.FC<AssistantsTypes> = (props) => {
  const { description = [], icon: Icon, title } = props;

  const [isOpen, setIsOpen] = useState(false);

  const handleChange = () => {
    setIsOpen((prev) => !prev);
  };

  const iconStyles = { width: 20, height: 20 };

  return (
    <Accordion
      expanded={isOpen}
      onChange={handleChange}
      sx={{
        boxShadow: "none",
        py: 1,
      }}
    >
      <AccordionSummary
        expandIcon={
          <span
            className={`size-6 flex justify-center items-center rounded-lg border-gray-400 ${isOpen ? "" : "border"
              }
            ${isOpen ? "bg-primaryYellow" : "bg-[transparent]"}
            `}
          >
            {isOpen ? (
              <RemoveRounded sx={iconStyles} />
            ) : (
              <AddRounded sx={iconStyles} />
            )}
          </span>
        }
      >
        <span className="flex items-center gap-5 text-lg">
          <span className="size-6">
            <Icon />
          </span>
          {title}
        </span>
      </AccordionSummary>

      <AccordionDetails>
        {
         description.length > 0 && description?.map((singleItem : any,key:any) => {
            return <ul className="list-disc" key={`${key}-ul`}>
           <li key={`${key}-${singleItem.value}-${singleItem.key}`} className="text-sm font-lightFont pl-11">{singleItem.value}</li>
          </ul>
        })
       }
    </AccordionDetails>
    </Accordion >
  );
};

export default AssistantsAccordion;
