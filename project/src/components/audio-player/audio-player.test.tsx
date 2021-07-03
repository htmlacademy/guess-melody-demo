import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AudioPlayer from './audio-player';

describe('Component: AudioPlayer', () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = jest.fn();
    window.HTMLMediaElement.prototype.pause = jest.fn();
  });

  it('should render correctly', () => {
    const mockPath = 'mock-path';

    render(
      <AudioPlayer
        isPlaying
        src={mockPath}
        onPlayButtonClick={jest.fn()}
      />,
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByTestId('audio')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAttribute('disabled');
    expect(screen.getByRole('button')).toHaveClass('track__button--pause');
  });

  it('should play melody when data is loaded', async () => {
    const mockPath = 'mock-path';
    const playButtonClickHandle = jest.fn();

    render(
      <AudioPlayer
        isPlaying
        src={mockPath}
        onPlayButtonClick={playButtonClickHandle}
      />,
    );

    fireEvent(screen.getByTestId('audio') as Element,
      new Event('loadeddata'));

    expect(screen.getByRole('button')).not.toHaveAttribute('disabled');
    screen.getByRole('button').classList.contains('track__button--play');

    await userEvent.click(screen.getByRole('button'));

    expect(playButtonClickHandle).toBeCalled();
  });
});
