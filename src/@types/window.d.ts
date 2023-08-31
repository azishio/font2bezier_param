type FontData = Readonly<{
  family: string;
  fullName: string;
  postscriptName: string;
  style: string;
  blob: () => Promise<Blob>;
}>;

interface Window {
  queryLocalFonts: () => Promise<FontData[]>;
}
