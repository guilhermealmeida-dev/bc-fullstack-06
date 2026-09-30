import { Activity } from "@/types/activity";
import { CalendarBlankIcon, UsersThreeIcon } from "@phosphor-icons/react";
import { LockIcon } from "lucide-react";

export function ActivityBigCard(props: { activity: Activity }) {
  return (
    <div
      key={props.activity.id}
      className="flex h-57 w-full flex-col gap-4"
    >
      <div className="relative">
        <img
          src={props.activity.image}
          alt={props.activity.title}
          className="h-40 w-full object-cover border-2"
        />
        {props.activity.private && (
          <div className="absolute left-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-r from-[#00BC7D] to-[#009966]">
            <LockIcon className="text-white" size={18} />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <span className="font-dm-sans font-semibold text-[16px] text-[#191919]">
          {props.activity.title}
        </span>
        <div className="flex flex-row gap-2 items-center">
          <div className="flex flex-row gap-1.5 items-center">
            <CalendarBlankIcon className="text-[#009966]" size={20} />
            <span className="font-dm-sans text-[#404040] text-[12px]">
              {props.activity.scheduledDate.toDateString()}
            </span>
          </div>
          <span className="font-dm-sans text-[12px] text-[#404040]">|</span>
          <div className="flex flex-row gap-1.5 items-center">
            <UsersThreeIcon className="text-[#009966]" size={20} />
            <span className="font-dm-sans text-[#404040] text-[12px]">
              {props.activity.participantCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
