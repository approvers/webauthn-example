import { NextComponentType } from 'next';
import { FC } from '..';

type Props = {
  children: NextComponentType,
};

export const Panel: FC = (props: Props) => {
  return (
    <div className="bg-white rounded-lg shadow-lg flex flex-col items-center p-6 w-full max-w-sm">
      { props.children }
    </div>
  );
};
