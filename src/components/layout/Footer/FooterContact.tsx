import { MapPin, Phone, Mail } from 'lucide-react';

interface FooterContactProps {
  title: string;
  address: string;
  phone: string;
  email: string;
}

export function FooterContact({ title, address, phone, email }: FooterContactProps) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-bold text-lg text-text">{title}</h3>
      <ul className="flex flex-col gap-4 text-sm text-text-secondary">
        <li className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
          <span>{address}</span>
        </li>
        <li className="flex items-center gap-3">
          <Phone className="w-5 h-5 text-accent shrink-0" />
          <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-accent transition-colors" dir="ltr">
            {phone}
          </a>
        </li>
        <li className="flex items-center gap-3">
          <Mail className="w-5 h-5 text-accent shrink-0" />
          <a href={`mailto:${email}`} className="hover:text-accent transition-colors">
            {email}
          </a>
        </li>
      </ul>
    </div>
  );
}
