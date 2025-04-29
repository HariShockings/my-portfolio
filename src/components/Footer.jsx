import { FaGithub, FaLinkedin, FaInstagram, FaHackerrank } from 'react-icons/fa'

export default function Footer() {
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/HariShockings',
      icon: FaGithub,
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/hariharan-navaratanaraja-126121176/',
      icon: FaLinkedin,
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/hari_shockings/',
      icon: FaInstagram,
    },
    {
      name: 'HackerRank',
      url: 'https://www.hackerrank.com/profile/haritheguy21',
      icon: FaHackerrank,
    },
  ]

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300 transform hover:scale-110"
                aria-label={link.name}
              >
                <link.icon className="w-6 h-6" />
              </a>
            ))}
          </div>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Hariharan Navaratnaraja. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}