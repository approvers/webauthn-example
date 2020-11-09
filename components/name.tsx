import { NextComponentType } from 'next';
import { FC } from '..';

type Props = {
  children: NextComponentType,
};

export const Name: FC = (props: Props) => {
  return (
    <h2 className="text-xl mt-3">
      { props.children }
    </h2>
  );
};
