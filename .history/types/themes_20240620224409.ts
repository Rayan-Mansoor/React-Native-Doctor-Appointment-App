export interface ColorTheme {
  background: string;
  card: string;
  primaryText: string;
  secondaryText: string;
  primaryMain: string;
  error: string;
  rating: string;
  primaryThumb: string;
  secondaryThumb: string;
  primaryTrack: string;
}

export const NormalTheme: ColorTheme = {
  background: '#f0f0f0',
  card: '#ffffff',
  primaryText: '#000000',
  secondaryText: '#808080',
  primaryMain: '#4facfe',
  error: '#cc0202',
  rating: '#ffd700',
  primaryThumb: '#a29bfe',
  secondaryThumb: '#d8d6fc',
  primaryTrack: '#e6e5fc',
};

export const ProtanopiaTheme: ColorTheme = {
  background: '#f0f0f0',
  card: '#ffffff',
  primaryText: '#000000',
  secondaryText: '#808080',
  primaryMain: '#7abaff',
  error: '#840303',
  rating: '#e0d600',
  primaryThumb: 'green',
  secondaryThumb: '#e8e6fc',
  primaryTrack: '#f5f4fc',
};

export const DeuteranopiaTheme: ColorTheme = {
  background: '#f0f0f0',
  card: '#ffffff',
  primaryText: '#000000',
  secondaryText: '#808080',
  primaryMain: '#7abaff',
  error: '#840303',
  rating: '#e0d600',
  primaryThumb: 'red',
  secondaryThumb: '#e8e6fc',
  primaryTrack: '#f5f4fc',
};

export const TritanopiaTheme: ColorTheme = {
  background: '#f0f0f0',
  card: '#ffffff',
  primaryText: '#000000',
  secondaryText: '#808080',
  primaryMain: '#8ab2e6',
  error: '#d7006d',
  rating: '#ffb300',
  primaryThumb: 'yellow',
  secondaryThumb: '#e0d9f3',
  primaryTrack: '#ece6f4',
};
