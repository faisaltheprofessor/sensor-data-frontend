"use client"
import { FormDialogue } from "@/components/FormDialogue";
import { ModeToggle } from "@/components/ModeTogle";
import SensorData from "@/components/SensorData";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Toaster } from 'sonner'

export default function Home() {
  const [shouldRerender, setShouldRerender] = useState(false);

  const triggerRerender = () => {
    setShouldRerender(!shouldRerender);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-top w-full pt-20">
      <Toaster richColors />
      <Card className="max-w-screen-xl min-w-[50%]">
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between">
              <h1>Sensor Data</h1>
              <FormDialogue triggerRerender={triggerRerender} />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full mx-auto">
            <Separator />
            {/* Sensor Data Component */}
            <SensorData shouldRerender={shouldRerender} />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
