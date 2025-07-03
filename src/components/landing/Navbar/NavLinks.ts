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
    link: "/",
  },
  {
    id: 2,
    name: "Layanan",
    link: "/layanan",
    // submenu: [
    //   { name: "Sejarah", link: "/profile/story" },
    //   { name: "Visi dan Misi", link: "/profile/visi-misi" },
    //   { name: "Indikator Mutu", link: "/profile/quality-indicators" },
    // ],
  },
  {
    id: 3,
    name: "Tentang",
    link: "/tentang",
  },
  {
    id: 4,
    name: "Kemitrann",
    link: "/kemitraan",
    // submenu: [
    //   { name: "Rawat Jalan", link: "/ourservice/outpatient" },
    //   { name: "Rawat Darurat", link: "/ourservice/emergency-care" },
    //   { name: "Rawat Inap", link: "/ourservice/inpatient" },
    //   { name: "Penunjang", link: "/ourservice/support" },
    //   { name: "Anni`mah Resto", link: "/ourservice/annimah-resto" },
    // ],
  },
  {
    id: 5,
    name: "Blog",
    link: "/blog",
  },
  {
    id: 6,
    name: "Daftar Member",
    link: "/member",
  },
];
