export interface SubMenu {
  name: string;
  link: string;
}

export interface NavLinkItem {
  id: number;
  name: string;
  link: string;
  submenu?: SubMenu[];
}

export const NavLinks: NavLinkItem[] = [
  {
    id: 1,
    name: "Home",
    link: "/landing",
  },
  {
    id: 2,
    name: "Berita",
    link: "/beritaland",
  },
  {
    id: 3,
    name: "Hasil Uji",
    link: "/hasilujiland",
  },
  {
    id: 4,
    name: "Testimoni",
    link: "/testimoniland",
  },
  {
    id: 5,
    name: "Daftar Member",
    link: "/memberland",
  },
];
