import EditScreenInfo from "@/components/EditScreenInfo";
import { Center } from "@/components/ui/center";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";

export default function Home() {
  return (
    <Center className="flex-1">
      <Heading className="font-bold text-2xl">
        Welcome to the Outfit Journal! Add an outfit to get started!
      </Heading>
      <Divider className="my-[30px] w-[80%]" />
    </Center>
  );
}
