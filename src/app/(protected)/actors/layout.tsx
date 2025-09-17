import {FC} from "react";

interface IProps {
  children: React.ReactNode;
}

const ActorsLayout: FC<IProps> = ({children}) => {
    return <section>{children}</section>
}

export default ActorsLayout;