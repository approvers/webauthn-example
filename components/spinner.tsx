import { FC } from '..';

import styles from '../styles/Spinner.module.css';

export const Spinner: FC = () => {
  return (
    <div className={ styles.spinner }>
      { [...Array(12)].map((_, i) => <div key={ i } />) }
    </div>
  );
};
