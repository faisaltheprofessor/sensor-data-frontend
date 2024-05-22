import { FormDialogue } from "@/components/FormDialogue";
import SensorData from "@/components/SensorData";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-top w-full">


      <div className="w-[50%] mx-auto mt-20 ">
        <div className="flex justify-between mb-4">
          <div className="flex gap-x-2">
            Descending <Switch title="Descending" />
          </div>
          <FormDialogue />
        </div>
        <Separator />
        <SensorData desc={true} />
      </div>


    </main>
  );
}
