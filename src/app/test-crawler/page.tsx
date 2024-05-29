"use client";

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";

export type TOutPut = "html" | "autoparse";

export interface IZenrowsSettings {
  urlScrape: string;
  addOn: boolean;
  boostMode: boolean;
  outPut: TOutPut;
  apiKey: string;
}

const TestCrawler = () => {
  const [zenrowsData, setZenrowsData] = React.useState<IZenrowsSettings>({
    urlScrape: "",
    addOn: true,
    boostMode: true,
    outPut: "html",
    apiKey: "",
  });
  const [dialog, setDialog] = React.useState(false);
  const [result, setResult] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSendReqZenrows = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .request({
        url: `${process.env.NEXT_PUBLIC_BE}/crawler/view-data`,
        method: "POST",
        data: {
          handler: "handleZenrows",
          payload: {
            urlScrape: zenrowsData.urlScrape,
            addOn: zenrowsData.addOn,
            boostMode: zenrowsData.boostMode,
            outPut: zenrowsData.outPut,
            apiKey: zenrowsData.apiKey,
          },
        },
      })
      .then((res) => {
        setResult(JSON.stringify(res.data.data));
        setDialog(true);
      })
      .catch((err) => {
        console.log(err?.message ?? err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section className="border border-black rounded-lg p-6 shadow-md">
      <div className="mb-4 font-bold text-lg">Build Your Request</div>
      <Accordion type="single" collapsible className="w-full bg-green-300 px-4">
        <AccordionItem value="item-1" className="border-black">
          <AccordionTrigger className="bg-green-300 px-2">
            Zenrows
          </AccordionTrigger>
          <AccordionContent className="p-3 bg-green-200 rounded-md">
            <form
              onSubmit={handleSendReqZenrows}
              className="flex flex-col gap-4 w-full"
            >
              <div className="flex flex-col items-stretch gap-2 w-full">
                <Label>
                  URL to Scrape <span className="text-red-500">*</span>
                </Label>
                <Input
                  className=""
                  value={zenrowsData.urlScrape}
                  onChange={(e) =>
                    setZenrowsData((prev) => ({
                      ...prev,
                      urlScrape: e.target.value,
                    }))
                  }
                  placeholder="https://httpbin.io/anything"
                  required
                />
              </div>
              <div className="flex flex-col items-stretch gap-2 w-full">
                <Label>API Key</Label>
                <Input
                  className=""
                  value={zenrowsData.apiKey}
                  onChange={(e) =>
                    setZenrowsData((prev) => ({
                      ...prev,
                      apiKey: e.target.value,
                    }))
                  }
                  placeholder="You can use our api key if you dont have it."
                />
              </div>
              <div className="flex flex-col items-stretch gap-2 w-full">
                <Label>Add-on</Label>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="Premium-Proxies"
                    checked={zenrowsData.addOn}
                    onCheckedChange={(val) =>
                      setZenrowsData((prev) => ({ ...prev, addOn: val }))
                    }
                  />
                  <Label htmlFor="Premium-Proxies">Premium Proxies</Label>
                </div>
              </div>
              <div className="flex flex-col items-stretch gap-2 w-full">
                <Label>Boost Mode</Label>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="JS-Rendering"
                    checked={zenrowsData.boostMode}
                    onCheckedChange={(val) =>
                      setZenrowsData((prev) => ({ ...prev, boostMode: val }))
                    }
                  />
                  <Label htmlFor="JS-Rendering">JS Rendering</Label>
                </div>
              </div>
              <div className="flex flex-col items-stretch gap-2 w-full">
                <Label>Output</Label>
                <div className="flex items-center space-x-2">
                  <RadioGroup
                    defaultValue={zenrowsData.outPut}
                    onValueChange={(val: TOutPut) =>
                      setZenrowsData((prev) => ({ ...prev, outPut: val }))
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="html" id="html" />
                      <Label htmlFor="html">HTML</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="autoparse" id="autoparse" />
                      <Label htmlFor="autoparse">Auto Parse</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <Button type="submit" disabled={loading}>
                Send Request
              </Button>
            </form>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className="border-black">
          <AccordionTrigger className="bg-green-300 px-2">
            ScraperAPI
          </AccordionTrigger>
          <AccordionContent className="p-3 bg-green-200 rounded-md">
            Yes. It comes with default styles that matches the other
            components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="bg-green-300 px-2">
            ScrapingAnt
          </AccordionTrigger>
          <AccordionContent className="p-3 bg-green-200 rounded-md">
            Yes. It&apos;s animated by default, but you can disable it if you
            prefer.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Dialog
        open={dialog}
        defaultOpen={false}
        onOpenChange={(val) => setDialog(val)}
      >
        <DialogContent className="max-w-[90vw] w-fit">
          <DialogHeader>
            <DialogTitle>Result</DialogTitle>
          </DialogHeader>
          <div className="max-h-[80vh] overflow-y-scroll overflow-x-hidden max-w-[] h-full z-[100]">
            {result}
          </div>
          <DialogFooter>
            <Button onClick={() => setDialog(false)}>OK</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default TestCrawler;
