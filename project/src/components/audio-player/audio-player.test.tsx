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
    const {container} = render(
      <AudioPlayer
        isPlaying
        src={mockPath}
        onPlayButtonClick={jest.fn()}
      />,
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(container.querySelector('audio')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAttribute('disabled');
    expect(screen.getByRole('button')).toHaveClass('track__button--pause');
  });

  it('should play melody when data is loaded', () => {
    const mockPath = 'mock-path';
    const playButtonClickHandle = jest.fn();

    const {container} = render(
      <AudioPlayer
        isPlaying
        src={mockPath}
        onPlayButtonClick={playButtonClickHandle}
      />,
    );

    expect(screen.getByRole('button')).toHaveClass('track__button--pause');

    fireEvent(container.querySelector('audio') as Element,
      new Event('loadeddata'));

    expect(screen.getByRole('button')).not.toHaveAttribute('disabled');
    screen.getByRole('button').classList.contains('track__button--play');

    userEvent.click(screen.getByRole('button'));
    expect(playButtonClickHandle).toBeCalled();
  });
});
