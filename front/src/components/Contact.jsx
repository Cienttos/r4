import React from 'react';

const Contact = ({ socialLinks }) => {
  return (
    <section id="contact" className="py-20 bg-black contact-bg">
            <h2 className="text-4xl text-center font-bold mb-12 text-green-400">CONTACT</h2>
            <div className="max-w-4xl mx-auto px-4 text-center">
                <p className="text-lg mb-8">I'm currently available for freelance work. Drop me a line if you'd like to chat.</p>
                
                <div className="flex justify-center gap-8 mb-12">
                    {socialLinks?.map(link => (
                        <a 
                            key={link.type} 
                            href={link.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-green-400 hover:text-white hover:scale-110 transition-all duration-300 text-2xl"
                        >
                            {link.type}
                        </a>
                    ))}
                </div>

                <form className="max-w-xl mx-auto">
                    <div className="mb-4">
                        <input type="text" placeholder="NAME" className="w-full p-3 bg-gray-900/50 border border-green-500/30 rounded-lg focus:outline-none focus:border-green-500" />
                    </div>
                    <div className="mb-4">
                        <input type="email" placeholder="EMAIL" className="w-full p-3 bg-gray-900/50 border border-green-500/30 rounded-lg focus:outline-none focus:border-green-500" />
                    </div>
                    <div className="mb-4">
                        <textarea placeholder="MESSAGE" rows="4" className="w-full p-3 bg-gray-900/50 border border-green-500/30 rounded-lg focus:outline-none focus:border-green-500"></textarea>
                    </div>
                    <button type="submit" className="px-8 py-3 bg-green-700 text-black font-bold rounded-lg hover:bg-green-500 transition-colors duration-300">
                        SEND_MESSAGE
                    </button>
                </form>
            </div>
        </section>
  );
};

export default Contact;