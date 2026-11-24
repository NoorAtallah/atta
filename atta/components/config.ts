export const LOGO = "/logo.jpg";
export const PHONE = "+962 7X XXX XXXX";
export const WHATSAPP = "9627XXXXXXXX";
export const EMAIL = "info@atta-office.com";
export const INSTAGRAM = "https://www.instagram.com/atta_office/";

export const u = (id: string, w = 2400) => `https://images.unsplash.com/${id}?w=${w}&q=85&auto=format&fit=crop`;
export const IMG = {
  hero: u("photo-1470770841072-f978cf4d019e"),
  statement: u("photo-1506905925346-21bda4d32df4"),
  s1: u("photo-1503387762-592deb58ef4e", 1200),
  s2: u("photo-1541888946425-d81bb19240f5", 1200),
  s3: u("photo-1600210492486-724fe5c67fb0", 1200),
  p1: u("photo-1600585154340-be6161a56a0c"),
  p2: u("photo-1600607687939-ce8a6c25118c"),
  p3: u("photo-1486325212027-8081e485255e"),
  p4: u("photo-1449844908441-8829872d2607"),
};

export const C = {
  bg: "#0a0a09",
  ink: "#e8e3d9",
  mute: "#8a857c",
  gold: "#c6a15b",
  line: "rgba(232,227,217,0.12)",
};
export const ease = [0.76, 0, 0.24, 1] as const;
export const soft = [0.22, 1, 0.36, 1] as const;
export const GRADE = "saturate(0.55) contrast(1.08) sepia(0.18)";
