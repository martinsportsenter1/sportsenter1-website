// Central place to edit gym info, nav and contact details.
export const site = {
  name: "SportSenter1",
  tagline: "Treningssenter Vinterbro og Kolbotn",
  phone: "+47 66 80 46 82",
  phoneHref: "tel:+4766804682",
  email: "post@sportsenter1.no",
};

export const nav = [
  { label: "Hjem", href: "/" },
  { label: "Om Oss", href: "/om-oss" },
  { label: "Våre Trenere", href: "/trenere" },
  { label: "Gruppetimer", href: "/gruppetimer" },
  { label: "Kolbotn", href: "/kolbotn" },
  { label: "Vinterbro", href: "/vinterbro" },
  { label: "Medisinske tjenester", href: "/medisinske-tjenester" },
  { label: "Just Sayin'", href: "/blog" },
];

export const locations = {
  kolbotn: {
    name: "Kolbotn",
    address: "Trollåsveien 6, 1414 Trollåsen",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Troll%C3%A5sveien+6+1414+Troll%C3%A5sen",
    email: "post@sportsenter1.no",
    phone: "+47 66 80 46 82",
    hours: [
      ["Mandag – Torsdag", "10:00 – 21:00"],
      ["Fredag", "11:00 – 16:00"],
      ["Lørdag", "10:00 – 14:00"],
      ["Søndag", "12:00 – 16:00"],
    ],
  },
  vinterbro: {
    name: "Vinterbro",
    address: "Sjøskogenveien 7, 1407 Vinterbro",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Sj%C3%B8skogenveien+7+1407+Vinterbro",
    email: "vinterbro@sportsenter1.no",
    phone: "+47 66 80 46 82",
    hours: [
      ["Mandag – Torsdag", "10:00 – 21:00"],
      ["Fredag", "10:00 – 16:00"],
      ["Lørdag", "10:00 – 14:00"],
      ["Søndag", "10:00 – 14:00"],
    ],
  },
};
