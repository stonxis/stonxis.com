'use client'

import { useState, useEffect } from "react";

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookieConsent");
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookieConsent", "true");
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 md:bottom-16 md:left-16 md:right-16 bg-background border rounded-sm p-8 flex flex-col md:flex-row gap-12 justify-between items-center z-9999999">
            <div className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold">Sua privacidade</h2>
                <p className="text-current/50 text-sm">Nós e nossos parceiros utilizamos cookies e tecnologias semelhantes para garantir o funcionamento adequado do nosso site, personalizar conteúdos, analisar o tráfego e fornecer anúncios relevantes para você. Esses cookies nos ajudam a entender suas preferências, aprimorar nossos serviços e proporcionar uma navegação mais eficiente e segura.</p>
            </div>
            <div className="flex flex-col gap-2 whitespace-nowrap py-4 w-full">
                <button onClick={handleAccept} className="border-2 hover:border-accent-foreground/20 py-2 transition-colors px-4 rounded cursor-pointer">
                    Política de Cookies
                </button>
                <button onClick={handleAccept} className="bg-teal-500 hover:bg-teal-400 text-black font-semibold px-4 py-2 rounded cursor-pointer transition-colors">
                    OK
                </button>
            </div>
        </div>
    );
};

export default CookieConsent;
