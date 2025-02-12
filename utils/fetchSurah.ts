export interface Verse {
    number: number;
    arabic: string;
    translation: string;
    audio: string;
}

export interface Surah {
    number: number;
    name: string;
    arabicName: string;
    versesCount: number;
    bismillah: string;
    verses: Verse[];
}

export async function getSurah(id: number): Promise<Surah | null> {
    try {
        const response = await fetch(`https://www.alkhourane.org/api/versetBySourate/list/${id}`);
        if (!response.ok) {
            console.error("Erreur HTTP:", response.status);
            return null;
        }

        const data = await response.json();
        console.log("✅ Données API récupérées :", data);

        return {
            number: data.numero, // "numero" au lieu de "id"
            name: data.transcription, // Nom en transcription latine
            arabicName: data.arabic_title, // Titre en arabe
            versesCount: data.count_verset, // Nombre total de versets
            bismillah: data.versets[0]?.arabic_title || "", // Premier verset est souvent la Basmala
            verses: data.versets.map((verse: any) => ({
                number: verse.numero, // Numéro du verset
                arabic: verse.arabic_title, // Texte arabe
                translation: verse.translations.find((t: any) => t.lang_code === "fr")?.traduction || "Traduction non disponible", // Traduction FR
                audio: verse.translations.find((t: any) => t.audio_url)?.audio_url || "", // URL de l'audio s'il existe
            })),
        };
    } catch (error) {
        console.error("❌ Erreur API :", error);
        return null;
    }
}
