import React, { useState } from "react";
import axios from "axios";
import "./AddClasse.css"; // Assurez-vous d'importer le CSS pour le style

export interface Classe {
    id?: number;
    name?: string;
    description?: string;
    archive?: boolean;
}

const AddClasse: React.FC = () => {
    const [classe, setClasse] = useState<Classe>({
        name: "",
        description: "",
        archive: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setClasse((prevState) => ({
            ...prevState,
            [name]: name === "archive" ? value === "true" : value, // Convertit "true"/"false" en boolean
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post<Classe>("http://localhost:8080/classes", classe);
            alert("Classe ajoutée avec succès !");
            setClasse({ name: "", description: "", archive: false }); // Réinitialisation du formulaire
        } catch (error) {
            console.error(error);
            alert("Erreur lors de l'ajout de la classe.");
        }
    };

    return (
        <div className="container">
            <h1>Ajouter une Classe</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Nom de la Classe</label>
                    <input
                        type="text"
                        name="name"
                        value={classe.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        value={classe.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="archive">Archivé</label>
                    <select
                        name="archive"
                        value={classe.archive ? "true" : "false"}
                        onChange={handleChange}
                    >
                        <option value="false">Non</option>
                        <option value="true">Oui</option>
                    </select>
                </div>
                <button type="submit" className="submit-button">Ajouter Classe</button>
            </form>
        </div>
    );
};

export default AddClasse;
