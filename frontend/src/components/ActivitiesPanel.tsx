import { Activity } from "@/types/activity";
import { Title } from "./Title";
import { ActivityBigCard } from "./ActivityBigCard";

export type ActivitiesPanelProps = {
  title: string;
  listActivities: Activity[];
};

export function ActivitiesPanel(props: ActivitiesPanelProps) {
  return (
    <div className="flex flex-col gap-2">
      <Title title={props.title || "Activities"} />

<div className="grid h-125 grid-cols-4 auto-rows-57 gap-x-3 gap-y-8 overflow-y-auto">
        {props.listActivities.map((activity) => (
          <ActivityBigCard activity={activity}/>
        ))}
      </div>
    </div>
  );
}
