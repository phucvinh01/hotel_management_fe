import { Head } from "react-day-picker";

export default function RootBooking({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div>{children}</div>
    );
}