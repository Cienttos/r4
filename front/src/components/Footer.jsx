import React from 'react';

const socialLinks = [
    { type: 'GitHub', url: '#' },
    { type: 'LinkedIn', url: '#' },
    { type: 'Twitter', url: '#' },
];

const Footer = () => {
    return (
        <footer className="py-8 bg-black border-t border-green-500/50">
            <div className="max-w-5xl mx-auto text-center">
                <div className="flex justify-center gap-8 mb-4">
                    {socialLinks.map(link => (
                        <a 
                            key={link.type} 
                            href={link.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-green-400 hover:text-white transition-colors"
                        >
                            {link.type}
                        </a>
                    ))}
                </div>
                <p className="text-sm text-green-700">
                    &copy; {new Date().getFullYear()} [YOUR NAME]. All rights reserved.
                </p>
                <p className="text-xs text-green-900 mt-2">
                    System Integrity: Nominal. Connection: Secure.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
