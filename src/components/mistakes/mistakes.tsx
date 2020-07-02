import React, {useMemo} from "react";


interface Props {
  count: number;
}

const Mistakes: React.FC<Props> = ({count}): JSX.Element => {
  const mistakes = useMemo(() => new Array(count).fill(``), [count]);

  return (
    <div className="game__mistakes">
      {mistakes.map((it, i) => <div key={`mistake-${i}`} className="wrong" />)}
    </div>
  );
};


export default Mistakes;
