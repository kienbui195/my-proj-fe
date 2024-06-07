'use client'

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Book,
  BookMarked,
  BookOpenText,
  GraduationCap,
  Infinity,
  MessageSquareText,
  PersonStanding,
  ShieldCheck,
  Tag,
  TrafficCone,
  UserRoundCheck,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";

interface ISectionState {
  link: string;
  label: string;
  icon?: React.ReactNode;
  bgColor: string;
}

const Section = ({
  link = "",
  label = "",
  icon = <></>,
  bgColor = "",
}: ISectionState) => {
  return (
    <Link href={link} className="inline-block">
      <Button
        variant={"outline"}
        className={`p-10 ${bgColor} text-white w-full`}
      >
        <div className="flex gap-4 items-center">
          {icon}
          <span>{label}</span>
        </div>
      </Button>
    </Link>
  );
};

const THEORY_BUTTON: ISectionState[] = [
  {
    label: "Đề ngẫu nhiên",
    link: "/hoc-lai-xe/theory/de-ngau-nhien",
    icon: <Infinity className="w-6 h-6" />,
    bgColor: "bg-orange-500",
  },
  {
    label: "Theo bộ đề",
    link: "/hoc-lai-xe/theory/theo-bo-de",
    icon: <Book className="w-6 h-6" />,
    bgColor: "bg-red-500",
  },
  {
    label: "Xem câu bị sai",
    link: "/hoc-lai-xe/theory/xem-lai-cac-cau-sai",
    icon: <UserRoundCheck className="w-6 h-6" />,
    bgColor: "bg-green-500",
  },
  {
    label: "Ôn tập câu hỏi",
    link: "/hoc-lai-xe/theory/on-tap-cau-hoi",
    icon: <BookOpenText className="w-6 h-6" />,
    bgColor: "bg-cyan-500",
  },
  {
    label: "Các biển báo",
    link: "/hoc-lai-xe/theory/cac-bien-bao",
    icon: <TrafficCone className="w-6 h-6" />,
    bgColor: "bg-blue-500",
  },
  {
    label: "Mẹo ghi nhớ",
    link: "/hoc-lai-xe/theory/meo-ghi-nho",
    icon: <Tag className="w-6 h-6" />,
    bgColor: "bg-purple-500",
  },
  {
    label: "60 câu điểm liệt",
    link: "/hoc-lai-xe/theory/meo-ghi-nho",
    icon: <ShieldCheck className="w-6 h-6" />,
    bgColor: "bg-amber-900",
  },
  {
    label: "Top 50 câu sai",
    link: "/hoc-lai-xe/theory/meo-ghi-nho",
    icon: <GraduationCap className="w-6 h-6" />,
    bgColor: "bg-gray-500",
  },
];

const SIMULATION_LESSON: ISectionState[] = [
  {
    label: "Ôn thi",
    link: "/hoc-lai-xe/simulation/on-thi",
    icon: <BookMarked className="w-6 h-6" />,
    bgColor: "bg-blue-500",
  },
  {
    label: "Thi thử",
    link: "/hoc-lai-xe/simulation/thi-thu",
    icon: <PersonStanding className="w-6 h-6" />,
    bgColor: "bg-green-500",
  },
  {
    label: "Tình huống cần ôn lại",
    link: "/hoc-lai-xe/simulation/tinh-huong-can-on-tap",
    icon: <MessageSquareText className="w-6 h-6" />,
    bgColor: "bg-purple-500",
  },
  {
    label: "Các tình huống ghi nhớ",
    link: "/hoc-lai-xe/simulation/tinh-huong-ghi-nho",
    icon: <BookMarked className="w-6 h-6" />,
    bgColor: "bg-red-500",
  },
];

const Home = () => {
  return (
    <section className="w-full">
      <Tabs defaultValue="theory" className="w-full">
        <TabsList className="">
          <TabsTrigger value="theory">Lý Thuyết</TabsTrigger>
          <TabsTrigger value="simulation">Mô Phỏng</TabsTrigger>
        </TabsList>
        <TabsContent value="theory" className="grid grid-cols-2 gap-4">
          {THEORY_BUTTON.map((_i, idx) => {
            return <Section key={idx} {..._i} />;
          })}
        </TabsContent>
        <TabsContent value="simulation" className="grid grid-cols-2 gap-4">
          {SIMULATION_LESSON.map((_i, idx) => {
            return <Section key={idx} {..._i} />;
          })}
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Home;
