import * as React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

type AvatarCircleProps = React.ComponentProps<typeof Avatar> & {
	src?: string
	alt?: string
	fallback?: React.ReactNode
}

export function AvatarCircle({
	src,
	alt = "Avatar",
	fallback = "?",
	className,
	...props
}: AvatarCircleProps) {
	return (
		<Avatar className={cn("h-13 w-13 border-emerald-400 border-2 gap-6", className)} {...props}>
			{src && <AvatarImage src={src} alt={alt} />}
			<AvatarFallback>{fallback}</AvatarFallback>
		</Avatar>
	)
}
