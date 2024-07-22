import { FC, ReactNode } from "react";
interface DraggerProps {
    onFile: (file: FileList) => void;
    children?: ReactNode;
}
declare const Dragger: FC<DraggerProps>;
export default Dragger;
