"use client";
import { MessageCircle, MoreVertical, Star } from "lucide-react";
import { useState } from "react";
import { BsEmojiDizzy } from "react-icons/bs";
import { GoHeart } from "react-icons/go";
import { LuLightbulb } from "react-icons/lu";
import { PiHandsClapping } from "react-icons/pi";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface Reply {
  id: string;
  author: string;
  date: string;
  content: string;
  avatar: string;
}

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  content: string;
  metrics: {
    helpful: number;
    timely: number;
    satisfaction: number;
    sad: number;
    quality: number;
  };
  avatar: string;
  sewa: string;
  serviceName: string;
  replies?: Reply[];
}

const reviews: Review[] = [
  {
    id: "1",
    author: "Emily Rossister",
    rating: 4,
    date: "4 months ago",
    content:
      "The painter service exceeded expectations with its exceptional workmanship and timely completion. The team was friendly, efficient, and ensured a smooth process. Overall, a reliable choice for quality painting!",
    metrics: {
      helpful: 100,
      timely: 100,
      satisfaction: 100,
      sad: 100,
      quality: 100,
    },
    avatar: "",
    sewa: "1",
    serviceName: "Exterior House Painting Service",
    replies: [
      {
        id: "1-1",
        author: "Service Provider",
        date: "4 months ago",
        content:
          "Thank you for your wonderful review! We're delighted to hear that you were satisfied with our painting service. Your feedback about our team's efficiency and professionalism is greatly appreciated. We strive to maintain these high standards for all our clients.",
        avatar: "",
      },
    ],
  },
  {
    id: "2",
    author: "Bishal Shrestha",
    rating: 4,
    date: "4 months ago",
    content:
      "The painter service exceeded expectations with its exceptional workmanship and timely completion. The team was friendly, efficient, and ensured a smooth process. Overall, a reliable choice for quality painting!",
    metrics: {
      helpful: 100,
      timely: 100,
      satisfaction: 100,
      sad: 100,
      quality: 100,
    },
    avatar: "",
    sewa: "2",
    serviceName: "Interior Wall Painting Service",
    replies: [
      //{
      // id: "2-1",
      // author: "Service Provider",
      // date: "4 months ago",
      // content:
      //   "We appreciate your positive feedback! It's great to hear that our team met your expectations. We take pride in our workmanship and customer service.",
      // avatar: "",
      //},
    ],
  },
];

