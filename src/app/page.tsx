import SensorData from "@/components/SensorData";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-top w-full">
     

       <div className="w-[50%] mx-auto mt-20">
        <div className="flex items-end">
          <Button>Add Data</Button>
        </div>
        <SensorData />
       </div>

     
    </main>
  );
}
