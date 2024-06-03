import { EMPTY, NOT_EMPTY } from "@/constant"
import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon, CheckCircleIcon, CircleIcon, CrossIcon, MessageCircleQuestionIcon, WatchIcon } from "lucide-react"


export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
]

export const statuses = [
  {
    value: EMPTY,
    label: EMPTY,
    icon: MessageCircleQuestionIcon,
  },
  {
    value: NOT_EMPTY,
    label: NOT_EMPTY,
    icon: CrossIcon,
  },
]

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon ,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
]