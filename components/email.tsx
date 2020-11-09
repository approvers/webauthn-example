import { FC } from '..';

type Props = {
  address: string,
};

export const Email: FC<Props> = (props: Props) => {
  return (
    <p className="text-gray-600 text-sm">
      { props.address }
    </p>
  );
};
