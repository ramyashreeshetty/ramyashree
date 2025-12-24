// Sound effects utility for the XP experience
const SOUNDS = {
  click: "https://www.soundjay.com/buttons/sounds/button-09.mp3",
  popup: "https://www.soundjay.com/buttons/sounds/button-14.mp3",
  close: "https://www.soundjay.com/buttons/sounds/button-10.mp3",
  success: "https://www.soundjay.com/buttons/sounds/button-35.mp3",
};

export const playSound = (type: keyof typeof SOUNDS, volume = 0.2) => {
  try {
    const audio = new Audio(SOUNDS[type]);
    audio.volume = volume;
    audio.play().catch(() => {});
  } catch {
    // Silently fail if audio can't play
  }
};

export const SoundManager = {
  click: () => playSound("click"),
  popup: () => playSound("popup"),
  close: () => playSound("close"),
  success: () => playSound("success", 0.3),
};
