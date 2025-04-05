"use client";
import { Box, Typography } from "@mui/material";
import React from "react";
import SukoonAccordion from "../accordion/Accordion";
import { data } from "./data";

const FAQComp = () => {
  return (
    <Box my={10} id="faq-section">
      <h1 className="text-2xl md:text-5xl section-title font-bold mb-5">
        Frequently Asked Questions
      </h1>
      {data?.map((faq, index) => (
        <SukoonAccordion key={index} {...faq} />
      ))}
    </Box>
  );
};

export default FAQComp;
