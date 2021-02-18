type MistakesProps = {
  count: number;
};

function Mistakes(props: MistakesProps): JSX.Element {
  const {count} = props;

  const mistakes = new Array(count).fill('');

  return (
    <div className="game__mistakes">
      {mistakes.map((item, index) => {
        const keyValue = `mistake-${index}`;
        return <div key={keyValue} className="wrong" />;
      })}
    </div>
  );
}

export default Mistakes;
