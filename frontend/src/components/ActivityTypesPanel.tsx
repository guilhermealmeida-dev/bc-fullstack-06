import { cn } from "cn";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ActivityType } from "@/types/activity.type";
import { Button } from "./ui/button";
import { Title } from "./Title";

type ActivityTypesPanelProps = {
  title?: string;
  listTypes: ActivityType[];
};

export function ActivityTypesPanel({ title, listTypes }: ActivityTypesPanelProps) {
  return (
    <div className="flex flex-col gap-4">
     <Title title={title || "Activities Types"} />

      <div className="flex gap-3 overflow-x-auto">
        {listTypes.map((type) => (
          <div className="flex flex-col items-center gap-2" key={type.id}>
            <Button
              variant="ghost"
              className="flex w-22.5 h-30.5 flex-col items-center gap-3"
              key={type.id}
            >
              <Avatar key={type.id} className={cn("h-20 w-20")}>
                {type.image && <AvatarImage src={type.image} alt={type.name} />}
                <AvatarFallback className="bg-[#E5E5E5] text-[#171717] font-dm-sans">
                  {type.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="font-dm-sans text-[16px] leading-5 font-semibold text-[#171717]">
                {type.name}
              </span>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
