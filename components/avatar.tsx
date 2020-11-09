import { FC } from '..';

type Props = {
  name: string,
  url: string,
};

export const Avatar: FC<Props> = (props: Props) => {
  return (
    <img
      className="rounded-full w-20 h-20"
      alt={ props.name }
      src={ props.url }
    />
  );
};
