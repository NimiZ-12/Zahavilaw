import { WhatsappLogoIcon } from "./Icons";
import { whatsappLink } from "@/lib/contact";

export default function WhatsAppButton({ label }: { label: string }) {
  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="fixed bottom-6 left-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 hover:shadow-xl"
    >
      <WhatsappLogoIcon className="h-7 w-7" />
    </a>
  );
}
