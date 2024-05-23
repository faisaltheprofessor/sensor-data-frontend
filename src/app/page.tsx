"use client"
import { FormDialogue } from "@/components/FormDialogue";
import SensorData from "@/components/SensorData";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/toaster";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-top w-full">
    <Toaster />

      <div className="w-[50%] mx-auto mt-20 ">
        <div className="flex justify-between mb-4">
          <h1 className="text-lg font-bold">
            Sensor Data
          </h1>
          <FormDialogue />
        </div>
        <Separator />
        <SensorData />
      </div>
    </main>
  );
}
