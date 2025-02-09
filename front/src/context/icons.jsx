import React, { createContext } from 'react';
import { FaTelegram,FaPatreon,FaMedium, FaVk,FaSignalMessenger,FaThreads, FaSquareOdnoklassniki, FaXTwitter } from "react-icons/fa6";
import { FaYoutube,FaLinkedinIn,FaDribbble, FaSnapchatGhost, FaGithub, FaFacebookMessenger, FaDiscord, FaTwitter, FaTwitch,FaStrava,FaProductHunt,FaBehance,FaReddit,FaFigma,FaSteam, FaInstagram, FaWhatsapp, FaFacebook, FaTiktok, FaSpotify, FaGlobe, FaPinterest } from 'react-icons/fa';
import { SiBuymeacoffee, SiLeetcode } from "react-icons/si";


// Create the IconContext
export const IconContext = createContext();

// IconProvider component
export const IconProvider = ({ children }) => {
    const platformIcons = {
        youtube: { domain: 'youtube.com', icon: <FaYoutube className="link-icon-new-card" /> },
        twitter: { domain: 'twitter.com', icon: <FaTwitter className="link-icon-new-card" /> },
        instagram: { domain: 'instagram.com', icon: <FaInstagram className="link-icon-new-card" /> },
        facebook: { domain: 'facebook.com', icon: <FaFacebook className="link-icon-new-card" /> },
        linkedin: { domain: 'linkedin.com', icon: <FaLinkedinIn className="link-icon-new-card" /> },
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
        threads: { domain: 'threads.net', icon: <FaThreads className="link-icon-new-card" /> },
        dribbble: { domain: 'dribbble.com', icon: <FaDribbble className="link-icon-new-card" /> },
        buymeacoffee: { domain: 'buymeacoffee.com', icon: <SiBuymeacoffee className="link-icon-new-card" /> },
        strava: { domain: 'strava.com', icon: <FaStrava className="link-icon-new-card" /> },
        steam: { domain: 'steam.com', icon: <FaSteam className="link-icon-new-card" /> },
        producthunt: { domain: 'producthunt.com', icon: <FaProductHunt className="link-icon-new-card" /> },
        signal: { domain: 'signal.com', icon: <FaSignalMessenger className="link-icon-new-card" /> },
        figma: { domain: 'figma.com', icon: <FaFigma className="link-icon-new-card" /> },
        reddit: { domain: 'reddit.com', icon: <FaReddit className="link-icon-new-card" /> },
        medium: { domain: 'medium.com', icon: <FaMedium className="link-icon-new-card" /> },
        behance: { domain: 'behance.com', icon: <FaBehance className="link-icon-new-card" /> },
        leetcode: { domain: 'leetcode.com', icon: <SiLeetcode className="link-icon-new-card" /> },
        
    };

    return (
        <IconContext.Provider value={platformIcons}>
            {children}
        </IconContext.Provider>
    );
};

export default IconProvider;
