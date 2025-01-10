"use client";

import { MoreHorizontal, ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface QuestionCardProps {
  avatar: string;
  askedTime: string;
  question: string;
  answer?: string;
  description: string;
  serviceCategory: {
    name: string;
    link: string;
  };
  helpfulCount?: number;
  notHelpfulCount?: number;
}

export default function QuestionCard({
  avatar,
  askedTime,
  question,
  answer,
  description,
  serviceCategory,
  helpfulCount = 0,
  notHelpfulCount = 0,
}: QuestionCardProps) {
  const [helpful, setHelpful] = useState(helpfulCount);
  const [notHelpful, setNotHelpful] = useState(notHelpfulCount);
  const [userAnswer, setUserAnswer] = useState("");

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-start gap-4 space-y-0">
        <Avatar className="h-10 w-10">
          <AvatarImage src={avatar} alt="User avatar" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Asked: {askedTime}</p>
            <Badge variant="brand" className="ml-2">
              {serviceCategory.name}
            </Badge>
          </div>
          <h3 className="text-lg font-semibold mt-1">{question}</h3>
          <p className="text-muted-foreground mt-1">{description}</p>
          {/* <a
            href={serviceCategory.link}
            className="text-primary hover:underline mt-2 inline-block"
          >
            {serviceCategory.name}
          </a> */}
        </div>
      </CardHeader>

      {answer && (
        <CardContent className="bg-muted/50 mx-4 rounded-md p-4">
          <div className="flex justify-between items-start">
            <p className="text-sm font-medium">Answer:</p>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
          <p className="mt-2 text-sm">{answer}</p>
        </CardContent>
      )}

      <CardFooter className="flex flex-col space-y-4 pt-4">
        <div className="flex justify-between w-full">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setHelpful((prev) => prev + 1)}
              className="flex gap-2"
            >
              <ThumbsUp className="h-4 w-4" />
              Helpful {helpful}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setNotHelpful((prev) => prev + 1)}
              className="flex gap-2"
            >
              <ThumbsDown className="h-4 w-4" />
              Not Helpful {notHelpful}
            </Button>
          </div>
        </div>

        {!answer && (
          <div className="w-full space-y-2">
            <Textarea
              placeholder="Provide your answer"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex justify-end">
              <Button variant={"brand"}>Answer</Button>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
