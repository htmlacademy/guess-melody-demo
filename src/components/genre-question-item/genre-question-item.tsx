import * as React from "react";
import {AnswerGenre} from "../../types";


interface Props {
  answer: AnswerGenre;
  id: number;
  onChange: (id: number, value: boolean) => void;
  renderPlayer: (src: string, id: number) => React.ReactNode;
  userAnswer: boolean;
}

class GenreQuestionItem extends React.PureComponent<Props, null> {
  render() {
    const {answer, id, onChange, renderPlayer, userAnswer} = this.props;

    return (
      <div className="track">
        {renderPlayer(answer.src, id)}
        <div className="game__answer">
          <input className="game__input visually-hidden" type="checkbox" name="answer" value={`answer-${id}`}
            id={`answer-${id}`}
            checked={userAnswer}
            onChange={(evt) => {
              const value = evt.target.checked;

              onChange(id, value);
            }}
          />
          <label className="game__check" htmlFor={`answer-${id}`}>Отметить</label>
        </div>
      </div>
    );
  }
}


export default GenreQuestionItem;
