import { useState } from "react";
interface IProps {
    modalState: boolean;
}
const Loading = (props: IProps) => {
    const { modalState } = props;
    return (
        <div className={`w-full ${modalState ? 'block' : 'hidden'} h-full flex
            z-50 fixed inset-0 justify-center items-center`} style={{ background: 'rgb(0 0 0 / 85%)' }}>
            <img src="/background/Infinity@1.5x-1.0s-200px-200px.svg" />
        </div>
    );
}
export default Loading;