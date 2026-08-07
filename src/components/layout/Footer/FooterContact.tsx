import { MapPin, Phone, Mail } from 'lucide-react';
import companyData from '@/data/company.json';

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
        <li className="flex items-center gap-3" dir="ltr">
          <Phone className="w-5 h-5 text-accent shrink-0" />
          <a href="tel:+967779924444" className="hover:text-accent transition-colors">
            +967 779924444
          </a>
        </li>
        <li className="flex items-center gap-3" dir="ltr">
          <Phone className="w-5 h-5 text-accent shrink-0 opacity-75" />
          <div className="flex items-center gap-2">
            <a href="tel:01324523" className="hover:text-accent transition-colors">
              01324523
            </a>
            <span className="text-text-secondary opacity-60">|</span>
            <span className="text-xs text-text-secondary">{companyData.contact.landline ? 'هاتف أرضي' : ''}</span>
          </div>
        </li>
        <li className="flex items-center gap-3">
          <Mail className="w-5 h-5 text-accent shrink-0" />
          <a href={`mailto:${email}`} className="hover:text-accent transition-colors" dir="ltr">
            {email}
          </a>
        </li>
      </ul>
    </div>
  );
}
