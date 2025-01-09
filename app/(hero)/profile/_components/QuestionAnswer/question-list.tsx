"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import QuestionCard from "./question-card";

const questions = [
  {
    avatar: "",
    askedTime: "10 months ago",
    question: "Is this service worth it?",
    description:
      "The painter service was prompt and professional, delivering high-quality work with great attention to detail. The staff was courteous and maintained a clean workspace throughout. Highly recommend for a hassle-free painting experience!",
    serviceCategory: {
      name: "Exterior House Painting Service",
      link: "#",
    },
    helpfulCount: 100,
    notHelpfulCount: 100,
    answer:
      "The painter service was prompt and professional, delivering high-quality work with great attention to detail. The staff was courteous and maintained a clean workspace throughout. Highly recommend for a hassle-free painting experience!",
  },
  {
    avatar: "",
    askedTime: "10 months ago",
    question: "Is this service worth it?",
    description:
      "The painter service was prompt and professional, delivering high-quality work with great attention to detail. The staff was courteous and maintained a clean workspace throughout. Highly recommend for a hassle-free painting experience!",
    serviceCategory: {
      name: "Plumbing Service",
      link: "#",
    },
  },
];

export default function QuestionsList() {
  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Asked Questions</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort:</span>
          <Select defaultValue="recommended">
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        {questions.map((question, index) => (
          <QuestionCard key={index} {...question} />
        ))}
      </div>
    </div>
  );
}
