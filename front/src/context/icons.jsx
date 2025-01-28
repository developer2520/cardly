import React, { createContext } from 'react';
import { FaTelegram, FaVk, FaSquareOdnoklassniki, FaXTwitter } from "react-icons/fa6";
import { FaYoutube, FaSnapchatGhost, FaGithub, FaFacebookMessenger, FaDiscord, FaTwitter, FaTwitch, FaInstagram, FaWhatsapp, FaFacebook, FaLinkedin, FaTiktok, FaSpotify, FaGlobe, FaPinterest } from 'react-icons/fa';

// Create the IconContext
export const IconContext = createContext();

// IconProvider component
export const IconProvider = ({ children }) => {
    const platformIcons = {
        youtube: { domain: 'youtube.com', icon: <FaYoutube className="link-icon-new-card" /> },
        twitter: { domain: 'twitter.com', icon: <FaTwitter className="link-icon-new-card" /> },
        instagram: { domain: 'instagram.com', icon: <FaInstagram className="link-icon-new-card" /> },
        facebook: { domain: 'facebook.com', icon: <FaFacebook className="link-icon-new-card" /> },
        linkedin: { domain: 'linkedin.com', icon: <FaLinkedin className="link-icon-new-card" /> },
        tiktok: { domain: 'tiktok.com', icon: <FaTiktok className="link-icon-new-card" /> },
        spotify: { domain: 'spotify.com', icon: <FaSpotify className="link-icon-new-card" /> },
        github: { domain: 'github.com', icon: <FaGithub className="link-icon-new-card" /> },
        telegram: { domain: 't.me', icon: <FaTelegram className="link-icon-new-card" /> },
        vk: { domain: 'vk.com', icon: <FaVk className="link-icon-new-card" /> },
        ok: { domain: 'ok.ru', icon: <FaSquareOdnoklassniki className="link-icon-new-card" /> },
        pinterest: { domain: 'pinterest.com', icon: <FaPinterest className="link-icon-new-card" /> },
        twitch: { domain: 'twitch.tv', icon: <FaTwitch className="link-icon-new-card" /> },
        x: { domain: 'x.com', icon: <FaXTwitter className="link-icon-new-card" /> },
        discord: { domain: 'discord.com', icon: <FaDiscord className="link-icon-new-card" /> },
        messenger: { domain: 'messenger.com', icon: <FaFacebookMessenger className="link-icon-new-card" /> },
        snapchat: { domain: 'snapchat.com', icon: <FaSnapchatGhost className="link-icon-new-card" /> },
        whatsapp: { domain: 'whatsapp.com', icon: <FaWhatsapp className="link-icon-new-card" /> },
    };

    return (
        <IconContext.Provider value={platformIcons}>
            {children}
        </IconContext.Provider>
    );
};

export default IconProvider;
