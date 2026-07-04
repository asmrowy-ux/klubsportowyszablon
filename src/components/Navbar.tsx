import { client } from "@/sanity/lib/client";
import ClientNavbar from "./ClientNavbar";

export default async function Navbar() {
  const settings = await client.fetch(`*[_type == "siteSettings"][0]{ 
    title, 
    logoSize,
    logo { asset { _ref } },
    mainMenu[] {
      _type,
      title,
      link,
      items[] {
        _type,
        title,
        link
      }
    }
  }`);

  let logoUrl = "";
  if (settings?.logo?.asset?._ref) {
    const ref = settings.logo.asset._ref;
    logoUrl = `https://cdn.sanity.io/images/3kzdw0qu/production/${ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp').replace('-svg', '.svg')}`;
  }

  return <ClientNavbar logoUrl={logoUrl} title={settings?.title} logoSize={settings?.logoSize} mainMenu={settings?.mainMenu} />;
}
