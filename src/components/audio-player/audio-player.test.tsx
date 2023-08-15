import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AudioPlayer from './audio-player';
import { internet } from 'faker';

describe('Component: AudioPlayer', () => {
  it('should render correctly', () => {
    const mockMelodyPath = internet.url();
    const mockHandleClick = vi.fn();

    render(
      <AudioPlayer
        isPlaying
        src={mockMelodyPath}
        onPlayButtonClick={mockHandleClick}
      />,
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByTestId('audio')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByRole('button')).toHaveClass('track__button--pause');
  });

  it('should play button enable when data loaded', async () => {
    const mockMelodyPath = internet.url();
    const mockHandleClick = vi.fn();
    HTMLMediaElement.prototype.play = vi.fn();

    render(
      <AudioPlayer isPlaying
        src={mockMelodyPath}
        onPlayButtonClick={mockHandleClick}
      />,
    );
    fireEvent(screen.getByTestId('audio'), new Event('loadeddata'));
    await userEvent.click(screen.getByRole('button'));

    expect(mockHandleClick).toBeCalledTimes(1);
    expect(screen.getByRole('button')).not.toBeDisabled();
  });
});
