"use client"
import { FormDialogue } from "@/components/FormDialogue";
import SensorData from "@/components/SensorData";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Toaster } from 'sonner'

export default function Home() {
  const [shouldRerender, setShouldRerender] = useState(false);

  const triggerRerender = () => {
    setShouldRerender(!shouldRerender);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-top w-full">
    <Toaster richColors/>

      <div className="w-[50%] mx-auto mt-20 ">
        <div className="flex justify-between mb-4">
          <h1 className="text-lg font-bold">
            Sensor Data
          </h1>
          <FormDialogue triggerRerender={triggerRerender}/>
        </div>
        <Separator />
        <SensorData shouldRerender={shouldRerender} />
      </div>
    </main>
  );
}
