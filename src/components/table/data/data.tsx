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
    value: "Trống",
    label: "Trống",
    icon: MessageCircleQuestionIcon,
  },
  {
    value: "Đang được thuê",
    label: "Đang được thuê",
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