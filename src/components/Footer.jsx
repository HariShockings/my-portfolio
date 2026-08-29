import { FaGithub, FaLinkedin, FaInstagram, FaHackerrank, FaTiktok, FaFacebook } from 'react-icons/fa'

export default function Footer() {
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/hariShockings',
      icon: FaGithub,
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/hariharan-navaratanaraja-126121176/',
      icon: FaLinkedin,
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/harishockings/',
      icon: FaInstagram,
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@hari_shockings?_r=1&_t=ZS-99IAYMEi13N',
      icon: FaTiktok,
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/share/19YLxNh57M/?mibextid=wwXIfr',
      icon: FaFacebook,
    },
    {
      name: 'HackerRank',
      url: 'https://www.hackerrank.com/profile/haritheguy21',
      icon: FaHackerrank,
    },
  ]

  return (
    <footer className="bg-gray-950 border-t border-gray-900 text-white py-8 font-mono relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-10 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-500 transition-colors duration-300 transform hover:scale-110"
                aria-label={link.name}
              >
                <link.icon className="w-6 h-6" />
              </a>
            ))}
          </div>
          <p className="text-gray-500 text-xs font-bold tracking-widest uppercase text-center flex flex-col sm:flex-row items-center gap-2">
            <span>© 2026 NAVARATNARAJA HARIHARAN</span>
            <span className="hidden sm:inline-block text-blue-500">{`//`}</span>
            <span>BUILT WITH DATA, DRIVEN BY CURIOSITY.</span>
          </p>
        </div>
      </div>
    </footer>
  )
}