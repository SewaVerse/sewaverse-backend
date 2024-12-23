"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";

import useMediaQuery from "@/hooks/useMediaQuery";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

type FooterAccordionProps = {
  title: string;
  children: React.ReactNode;
};

const FooterAccordion: React.FC<FooterAccordionProps> = ({
  title,
  children,
}) => {
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const [accordionValue, setAccordionValue] = useState<string | undefined>(
    title
  );

  // Update the accordion state when `isSmallDevice` changes
  useEffect(() => {
    setAccordionValue(isSmallDevice ? undefined : title);
  }, [isSmallDevice, title]);
  return (
    <Accordion
      type="single"
      value={accordionValue}
      onValueChange={(value) => setAccordionValue(value)}
      collapsible={isSmallDevice}
    >
      <AccordionItem value={title} className="border-none">
        <AccordionTrigger
          className={clsx(
            "hover:no-underline text-lg font-semibold md:[&>svg]:hidden",
            isSmallDevice && "py-2"
          )}
        >
          {title}
        </AccordionTrigger>
        <AccordionContent className="border-none">{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FooterAccordion;
