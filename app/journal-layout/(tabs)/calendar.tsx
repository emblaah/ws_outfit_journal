import { Center } from "@/components/ui/center";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";

export default function CalendarTab() {
  return (
    <Center className="flex-1">
      <Heading className="font-bold text-2xl">Calendar</Heading>
      <Divider className="my-[30px] w-[80%]" />
      <Heading className="text-secondary-200">
        This is the calendar tab.
      </Heading>
    </Center>
  );
}
