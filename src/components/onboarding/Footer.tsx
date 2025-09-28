import React from 'react';
import {
  Briefcase,
  Mail,
  Phone,
  Twitter,
  Linkedin,
  Instagram,
} from 'lucide-react';

function Footer() {
  return (
    <footer className="relative mt-8">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Branding */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-white/5 shadow-sm">
                <span className="text-[0.9rem] font-semibold tracking-tight" style={{ letterSpacing: '-0.02em' }}>S</span>
              </div>
              <span className="text-base font-semibold tracking-tight" style={{ letterSpacing: '-0.02em' }}>Sinergi.AI</span>
            </div>
            <p className="text-sm text-white/70">
              Menyatukan kandidat dan perusahaan dengan AI yang memahami kebutuhan Anda.
            </p>
            <div className="flex items-center gap-2">
              <a
                href="#jobs"
                className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/85 transition hover:bg-white/[0.08]"
              >
                <Briefcase size={20} />
                Job List Page
              </a>
            </div>
          </div>

          {/* Produk */}
          <div>
            <div className="text-sm font-medium">Produk</div>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <li><a className="hover:text-white" href="#ai">AI Prompting</a></li>
              <li><a className="hover:text-white" href="#home">Highlight Jobs</a></li>
              <li><a className="hover:text-white" href="#home">Tentang</a></li>
            </ul>
          </div>

          {/* Perusahaan */}
          <div>
            <div className="text-sm font-medium">Perusahaan</div>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <li><a className="hover:text-white" href="#">Karier</a></li>
              <li><a className="hover:text-white" href="#">Kebijakan Privasi</a></li>
              <li><a className="hover:text-white" href="#">Syarat Layanan</a></li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <div className="text-sm font-medium">Kontak</div>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <li className="inline-flex items-center gap-2">
                <Mail size={20} />
                hello@sinergi.ai
              </li>
              <li className="inline-flex items-center gap-2">
                <Phone size={20} />
                +62-811-2233-4455
              </li>
              <li className="inline-flex items-center gap-3">
                <a
                  href="#"
                  className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs transition hover:bg-white/[0.08]"
                >
                  <Twitter size={16} />
                  Twitter
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs transition hover:bg-white/[0.08]"
                >
                  <Linkedin size={16} />
                  LinkedIn
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs transition hover:bg-white/[0.08]"
                >
                  <Instagram size={16} />
                  Instagram
                </a>
              </li>
            </ul>
            <p className="mt-4 text-xs text-white/50">
              © {new Date().getFullYear()} Sinergi.AI. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
