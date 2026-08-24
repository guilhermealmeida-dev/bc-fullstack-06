import { PersonSimpleRunIcon } from "@phosphor-icons/react";

export function Branding() {
    return(
        <div className="flex items-center justify-start w-full gap-2 ">
          <div className="flex items-center justify-center w-10 h-10 bg-[#00bc7d] p-1 rounded-[8px]">
            <PersonSimpleRunIcon color="#ffffff" className="size-7" />
          </div>
          <p className="uppercase font-[Bebas_Neue] text-[#009966] text-[28px] leading-8">
            FitMeet
          </p>
        </div>

    )
}