import * as React from "react";


interface Props {
  count: number;
}

const Mistakes: React.FunctionComponent<Props> = (props: Props) => {
  const {count} = props;

  const mistakes = new Array(count).fill(``);

  return (
    <div className="game__mistakes">
      {mistakes.map((it, i) => <div key={`mistake-${i}`} className="wrong" />)}
    </div>
  );
};


export default Mistakes;
