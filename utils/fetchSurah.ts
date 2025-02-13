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
        const response = await fetch(`https://api.alquran.cloud/v1/surah/${id}/editions/quran-uthmani,fr.hamidullah,ar.abdurrahmaansudais`);
        if (!response.ok) {
            console.error("Erreur HTTP:", response.status);
            return null;
        }

        const data = await response.json();
        console.log("✅ Données API récupérées :", data);

        const arabicEdition = data.data.find((edition: any) => edition.edition.identifier === "quran-uthmani");
        const translationEdition = data.data.find((edition: any) => edition.edition.identifier === "fr.hamidullah");
        const audioEdition = data.data.find((edition: any) => edition.edition.identifier === "ar.abdurrahmaansudais");

        return {
            number: arabicEdition.number,
            name: arabicEdition.englishName,
            arabicName: arabicEdition.name,
            versesCount: arabicEdition.numberOfAyahs,
            bismillah: arabicEdition.ayahs[0]?.text || "",
            verses: arabicEdition.ayahs.map((verse: any, index: number) => ({
                number: verse.numberInSurah,
                arabic: verse.text,
                translation: translationEdition.ayahs[index]?.text || "Translation not available",
                audio: audioEdition.ayahs[index]?.audio || "",
            })),
        };
    } catch (error) {
        console.error("❌ Erreur API :", error);
        return null;
    }
}