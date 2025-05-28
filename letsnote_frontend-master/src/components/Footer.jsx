import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const year = new Date().getFullYear(); // Get current year dynamically

    return (
        <footer className="fixed bottom-0 w-full z-0 bg-cyan-200 text-center py-3">
            <p>Let's Note © {year}</p>
        </footer>
    );
};

export default Footer;