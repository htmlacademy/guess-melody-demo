import {render, screen} from '@testing-library/react';
import withAudioPlayer from './with-audio-player';
import { internet } from 'faker';

describe('HOC: withAudioPlayer', () => {
  it('should render correctly with HOC', () => {
    const expectedText = 'wrappedComponent';
    const mockComponent = () => <span>{expectedText}</span>;
    const PreparedComponent = withAudioPlayer(mockComponent);

    render(<PreparedComponent />);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render audio player via render prop', () => {
    type MockComponentProps = {
      renderPlayer: (src: string, playerIndex: number) => JSX.Element;
    };
    const MockComponent = ({renderPlayer}: MockComponentProps) => (
      <>{renderPlayer(internet.url(), 0)}</>
    );

    const PreparedComponent = withAudioPlayer(MockComponent);

    render(
      <PreparedComponent />
    );

    expect(screen.getByTestId('audio')).toBeInTheDocument();
  });
});