export default function ReviewsWithReplies() {
  const [openReplies, setOpenReplies] = useState<string[]>([]);
  const [newReply, setNewReply] = useState<Record<string, string>>({});
  const [submittedReplies, setSubmittedReplies] = useState<Reply[]>([]);

  const toggleReplies = (reviewId: string) => {
    setOpenReplies((prev) =>
      prev.includes(reviewId)
        ? prev.filter((id) => id !== reviewId)
        : [...prev, reviewId]
    );
  };
  const handleReplyChange = (reviewId: string, content: string) => {
    setNewReply((prev) => ({ ...prev, [reviewId]: content }));
  };

  const handleReplySubmit = (reviewId: string) => {
    if (!newReply[reviewId]?.trim()) return;

    const reply: Reply = {
      id: `${reviewId}-${Date.now()}`,
      author: "Service Provider",
      date: new Date().toLocaleDateString(),
      content: newReply[reviewId],
      avatar: "", // Add the avatar path here if available
    };

    setSubmittedReplies((prev) => [...prev, reply]);
    setNewReply((prev) => ({ ...prev, [reviewId]: "" }));
  };

  return (
    <div className="max-w-5xl mx-auto mt-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-base font-semibold">
          Reviews <span className="text-gray-500 font-normal">(101)</span>
        </h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Sort:</span>
            <Select defaultValue="recommended">
              <SelectTrigger className="w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recommended</SelectItem>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="highest">Highest Rated</SelectItem>
                <SelectItem value="lowest">Lowest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Filter:</span>
            <Select defaultValue="all">
              <SelectTrigger className="w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stars</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <Collapsible
            key={review.id}
            open={openReplies.includes(review.id)}
            onOpenChange={() => toggleReplies(review.id)}
          >
            <div className=" rounded-lg">
              <div className="flex justify-between">
                <div className="flex justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={review.avatar} alt={review.author} />
                      <AvatarFallback>{review.author[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{review.author}</h3>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < review.rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-500">{review.date}</p>
                    </div>
                  </div>

                  {/* <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button> */}
                </div>
                {review.serviceName && (
                  <div>
                    {/* <Badge variant="secondary" className="ml-2">
                      {review.sewa}
                    </Badge> */}

                    <Badge variant="brand" className="ml-2">
                      {review.serviceName}
                    </Badge>
                  </div>
                )}
              </div>

              <p className="text-gray-700 mb-4">{review.content}</p>

              <div className="flex flex-col">
                <div className="flex gap-2">
                  <div className="flex items-center gap-1">
                    <div className="flex flex-col">
                      <div className="border-gray-200 p-1 bg-white rounded-full shadow-2xl border">
                        <LuLightbulb className="h-4 w-4 text-gray-500" />
                      </div>
                      <p className="text-[6px] text-muted-foreground font-medium text-center">
                        Helpful
                      </p>
                    </div>
                    <span className="text-sm text-gray-600">
                      {review.metrics.helpful}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="flex flex-col justify-center">
                      <div className="border-gray-200 p-1 bg-white rounded-full shadow-2xl border">
                        <PiHandsClapping className="h-4 w-4 text-gray-500" />
                      </div>
                      <p className="text-[6px] text-muted-foreground font-medium text-center">
                        Thanks
                      </p>
                    </div>

                    <span className="text-sm text-gray-600">
                      {review.metrics.timely}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="flex flex-col justify-center">
                      <div className="border-gray-200 p-1 bg-white rounded-full shadow-2xl border">
                        <GoHeart className="h-4 w-4 text-gray-500" />
                      </div>
                      <p className="text-[5px] text-muted-foreground font-medium text-center">
                        Love this
                      </p>
                    </div>
                    <span className="text-sm text-gray-600">
                      {review.metrics.satisfaction}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="flex flex-col justify-center">
                      <div className="border-gray-200 p-1 bg-white rounded-full shadow-2xl border">
                        <BsEmojiDizzy className="h-4 w-4 text-gray-500" />
                      </div>
                      <p className="text-[6px] text-muted-foreground font-medium text-center">
                        Oh no
                      </p>
                    </div>

                    <span className="text-sm text-gray-600">
                      {review.metrics.sad}
                    </span>
                  </div>
                </div>
                {review.replies && review.replies.length > 0 ? (
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-sm">
                        {openReplies.includes(review.id)
                          ? "Hide Reply"
                          : "Show Reply"}
                      </span>
                    </Button>
                  </CollapsibleTrigger>
                ) : (
                  <div className="mt-4 w-full">
                    <Textarea
                      placeholder="Write a reply..."
                      className="text-lg"
                      value={newReply[review.id] || ""}
                      onChange={(e) =>
                        handleReplyChange(review.id, e.target.value)
                      }
                    />
                    <div className="flex justify-end">
                      <Button
                        className="mt-2 bg-brand-gradient"
                        onClick={() => handleReplySubmit(review.id)}
                      >
                        Reply
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {review.replies && (
              <CollapsibleContent>
                {review.replies.map((reply) => (
                  <div
                    key={reply.id}
                    className="ml-12 mt-4 p-6 border-gray-200 bg-gray-200 rounded-xl"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={reply.avatar} alt={reply.author} />
                        <AvatarFallback>{reply.author[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold gradient-text">
                          {reply.author}
                        </h4>
                        <p className="text-sm text-gray-500">{reply.date}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 ml-auto"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-gray-700">{reply.content}</p>
                  </div>
                ))}
                {/* Render submitted replies */}
                {submittedReplies
                  .filter((reply) => reply.id.startsWith(review.id))
                  .map((reply) => (
                    <div
                      key={reply.id}
                      className="ml-12 mt-4 p-6 border-l-2 border-gray-200"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={reply.avatar} alt={reply.author} />
                          <AvatarFallback>{reply.author[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold gradient-text">
                            {reply.author}
                          </h4>
                          <p className="text-sm text-gray-500">{reply.date}</p>
                        </div>
                      </div>
                      <p className="text-gray-700">{reply.content}</p>
                    </div>
                  ))}
              </CollapsibleContent>
            )}
          </Collapsible>
        ))}
      </div>
    </div>
  );
}
